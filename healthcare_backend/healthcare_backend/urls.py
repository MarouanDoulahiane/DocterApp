# healthcare_backend/urls.py

from django.contrib import admin
from django.urls import path, include
# include register URL pattern from healthcare app
from healthcare.views import register
from healthcare.views import custom_login
from healthcare.views import check_session
from healthcare.views import DoctorListAPIView
from healthcare.views import doctors_list
from healthcare.views import get_doctor
from healthcare.views import confirm_booking
from healthcare.views import UserAppointmentsAPIView
from healthcare.views import join_appointment
from healthcare.views import add_slot_back
from healthcare.views import end_slot

urlpatterns = [
    path('api/appointments/<int:appointmentId>/', end_slot, name='end_slot'),
    path('api/doctors/<int:doctor_id>/slots/add/', add_slot_back, name='add_slot_back'),
    path('api/appointments/<int:appointment_id>/join/', join_appointment, name='join_appointment'),
    path('api/user/appointments/', UserAppointmentsAPIView.as_view(), name='user_appointments'),
    path('api/book/<int:doctor_id>/', confirm_booking, name='confirm_booking'),
    path('api/register/', register, name='register'),
    path('api/login/', custom_login, name='login'),
    path('api/check_session/', check_session, name='check_session'),
    path('api/<int:doctor_id>/', get_doctor, name='get_doctor'),
    path('api/doctors/', doctors_list, name='doctor-list'),
]