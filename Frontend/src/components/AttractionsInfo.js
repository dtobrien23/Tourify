import React from 'react';
import {
  Box,
  Flex,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

export default function AttractionsInfo({ name, address, openingHours, link }) {
  return (
    <>
      <Flex flex="2" justify="center">
        <Box>
          <Text>{address}</Text>
          <Text>
            <a href={link} target="_blank" rel="noopener noreferrer">
              {link}
            </a>
          </Text>
          <Box ml={4} w="200px">
            {Object.entries(openingHours).map(([day, hours]) => (
              <Flex key={day} justifyContent="space-between">
                <Text>{day}:</Text>
                <Text ml={2}>{hours}</Text>
              </Flex>
            ))}
          </Box>
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
  );
}
