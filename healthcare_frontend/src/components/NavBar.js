// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="bg-blue-500 p-4 w-[100%]">
            <div className="container px-4 mx-auto flex justify-between items-center">
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
