import React, { createContext, useState, useEffect, useContext } from 'react';
import { MapContext } from './MapContext';

const APIContext = createContext();

const APIContextProvider = ({ children }) => {
  const [apiAttractions, setAPIAttractions] = useState(null);
  const [apiWeather, setAPIWeather] = useState(null);
  const [apiAllCurrentBusyness, setAPIAllCurrentBusyness] = useState(null);
  const [api24HoursBusyness, setAPI24HoursBusyness] = useState(null);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [globalUserInfo, setGlobalUserInfo] = useState();
  const [globalCredential, setGlobalCredential] = useState();
  const [checkinState, setCheckinState] = useState(false);
  const [badgeState, setBadgeState] = useState(null);
  const [newBadgeState, setNewBadgeState] = useState(null);
  const [modelTempParam, setModelTempParam] = useState(null);
  const [modelRainParam, setModelRainParam] = useState(null);

  const { mapCenter } = useContext(MapContext);

  useEffect(() => {
    const fetchAttractionData = async () => {
      try {
        const response = await fetch(
          'http://localhost:8001/api/attraction/getAllAttraction'
        );
        const data = await response.json(); //long/lat data
        console.log(data, 'THIS CAME FROM THE BACK END');
        const dataArray = data.data;
        console.log(dataArray, 'back end data without wrapper');

        setAPIAttractions(dataArray);
        setApiLoaded(true);

        console.log(apiLoaded, 'youve set it!!');
        console.log(apiLoaded, 'youve set it!!');
      } catch (error) {
        console.error('Error fetching attraction data:', error);
        setApiLoaded(false);
      }
    };

    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${mapCenter.lat}&lon=${mapCenter.lng}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
        );
        const data = await response.json();
        console.log(data, 'THIS IS THE WEATHER');
        setAPIWeather(data);
        setModelTempParam(Math.floor((data.main.temp - 273.15) * (9 / 5) + 32)); // must convert kelvin to fahrenheit
        if (data.rain) {
          setModelRainParam(data.rain['1h'] / 25.4); // must convert millimetres to inches
        } else {
          setModelRainParam(0);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchAttractionData();
    fetchWeatherData();
  }, []);

  useEffect(() => {
    const fetchAllCurrentBusynessData = async () => {
      try {
        if (modelTempParam && modelRainParam >= 0) {
          console.log(
            modelTempParam,
            modelRainParam,
            'these are the params for the model'
          );
          const response = await fetch(
            `http://localhost:8001/api/attraction/getAllPrediction?temperature=${modelTempParam}&precipitation=${modelRainParam}`
          );
          const data = await response.json();
          console.log(data, 'THIS IS THE MODEL PREDICTION');
          const dataArray = data.data;
          setAPIAllCurrentBusyness(dataArray);
        }
      } catch (error) {
        console.error('Error fetching model prediction data:', error);
      }
    };
    fetchAllCurrentBusynessData();
  }, [modelTempParam, modelRainParam]);

  return (
    <APIContext.Provider
      value={{
        apiAttractions,
        setAPIAttractions,
        apiLoaded,
        globalUserInfo,
        setGlobalUserInfo,
        setGlobalCredential,
        globalCredential,
        setCheckinState,
        checkinState,
        badgeState,
        setBadgeState,
        newBadgeState,
        setNewBadgeState,
        apiWeather,
        apiAllCurrentBusyness,
        modelTempParam,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export { APIContext, APIContextProvider };
