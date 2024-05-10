// src/components/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import HeroElement from './HeroElement';
import Testimonials from './Testimonials';
import SearchBar from './SearchBar';

const HomePage = () => {
    return (
        <div className='h-screen bg-gradient-to-r from-[#E8F1FF] to-[#FFFFFF]'>
            <NavBar />
            <div className="container mx-auto">
                <HeroElement />
                <SearchBar />
            </div>
        </div>
    );
};

export default HomePage;
