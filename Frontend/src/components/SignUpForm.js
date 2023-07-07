import React, { useState, useEffect } from 'react';
import { Button, VStack, Badge } from '@chakra-ui/react';
import {
  googleLogout,
  useGoogleLogin,
  GoogleLogin,
  useGoogleOneTapLogin,
} from '@react-oauth/google';
import axios from 'axios';
import { Avatar, AvatarBadge } from '@chakra-ui/react';

export default function SignUpForm({setIsLoggedIn}) {
  const backendLogin = credentialResponse => {
    console.log(credentialResponse, 'THIS IS THE CRED');
    const { credential } = credentialResponse;
    if (credential) {
      axios
        .post(
          `http://localhost:8001/api/user/tokensignin?idTokenString=${credential}`
        )
        .then(response => {
          console.log(
            response.data,
            'this is from the backend login for returning user'
          );

          if (response.status == 200) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        })
        .catch(error => console.log(error));
    }}

    const backendSignUp = credentialResponse => {
      console.log(credentialResponse, 'THIS IS THE CRED');
      const { credential } = credentialResponse;
      if (credential) {
        axios
          .post(
            `http://localhost:8001/api/user/register?idTokenString=${credential}`
          )
          .then(response =>
            console.log(
              response.data,
              'this is from the backend login for sign up'
            )
          )
          .catch(error => console.log(error));
      }
    };

    return (
      <VStack spacing={4} align="start">
        <div>
          <Button>
            <GoogleLogin
              clientId="568208948795-5dv85a002gctb076vpor6905ur987is0.apps.googleusercontent.com"
              onSuccess={backendLogin}
              onFailure={error => console.log('Google login failed:', error)}
              cookiePolicy="single_host_origin"
              style={{ marginLeft: '1.5em', marginTop: '1em' }}
              color="black"
              bg="white"
              border="1px"
              borderRadius="10px"
              borderColor="orangered"
            ></GoogleLogin>
            USER LOGIN BUTTON
          </Button>

          <Button>
            <GoogleLogin
              clientId="568208948795-5dv85a002gctb076vpor6905ur987is0.apps.googleusercontent.com"
              onSuccess={backendSignUp}
              onFailure={error => console.log('Google login failed:', error)}
              cookiePolicy="single_host_origin"
              style={{ marginLeft: '1.5em', marginTop: '1em' }}
              color="black"
              bg="white"
              border="1px"
              borderRadius="10px"
              borderColor="orangered"
            ></GoogleLogin>
            SIGN UP BUTTON
          </Button>
        </div>
      </VStack>
    );
  };

