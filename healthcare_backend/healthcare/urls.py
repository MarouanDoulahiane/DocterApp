# healthcare_backend/healthcare/urls.py

from django.urls import path
from .views import register
from .views import custom_login
from .views import check_session
from .views import DoctorListAPIView
from .views import doctors_list
from .views import get_doctor
from .views import confirm_booking
from .views import UserAppointmentsAPIView
from .views import join_appointment
from .views import add_slot_back
from .views import end_slot


urlpatterns = [
    path('api/appointments/<int:appointmentId>/', end_slot, name='end_slot'),
    path('api/doctors/<int:doctor_id>/slots/add/', add_slot_back, name='add_slot_back'),
    path('appointments/<int:appointment_id>/join/', join_appointment, name='join_appointment'),
    path('api/user/appointments/', UserAppointmentsAPIView.as_view(), name='user_appointments'),
    path('api/book/<int:doctor_id>/', confirm_booking, name='confirm_booking'),
    path('api/<int:doctor_id>/', get_doctor, name='get_doctor'),
    path('api/register/', register, name='register'),
    path('api/login/', custom_login, name='login'),
    path('api/check_session/', check_session, name='check_session'),
    # Add other URL patterns as needed
    path('doctors/', doctors_list, name='doctor-list'),
]
