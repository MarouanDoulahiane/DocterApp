// src/components/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import HeroElement from './HeroElement';
import Testimonials from './Testimonials';
import SearchBar from './SearchBar';

const HomePage = () => {
    return (
        <div className='h-screen bg-gradient-to-r from-[#E7F0FF] to-[#E8F1FF]'>
            <NavBar />
            <div className="container mx-auto">
                <HeroElement />
                <SearchBar />
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
