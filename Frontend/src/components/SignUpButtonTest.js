import React from 'react';
import { useState } from 'react';
import { Flex, Button } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import SignUpForm from './SignUpForm';

function SignUpButton({ email, password }) {
  const [isSignedUp, setSignedUp] = useState(false);

  const handleSignUp = () => {
    setSignedUp(true);
  };
  const handleExit = () => {
    setSignedUp(false);
  };

  return (
    <>
    <Flex>
      <Button
        onClick={handleSignUp}
        style={{ marginRight: '1em' }}
        color="black"
        bg="white"
        border="1px"
        borderRadius="10px"
        borderColor="orangered"
      >
        Sign Up
      </Button>
    </Flex>
      <Modal isOpen={isSignedUp} onClose={handleExit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SignUpForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SignUpButton;
