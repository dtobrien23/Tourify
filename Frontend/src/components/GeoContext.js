import React, { createContext, useState, useEffect } from 'react';

const GeolocationContext = createContext();

const GeolocationProvider = ({ children }) => {
  const [geolocation, setGeolocation] = useState(null);
  const [loading, setLoading] = useState(true);

  

  return (
    <GeolocationContext.Provider value={{ geolocation, setGeolocation }}>
      {children}
    </GeolocationContext.Provider>
  );
};

export { GeolocationProvider, GeolocationContext };
