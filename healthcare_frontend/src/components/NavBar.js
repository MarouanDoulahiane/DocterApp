// NavBar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the session ID from local storage
        localStorage.removeItem('sessionId');
        // Redirect to the login page
        navigate('/');
    };

    // Check if the user is logged in
    const isLoggedIn = !!localStorage.getItem('sessionId');

    return (
        <nav className="bg-blue-500 p-4 w-[100%]">
            <div className="container px-4 mx-auto flex justify-between items-center">
                <Link to="/" className="text-white font-semibold text-lg">Doctor App</Link>
                <div>
                    <Link to="/doctors" className="text-white hover:text-blue-200 ml-4">Doctors</Link>
                    <Link to="/appointments" className="text-white hover:text-blue-200 ml-4">Appointments</Link>
                    {/* Conditional rendering of logout button */}
                    {isLoggedIn && <button className="text-white hover:text-blue-200 ml-4" onClick={handleLogout}>Logout</button>}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
