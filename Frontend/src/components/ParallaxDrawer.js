import React, { useState } from 'react';
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Button } from '@chakra-ui/react';
import ParallaxContent from './ParallaxContent';

const ParallaxDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Button onClick={onOpen}>About Us</Button>
      <Drawer isOpen={isOpen} onClose={onClose} size="lg">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>About Us</DrawerHeader>
            <DrawerBody>
              <ParallaxContent onClose={onClose} />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default ParallaxDrawer;
