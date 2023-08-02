import React, { useContext, useEffect, useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Box,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { APIContext } from './APIContext';
import { MapContext } from './MapContext';
import NavBar from './NavBar';
import FiltersNavBar from './FiltersNavBar';
import SliderBar from './SliderBar';
import SignUpForm from './SignUpForm';

export default function MobileDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    map,
    hasTouchScreen,
    selectedFilters,
    setSelectedFilters,
    setSliderList,
  } = useContext(MapContext);
  const btnRef = React.useRef();

  return (
    <Flex h="60px" bg="orange" justifyContent="center">
      <img
        ml={0}
        style={{ cursor: 'pointer', overflow: 'visible' }} // cursor change on hover
        // onClick={handleLogoClick}
        src="mob-logo.svg"
        alt="Tourify Logo"
      />
      <Button ref={btnRef} colorScheme="white" onClick={onOpen}>
        <Box mt="20px" flexShrink={0}>
          <img
            ml={0}
            style={{ cursor: 'pointer', overflow: 'visible' }} // cursor change on hover
            // onClick={handleLogoClick}
            src="mob-logo.svg"
            alt="Tourify Logo"
          />
        </Box>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        {/* <DrawerOverlay /> */}
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Tourify</DrawerHeader>

          <DrawerBody>
            <Flex flexDirection="column">
              <NavBar map={map} />
              <SliderBar setSliderListFunc={setSliderList} />
              <FiltersNavBar
                hasTouchScreen={hasTouchScreen}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
              />
            </Flex>
          </DrawerBody>

          {/* <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
