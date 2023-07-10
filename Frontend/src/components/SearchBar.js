import React, { useContext } from 'react';
import { Flex, Divider, Button } from '@chakra-ui/react';
import DestinationInput from './DestinationInput';
import LocationInput from './LocationInput';
import { MapContext } from './MapContext';

export default function SearchBar() {
  const {
    map,
    selectedAttraction,
    setSelectedAttraction,
    setSourceCoords,
    calculateRoute,
    clearRoute,
    locationMarker,
    setLocationMarker,
    setShowSourceErrorComponent,
    onOpen,
  } = useContext(MapContext);

  return (
    <Flex
      mb={3}
      style={{
        width: 'fit-content',
        // border: 'solid 2px white',
        borderRadius: '20px',
        backgroundColor: 'white',
        boxShadow: '1px 1px 5px 1px rgba(0, 0, 0, 0.6)',
        zIndex: 1,
      }}
    >
      <Flex
        style={{
          width: 'fit-content',
          border: 'solid 2px orangered',
          borderRadius: '20px',
          // boxShadow: '1px 1px 5px 1px rgba(0, 0, 0, 0.2)',
          backgroundColor: 'white',
          zIndex: 1,
          height: '40px',
        }}
      >
        <LocationInput
          style={{
            // width: 'fit-content',
            border: 'solid 1px orangered',
            borderRadius: '20px',
            backgroundColor: 'white',
          }}
        />
        <Divider orientation="vertical" />
        <DestinationInput
          style={{
            zIndex: 2,
          }}
        />
      </Flex>
      <Button
        ml={1}
        w={50}
        bg="green.400"
        color="white"
        border={'solid 2px white'}
        borderRadius={30}
        onClick={calculateRoute}
      >
        <img src="/images/go-icon.png" alt="Go" />
      </Button>
      <Button
        ml={1}
        w={50}
        bg="red"
        color="white"
        border={'solid 2px white'}
        borderRadius={20}
        onClick={clearRoute}
        fontWeight="bold"
      >
        X
      </Button>
    </Flex>
  );
}
