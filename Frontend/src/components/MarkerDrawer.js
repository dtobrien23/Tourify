import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useState,
  Input,
  Flex
} from '@chakra-ui/react';

//passing it marker state and method to change state so the X button can close the drawer
// also passing in marker object to render info in drawer
function MarkerDrawer({ isOpenFunc, isCloseFunc, markerObject }) {
  if (!markerObject) {
    return null; // Return null when markerObject is null
  }

  console.log(markerObject, 'passed marker object');

  return (
    <>
      <Drawer isOpen={isOpenFunc} placement="right" onClose={isCloseFunc}>
        <DrawerOverlay />
        
          <DrawerContent>
            <DrawerCloseButton />
            <Flex
          padding="20px"
          border="10px"
          borderRadius="20px"
          borderColor="orangered"
          bg="white"
          w="80%"
          flexDirection="column"
        >
            <DrawerHeader>{markerObject.name.name}</DrawerHeader>

            <DrawerBody>
              <br />
              Price: ${markerObject.price_dollars.price_dollars}
              <br />
              <img src={markerObject.image.image} />
            </DrawerBody>

            <DrawerFooter></DrawerFooter>
            </Flex>
          </DrawerContent>
        
      </Drawer>
    </>
  );
}

export default MarkerDrawer;
