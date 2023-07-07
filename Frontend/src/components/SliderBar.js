import React, { useState, useEffect, useContext } from 'react';
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
//import attractions from '../static/attractions.json';
import { APIContext } from './APIContext';


export default function SliderBar({ setSliderListFunc }) {
  const { apiAttractions, apiLoaded} = useContext(APIContext);

  
  const [sliderValue, setSliderValue] = useState([0, 100]);
  const [filteredAttractions, setFilteredAttractions] = useState(apiAttractions);



  const handleSliderChange = value => {
    setSliderValue(value);
  };


  useEffect(() => {
    if(apiLoaded){
    const filtered = apiAttractions.filter(
      attraction =>
        attraction.busyness_score >= sliderValue[0] &&
        attraction.busyness_score <= sliderValue[1]
    );
    setFilteredAttractions(filtered);
}}, [sliderValue]);

  useEffect(() => {
    setSliderListFunc(filteredAttractions);
  }, [filteredAttractions, setSliderListFunc]);

  return (
    <Flex
      style={{
        // border: 'solid 10px orangered',
        borderRadius: '25px',
        alignItems: 'center',
        justifyContent: 'right',
        width: '100px',
        height: '100%',
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
        Busyness Filter
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
          onChangeEnd={handleSliderChange}
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
