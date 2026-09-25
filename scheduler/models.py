from django.db import models

# Create your models here.

class Satellite(models.Model):
    name = models.CharField(max_length=100)
    orbit = models.CharField(max_length=50)
    status = models.CharField(max_length=30)

    def __str__(self):
        return self.name

class GroundStation(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    status = models.CharField(max_length=30)

    def __str__(self):
        return self.name

class CommunicationWindow(models.Model):
    satellite = models.ForeignKey(Satellite, on_delete=models.CASCADE)
    ground_station = models.ForeignKey(GroundStation, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    status = models.CharField(max_length=30)

    def __str__(self):
        return f"{self.satellite} - {self.ground_station}"