import { React, useState } from 'react';
import { Button } from '@chakra-ui/react';

export default function LocationButton({ getPosition }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Button
      size="auto"
      mr="10px"
      onClick={getPosition}
      style={{ backgroundColor: 'white', borderRadius: '20px' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered ? (
        <img src="/images/location-hover.png" alt="location" />
      ) : (
        <img src="/images/location-not-hover.png" alt="location" />
      )}
    </Button>
  );
}
