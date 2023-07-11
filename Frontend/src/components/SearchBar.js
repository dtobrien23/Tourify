import React, { useContext } from 'react';
import { Flex, Divider, Button, Box } from '@chakra-ui/react';
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
    <Flex mr="0px">
      <Flex
        style={{
          width: 'fit-content',
          border: 'solid 1px orangered',
          borderRadius: '20px',
          backgroundColor: 'white',
          zIndex: 1,
          height: '41px',
          overflow: 'hidden',
        }}
      >
        <LocationInput
          style={{
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
        <Box ml="5px" display="flex" alignItems="center">
          <Button
            bg="#ff914d"
            color="white"
            border="solid 1px orangered"
            borderRight="0px"
            borderRadius="19px"
            _hover={{ bg: 'orangered' }}
            onClick={calculateRoute}
            px="1em"
            height="calc(100% + 2px)"
            padding="10px"
          >
            GO
          </Button>
        </Box>
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
