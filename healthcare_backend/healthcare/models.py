# healthcare/models.py

from django.db import models

class User(models.Model):
    username = models.CharField(max_length=100, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    
    def __str__(self):
        return self.username


class Doctor(models.Model):
    name = models.CharField(max_length=100)
    specialty = models.CharField(max_length=100)
    address = models.CharField(max_length=200, default="")  # Default value set to an empty string
    city = models.CharField(max_length=100, default="")
    payment = models.CharField(max_length=100, default="")
    image = models.URLField(default="")

class TimeSlot(models.Model):
    doctor = models.ForeignKey(Doctor, related_name='time_slots', on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()



# healthcare/models.py

from django.db import models
from django.contrib.auth.models import User
from .models import Doctor

class Appointment(models.Model):
    user = models.ForeignKey(User, related_name='appointments', on_delete=models.CASCADE, null=True, blank=True)
    doctor = models.ForeignKey(Doctor, related_name='appointments', on_delete=models.CASCADE)
    doctorName = models.CharField(max_length=100, default="")
    doctorId = models.IntegerField(default=0)
    date = models.DateField()
    time = models.TimeField()
    additional_info = models.TextField(blank=True)
    joined = models.BooleanField(default=False)

    def __str__(self):
        return f"Appointment with {self.doctor.name} on {self.date} at {self.time}"

