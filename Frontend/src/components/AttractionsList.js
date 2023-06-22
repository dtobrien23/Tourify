import React from 'react';
import attractions from '../data/attractions.json';
import {
  Box,
  Flex,
  Heading,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  SimpleGrid,
} from '@chakra-ui/react';

function Attraction({ name, address, openingHours, link, image, isMobile }) {
  return (
    <Flex
      mb={8}
      border="1px"
      borderRadius="20px"
      borderColor="orangered"
      bg="white"
      justify="center"
      align="center"
      w="80%"
    >
      {' '}
      {!isMobile ? (
        <>
          <Box flex="1">
            <img
              src={image}
              alt={name}
              border="1px"
              borderRadius="20px"
              style={{ height: '225px', width: '225px', borderRadius: '20px' }}
            />
          </Box>
          <Flex flex="2" justify="center">
            <Box>
              <Heading as="h2" fontSize="xl">
                {name}
              </Heading>
              <Text>{address}</Text>
              <Text>Opening Hours:</Text>
              <Box ml={4}>
                {Object.entries(openingHours).map(([day, hours]) => (
                  <Flex key={day} justifyContent="space-between">
                    <Text>{day}:</Text>
                    <Text ml={2}>{hours}</Text>
                  </Flex>
                ))}
              </Box>
              <Text>
                Website:{' '}
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              </Text>
            </Box>
          </Flex>
          <Flex flex="1" flexDirection="column" mr={7}>
            <Alert status="success" borderRadius={20}>
              <AlertIcon />
              <AlertTitle>Visited</AlertTitle>
              <AlertDescription>
                You have already visited this attraction.
              </AlertDescription>
            </Alert>
            <Alert status="error" borderRadius={20} mt={5}>
              <AlertIcon />
              <AlertTitle>Busy</AlertTitle>
              <AlertDescription>
                This attraction is currently busy.
              </AlertDescription>
            </Alert>
          </Flex>
        </>
      ) : (
        <Flex flexDirection="column">
          <h1 style={{ fontWeight: 'bold' }}>{name}</h1>
          <Box flex="1">
            <img
              src={image}
              alt={name}
              border="1px"
              borderRadius="20px"
              style={{ height: '225px', width: '225px', borderRadius: '20px' }}
            />
          </Box>
        </Flex>
      )}
    </Flex>
  );
}

export default function AttractionsList({ isMobile }) {
  return (
    <SimpleGrid alignItems="center" justifyItems="center">
      {attractions.map((attraction, index) => (
        <Attraction key={index} {...attraction} isMobile={isMobile} />
      ))}
    </SimpleGrid>
  );
}

// ReactDOM.render(<App />, document.getElementById("root"));
