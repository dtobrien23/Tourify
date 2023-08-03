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
import { ChevronUpIcon } from '@chakra-ui/icons';
import { APIContext } from './APIContext';
import { MapContext } from './MapContext';
import NavBar from './NavBar';
import FiltersNavBar from './FiltersNavBar';
import SliderBar from './SliderBar';
import SignUpForm from './SignUpForm';

export default function MobileDrawer() {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    map,
    hasTouchScreen,
    selectedFilters,
    setSelectedFilters,
    setSliderList,
    isMobileDrawerOpen,
    setIsMobileDrawerOpen,
  } = useContext(MapContext);
  const btnRef = React.useRef();

  return (
    <Flex h="53px" w="100vw" bg="white" borderTop="solid 2px orangered">
      <Flex flex="1" justifyContent="flex-start" marginLeft="22px">
        <SignUpForm />
      </Flex>
      <Flex>
        <img
          style={{
            cursor: 'pointer',
            overflow: 'visible',
            height: '80px',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translate(-50%)',
            paddingBottom: '5px',
          }} // cursor change on hover
          // onClick={handleLogoClick}
          src="mobile-logo.svg"
          alt="Tourify Logo"
          onClick={() => {
            window.location.reload();
          }}
        />
      </Flex>
      <Flex flex="1" alignItems="center" justifyContent="flex-end" mr="12px">
        <Button
          ref={btnRef}
          onClick={() => {
            setIsMobileDrawerOpen(true);
          }}
          bg="white"
          _hover={{ bg: 'white' }}
        >
          <ChevronUpIcon boxSize="30px" p="0" />
        </Button>
      </Flex>
      <Drawer
        isOpen={isMobileDrawerOpen}
        placement="bottom"
        onClose={() => {
          setIsMobileDrawerOpen(false);
        }}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent borderTopLeftRadius="20px" borderTopRightRadius="20px">
          <DrawerCloseButton />
          <DrawerHeader>Features</DrawerHeader>

          <DrawerBody pt="0" pb="0">
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
