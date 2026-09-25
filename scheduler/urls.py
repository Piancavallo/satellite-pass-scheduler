from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SatelliteViewSet, GroundStationViewSet, CommunicationWindowViewSet

router = DefaultRouter()
router.register('satellites', SatelliteViewSet)
router.register('ground-stations', GroundStationViewSet)
router.register('communication-windows', CommunicationWindowViewSet)

urlpatterns = [
    path('', include(router.urls)),
]