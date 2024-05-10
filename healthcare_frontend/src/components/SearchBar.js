// create a box for search input and button to search for a doctor

import React from 'react';
import { Link } from 'react-router-dom';


const SearchBar = () => {
    return (
        // we will add the search box here like in the doctolib website
        <form className="flex flex-col justify-center items-center md:flex-row md:w-1/2 md:mt-8 md:ml-auto">
            {/* search bar query */}
            <div className="border-t border-b border-gray-300 py-4 px-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
                <input type="text" placeholder="Search for a doctor" className="text-gray-800 italic" />
            </div>
            {/* search bar city and submet */}
            <div className="border-t border-b border-gray-300 py-4 px-8 mt-4">
                <input type="text" placeholder="City" className="text-gray-800 italic" />
                <button type="submit" className="text-gray-800 italic">Search</button>
            </div>
        </form>

    );
};

export default SearchBar;