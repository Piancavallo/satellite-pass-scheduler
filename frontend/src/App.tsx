import { useEffect, useState } from 'react'
import './App.css'

type Satellite = {
  id: number
  name: string
  orbit: string
  status: string
}

type GroundStation = {
  id: number
  name: string
  location: string
  status: string
}

type CommunicationWindow = {
  id: number
  satellite: number
  ground_station: number
  start_time: string
  end_time: string
  satellite_name: string
  ground_station_name: string
  status: string
}

function App() {
  const [satellites, setSatellites] = useState<Satellite[]>([])
  const [groundStations, setGroundStations] = useState<GroundStation[]>([])
  const [windows, setWindows] = useState<CommunicationWindow[]>([])

  const [selectedSatellite, setSelectedSatellite] = useState('')
  const [selectedGroundStation, setSelectedGroundStation] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/satellites/')
      .then(response => response.json())
      .then(data => setSatellites(data))

    fetch('http://127.0.0.1:8000/api/communication-windows/')
      .then(response => response.json())
      .then(data => setWindows(data))

    fetch('http://127.0.0.1:8000/api/ground-stations/')
      .then(response => response.json())
      .then(data => setGroundStations(data))
  }, [])

  const schedulePass = () => {
    if (!selectedSatellite || !selectedGroundStation || !startTime || !endTime) {
      alert('Please fill out all fields.')
      return
    }

    if (endTime <= startTime) {
      alert('End time must be after start time.')
      return
    }

    fetch('http://127.0.0.1:8000/api/communication-windows/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        satellite: Number(selectedSatellite),
        ground_station: Number(selectedGroundStation),
        start_time: startTime,
        end_time: endTime,
        status: 'Scheduled',
      }),
    })
      .then(response => response.json())
      .then(() => {
        fetch('http://127.0.0.1:8000/api/communication-windows/')
          .then(response => response.json())
          .then(data => setWindows(data))
      })
  }

  const deletePass = (id: number) => {
    if (!window.confirm('Are you sure you want to delete this pass?')) {
      return
    }
  
    fetch(`http://127.0.0.1:8000/api/communication-windows/${id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setWindows(windows.filter(window => window.id !== id))
      })
  }

  return (
    <div className="app">
      <header>
        <h1>Satellite Pass Scheduler</h1>
        <p>Satellite Network Operations</p>
      </header>

      <section>
        <h2>Satellites</h2>

        <div className="cards">
          {satellites.map(satellite => (
            <div className="card" key={satellite.id}>
              <h3>{satellite.name}</h3>
              <p>Orbit: {satellite.orbit}</p>
              <p>Status: {satellite.status}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Communication Windows</h2>

        <div className="windows">
          {windows.map(window => (
            <div className="window" key={window.id}>
              <h3>
                {satellites.find(satellite => satellite.id === window.satellite)?.name}
              </h3>

              <p>
                Ground Station:{' '}
                {groundStations.find(
                  station => station.id === window.ground_station
                )?.name}
              </p>

              <p>Start: {window.start_time}</p>
              <p>End: {window.end_time}</p>
              <p>Status: {window.status}</p>
              <button onClick={() => deletePass(window.id)}>
  Delete
</button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Schedule Communication Window</h2>

        <div className="form">
          <select
            value={selectedSatellite}
            onChange={e => setSelectedSatellite(e.target.value)}
          >
            <option value="">Select Satellite</option>
            {satellites.map(satellite => (
              <option key={satellite.id} value={satellite.id}>
                {satellite.name}
              </option>
            ))}
          </select>

          <select
            value={selectedGroundStation}
            onChange={e => setSelectedGroundStation(e.target.value)}
          >
            <option value="">Select Ground Station</option>
            {groundStations.map(station => (
              <option key={station.id} value={station.id}>
                {station.name}
              </option>
            ))}
          </select>

          <input
            type="datetime-local"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
          />

          <input
            type="datetime-local"
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
          />

          <button onClick={schedulePass}>Schedule Pass</button>
        </div>
      </section>
    </div>
  )
}

export default App