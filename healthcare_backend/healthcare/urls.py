# healthcare_backend/healthcare/urls.py

from django.urls import path
from .views import register
from .views import custom_login
from .views import check_session
from .views import DoctorListAPIView
from .views import doctors_list

urlpatterns = [
    path('api/register/', register, name='register'),
    path('api/login/', custom_login, name='login'),
    path('api/check_session/', check_session, name='check_session'),
    # Add other URL patterns as needed
    path('doctors/', doctors_list, name='doctor-list'),
]
