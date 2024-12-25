import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Splash Screen component
const SplashScreen = () => {
  const [progress, setProgress] = useState(0);
  const [showLoading, setShowLoading] = useState(false); // Control loading animation start

  useEffect(() => {
    // Disable scrolling when splash screen is active
    document.body.style.overflow = progress !== 100 ? 'hidden' : 'auto';

    // Delay the loading animation start by 5 seconds
    const timeout = setTimeout(() => {
      setShowLoading(true); // Show loading animation after 2 seconds
    }, 1000);
    
    // Start progress update
    const interval = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + 10 : 100));
    }, 500); // Update every 500ms

    return () => {
      clearInterval(interval);
      clearTimeout(timeout); // Clean up on unmount
      document.body.style.overflow = 'auto'; // Re-enable scrolling when done
    };
  }, [progress]);

  return (
    <>
      {progress !== 100 && (
        <div className="fixed top-0 left-0 bg-[#FFCB0C] z-[100] text-white h-screen w-screen">
          <BackgroundImages />
          {showLoading && <LoadingScreen />} {/* Show loading animation after delay */}
        </div>
      )}
    </>
  );
};

// Background images component for the splash screen
const BackgroundImages = () => (
  <div className="w-full">
    <img src="/assets/images/splash-bg.png" className="absolute h-screen w-full object-fit z-[-1]" alt="Splash Background" />

  </div>
);

// Loading screen with falling images
const LoadingScreen = () => {
  
  return (
    <div className="fixed top-0 left-0 h-screen w-screen z-[100]">
      
    </div>
  );
};

export default SplashScreen;