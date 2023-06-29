import React from 'react';
import { useState } from 'react';
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import attractions from '../static/attractions.json';

//function takes setter method from map as arg so it can pass filtered list back to map
export default function SliderBar({ setSliderListFunc }) {
  //set the slider value state between 0-100
  const [sliderValue, setSliderValue] = useState([0, 100]);

  // filter attractions from json file
  const [filteredAttractions, setFilteredAttractions] = useState(attractions);

  //set the slider value as you move it
  const handleSliderChange = value => {
    setSliderValue(value);

    // filter the attractions based on the slider value
    const filtered = attractions.filter(
      attraction =>
        //slider returns array of two ints [0,100], sliderValue[0] and [1] are array indexes
        attraction.busyness_score >= sliderValue[0] &&
        attraction.busyness_score <= sliderValue[1]
    );
    //set the state of the filtered attractions list based on busyness score
    setFilteredAttractions(filtered);
    // console.log(sliderValue, 'slider value!!');
    // console.log(filteredAttractions, 'this is the filtered attraction!!');

    //sending the filtered list to the map by using setter method that came from map
    setSliderListFunc(filteredAttractions);
  };

  return (
    <Flex
      style={{
        // border: 'solid 10px orangered',
        borderRadius: '25px',
        alignItems: 'center',
        justifyContent: 'right',
        width: '100px',
        height: '510px',
        zIndex: 1,
        position: 'absolute',
        // marginTop: '5em',
        // marginLeft: '77em',
        top: 10,
        right: 10,
        flexDirection: 'column',
      }}
    >
      <button
        style={{
          // width: 'fit-content',
          width: '100px',
          marginTop: '10px',
          marginBottom: '10px',
          // padding: '5px',
          // paddingRight: '10px',
          // paddingLeft: '10px',
          border: 'solid 2px orangered',
          borderRadius: '20px',
          background: 'white',
          color: 'orangered',
        }}
      >
        AHHHHHHHHHHHHHHHHHH
      </button>
      <Flex style={{ border: 'solid 10px orangered', borderRadius: '30px' }}>
        <RangeSlider
          aria-label={['min', 'max']}
          colorScheme="orange"
          defaultValue={[0, 100]}
          orientation="vertical"
          minH="505"
          minWidth={'20'}
          position={'right'}
          border={'solid 35px white'}
          borderRadius={'20px'}
          backgroundColor={'white'}
          step={1}
          // call function as slider moves
          onChange={handleSliderChange}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
      </Flex>
    </Flex>
  );
}
