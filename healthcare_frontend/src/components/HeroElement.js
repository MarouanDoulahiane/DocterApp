import React from 'react';
import { Link } from 'react-router-dom';
import doctorsImage from '../images/doctors.png';

const HeroElement = () => {
    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between p-4 mt-16">
                {/* Hero Session */}
                <div className="text-center md:text-left md:w-1/2">
                    <h2 className="text-3xl font-bold text-gray-800 font-light ">Skip the travel! Take Online</h2>
                    <h1 className='text-6xl font-bold mb-4'>Doctor <span className='text-blue-500'>Consultation</span></h1>
                    <p className='text-gray-800 text-lg font-light mb-6 md:w-[75%]'>Connect instantly with a 24x7 specialist or choose to video visit a particular doctor.</p>
                    <Link to='/consult' className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md'>Consult Now</Link>
                </div>
                {/* Image */}
                <div className="hidden md:block md:w-[50%] flex justify-end">
                    <img src={doctorsImage} alt="Doctors" className="w-full rounded-lg" /> {/* Apply Tailwind CSS classes for styling */}
                </div>
            </div>
        </>
    );
}

export default HeroElement;