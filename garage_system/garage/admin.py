# garage/admin.py
from django.contrib import admin
from django.contrib.auth.models import User
from .models import Customer, Staff, Vehicle, Services, Booking

admin.site.register(Customer)
admin.site.register(Staff)
admin.site.register(Vehicle)
admin.site.register(Services)
admin.site.register(Booking)
