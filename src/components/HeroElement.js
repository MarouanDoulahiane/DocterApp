// Let's create a new component called HeroElement.js in the components folder. This component will contain the hero element of our application.

import React from 'react';
import { Link } from 'react-router-dom';

const HeroElement = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-6">Welcome to Healthcare Consultation</h1>
                <div className="space-x-4">
                    <Link to="/login">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Login
                        </button>
                    </Link>
                    <Link to="/register">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Register
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HeroElement;