# In your app's management/commands/populate_fake_data.py

from django.core.management.base import BaseCommand
from faker import Faker
from healthcare.models import Doctor, TimeSlot
import random

class Command(BaseCommand):
    help = 'Populate fake data for doctors and time slots'

    def handle(self, *args, **kwargs):
        fake = Faker()
        for _ in range(10):  # Create 10 fake doctors
            doctor = Doctor.objects.create(
                name=fake.name(),
                specialty=fake.job(),
                address=fake.address(),
                city=fake.city(),
                payment=random.choice(['Cash', 'Credit Card']),
                image=fake.image_url()
            )
            for _ in range(5):  # Each doctor has 5 fake time slots
                TimeSlot.objects.create(
                    doctor=doctor,
                    date=fake.date_this_month(),
                    time=fake.time()
                )
        self.stdout.write(self.style.SUCCESS('Successfully populated fake data'))
