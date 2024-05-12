import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Booking = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Retrieve doctor ID, date, and time from URL query parameters
  const doctorId = queryParams.get('doctorId');
  const date = queryParams.get('date');
  const time = queryParams.get('time');

  // State to store doctor's information
  const [doctorInfo, setDoctorInfo] = useState(null);

  useEffect(() => {
    // Fetch doctor's information using the doctor ID
    const fetchDoctorInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/${doctorId}`);
        setDoctorInfo(response.data);
      } catch (error) {
        console.error('Error fetching doctor information:', error);
      }
    };

    fetchDoctorInfo();
  }, [doctorId]);

  // Form state for user details
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    additionalInfo: ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  // booking.js

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/api/book_appointment/${doctorId}/`, {
        date,
        time,
        userDetails: formData
      });
      console.log('Appointment booked:', response.data);
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        additionalInfo: ''
      });
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };
  
  

  return (
    <div className="container mx-auto p-12">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Booking Details</h1>
        {doctorInfo ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Doctor Information</h2>
            <p>Name: {doctorInfo.name}</p>
            <p>Specialty: {doctorInfo.specialty}</p>
            <p>Address: {doctorInfo.address}, {doctorInfo.city}</p>
            <hr className="my-6" />
            <form onSubmit={handleSubmit}>
  {/* Name Input */}
  <div className="mb-4">
    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
    <input
      type="text"
      id="name"
      name="name"
      value={formData.name}
      onChange={handleChange}
      className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
      required
    />
  </div>

  {/* Email Input */}
  <div className="mb-4">
    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
    <input
      type="email"
      id="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
      required
    />
  </div>

  {/* Phone Number Input */}
  <div className="mb-4">
    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
    <input
      type="tel"
      id="phoneNumber"
      name="phoneNumber"
      value={formData.phoneNumber}
      onChange={handleChange}
      className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
      required
    />
  </div>

  {/* Additional Info Input */}
  <div className="mb-4">
    <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">Additional Information (Optional)</label>
    <textarea
      id="additionalInfo"
      name="additionalInfo"
      value={formData.additionalInfo}
      onChange={handleChange}
      className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
      rows="4"
    ></textarea>
  </div>

  {/* Submit Button */}
  <div className="flex justify-end">
    <button
      type="submit"
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
    >
      Book Appointment
    </button>
  </div>
</form>

          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Booking;
