# Generated by Django 4.2.13 on 2024-05-12 23:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('healthcare', '0009_appointment_joined'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='doctorId',
            field=models.IntegerField(default=0),
        ),
    ]
