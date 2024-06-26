import React from 'react';
import { Link } from 'react-router-dom';
import doctorsImage from '../images/doctors.png';

const Services = () => {
    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-[48px]">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Service 1 */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">24x7 Availability</h3>
                    <p className="text-gray-700 leading-relaxed">Connect with a specialist anytime, anywhere.</p>
                    <ul className="list-disc list-inside mt-4">
                        <li>Instant consultations</li>
                        <li>24/7 availability</li>
                        <li>Anywhere access</li>
                    </ul>
                </div>
                {/* Service 2 */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Video Consultation</h3>
                    <p className="text-gray-700 leading-relaxed">Have a face-to-face consultation with your doctor.</p>
                    <ul className="list-disc list-inside mt-4">
                        <li>Visual consultations</li>
                        <li>Secure connections</li>
                        <li>Easy to use</li>
                    </ul>
                </div>
                {/* Service 3 */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Specialist Doctors</h3>
                    <p className="text-gray-700 leading-relaxed">Choose from a wide range of specialist doctors.</p>
                    <ul className="list-disc list-inside mt-4">
                        <li>Expertise in various fields</li>
                        <li>Personalized treatment plans</li>
                        <li>Professional and caring</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}




const HeroElement = () => {
    return (
        <div className='h-full'>
            <div className="flex flex-col md:flex-row items-center justify-center lg:justify-between p-4 pt-8">
                {/* Hero Session */}
                <div className="flex flex-col lg:text-left lg:block justify-center items-center text-center lg:text-left lg:w-1/2">
                    <h2 className="text-3xl  text-gray-800 font-ligh lg:mb-4">Skip the travel! Take Online</h2>
                    <h1 className='text-6xl font-bold mb-4 lg:mb-6'>Doctor <span className='text-blue-500'>Consultation</span></h1>
                    <p className='text-center lg:text-left text-gray-800 text-lg font-light mb-6 lg:mb-16 md:w-[75%]'>Connect instantly with a 24x7 specialist or choose to video visit a particular doctor.</p>
                    <Link to='/register' className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md'>Consult Now</Link>
                </div>
                {/* Image */}
                <div className="hidden lg:block lg:w-[50%] flex justify-end">
                    <img src={doctorsImage} alt="Doctors" className="w-full rounded-lg" /> {/* Apply Tailwind CSS classes for styling */}
                </div>
            </div>
            <Services />
        </div>
    );
}

export default HeroElement;