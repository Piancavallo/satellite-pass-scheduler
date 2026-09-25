from rest_framework import viewsets
from .models import Satellite, GroundStation, CommunicationWindow
from .serializers import (
    SatelliteSerializer,
    GroundStationSerializer,
    CommunicationWindowSerializer,
)


class SatelliteViewSet(viewsets.ModelViewSet):
    queryset = Satellite.objects.all()
    serializer_class = SatelliteSerializer


class GroundStationViewSet(viewsets.ModelViewSet):
    queryset = GroundStation.objects.all()
    serializer_class = GroundStationSerializer


class CommunicationWindowViewSet(viewsets.ModelViewSet):
    queryset = CommunicationWindow.objects.all()
    serializer_class = CommunicationWindowSerializer