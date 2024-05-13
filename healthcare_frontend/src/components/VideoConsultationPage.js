import axios from 'axios';
import React, { useState, useEffect, useRef, } from 'react';
import { useNavigate } from 'react-router-dom';

const VideoConsultationPage = () => {

    const navigate = useNavigate();
  const userVideoRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isJoiningCall, setIsJoiningCall] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userAppointments, setUserAppointments] = useState([]);
  const [showThankYou, setShowThankYou] = useState(false); // State to control the visibility of the Thank You popup


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

  const endAppointment = async () => {
    try {
        const appointmentId = window.location.pathname.split('/')[2];
        const appointment = userAppointments.find(appointment => appointment.id === parseInt(appointmentId));
      // Make a post request to end the appointment
      await axios.post(`http://localhost:8000/api/appointments/${appointmentId}/`, {
        date: appointment.date,
        time: appointment.time,
        doctorId: appointment.doctorId,
        username: localStorage.getItem('username')
      });
      setShowThankYou(true);

      // Wait for a few seconds before redirecting
      setTimeout(() => {
        // Redirect to the appointments page
        navigate('/appointments');
      }, 3000); // Adjust the delay time as needed
    } catch (error) {
      console.error('Error ending appointment:', error);
    }
  };

  useEffect(() => {
    const toggleCamera = async () => {
      if (isCameraOpen) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
          if (userVideoRef.current) {
            userVideoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera and microphone:', error);
        }
      } else {
        if (userVideoRef.current && userVideoRef.current.srcObject) {
          const stream = userVideoRef.current.srcObject;
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
          userVideoRef.current.srcObject = null;
        }
      }
    };

    toggleCamera();

    return () => {
      if (isCameraOpen && userVideoRef.current) {
        const stream = userVideoRef.current.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }
      }
    };
  }, [isCameraOpen]);

  const handleToggleCamera = () => {
    setIsCameraOpen(prevState => !prevState);
  };

  const handleJoinCall = () => {
    setIsJoiningCall(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsCameraOpen(true);
    }, 3000);
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
    <div className="bg-gradient-to-r from-[#E7F0FF] to-[#E8F1FF] min-h-screen flex flex-col justify-center items-center" style={{ minHeight: `${minHeight}px` }}>
      <div className="w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
        <div className="flex flex-col justify-center items-center p-8 rounded-lg bg-white shadow-lg mt-8">
          <h1 className="text-4xl font-semibold mb-8">Video Consultation</h1>
          {!isJoiningCall ? (
            <div className="mb-8 flex flex-col justify-center items-center">
              <img src="https://media.licdn.com/dms/image/D4E35AQGR5Crgd-Apgw/profile-framedphoto-shrink_400_400/0/1714239851076?e=1715896800&v=beta&t=t37pATUI_AEcg2Ca373uP-mCRfUq_bZy7IAHfAes1do" alt="Doctor" className="w-64 h-64 rounded-full shadow-lg mb-4" />
              <button onClick={handleJoinCall} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md">
                Join Call
              </button>
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-lg shadow-md w-full h-96 mb-8">
              <img src="https://media.licdn.com/dms/image/D4E35AQGR5Crgd-Apgw/profile-framedphoto-shrink_400_400/0/1714239851076?e=1715896800&v=beta&t=t37pATUI_AEcg2Ca373uP-mCRfUq_bZy7IAHfAes1do" alt="Doctor" className="object-cover w-full h-full" />
              <div className="absolute top-2 right-2 z-10 bg-white rounded-full shadow-lg">
                {isLoading ? (
                  <div className="w-40 bg-gray-200 animate-pulse rounded-full"></div>
                ) : (
                  <video ref={userVideoRef} autoPlay playsInline className="w-36 rounded-lg" />
                )}
              </div>
              <button className="absolute bottom-2 left-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 roundd-full" onClick={endAppointment}>
  End Call
</button>
            </div>
          )}
          {isLoading && (
            <div className="flex items-center justify-center">
              <div className="spinner-border mr-2"></div>
              <p className="text-lg font-semibold">Doctor is joining the call...</p>
            </div>
          )}
        </div>
      </div>
      {showThankYou && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Thank You!</h2>
            <p className="text-lg">Your appointment has ended successfully.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoConsultationPage;
