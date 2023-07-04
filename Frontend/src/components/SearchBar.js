import React from 'react';
import { Flex, Divider, Button } from '@chakra-ui/react';
import DestinationInput from './DestinationInput';
import LocationInput from './LocationInput';

export default function SearchBar({ map }) {
  return (
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
        <LocationInput map={map} />
        <Divider orientation="vertical" />
        <DestinationInput map={map} style={{ zIndex: 2 }} />
      </Flex>
      <Button
        ml={2}
        bg="gold"
        color="white"
        border={'solid 2px orangered'}
        borderRadius={20}
      >
        Tourify Me
      </Button>
    </Flex>
  );
}
