import React from 'react';
import { Flex } from '@chakra-ui/react';
import LoginButtonsTest from './LoginButtonsTest';
import SignUpButtonTest from './SignUpButtonTest';

export default function LoginButtons() {
  return (
    <Flex>
      <LoginButtonsTest
        style={{ marginRight: '1em' }}
        color="black"
        bg="white"
        border="1px"
        borderRadius="10px"
        borderColor="orangered"
      >
        Log In
      </LoginButtonsTest>
      <SignUpButtonTest color="white" bg="orangered" borderRadius="10px">
        Sign Up
      </SignUpButtonTest>
    </Flex>
  );
}
