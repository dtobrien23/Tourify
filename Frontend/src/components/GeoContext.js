import React, { createContext, useState, useEffect } from 'react';

const GeolocationContext = createContext();

const GeolocationProvider = ({ children }) => {
  const [geolocation, setGeolocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch geolocation asynchronously
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setGeolocation({ latitude, longitude });
        setLoading(false);
      },
      error => {
        console.error(error);
        setLoading(false);
      }
    );
  }, []);

  // if (loading) {
  //   // Show loading state while fetching geolocation
  //   return <div>Loading...</div>;
  // }

  return (
    <GeolocationContext.Provider value={{ geolocation, setGeolocation }}>
      {children}
    </GeolocationContext.Provider>
  );
};

export { GeolocationProvider, GeolocationContext };
