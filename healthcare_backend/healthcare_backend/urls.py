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
from healthcare.views import book_appointment

urlpatterns = [
    path('api/book_appointment/<int:doctor_id>/', book_appointment, name='book_appointment'),
    path('api/register/', register, name='register'),
    path('api/login/', custom_login, name='login'),
    path('api/check_session/', check_session, name='check_session'),
    path('api/<int:doctor_id>/', get_doctor, name='get_doctor'),
    path('api/doctors/', doctors_list, name='doctor-list'),
]