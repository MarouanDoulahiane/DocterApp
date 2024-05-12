// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import RegistrationPage from './components/RegistrationPage';
import LoginPage from './components/LoginPage';
import DoctorListPage from './components/DoctorListPage';
import { AuthProvider } from './AuthContext'; // Import the AuthProvider
import './index.css'; 
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Booking from './components/Booking';
import AppointmentsPage from './components/Appointments';

function App() {
    return (
        <AuthProvider> {/* Wrap the App with AuthProvider */}
            <div className='min-h-screen bg-gradient-to-r from-[#E7F0FF] to-[#E8F1FF]'>
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/doctors" element={<DoctorListPage />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/appointments" element={<AppointmentsPage />} />
                </Routes>
                <Footer style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} />
            </Router>
            </div>
        </AuthProvider>
    );
}

export default App;
