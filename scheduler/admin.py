from django.contrib import admin

# Register your models here.

from .models import Satellite, GroundStation, CommunicationWindow

admin.site.register(Satellite)
admin.site.register(GroundStation)
admin.site.register(CommunicationWindow)