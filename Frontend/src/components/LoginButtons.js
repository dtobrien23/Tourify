import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import LoginButtons_test from './LoginButtons_test';
import SignUpButton_test from './SignUpButton_test';

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
      <SignUpButton_test 
      color="white" bg="orangered" borderRadius="10px">
        Sign Up
      </SignUpButton_test>
    </Flex>

    
  );
}
