import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AppointmentsPage = () => {
  const history = useNavigate();
  const [userAppointments, setUserAppointments] = useState([]);
  const [minHeight, setMinHeight] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem('username');
        if (!username) {
          console.error('Username not found in localStorage');
          return;
        }
        const response = await axios.get(`http://localhost:8000/api/user/appointments/?username=${username}`);
        const appointments = response.data;

        // Update joined status from local storage
        const updatedAppointments = appointments.map(appointment => {
          const joined = localStorage.getItem(`appointment-${appointment.id}-joined`);
          return joined === 'true' ? { ...appointment, joined: true } : appointment;
        });

        setUserAppointments(updatedAppointments);
      } catch (error) {
        console.error('Error fetching user appointments:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const updateMinHeight = () => {
      const windowHeight = window.innerHeight;
      const footerHeight = 72 + 60; // Assuming the footer has a fixed height of 50 pixels
      const newMinHeight = windowHeight - footerHeight;
      setMinHeight(newMinHeight);
    };

    updateMinHeight();
    window.addEventListener('resize', updateMinHeight);

    return () => {
      window.removeEventListener('resize', updateMinHeight);
    };
  }, []);

  const handleRemoveAppointment = async (appointmentId) => {
    try {
      const appointment = userAppointments.find(appointment => appointment.id === appointmentId);
      await axios.post(`http://localhost:8000/api/doctors/${appointment.doctorId}/slots/add/`, {
        date: appointment.date,
        time: appointment.time,
        doctorId: appointment.doctorId,
        username: localStorage.getItem('username')
      });

      // Update userAppointments to remove the deleted appointment
      setUserAppointments(prevAppointments =>
        prevAppointments.filter(appointment => appointment.id !== appointmentId)
      );

    } catch (error) {
      console.error('Error removing appointment:', error);
    }
  };

  const handleJoinAppointment = async (appointmentId) => {
    try {
      // Send request to join appointment by ID
      await axios.post(`http://localhost:8000/api/appointments/${appointmentId}/join/`, {
        appointmentId,
        username: localStorage.getItem('username')
      });
      // Update the joined status locally and in localStorage
      setUserAppointments(prevAppointments =>
        prevAppointments.map(appointment =>
          appointment.id === appointmentId ? { ...appointment, joined: true } : appointment
        )
      );
      // Update joined status in local storage
      localStorage.setItem(`appointment-${appointmentId}-joined`, 'true');

      // Redirect to video call page with appointment ID
      history(`/video/${appointmentId}`);
    } catch (error) {
      console.error('Error joining appointment:', error);
    }
  };

  return (
    <div className="container mx-auto p-12" style={{ minHeight: `${minHeight}px` }}>
      <h1 className="text-2xl font-semibold mb-6">Your Appointments</h1>
      {userAppointments.length > 0 ? (
        <ul className="grid grid-cols-1 gap-8">
          {userAppointments.map(appointment => (
            <li key={appointment.id} className="bg-white rounded-lg shadow-md p-6 flex justify-between items-center">
              <div className="flex flex-row items-center">
                <div className="mr-4">
                  <p className="text-lg font-semibold">Dr. {appointment.doctorName}</p>
                  <p className="text-sm text-gray-600">Date: {appointment.date} - Time: {appointment.time}</p>
                </div>
              </div>
              <div>
                <button className="bg-red-500 text-white py-2 px-4 rounded mr-2" onClick={() => handleRemoveAppointment(appointment.id)}>Remove</button>
                {!appointment.joined ? (
                  <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => handleJoinAppointment(appointment.id)}>Join</button>
                ) : (
                  <button className="bg-green-500 text-white py-2 px-4 rounded" onClick={() => handleJoinAppointment(appointment.id)}>Joined</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No appointments booked yet.</p>
      )}
    </div>
  );
};

export default AppointmentsPage;
