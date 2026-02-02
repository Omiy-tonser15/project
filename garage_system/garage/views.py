from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from .models import Customer, Staff, Vehicle, Services, Booking
from .serializers import (
    CustomerSerializer,
    StaffSerializer,
    VehicleSerializer,
    ServicesSerializer,
    BookingSerializer
)

# ======================
# ViewSets (CRUD)
# ======================
class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer


class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer


class ServicesViewSet(viewsets.ModelViewSet):
    queryset = Services.objects.all()
    serializer_class = ServicesSerializer


# ======================
# BOOKING VIEWSET (FINAL)
# ======================
class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def create(self, request, *args, **kwargs):
        """
        - Status always starts as Pending
        - Uses serializer write-only IDs
        """
        data = request.data.copy()
        data["status"] = "Pending"

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        booking = self.get_object()

        # 🔒 Rule: once approved, cannot be updated
        if booking.status != "Pending":
            return Response(
                {"error": "Approved booking cannot be updated"},
                status=status.HTTP_403_FORBIDDEN
            )

        return super().update(request, *args, **kwargs)


# ======================
# REGISTER API
# ======================
@api_view(['POST'])
def register(request):
    data = request.data

    for field in ["username", "password", "email"]:
        if not data.get(field):
            return Response(
                {"error": f"{field} is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

    if User.objects.filter(username=data["username"]).exists():
        return Response(
            {"error": "Username already exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = User.objects.create_user(
        username=data["username"],
        password=data["password"],
        email=data["email"]
    )

    customer = Customer.objects.create(
        user=user,
        full_name=data.get("full_name", data["username"]),
        phone=data.get("phone", ""),
        email=data["email"]
    )

    return Response(
        {
            "message": "Registration successful",
            "role": "user",
            "user_id": user.id,
            "customer_id": customer.id
        },
        status=status.HTTP_201_CREATED
    )


# ======================
# LOGIN API
# ======================
@api_view(['POST'])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response(
            {"error": "Username and password are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = authenticate(username=username, password=password)

    if not user:
        return Response(
            {"error": "Invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED
        )

    customer = Customer.objects.filter(user=user).first()
    role = "admin" if user.is_staff or user.is_superuser else "user"

    return Response(
        {
            "message": "Login successful",
            "role": role,
            "user_id": user.id,
            "customer_id": customer.id if customer else None,
            "username": user.username
        },
        status=status.HTTP_200_OK
    )
