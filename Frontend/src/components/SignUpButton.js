import React from 'react';
import { Button } from '@chakra-ui/react';
import { GoogleLogin } from '@react-oauth/google';

export default function SignUpButton() {

    const loginSignUp = GoogleLogin

  return (
    <Button
      onClick={() => loginSignUp()}
      style={{ marginLeft: '1.5em', marginTop: '1em' }}
      color="black"
      bg="white"
      border="1px"
      borderRadius="10px"
      borderColor="orangered"
    >
      Sign Up{' '}
    </Button>
  );
}
