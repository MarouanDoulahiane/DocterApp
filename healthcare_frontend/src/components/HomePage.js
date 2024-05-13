import React, { useState, useEffect } from 'react';
import HeroElement from './HeroElement';

const HomePage = () => {


const [minHeight, setMinHeight] = useState(0);

  useEffect(() => {
    const updateMinHeight = () => {
      const windowHeight = window.innerHeight;
      const footerHeight = 72 + 60; // Assuming the footer has a fixed height of 50 pixels
      const newMinHeight = windowHeight - footerHeight;
      setMinHeight(newMinHeight);
    };

    updateMinHeight();
    window.addEventListener('resize', updateMinHeight);

    return () => {
      window.removeEventListener('resize', updateMinHeight);
    };
  }, []);
    return (
        <div className='h-full bg-gradient-to-r from-[#E7F0FF] to-[#E8F1FF]' style={{ minHeight: `${minHeight}px` }}>
            <div className="container mx-auto">
                <HeroElement />
            </div>
            
        </div>
    );
};

export default HomePage;