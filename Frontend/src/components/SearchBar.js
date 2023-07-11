import React, { useContext } from 'react';
import {
  Flex,
  Divider,
  Button,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
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
    isMobile,
  } = useContext(MapContext);

  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <>
      {!isMobile ? (
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
      ) : (
        // <Flex mr="0px">

        <Popover>
          <PopoverTrigger>
            <Flex
              style={{
                width: '90vw',
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
              <Box ml="5px" display="flex" alignItems="center">
                <Button
                  onClick={onToggle}
                  bg="#ff914d"
                  color="white"
                  border="solid 1px orangered"
                  borderRight="0px"
                  borderRadius="19px"
                  _hover={{ bg: 'orangered' }}
                  px="1em"
                  height="calc(100% + 2px)"
                  padding="10px"
                >
                  NEXT
                </Button>
              </Box>
            </Flex>
          </PopoverTrigger>
          <PopoverContent
            border="solid 1px orangered"
            borderRadius="20px"
            zIndex={2}
            w="90vw"
          >
            <PopoverCloseButton />
            <PopoverBody>
              <Flex>
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
            </PopoverBody>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
