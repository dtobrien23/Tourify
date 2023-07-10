import React, { useEffect, useState, useContext } from 'react';
import {
  Flex,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  CloseButton,
  Tooltip,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { MapContext } from './MapContext';

export default function BadgesDrawer() {
  const { isBadgesDrawerOpen, setIsBadgesDrawerOpen } = useContext(MapContext);
  return (
    <Drawer
      onClose={() => {
        setIsBadgesDrawerOpen(false);
      }}
      isOpen={isBadgesDrawerOpen}
      placement="left"
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent
        pointerEvents="all"
        containerProps={{ pointerEvents: 'none', height: '100%' }}
        style={{ position: 'absolute', top: '1', height: 'calc(100% - 85px)' }}
      >
        <DrawerCloseButton />
        <DrawerHeader>{`My Badges`}</DrawerHeader>
        <DrawerBody>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Consequat nisl vel pretium lectus quam id. Semper quis lectus nulla
            at volutpat diam ut venenatis. Dolor morbi non arcu risus quis
            varius quam quisque. Massa ultricies mi quis hendrerit dolor magna
            eget est lorem. Erat imperdiet sed euismod nisi porta. Lectus
            vestibulum mattis ullamcorper velit.
          </p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
