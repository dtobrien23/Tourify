import React, { useEffect } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Flex,
} from '@chakra-ui/react';
import attractions from '../static/attractions.json';

export default function Recommender({ recommendOpenFunc, recommendCloseFunc }) {


  const recommendAttractions = attractions.filter(
    attraction => attraction.busyness_score <= 50
  );
  const topFiveAttractions = recommendAttractions.slice(0, 5);
console.log(topFiveAttractions,'THESE ARE THE TOP 5')
  return (
    <Drawer
      isOpen={recommendOpenFunc}
      placement="right"
      onClose={recommendCloseFunc}
    >
      <DrawerOverlay />

      <DrawerContent
        bg="white"
        border="5px solid orangered"
        borderRadius="20px"
        p="20px"
        w="80%"
      >
        <DrawerCloseButton />

        <DrawerHeader></DrawerHeader>

        {/* <DrawerBody>{topFiveAttractions}</DrawerBody> */}
        <DrawerBody>
          {topFiveAttractions.map(attraction => (
            <Flex key={attraction.id} mb={4}>
              <img src={attraction.image} alt={attraction.name} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
              <div>
                <h3>{attraction.name}</h3>
                <p>Busyness Score: {attraction.busyness_score}</p>
              </div>
            </Flex>
          ))}
        </DrawerBody>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}


