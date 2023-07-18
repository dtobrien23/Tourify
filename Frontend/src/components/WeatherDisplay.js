import React, { useEffect, useState, useRef, useContext } from 'react';
import {
  Flex,
  Text,
  Button,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from '@chakra-ui/react';
import { APIContext } from './APIContext';
import '../App.css';

export default function WeatherDisplay({
  isMobile,
  selectedFilters,
  setSelectedFilters,
  hasTouchScreen,
}) {
  const { apiWeather } = useContext(APIContext);
  const [weatherIcon, setWeatherIcon] = useState(null);
  //   const weatherDesc = apiWeather.weather[0].main;
  const mistWeather = [
    'Mist',
    'Smoke',
    'Haze',
    'Dust',
    'Fog',
    'Sand',
    'Dust',
    'Ash',
    'Squall',
    'Tornado',
  ];
  const now = new Date();
  const hour = now.getHours();

  useEffect(() => {
    if (apiWeather) {
      const sunSet = 20;
      const sunRise = 6;
      const weatherDesc = apiWeather.weather[0].main;

      // if weather is 'misty'
      if (mistWeather.includes(weatherDesc)) {
        setWeatherIcon('/images/weather-icons/Mist.svg');
        // if weather is clear
      } else if (weatherDesc === 'Clear') {
        // clear and day time
        if (hour >= sunRise || hour < sunSet) {
          setWeatherIcon('/images/weather-icons/Clear-day.svg');
          // clear and night time
        } else {
          setWeatherIcon('/images/weather-icons/Clear-night.svg');
        }
        // if weather is rainy, cloudy
      } else {
        setWeatherIcon(`/images/weather-icons/${weatherDesc}.svg`);
      }
    }
  }, [apiWeather]);

  return (
    <Flex top="14px" left="14px" position="absolute">
      <Flex
        bg="white"
        w="fit-content"
        h="fit-content"
        flexDirection="column"
        borderRadius="20px"
        boxShadow="1px 1px 5px 1px rgba(0, 0, 0, 0.6)"
        justifyContent="center"
        alignItems="center"
      >
        {apiWeather && (
          <>
            <h2
              style={{
                fontWeight: 'bold',
                margin: '10px',
                marginTop: '5px',
                marginBottom: '5px',
              }}
            >
              Manhattan
            </h2>
            <img
              src={weatherIcon}
              style={{
                height: '60px',
                width: '60px',
                marginBottom: '3px',
              }}
            />
            <Text fontSize="20px">{`${Math.floor(
              apiWeather.main.temp - 273.15
            )}\u00B0`}</Text>
          </>
        )}
      </Flex>
      {/* <Tooltip label="Update Current Busyness" placement="right"> */}
      <Popover trigger="hover" placement="right-start">
        <PopoverTrigger>
          <Button
            bg="white"
            _hover={{ bg: 'white' }}
            boxShadow="1px 1px 5px 1px rgba(0, 0, 0, 0.6)"
            ml="15px"
            borderRadius="50%"
            w="50px"
            h="50px"
            p="10px"
            onClick={() => {
              window.location.reload();
            }}
          >
            <img src="/images/refresh.svg" />
          </Button>
        </PopoverTrigger>
        <PopoverContent borderRadius="20px" width="fit-content">
          <PopoverArrow />
          <PopoverBody>
            <h2 style={{ fontWeight: 'bold' }}> Update Current Busyness</h2>
            Last updated: {now.toLocaleTimeString()}
          </PopoverBody>
        </PopoverContent>
      </Popover>

      {/* </Tooltip> */}
    </Flex>
  );
}
