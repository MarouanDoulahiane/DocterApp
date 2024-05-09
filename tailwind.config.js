// DoctorListPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/DoctorListPage.css'; // Import CSS file for styling

const DoctorListPage = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/doctors/');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleBookAppointment = (doctorId, slot) => {
    // Implement booking logic here
    console.log('Book appointment:', `Doctor ID: ${doctorId}, Slot: ${slot}`);
  };

  return (
    <div className="doctor-list-container">
      <h1 className="doctor-list-heading">Doctors List</h1>
      <div className="doctor-list">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            {/* <h2 className="doctor-name">{doctor.name}</h2>
            <p className="doctor-specialty"><strong>Specialty:</strong> {doctor.specialty}</p> */}
            <div className="doctor-info">
              <img src={doctor.image} alt={doctor.name} className="doctor-image" />
              <div className="doctor-details">
                <h2 className="doctor-name">{doctor.name}</h2>
                <p className="doctor-specialty"><strong>Specialty:</strong> {doctor.specialty}</p>
              </div>
            </div>
            <div className="availability">
              <h3 className="availability-heading">Availability</h3>
              <ul className="availability-slots">
                {doctor.availability.map((day) => (
                  <li key={day.date} className="availability-day">
                    <strong>{day.day}, {day.date}</strong>
                    <ul className="slots-list">
                      {day.slots.map((slot) => (
                        <li key={slot} className="slot">
                          <span>{slot}</span>
                          <button className="book-button" onClick={() => handleBookAppointment(doctor.id, slot)}>Book</button>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorListPage;
