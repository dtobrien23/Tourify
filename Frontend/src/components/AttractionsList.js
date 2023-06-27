import React from 'react';
import attractions from '../data/attractions.json';
import AttractionsImage from './AttractionsImage';
import AttractionsInfo from './AttractionsInfo';
import {
  Flex,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Heading,
} from '@chakra-ui/react';

function Attraction({
  name,
  full_address,
  openingHours,
  link,
  image,
  isMobile,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      padding="20px"
      border="1px"
      borderRadius="20px"
      borderColor="orangered"
      bg="white"
      w="80%"
      flexDirection="column"
    >
      {' '}
      {!isMobile ? (
        <>
          <Heading as="h2" fontSize="30px" mb={3}>
            {name}
          </Heading>
          <Flex>
            <AttractionsImage image={image} name={name} />
            <AttractionsInfo
              name={name}
              address={full_address}
              openingHours={openingHours}
              link={link}
            />
          </Flex>
        </>
      ) : (
        <>
          <Flex flexDirection="column" onClick={onOpen} flex="auto">
            <Heading as="h2" fontSize="20px" alignSelf="center" mb={2}>
              {name}
            </Heading>
            <AttractionsImage image={image} name={name} />
          </Flex>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <AttractionsInfo
                name={name}
                address={full_address}
                openingHours={openingHours}
                link={link}
              />
            </ModalContent>
          </Modal>
        </>
      )}
    </Flex>
  );
}

export default function AttractionsList({ isMobile }) {
  return (
    <SimpleGrid alignItems="center" justifyItems="center" spacing={8}>
      {attractions.map((attraction, index) => (
        <Attraction key={index} {...attraction} isMobile={isMobile} />
      ))}
    </SimpleGrid>
  );
}

