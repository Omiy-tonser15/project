from django.urls import path, include
from rest_framework import routers
from .views import (
    CustomerViewSet, StaffViewSet, VehicleViewSet,
    ServicesViewSet, BookingViewSet,
    register, login
)

# DRF router kwa CRUD endpoints
router = routers.DefaultRouter()
router.register(r'customers', CustomerViewSet)
router.register(r'staffs', StaffViewSet)
router.register(r'vehicles', VehicleViewSet)
router.register(r'services', ServicesViewSet)
router.register(r'bookings', BookingViewSet)

urlpatterns = [
    path('', include(router.urls)),   # CRUD APIs
    path('register/', register),      # Custom register API
    path('login/', login),            # Custom login API
]
