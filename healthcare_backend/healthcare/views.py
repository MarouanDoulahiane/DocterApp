# healthcare_backend/healthcare/views.py

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import UserSerializer
from django.contrib.auth import authenticate
from django.db.models import Q
from rest_framework import generics
from .models import Doctor
from .serializers import DoctorSerializer, TimeSlotSerializer
from django.shortcuts import render
from django.contrib.auth import login as django_login
from django.contrib.sessions.models import Session

class DoctorListAPIView(generics.ListAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from.models import Doctor, TimeSlot, Appointment
from.serializers import AppointmentSerializer

@api_view(['POST'])
def book_appointment(request, doctor_id):
    doctor = get_object_or_404(Doctor, id=doctor_id)
    if request.method == 'POST':
        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            # Assuming the user is authenticated, get the user object
            user = request.user
            
            # Create the appointment and associate it with the user and doctor
            appointment = serializer.save(user=user, doctor=doctor)
            
            # Remove the booked time slot from the doctor's availability
            date = serializer.validated_data['date']
            time = serializer.validated_data['time']
            TimeSlot.objects.filter(doctor=doctor, date=date, time=time).delete()
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_doctor(request, doctor_id):
    try:
        doctor = Doctor.objects.get(pk=doctor_id)
        serializer = DoctorSerializer(doctor)
        return Response(serializer.data)
    except Doctor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
        


@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        
        # Manually log in the user
        django_login(request, user)

        # Save the session to ensure session_key is generated
        request.session.save()
        
        session_key = request.session.session_key
        return Response({'sessionId': session_key}, status=status.HTTP_201_CREATED)
    else:
        errors = serializer.errors
        if 'username' in errors:
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        elif 'email' in errors:
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Registration failed'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def custom_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = authenticate(request, username=username, password=password)
    
    if user is not None:
        # Authenticate user
        django_login(request, user)

        # Save the session to ensure session_key is generated
        request.session.save()
        
        # Retrieve the session key
        session_key = request.session.session_key
        
        return Response({'sessionId': session_key}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def check_session(request):
    if 'Authorization' in request.headers:
        auth_header = request.headers['Authorization']
        if auth_header.startswith('Session '):
            session_id = auth_header.split(' ')[1]
            # Check if the session key exists
            if Session.objects.filter(session_key=session_id).exists():
                return Response({'message': 'Session is active'}, status=status.HTTP_200_OK)
    return Response({'message': 'Session is inactive'}, status=status.HTTP_401_UNAUTHORIZED)



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




from rest_framework.decorators import api_view

# views.py

from django.contrib.auth.models import User

@api_view(['POST'])
def confirm_booking(request, doctor_id):
    doctorId = request.data.get('doctorId')
    # convert doctorId to integer
    doctor = get_object_or_404(Doctor, id=int(doctorId))
    date = request.data.get('date')
    time = request.data.get('time')
    username = request.data.get('username')  # Retrieve username from request data

    # Retrieve user based on the provided username
    user = User.objects.get(username=username)
    doctor = Doctor.objects.get(id=int(doctorId))

    # Create the appointment and associate it with the doctor and user
    appointment = Appointment.objects.create(doctor=doctor, user=user, date=date, time=time, doctorName=doctor.name, doctorId=doctor.id)

    # Remove the booked time slot from the doctor's availability
    time_slot = TimeSlot.objects.filter(doctor=doctor, date=date, time=time).first()
    if time_slot:
        time_slot.delete()

    return Response({'message': 'Booking confirmed successfully'}, status=status.HTTP_201_CREATED)


# views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Appointment
from .serializers import AppointmentSerializer

class UserAppointmentsAPIView(APIView):
    def get(self, request):
        # Retrieve username from query parameters
        username = request.query_params.get('username', None)
        if username is None:
            return Response({'error': 'Username not provided'}, status=status.HTTP_400_BAD_REQUEST)

        # Retrieve user's appointments based on username
        appointments = Appointment.objects.filter(user__username=username)

        # Serialize appointments data
        serializer = AppointmentSerializer(appointments, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK) 
    

# views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Appointment

@api_view(['POST'])
def join_appointment(request, appointment_id):
    try:
        appointmentId = int(request.data.get('appointmentId'))
        # Retrieve the appointment based on the provided appointment ID
        appointment = Appointment.objects.get(id=appointmentId)
        # Set joined to True
        appointment.joined = True
        appointment.save()
        return Response({'message': 'Appointment joined successfully'}, status=status.HTTP_200_OK)
    except Appointment.DoesNotExist:
        return Response({'error': 'Appointment not found'}, status=status.HTTP_404_NOT_FOUND)



