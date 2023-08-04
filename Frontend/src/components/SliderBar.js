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
  const {
    apiAttractions,
    apiLoaded,
    apiAllCurrentBusyness,
    attractionsWithBusyness,
    filteredAttractions,
    setFilteredAttractions,
    setSliderList,
    sliderValue,
    setSliderValue,
  } = useContext(APIContext);
  const { hasTouchScreen } = useContext(MapContext);

  const handleSliderChange = value => {
    setSliderValue(value);
  };

  return (
    <Flex
      width={hasTouchScreen ? '100%' : 'fit-content'}
      height={hasTouchScreen ? 'auto' : '100%'}
      mb={hasTouchScreen ? '10px' : '0px'}
      alignItems="center"
      justifyContent={hasTouchScreen && 'center'}
      zIndex="1"
      position={!hasTouchScreen && 'absolute'}
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
        pl={hasTouchScreen && '10px'}
        pr={hasTouchScreen && '15px'}
        mt={hasTouchScreen && '10px'}
        width={hasTouchScreen && '100%'}
        boxShadow={!hasTouchScreen && '1px 1px 5px 1px rgba(0, 0, 0, 0.6)'}
        border={hasTouchScreen && 'solid 1px orangered'}
        style={{
          borderRadius: '25px',

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
          defaultValue={sliderValue}
          orientation={hasTouchScreen ? 'horizontal' : 'vertical'}
          width={hasTouchScreen && '100%'}
          minH={!hasTouchScreen && '505'}
          maxW={!hasTouchScreen && '20'}
          position={!hasTouchScreen && 'right'}
          border={'solid 22px white'}
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
