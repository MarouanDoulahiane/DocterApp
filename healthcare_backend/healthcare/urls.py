# healthcare_backend/healthcare/urls.py

from django.urls import path
from .views import register
from .views import DoctorListAPIView
from .views import doctors_list

urlpatterns = [
    path('api/register/', register, name='register'),
    # Add other URL patterns as needed
    path('doctors/', doctors_list, name='doctor-list'),
]
