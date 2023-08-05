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
import { MapContext } from './MapContext';
import '../App.css';

export default function WeatherDisplay({
  selectedFilters,
  setSelectedFilters,
}) {
  const {
    apiCurrentWeather,
    currentModelTempParam,
    updateClick,
    setUpdateClick,
  } = useContext(APIContext);
  const { modelTempParam } = useContext(MapContext);
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [displayedTemp, setDisplayedTemp] = useState('F');
  const { isMobile, hasTouchScreen } = useContext(MapContext);

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
    if (apiCurrentWeather) {
      const sunSet = 20;
      const sunRise = 6;
      const weatherDesc = apiCurrentWeather.weather[0].main;

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
  }, [apiCurrentWeather]);

  return (
    <Flex top="12px" left={hasTouchScreen ? '5vw' : 5} position="absolute">
      <Flex
        bg="white"
        w="fit-content"
        h="fit-content"
        flexDirection="column"
        borderRadius="20px"
        boxShadow="1px 1px 5px 1px rgba(0, 0, 0, 0.6)"
        justifyContent="center"
        alignItems="center"
        style={{
          marginTop: hasTouchScreen ? '80px' : '0px',
          paddingLeft: hasTouchScreen ? '6px' : '0px',
          paddingRight: hasTouchScreen ? '6px' : '0px',
          paddingBottom: hasTouchScreen ? '4px' : '0px',
          paddingTop: hasTouchScreen ? '4px' : '0px',
          border: hasTouchScreen ? 'solid 1px orangered' : '',
          boxShadow: hasTouchScreen
            ? 'none'
            : '1px 1px 5px 1px rgba(0, 0, 0, 0.6)',
        }}
      >
        {apiCurrentWeather && (
          <>
            <h2
              style={{
                fontWeight: 'bold',
                margin: '10px',
                marginTop: '5px',
                marginBottom: '5px',
                display: hasTouchScreen ? 'none' : 'block',
              }}
            >
              Manhattan
            </h2>
            <Flex
              flexDirection={hasTouchScreen ? 'row' : 'column'}
              alignItems="center"
              justifyContent="center"
            >
              <img
                src={weatherIcon}
                style={{
                  height: hasTouchScreen ? '30px' : '60px',
                  width: hasTouchScreen ? '30px' : '60px',

                  marginBottom: '0px',
                  marginRight: hasTouchScreen && '5px',
                }}
              />
              <Flex flexDirection="row" alignItems="center">
                <Text style={{ fontSize: hasTouchScreen ? '17px' : '35px' }}>
                  {displayedTemp === 'F'
                    ? `${Math.floor(apiCurrentWeather.main.temp)}\u00B0`
                    : `${Math.floor(
                        (apiCurrentWeather.main.temp - 32) * (5 / 9)
                      )}\u00B0`}
                </Text>
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <button
                    onClick={() => setDisplayedTemp('F')}
                    style={{
                      color: displayedTemp === 'F' ? 'black' : 'lightgrey',
                      fontSize: hasTouchScreen ? '10px' : '14px',
                      fontWeight: 'bold',
                    }}
                  >
                    F
                  </button>
                  <button
                    onClick={() => setDisplayedTemp('C')}
                    style={{
                      color: displayedTemp === 'C' ? 'black' : 'lightgrey',
                      fontSize: hasTouchScreen ? '0px' : '14px',
                      fontWeight: 'bold',
                    }}
                  >
                    C
                  </button>
                </Flex>
              </Flex>
            </Flex>
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
            Last updated at{' '}
            {now.toLocaleTimeString('en-US', {
              timeZone: 'America/New_York',
              hour12: false,
            })}{' '}
            EDT
          </PopoverBody>
        </PopoverContent>
      </Popover>

      {/* </Tooltip> */}
    </Flex>
  );
}
