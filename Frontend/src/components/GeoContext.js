import React, { createContext, useState, useEffect } from 'react';

const GeolocationContext = createContext();

export const getUserGeolocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
          // console.log(latitude, longitude);
          // console.log("!!!!!!!!!!!!!!");
        },
        error => {
          reject(error);
        }
      );
    } else {
      reject(new Error('Geolocation is not supported'));
    }
  });
};

const GeolocationProvider = ({ children }) => {
  const [geolocation, setGeolocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserGeolocation()
      .then(position => {
        setGeolocation(position);
        console.log(position, 'current geo');
        setLoading(false);
      })
      .catch(error => {
        console.error('Error getting geolocation:', error);
        setLoading(false);
      });
  }, []);

  return (
    <GeolocationContext.Provider value={{ geolocation, setGeolocation }}>
      {children}
    </GeolocationContext.Provider>
  );
};

export { GeolocationProvider, GeolocationContext };
