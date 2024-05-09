// Let's create a new component called NavBar.js in the components folder. This component will contain the navigation bar of our application.

// // NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-white font-semibold text-lg">Doctor App</Link>
            <div>
            <Link to="/doctors" className="text-white hover:text-blue-200 ml-4">Doctors</Link>
            <Link to="/appointments" className="text-white hover:text-blue-200 ml-4">Appointments</Link>
            </div>
        </div>
        </nav>
    );
};

export default NavBar;