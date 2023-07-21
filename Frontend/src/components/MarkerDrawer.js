import React, { useContext } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
} from '@chakra-ui/react';
import { APIContext } from './APIContext';
import { MapContext } from './MapContext';

// passing it marker state and method to change state so the X button can close the drawer
// also passing in marker object to render info in drawer
function MarkerDrawer({ isOpenFunc, isCloseFunc, markerObject }) {
  const { apiAttractions } = useContext(APIContext);
  const { attractionsWithBusyness } = useContext(MapContext);

  if (!markerObject) {
    return null; // Return null when markerObject is null
  }

  return (
    <>
      <Drawer isOpen={isOpenFunc} placement="right" onClose={isCloseFunc}>
        <DrawerOverlay style={{ zIndex: '19' }} />

        <DrawerContent
          alignItems="left"
          justifyItems="left"
          border="1px solid orangered"
          borderRadius="20px"
          borderTopRightRadius="0px"
          borderBottomRightRadius="0px"
          borderRight="0px"
          // marginTop="5px"
          marginLeft="10px"
          overflow="hidden"
          spacing={8}
          p="10px"
          style={{ zIndex: '20' }}
        >
          <DrawerCloseButton />

          <DrawerHeader fontWeight="bold">
            {markerObject.name.name}
          </DrawerHeader>

          <DrawerBody>
            <img
              src={`/images/${markerObject.name.name.replaceAll(' ', '_')}.jpg`}
              alt={markerObject.name.name}
            />
            <br></br>
            {attractionsWithBusyness.map(attraction => {
              if (attraction.name === markerObject.name.name) {
                return (
                  <div>
                    <p fontWeight="bold">Address</p>
                    <p>{attraction.full_address}</p>
                    <br></br>
                    <Alert
                      status="info"
                      colorScheme={
                        attraction.businessRate < 35
                          ? 'green'
                          : 35 < attraction.businessRate &&
                            attraction.businessRate < 70
                          ? 'yellow'
                          : 'red'
                      }
                      borderRadius={20}
                      mt={5}
                    >
                      <AlertIcon />
                      <Box>
                        <AlertTitle>
                          {attraction.businessRate < 35
                            ? 'Quiet'
                            : 35 < attraction.businessRate &&
                              attraction.businessRate < 70
                            ? 'Not Too Busy'
                            : 'Busy'}
                        </AlertTitle>
                        <AlertDescription>
                          {/* {attraction.businessRate < 35
                          ? 'This attraction is currently not busy'
                          : 35 < attraction.businessRate &&
                            attraction.businessRate < 70
                          ? 'This attraction is neither quiet nor busy'
                          : 'This attraction is currently quiet.'} */}

                          <p>Busyness Index: {attraction.businessRate}</p>
                        </AlertDescription>
                      </Box>
                    </Alert>
                    <br />
                    <p>
                      Website:{' '}
                      <a
                        href={attraction.link}
                        target="_blank"
                        style={{ color: 'blue' }}
                      >
                        {attraction.link}
                      </a>
                    </p>
                    <br></br>
                    <p fontWeight="bold">Opening Hours:</p>
                    <p>
                      Monday: {attraction.openHour.mondayOpen} -{' '}
                      {attraction.openHour.mondayClose}
                    </p>
                    <p>
                      Tuesday: {attraction.openHour.tuesdayOpen} -{' '}
                      {attraction.openHour.tuesdayClose}
                    </p>
                    <p>
                      Wednsday: {attraction.openHour.wednesdayOpen} -{' '}
                      {attraction.openHour.wednesdayClose}
                    </p>
                    <p>
                      Thursday: {attraction.openHour.thursdayOpen} -{' '}
                      {attraction.openHour.thursdayClose}
                    </p>
                    <p>
                      Friday: {attraction.openHour.fridayOpen} -{' '}
                      {attraction.openHour.fridayClose}
                    </p>
                    <p>
                      Saturday: {attraction.openHour.saturdayOpen} -{' '}
                      {attraction.openHour.saturdayClose}
                    </p>
                    <p>
                      Sunday: {attraction.openHour.sundaydayOpen} -{' '}
                      {attraction.openHour.sundaydayClose}
                    </p>
                    <br />
                    Price: $ {attraction.price}
                    <br />
                  </div>
                );
              }
              return null;
            })}
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default MarkerDrawer;
