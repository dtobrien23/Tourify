import React, { useState, useContext } from 'react';
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  Image,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { MapContext } from './MapContext';
import { APIContext } from './APIContext';

export default function DestinationInput({}) {
  // const google = window.google;
  const { apiAttractions, apiLoaded } = useContext(APIContext);
  const {
    selectedAttraction,
    inputColour,
    handleAttractionSelect,
    hasTouchScreen,
  } = useContext(MapContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Wait for apiAttractions to be available
  if (!apiLoaded) {
    return (
      <p
        style={{
          alignSelf: 'center',
          paddingLeft: '10px',
          color: inputColour,
          fontFamily: 'Roboto',
          fontWeight: 'Normal',
          fontSize: '16px',
        }}
      >
        I want to visit...
      </p>
    );
  } else {
    return (
      <Flex
        w={hasTouchScreen ? '100%' : '100%'}
        justifyContent="space-between"
        h={hasTouchScreen && '35px'}
        alignItems="center"
      >
        <Menu isOpen={isMenuOpen} style={{ zIndex: 9999 }}>
          <MenuButton
            as={Button}
            // rightIcon={
            //   <ChevronDownIcon style={{ color: '#B5BBC6', fontSize: '30px' }} />
            // }
            pt={'0.5px'}
            bg={'white'}
            w={'100%'}
            // maxWidth={'200px'}
            overflow={'hidden'}
            m={0}
            p={0}
            paddingLeft={'10px'}
            color={inputColour}
            fontFamily={'Roboto'}
            fontWeight={'Normal'}
            fontSize={'16px'}
            _hover={{ bg: 'white' }}
            _expanded={{ bg: 'white' }}
            style={{
              minWidth: !hasTouchScreen && '120px',
              width: !hasTouchScreen && '12vw',
              maxWidth: !hasTouchScreen ? '12vw' : '100%',
              maxHeight: '100%',
              borderRadius: '20px',
              textAlign: 'left',
            }}
            onClick={handleMenuToggle}
          >
            {!selectedAttraction
              ? 'I want to visit...'
              : selectedAttraction.name}
          </MenuButton>
          {/* <Flex alignItems="center" onClick={handleMenuToggle}>
            <ChevronDownIcon
              onClick={handleMenuToggle}
              style={{ color: '#B5BBC6', fontSize: '30px' }}
            />
          </Flex> */}
          <MenuList
            mt={0}
            pt={0}
            boxShadow="2xl"
            maxHeight="200px"
            overflowY="auto"
            style={{ zIndex: 100 }}
          >
            {apiAttractions.map(attraction => {
              return (
                <React.Fragment key={attraction.name}>
                  <MenuItem
                    onClick={() => {
                      handleAttractionSelect(attraction);
                      handleMenuToggle();
                    }}
                    h={'32px'}
                    fontSize={'14px'}
                    style={{ zIndex: 100 }}
                  >
                    <Image
                      boxSize="1.5rem"
                      borderRadius="full"
                      src={`/images/${attraction.name_alias}.jpg`}
                      alt={attraction.name_alias}
                      mr="12px"
                    />
                    <span>{attraction.name}</span>
                  </MenuItem>
                  <MenuDivider m={0} p={0} />
                </React.Fragment>
              );
            })}
          </MenuList>
        </Menu>
        <Flex alignItems="center" onClick={handleMenuToggle}>
          <ChevronDownIcon
            onClick={handleMenuToggle}
            style={{ color: '#B5BBC6', fontSize: '30px' }}
          />
        </Flex>
      </Flex>
    );
  }
}
