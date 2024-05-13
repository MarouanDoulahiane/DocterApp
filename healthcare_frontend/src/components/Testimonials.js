import React from 'react';

const Testimonials = () => {
    return (
        <div className="flex flex-col justify-center items-center md:flex-row md:w-1/2 md:mt-8 md:ml-auto">
            <h3 className="text-2xl font-semibold mb-4">Testimonials</h3>
            <div className="border-t border-b border-gray-300 py-4 px-8">
                <p className="text-gray-800 italic">"I received prompt and professional service. Highly recommended!"</p>
                <p className="text-gray-500 mt-2">- John Doe</p>
            </div>
            <div className="border-t border-b border-gray-300 py-4 px-8 mt-4">
                <p className="text-gray-800 italic">"The platform is easy to use and the doctors are very knowledgeable."</p>
                <p className="text-gray-500 mt-2">- Jane Smith</p>
            </div>
        </div>
    );
}

export default Testimonials;