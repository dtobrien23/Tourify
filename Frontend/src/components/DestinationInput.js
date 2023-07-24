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
  useConst,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { MapContext } from './MapContext';
import attractions from '../static/attractions.json';
import { APIContext } from './APIContext';

export default function DestinationInput({}) {
  // const google = window.google;
  const { apiAttractions, apiLoaded } = useContext(APIContext);
  const {
    selectedAttraction,
    setSelectedAttraction,
    inputColour,
    setInputColour,
  } = useContext(MapContext);

  const handleAttractionSelect = attraction => {
    setSelectedAttraction(attraction);
    setInputColour('black');
  };
  // Wait for apiAttractions to be available
  if (!apiLoaded) {
    return <p>Loading attractions...</p>;
  } else {
    return (
      <Flex w="230px">
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={
              <ChevronDownIcon style={{ color: '#B5BBC6', fontSize: '30px' }} />
            }
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
              maxWidth: '100%',
              maxHeight: '100%',
              borderRadius: '20px',
              textAlign: 'left',
            }}
          >
            {!selectedAttraction
              ? 'I want to visit...'
              : selectedAttraction.name}
          </MenuButton>
          <MenuList
            mt={0}
            pt={0}
            boxShadow="2xl"
            maxHeight="200px"
            overflowY="auto"
          >
            {apiAttractions.map(attraction => {
              return (
                <>
                  <MenuItem
                    onClick={() => handleAttractionSelect(attraction)}
                    h={'32px'}
                    fontSize={'14px'}
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
                </>
              );
            })}
          </MenuList>
        </Menu>
      </Flex>
    );
  }
}
