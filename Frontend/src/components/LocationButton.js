import { React, useState } from 'react';
import { Button, Tooltip } from '@chakra-ui/react';

export default function LocationButton({ getPosition }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Tooltip label="Set Geolocation" placement="bottom">
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
    </Tooltip>
  );
}
