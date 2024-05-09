// src/components/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import HeroElement from './HeroElement';

import '../index.css';

const HomePage = () => {
    return (
        <div>
            <NavBar />
            <HeroElement />
        </div>
    );
};

export default HomePage;
