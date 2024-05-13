# healthcare_backend/management/commands/populate_fake_data.py

from django.core.management.base import BaseCommand
from faker import Faker
from healthcare.models import Doctor, TimeSlot
import random

class Command(BaseCommand):
    help = 'Populate fake data for doctors and time slots'

    def handle(self, *args, **kwargs):
        fake = Faker()

        # Generate fake doctors
        for _ in range(25):  # Adjust the range as needed
            doctor = Doctor(
                name=fake.name(),
                specialty=fake.random_element(elements=('Cardiology', 'Dermatology', 'Endocrinology', 'Gastroenterology', 'Hematology', 'Nephrology', 'Neurology', 'Oncology', 'Ophthalmology', 'Orthopedics')),
                address=fake.street_address(),
                city=fake.city(),
                payment=fake.random_element(elements=('Cash', 'Credit Card', 'Debit Card')),
                image=fake.image_url()
            )
            doctor.save()

        # Generate fake time slots for each doctor
        for doctor in Doctor.objects.all():
            for _ in range(random.randint(2, 5)):  # Adjust the range as needed
                TimeSlot(
                    doctor=doctor,
                    date=fake.date_between(start_date='today', end_date='+7d'),
                    time=fake.time()
                ).save()

        self.stdout.write(self.style.SUCCESS('Successfully populated fake data'))
