import React, { useContext } from 'react';
import { Flex, Divider, Button, Box, useDisclosure } from '@chakra-ui/react';
import DestinationInput from './DestinationInput';
import LocationInput from './LocationInput';
import { MapContext } from './MapContext';

export default function SearchBar() {
  const { calculateRoute, clearRoute, hasTouchScreen, waitingOnRoute } =
    useContext(MapContext);

  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <>
      {/* DESKTOP VERSION */}
      {!hasTouchScreen ? (
        <Flex width="fit-content" mr="0px">
          <Flex
            style={{
              width: 'fit-content',
              border: 'solid 1px orangered',
              borderRadius: '20px',
              backgroundColor: 'white',
              zIndex: 1,
              height: '41px',
              overflow: 'visible',
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
            <Flex>
              <DestinationInput
                style={{
                  zIndex: 2,
                }}
              />
              <Box
                flexShrink="0"
                display="flex"
                alignItems="center"
                border="solid 3px white"
                borderRadius="20px"
              >
                <Button
                  color="white"
                  border="solid 1px orangered"
                  bg="orange"
                  borderRadius="20px"
                  h="100%"
                  _hover={{ bg: 'orangered' }}
                  onClick={calculateRoute}
                  padding="10px"
                  isLoading={waitingOnRoute}
                >
                  GO
                </Button>
              </Box>
            </Flex>
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
        <Flex width="90vw" mr="0px">
          <Flex
            flexDirection="column"
            paddingLeft="15px"
            paddingRight="15px"
            style={{
              width: '100%',
              border: 'solid 1px orangered',
              borderRadius: '20px',
              backgroundColor: 'white',
              zIndex: 1,
              height: 'fit-content',
              overflow: 'visible',
            }}
          >
            <LocationInput
              style={{
                border: 'solid 1px orangered',
                borderRadius: '20px',
                backgroundColor: 'white',
              }}
            />
            <Divider orientation="horizontal" />
            <Flex justifyContent="space-between">
              <DestinationInput
                style={{
                  zIndex: 2,
                }}
              />
            </Flex>
          </Flex>
          <Flex
            marginLeft="5px"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box
              flexShrink="0"
              display="flex"
              alignItems="center"
              borderRadius="20px"
            >
              <Button
                color="white"
                border="solid 1px orangered"
                bg="orange"
                borderRadius="20px"
                h="100%"
                w="30px"
                fontSize="14px"
                _hover={{ bg: 'orange' }}
                onClick={calculateRoute}
                padding="8px"
                isLoading={waitingOnRoute}
              >
                GO
              </Button>
            </Box>
            <Box
              flexShrink="0"
              display="flex"
              alignItems="center"
              borderRadius="20px"
            >
              <Button
                color="white"
                border="solid 1px orangered"
                bg="orangered"
                borderRadius="20px"
                h="100%"
                fontSize="15px"
                _hover={{ bg: 'orangered' }}
                onClick={clearRoute}
                padding="8px"
              >
                X
              </Button>
            </Box>
          </Flex>
        </Flex>
      )}
    </>
  );
}
