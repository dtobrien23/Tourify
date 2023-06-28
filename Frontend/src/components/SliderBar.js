import React from 'react';
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';

export default function SliderBar() {
  return (
    <Flex
      style={{
        border: 'solid 10px #FC6600',
        borderRadius: '25px',
        alignItems: 'center',
        justifyContent: 'right',
        width: '100px',
        height: '510px',
        zIndex: 3,
        marginLeft:'85em'
      }}
    >
      <RangeSlider
        aria-label={['min', 'max']}
        colorScheme="orange"
        defaultValue={[10, 30]}
        orientation="vertical"
        minH="505"
        minWidth={'20'}
        position={'right'}
        border={'solid 35px white'}
        borderRadius={'20px'}
        backgroundColor={'white'}
        //zIndex={1}
        //marginLeft={'85em'}
      >
        <RangeSliderTrack >
          <RangeSliderFilledTrack  />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
    </Flex>
  );
}
