import React, { useEffect, useState, useRef, useContext } from 'react';
import { Flex, Text } from '@chakra-ui/react';
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

  useEffect(() => {
    if (apiWeather) {
      const now = new Date();
      const hour = now.getHours();
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
    <Flex
      bg="white"
      w="fit-content"
      h="fit-content"
      top="5"
      left="5"
      position="absolute"
      flexDirection="column"
      borderRadius="20px"
      boxShadow="1px 1px 5px 1px rgba(0, 0, 0, 0.6)"
      justifyContent="center"
      alignItems="center"
    >
      {apiWeather && (
        <>
          <img
            src={weatherIcon}
            style={{
              height: '60px',
              width: '60px',
              margin: '10px',
              marginBottom: '2px',
            }}
          />
          <Text fontSize="22px">{`${Math.floor(
            apiWeather.main.temp - 273.15
          )}\u00B0`}</Text>
        </>
      )}
    </Flex>
  );
}
