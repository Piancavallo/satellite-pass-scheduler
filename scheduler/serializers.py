from rest_framework import serializers
from .models import Satellite, GroundStation, CommunicationWindow


class SatelliteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Satellite
        fields = '__all__'


class GroundStationSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroundStation
        fields = '__all__'


class CommunicationWindowSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunicationWindow
        fields = '__all__'