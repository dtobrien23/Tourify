import React from 'react';
import { Flex, Divider, Button } from '@chakra-ui/react';
import DestinationInput from './DestinationInput';
import LocationInput from './LocationInput';
import { GeolocationProvider } from './GeoContext';

export default function SearchBar({
  map,
  selectedAttraction,
  setSelectedAttraction,
  setSourceCoords,
  calculateRoute,
  clearRoute,
  locationMarker,
  setLocationMarker,
  setIsSourceAlertOpen,
}) {
  return (
    // <GeolocationProvider>
    <Flex>
      <Flex
        style={{
          width: 'fit-content',
          border: 'solid 2px orangered',
          borderRadius: '20px',
          backgroundColor: 'white',
          zIndex: 1,
          height: '38px',
        }}
      >
        <LocationInput
          map={map}
          setSourceCoords={setSourceCoords}
          locationMarker={locationMarker}
          setLocationMarker={setLocationMarker}
          setIsSourceAlertOpen={setIsSourceAlertOpen}
        />
        <Divider orientation="vertical" />
        <DestinationInput
          map={map}
          selectedAttraction={selectedAttraction}
          setSelectedAttraction={setSelectedAttraction}
          style={{ zIndex: 2 }}
        />
      </Flex>
      <Button
        ml={2}
        bg="green.400"
        color="white"
        border={'solid 2px white'}
        borderRadius={20}
        onClick={calculateRoute}
      >
        Tourify Me
      </Button>
      <Button
        ml={2}
        bg="red"
        color="white"
        border={'solid 2px white'}
        borderRadius={20}
        onClick={clearRoute}
      >
        X
      </Button>
    </Flex>
    // </GeolocationProvider>
  );
}
