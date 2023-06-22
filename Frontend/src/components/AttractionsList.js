import { React } from 'react';
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
} from '@chakra-ui/react';

function Attraction({ name, address, openingHours, link, image, isMobile }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
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
          <AttractionsImage image={image} name={name} />
          <AttractionsInfo
            name={name}
            address={address}
            openingHours={openingHours}
            link={link}
          />
        </>
      ) : (
        <>
          <Flex flexDirection="column" onClick={onOpen} flex="auto">
            <h1 style={{ fontWeight: 'bold' }}>{name}</h1>
            <AttractionsImage image={image} name={name} />
          </Flex>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <AttractionsInfo
                name={name}
                address={address}
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

// ReactDOM.render(<App />, document.getElementById("root"));
