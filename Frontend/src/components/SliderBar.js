import React, { useState, useEffect, useContext } from 'react';
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import { APIContext } from './APIContext';
import { MapContext } from './MapContext';

export default function SliderBar({ setSliderListFunc }) {
  const { apiAttractions, apiLoaded, apiAllCurrentBusyness } =
    useContext(APIContext);
  const {
    attractionsWithBusyness,
    setAttractionsWithBusyness,
    hasTouchScreen,
  } = useContext(MapContext);

  const [sliderValue, setSliderValue] = useState([0, 100]);
  const [filteredAttractions, setFilteredAttractions] =
    useState(apiAttractions);

  const handleSliderChange = value => {
    setSliderValue(value);
  };

  useEffect(() => {
    // adds busyness score to attractions info object

    if (apiAttractions && apiAllCurrentBusyness) {
      apiAttractions.forEach(attraction => {
        const matchingPred = apiAllCurrentBusyness.find(
          prediction => prediction.name === attraction.name
        );
        if (matchingPred) {
          attraction.businessRate = matchingPred.businessRate;
        }
      });
      console.log(apiAttractions, 'PLS HAVE BUSYNESS SCORE');
      setSliderListFunc(apiAttractions); // so all markers load when page loads
      setAttractionsWithBusyness(apiAttractions);
    }
  }, [apiAllCurrentBusyness]);

  useEffect(() => {
    if (attractionsWithBusyness) {
      const filtered = attractionsWithBusyness.filter(
        attraction =>
          attraction.businessRate >= sliderValue[0] &&
          attraction.businessRate <= sliderValue[1]
      );
      setFilteredAttractions(filtered);
    }
  }, [sliderValue]);

  useEffect(() => {
    setSliderListFunc(filteredAttractions);
  }, [filteredAttractions]);

  return (
    <Flex
      width={hasTouchScreen ? '90%' : 'fit-content'}
      height={hasTouchScreen ? 'auto' : '100%'}
      mb={hasTouchScreen ? '10px' : '0px'}
      alignItems="center"
      justifyContent={hasTouchScreen && 'center'}
      zIndex="1"
      position="absolute"
      style={
        hasTouchScreen
          ? { bottom: 1 }
          : {
              top: 14,
              right: '20px',
              flexDirection: 'column',
            }
      }
    >
      <Flex
        flexDirection={hasTouchScreen ? 'row' : 'column'}
        width={hasTouchScreen && '100%'}
        style={{
          border: 'solid 2px white',
          borderRadius: '25px',
          boxShadow: '1px 1px 5px 1px rgba(0, 0, 0, 0.6)',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'white',
        }}
      >
        <img
          src={
            !hasTouchScreen
              ? '/images/busyness-slider/busy.svg'
              : '/images/busyness-slider/not-busy.svg'
          }
          alt="Busyness Slider"
          style={
            !hasTouchScreen
              ? { height: '40px', width: '40px' }
              : { height: '30px', width: '30px' }
          }
        />
        <RangeSlider
          aria-label={['min', 'max']}
          defaultValue={[0, 100]}
          orientation={hasTouchScreen ? 'horizontal' : 'vertical'}
          width={hasTouchScreen && '100%'}
          minH={!hasTouchScreen && '505'}
          maxW={!hasTouchScreen && '20'}
          position={!hasTouchScreen && 'right'}
          border={'solid 20px white'}
          borderRadius={'20px'}
          backgroundColor={'white'}
          step={1}
          // call function as slider moves
          onChangeEnd={handleSliderChange}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack backgroundColor="orange" />
          </RangeSliderTrack>
          <RangeSliderThumb
            index={0}
            backgroundColor={'orange'}
            border="solid 1px white"
          />
          <RangeSliderThumb
            index={1}
            backgroundColor={'orange'}
            border="solid 1px white"
          />
        </RangeSlider>
        <img
          src={
            !hasTouchScreen
              ? '/images/busyness-slider/not-busy.svg'
              : '/images/busyness-slider/busy.svg'
          }
          alt="Busyness Slider"
          style={
            !hasTouchScreen
              ? { height: '40px', width: '40px' }
              : { height: '30px', width: '30px' }
          }
        />
      </Flex>
    </Flex>
  );
}
