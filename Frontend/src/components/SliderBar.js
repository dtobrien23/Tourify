import React from 'react';
import { useState } from 'react';
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Box,
} from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import attractions from '../static/attractions.json';


export default function SliderBar() {
    const [sliderValue, setSliderValue] = useState([0, 100]);
    const [filteredAttractions, setFilteredAttractions] = useState(attractions);
  
    const handleSliderChange = (value) => {
        setSliderValue(value);
        const filtered = attractions.filter(
          (attraction) =>
             attraction.busyness_score >= sliderValue[0] && attraction.busyness_score <= sliderValue[1]
        );
        setFilteredAttractions(filtered);
        console.log(sliderValue, 'slider value!!');
        console.log(filteredAttractions, 'this is the filtered attraction!!');
      };
  
  
  
  
  
  
  
  
  
    return (
    <Flex
      style={{
        border: 'solid 10px orangered',
        borderRadius: '25px',
        alignItems: 'center',
        justifyContent: 'right',
        width: '100px',
        height: '510px',
        zIndex: 3,
        marginLeft: '85em',
      }}
    >
      <button
        style={{
          // width: 'fit-content',
          width: '140px',
          marginTop: '10px',
          marginBottom: '38em',
          padding: '5px',
          paddingRight: '10px',
          paddingLeft: '10px',
          border: 'solid 2px orangered',
          borderRadius: '20px',
          background: 'white',
          color: 'orangered',
        }}
      >
        AHHHHHHHHHHHHHHHHHH
      </button>
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
        onChangeEnd={handleSliderChange}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
    </Flex>
  );
}
