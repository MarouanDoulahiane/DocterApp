# healthcare_backend/healthcare/urls.py

from django.urls import path
from .views import register
from .views import custom_login
from .views import check_session
from .views import DoctorListAPIView
from .views import doctors_list
from .views import get_doctor
from .views import book_appointment

urlpatterns = [
    path('api/book_appointment/<int:doctor_id>/', book_appointment, name='book_appointment'),
    path('api/<int:doctor_id>/', get_doctor, name='get_doctor'),
    path('api/register/', register, name='register'),
    path('api/login/', custom_login, name='login'),
    path('api/check_session/', check_session, name='check_session'),
    # Add other URL patterns as needed
    path('doctors/', doctors_list, name='doctor-list'),
]
