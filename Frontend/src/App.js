import React, { useState } from 'react';
import './App.css';
import Map from './components/Map';
import AttractionsList from './components/AttractionsList';
import NavBar from './components/NavBar';
import {
  ChakraProvider,
  Box,
  theme,
  Tabs,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Tabs align="center" flexDirection="column">
          <NavBar
            isLoggedIn={isLoggedIn}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
          />
          <TabPanels>
            <TabPanel>
              <Map />
            </TabPanel>
            <TabPanel>
              <AttractionsList />
            </TabPanel>
            <TabPanel>Coming soon!</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </ChakraProvider>
  );
}

export default App;
