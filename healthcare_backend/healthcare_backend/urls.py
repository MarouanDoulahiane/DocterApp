# healthcare_backend/urls.py

from django.contrib import admin
from django.urls import path, include
# include register URL pattern from healthcare app
from healthcare.views import register
from healthcare.views import custom_login
from healthcare.views import check_session
from healthcare.views import DoctorListAPIView
from healthcare.views import doctors_list

urlpatterns = [
    path('api/register/', register, name='register'),
    path('api/login/', custom_login, name='login'),
    path('api/check_session/', check_session, name='check_session'),
    path('api/doctors/', doctors_list, name='doctor-list'),
]