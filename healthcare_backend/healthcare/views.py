# healthcare_backend/healthcare/views.py

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import UserSerializer
from django.contrib.auth import authenticate, login as auth_login
from django.db.models import Q
from rest_framework import generics
from .models import Doctor
from .serializers import DoctorSerializer, TimeSlotSerializer
from django.shortcuts import render
from django.contrib.auth import login


@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data['username']
        email = serializer.validated_data['email']
        
        # Check if email or username already exists (case-insensitive)
        if User.objects.filter(Q(username__iexact=username) | Q(email__iexact=email)).exists():
            return Response({'error': 'Username or email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = serializer.save()
        
        # Login the user and return the session ID
        login(request, user)
        session_key = request.session.session_key
        return Response({'sessionId': session_key}, status=status.HTTP_201_CREATED)
    else:
        # If serializer is not valid, return the specific validation errors
        errors = serializer.errors
        if 'username' in errors:
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        elif 'email' in errors:
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Registration failed'}, status=status.HTTP_400_BAD_REQUEST)

from django.http import HttpResponse
from django.contrib.auth import authenticate
from django.contrib.auth import login as django_login  # Importing login from django.contrib.auth

# healthcare_backend/healthcare/views.py

@api_view(['POST'])
def custom_login(request):
    # Get the username and password from the request data
    username = request.data.get('username')
    password = request.data.get('password')
    
    # Check if both username and password are provided
    if not username or not password:
        return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Authenticate user
    user = authenticate(request, username=username, password=password)
    
    if user is not None:
        # Login successful, return the session ID
        django_login(request, user)  # Renamed to django_login
        session_key = request.session.session_key
        return Response({'sessionId': session_key}, status=status.HTTP_200_OK)
    else:
        # Check if username exists
        if User.objects.filter(username__iexact=username).exists():
            return Response({'error': 'Incorrect password'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'error': 'User does not exist'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def check_session(request):
    # Check if the Authorization header is present
    if 'Authorization' in request.headers:
        auth_header = request.headers['Authorization']
        # Check if the Authorization header starts with 'Session'
        if auth_header.startswith('Session '):
            # Extract the session ID from the Authorization header
            session_id = auth_header.split(' ')[1]
            # Check if the session ID is valid
            user = authenticate(request=request, session_id=session_id)
            if user is not None:
                return Response({'message': 'Session is active'}, status=status.HTTP_200_OK)
    # If the Authorization header is missing or invalid, return unauthorized
    return Response({'message': 'Session is inactive'}, status=status.HTTP_401_UNAUTHORIZED)


def book_appointment(request, doctor_id):
    doctor = Doctor.objects.get(id=doctor_id)
    if request.method == 'POST':
        # Handle appointment booking logic here
        # Update doctor's availability, store appointment in database, etc.
        return render(request, 'appointment_confirmation.html', {'doctor': doctor})
    else:
        return render(request, 'book_appointment.html', {'doctor': doctor})

class DoctorListAPIView(generics.ListAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer


# import doctor_list from healthcare_backend/healthcare/views.py


@api_view(['GET'])
def doctors_list(request):
    doctors = Doctor.objects.all()
    serializer = DoctorSerializer(doctors, many=True)

    # Fetch and serialize time slots for each doctor
    for doctor_data in serializer.data:
        doctor = Doctor.objects.get(pk=doctor_data['id'])
        time_slots = doctor.time_slots.all()  # Retrieve all time slots associated with this doctor
        time_slot_serializer = TimeSlotSerializer(time_slots, many=True)
        doctor_data['time_slots'] = time_slot_serializer.data

    return Response(serializer.data)


# healthcare_backend/healthcare/views.py



