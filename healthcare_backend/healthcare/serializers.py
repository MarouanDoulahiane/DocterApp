# healthcare_backend/healthcare/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def validate(self, attrs):
        username = attrs.get('username')
        email = attrs.get('email')

        # Check if username or email already exists (case-insensitive)

        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({'error': 'Email already exists'})
        if User.objects.filter(username__iexact=username).exists():
            raise serializers.ValidationError({'error': 'Username already exists'})

        return attrs
    
from .models import Doctor, TimeSlot

from rest_framework import serializers
from .models import Doctor, Appointment

class DoctorSerializer(serializers.ModelSerializer):
    appointments = serializers.SerializerMethodField()

    class Meta:
        model = Doctor
        fields = ['id', 'name', 'specialty', 'address', 'city', 'payment', 'time_slots', 'appointments']

    def get_appointments(self, obj):
        appointments = Appointment.objects.filter(doctor=obj)
        return [{'date': appointment.date, 'time': appointment.time, 'confirmed': appointment.user is not None} for appointment in appointments]


class TimeSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSlot
        fields = ['id', 'date', 'time'] 


# add here your code
        # serializers.py

from rest_framework import serializers
from .models import Appointment

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['id', 'user', 'doctor', 'date', 'time', 'additional_info', 'doctorName']
