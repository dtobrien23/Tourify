import React, { createContext, useState, useEffect } from 'react';

const APIContext = createContext();

const APIContextProvider = ({ children }) => {
  const [apiAttractions, setAPIAttractions] = useState(null);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [globalUserInfo, setGlobalUserInfo] = useState();
  const [globalCredential, setGlobalCredential] = useState();
  const [checkinState, setCheckinState] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8001/api/attraction/getAllAttraction');
        const data = await response.json(); //long/lat data
        console.log(data, 'THIS CAME FROM THE BACK END');
        const dataArray = data.data;
        console.log(dataArray, 'back end data without wrapper');

        setAPIAttractions(dataArray);
        setApiLoaded(true);

        console.log(apiLoaded,'youve set it!!')
      } catch (error) {
        console.error('Error fetching data:', error);
        setApiLoaded(false);
      }
    };

    fetchData();
  }, []);

  


  return (
    <APIContext.Provider value={{ apiAttractions, setAPIAttractions, apiLoaded, globalUserInfo, setGlobalUserInfo, setGlobalCredential, globalCredential,setCheckinState,checkinState}}>
      {children}
    </APIContext.Provider>
  );
};

export { APIContext, APIContextProvider };
