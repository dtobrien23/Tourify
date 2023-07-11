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
    <Flex mr="15px">
      <Flex
        style={{
          width: 'fit-content',
          border: 'solid 1px orangered',
          borderRadius: '20px',
          // boxShadow: '1px 1px 5px 1px rgba(0, 0, 0, 0.2)',
          backgroundColor: 'white',
          zIndex: 1,
          height: '41px',
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
        <Button
          ml={1}
          w={50}
          bg="orangered"
          color="white"
          // border={'solid 2px white'}
          borderRadius={18}
          _hover={{ bg: 'orangered' }}
          onClick={calculateRoute}
        >
          GO
        </Button>
      </Flex>
      {/* <Button
        ml={1}
        w={50}
        bg="orangered"
        color="white"
        // border={'solid 2px white'}
        borderRadius={30}
        onClick={calculateRoute}
      >
        <img
          src="/images/navbar-icons/go-icon.png"
          alt="Go"
          style={{ fontSize: '30px' }}
        />
        GO
      </Button> */}
      <Button
        w="1px"
        bg="white"
        color="lightgrey"
        // border={'solid 2px white'}
        borderRadius={20}
        _hover={{ bg: 'white', color: 'orangered' }}
        onClick={clearRoute}
        fontWeight="bold"
        fontSize="lg"
        p={0}
        m={0}
      >
        X
      </Button>
    </Flex>
  );
}
