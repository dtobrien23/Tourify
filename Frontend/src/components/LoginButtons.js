import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import LoginButtons_test from './LoginButtons_test';
import SignUpForm from './SignUpForm';

export default function LoginButtons() {
  return (
    <Flex>
      <LoginButtons_test
        style={{ marginRight: '1em' }}
        color="black"
        bg="white"
        border="1px"
        borderRadius="10px"
        borderColor="orangered"
      >
        Log In
      </LoginButtons_test>
      <SignUpForm 
      color="white" bg="orangered" borderRadius="10px">
        Sign Up
      </SignUpForm>
    </Flex>

    
  );
}
