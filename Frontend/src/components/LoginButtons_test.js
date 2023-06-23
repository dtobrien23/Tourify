import React from 'react';
import { useState } from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import LoginForm from './LoginForm';

function LoginButtons({ email, password }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
    <Flex>
      <Button
        onClick={handleLogin}
        style={{ marginRight: '1em' }}
        color="black"
        bg="white"
        border="1px"
        borderRadius="10px"
        borderColor="orangered"
      >
        Log In
      </Button>
    </Flex>

    <Modal isOpen={isLoggedIn} onClose={handleLogout}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log In</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <LoginForm/>
          </ModalBody>
        </ModalContent>
      </Modal>
      </>
    
  );
}

export default LoginButtons;
