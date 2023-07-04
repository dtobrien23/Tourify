import React from 'react';
import { Flex, Divider } from '@chakra-ui/react';
import DestinationInput from './DestinationInput';
import LocationInput from './LocationInput';
import { GeolocationProvider } from './GeoContext';


export default function SearchBar({ map }) {
  return (
    <GeolocationProvider>
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
      <DestinationInput map={map} style={{ zIndex: 2 }} />
      <Divider orientation="vertical" />
      <LocationInput map={map} />
    </Flex>
    </GeolocationProvider>
  );
}
