import { React, useState, useContext } from 'react';
import { Button, Tooltip, CircularProgress, Flex } from '@chakra-ui/react';
import { MapContext } from './MapContext';
import { FaLocationArrow } from 'react-icons/fa';

export default function LocationButton({
  getPosition,
  waitingOnLocation,
  currentLocation,
}) {
  const { geolocation, isHovered, setIsHovered, hasTouchScreen } =
    useContext(MapContext);

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
          <Flex h="fit-content" w="fit-content">
            <Button
              size="auto"
              mr={!hasTouchScreen ? '10px' : '6px'}
              onClick={getPosition}
              style={{ backgroundColor: 'white' }}
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
          </Flex>
        </Tooltip>
      )}
    </>
  );
}
