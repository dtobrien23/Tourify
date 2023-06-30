import React from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,Button,useState,Input
  } from '@chakra-ui/react';

  function MarkerDrawer({isOpenFunc,isCloseFunc}) {

    
  
    return (
      <>
        
        <Drawer
          isOpen={isOpenFunc}
          placement='right'
         onClose={isCloseFunc}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>
  
            <DrawerBody>
              <Input placeholder='Type here...' />
            </DrawerBody>
  
            <DrawerFooter>
              <Button variant='outline' mr={3} onClose={isCloseFunc}>
                Cancel
              </Button>
              <Button colorScheme='blue'>Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

  export default MarkerDrawer;



