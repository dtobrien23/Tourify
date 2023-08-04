import { React, useState, useContext } from 'react';
import { Button, Tooltip, CircularProgress, useConst } from '@chakra-ui/react';
import { MapContext } from './MapContext';
import { FaLocationArrow } from 'react-icons/fa';

export default function LocationButton({
  getPosition,
  waitingOnLocation,
  currentLocation,
}) {
  const { geolocation, isHovered, setIsHovered } = useContext(MapContext);

  // const handleMouseEnter = () => {
  //   setIsHovered(true);
  // };

  // const handleMouseLeave = () => {
  //   setIsHovered(false);
  // };

  return (
    <>
      {waitingOnLocation === true ? (
        <CircularProgress
          isIndeterminate
          color="orange.400"
          size="20px"
          mr="7px"
        />
      ) : (
        <Tooltip label="Set Geolocation" placement="bottom">
          <Button
            size="auto"
            mr="10px"
            onClick={getPosition}
            style={{ backgroundColor: 'white', borderRadius: '20px' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <FaLocationArrow
              color={
                isHovered || (currentLocation && geolocation)
                  ? 'orangered'
                  : '#b5bbc6'
              }
            />
          </Button>
        </Tooltip>
      )}
    </>
  );
}
