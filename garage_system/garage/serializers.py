from rest_framework import serializers
from .models import Customer, Staff, Vehicle, Services, Booking


# ======================
# BASIC SERIALIZERS
# ======================
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__"


class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = "__all__"


class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = "__all__"


class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = "__all__"


class BookingSerializer(serializers.ModelSerializer):
    # READ (for GET)
    vehicle = VehicleSerializer(read_only=True)
    service = ServicesSerializer(read_only=True)
    customer = CustomerSerializer(read_only=True)
    staff = StaffSerializer(read_only=True)

    # WRITE (for POST / PUT)
    vehicle_id = serializers.PrimaryKeyRelatedField(
        queryset=Vehicle.objects.all(),
        source="vehicle",
        write_only=True
    )

    service_id = serializers.PrimaryKeyRelatedField(
        queryset=Services.objects.all(),
        source="service",
        write_only=True
    )

    customer_id = serializers.PrimaryKeyRelatedField(
        queryset=Customer.objects.all(),
        source="customer",
        write_only=True
    )

    staff_id = serializers.PrimaryKeyRelatedField(
        queryset=Staff.objects.all(),
        source="staff",
        write_only=True,
        required=False,
        allow_null=True
    )

    class Meta:
        model = Booking
        fields = "__all__"
