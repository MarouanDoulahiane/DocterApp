# healthcare_backend/urls.py

from django.contrib import admin
from django.urls import path, include
# include register URL pattern from healthcare app
from healthcare.views import register
from healthcare.views import login
from healthcare.views import DoctorListAPIView
from healthcare.views import doctors_list

urlpatterns = [
    path('api/register/', register, name='register'),
    path('api/login/', login, name='login'),
    path('api/doctors/', doctors_list, name='doctor-list'),
]