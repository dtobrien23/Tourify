import React, { useState, useEffect, useRef } from 'react';
import Joyride from 'react-joyride';
import NavBar from './NavBar'; // Import the NavBar component

const ProductTour = () => {
  const [isTourRunning, setIsTourRunning] = useState(true);

  // Create a ref for the NavBar component
  const navbarRef = useRef(null);

  const tourSteps = [
    {
      target: navbarRef, // Set the target to the NavBar component
      content: 'Step 1: Welcome to our website! This is the first step of the tutorial.',
      placement: 'center',
    },
    {
      content: "Step 2: Here's how you can use feature XYZ.",
      placement: 'center',
    },
    {
      content: 'Step 3: And here is another feature ABC explained.',
      placement: 'center',
    },  ];

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    if (!hasVisitedBefore) {
      setIsTourRunning(true);
      localStorage.setItem('hasVisitedBefore', 'true');
    } else {
      setIsTourRunning(false);
    }
  }, []);

  return (
    <>
      {/* Use the LocationInput component here */}
      <NavBar ref={navbarRef} /> {/* Attach the ref to the NavBar component */}
      <Joyride
        continuous
        run={isTourRunning}
        steps={tourSteps}
        callback={(data) => {
          // You can handle tour events here if needed
          console.log(data);
        }}
      />
    </>
  );
};

export default ProductTour;
