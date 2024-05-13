import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DoctorListPage = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(5); // Number of doctors per page

  useEffect(() => {
    const sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      navigate('/register');
    } else {
      fetchDoctors();
    }
  }, [navigate]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/doctors/');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleBookAppointment = (doctorId, slot) => {
    const username = localStorage.getItem('username');
    navigate(`/booking?doctorId=${doctorId}&date=${slot.date}&time=${slot.time}&username=${username}`);
  };

  return (
    <div className="container mx-auto p-12">
      <ul className="grid grid-cols-1 gap-8">
        {currentDoctors.map((doctor) => (
          <li key={doctor.id} className="bg-white rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-6">
                <img src="https://media.licdn.com/dms/image/D4E35AQGR5Crgd-Apgw/profile-framedphoto-shrink_400_400/0/1714239851076?e=1715896800&v=beta&t=t37pATUI_AEcg2Ca373uP-mCRfUq_bZy7IAHfAes1do" alt={doctor.name} className="mx-auto rounded-full w-24 h-24" />
                <h2 className="text-xl font-semibold text-center mt-4">{doctor.name}</h2>
                <p className="text-gray-600 text-center mt-2">{doctor.specialty}</p>
                <div className="mt-4">
                  <div className="flex items-center justify-center">
                    <svg className="w-4 h-4 mr-1 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 0a1 1 0 0 1 1 1v8h8a1 1 0 1 1 0 2h-8v8a1 1 0 1 1-2 0v-8H1a1 1 0 0 1 0-2h8V1a1 1 0 0 1 1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-600">{doctor.address}, {doctor.city}</p>
                  </div>
                  <div className="flex items-center justify-center mt-2">
                    <svg className="w-4 h-4 mr-1 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M10 0a1 1 0 0 1 1 1v1a8 8 0 1 1-3.356 15.345l-1.524 3.805A1 1 0 0 1 5.21 21H4a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h1.189a1 1 0 0 1 .879.524l1.523 3.807A7.999 7.999 0 0 1 10 19a8 8 0 0 1 0-16zM4 14a6 6 0 1 0 12 0 6 6 0 0 0-12 0z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-600">{doctor.payment}</p>
                  </div>
                </div>
                {/* <div className="mt-6">
                  <a href={`/doctor/${doctor.id}`} className="block bg-blue-500 text-white rounded-md py-2 px-4 text-center font-semibold transition duration-300 hover:bg-blue-600">Prendre rendez-vous</a>
                </div> */}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Available Time Slots</h3>
                {doctor.time_slots && doctor.time_slots.length > 0 ? (
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Time</th>
                        <th className="px-4 py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {doctor.time_slots.map((slot, index) => (
                        <tr key={index} className="border-b border-gray-200">
                          <td className="px-4 py-2">{slot.date}</td>
                          <td className="px-4 py-2">{slot.time}</td>
                          <td className="px-4 py-2"><button onClick={() => handleBookAppointment(doctor.id, slot)} className="bg-blue-500 text-white rounded-md py-1 px-2 font-semibold hover:bg-blue-600">Book</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No available time slots</p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-center">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="mr-4 bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded"
        >
          Prev
        </button>
        {Array.from({ length: Math.ceil(doctors.length / doctorsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mx-2 py-2 px-4 rounded ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(doctors.length / doctorsPerPage)}
          className="ml-4 bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DoctorListPage;
