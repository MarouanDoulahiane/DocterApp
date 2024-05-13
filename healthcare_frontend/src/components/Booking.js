import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useHistory
import axios from 'axios';

const Booking = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Retrieve doctor ID, date, and time from URL query parameters
  const doctorId = queryParams.get('doctorId');
  const date = queryParams.get('date');
  const time = queryParams.get('time');
  const username = queryParams.get('username');

  const history = useNavigate(); // Initialize useHistory

  // State to manage the visibility of the success popup
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/api/book/${doctorId}/`, {
        doctorId, // Include doctorId in the request body
        date,
        time,
        username,
      });
      // print the request and response
      console.log('Request:', response.config);
      console.log('Response:', response.data);
      // Show success popup
      setShowSuccessPopup(true);
      // Redirect to homepage after a delay
      setTimeout(() => {
        // redirect to the appointment page
        history('/appointments');
      }, 3000); // Adjust the delay as needed
    } catch (error) {
      console.error('Error confirming booking:', error);
      // Handle error
    }
  };
  const [minHeight, setMinHeight] = useState(0);

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

  return (
    <div className="container mx-auto p-12" style={{ minHeight: `${minHeight}px` }}>
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
  // if it's confirmed make the button say "Appointment Confirmed" otherwise "Book Appointment" and make it disabled if it's confirmed
  className={`px-4 py-2 bg-blue-500 text-white rounded-md ${doctorInfo && doctorInfo.confirmed ? "cursor-not-allowed" : "hover:bg-blue-600"}`}
  disabled={doctorInfo && doctorInfo.confirmed}
>
  {doctorInfo && doctorInfo.confirmed ? "Appointment Confirmed" : "Book Appointment"}
</button>

  </div>
            </form>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {/* Success popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-green-500 bg-opacity-75">
          <div className="bg-white rounded-lg p-8">
            <p className="text-green-700 font-semibold">Appointment Confirmed!</p>
            <p>You will be redirected to the Appointment page shortly.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
