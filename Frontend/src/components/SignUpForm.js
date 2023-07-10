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

export default function SignUpForm({ setIsLoggedIn }) {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInfo = getCookie('loggedInfo');
    setLoggedIn(loggedInfo === 'true');
    setLoading(false);
  }, []);

  const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()}`;
  };

  const getCookie = name => {
    const cookieArr = document.cookie.split(';');
    for (let i = 0; i < cookieArr.length; i++) {
      const cookiePair = cookieArr[i].split('=');
      if (name === cookiePair[0].trim()) {
        return cookiePair[1];
      }
    }
    return null;
  };

  const backendLogin = credentialResponse => {
    console.log(credentialResponse, 'THIS IS THE CRED');
    const { credential } = credentialResponse;
    if (credential) {
      axios
        .post(
          `http://localhost:8001/api/user/info?idTokenString=${credential}`
        )
        .then(response => {
          console.log(
            response.data,
            'this is from the backend login for returning user'
          );

          if (response.status === 200) {
            setLoggedIn(true);
            setIsLoggedIn(true);
            setCookie('loggedInfo', 'true', 7); // Set cookie for 7 days
          } else {
            setLoggedIn(false);
          }
        })
        .catch(error => console.log(error));
    }
  };

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

  const handleLogout = () => {
    setLoggedIn(false);
    setIsLoggedIn(false);

    setCookie('loggedInfo', 'false', 7); // Set cookie for 7 days
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <VStack spacing={4} align="start">
      {isLoggedIn ? (
        <Button onClick={handleLogout}>Logout</Button>
      ) : (
        <>
          <Button>
            <GoogleLogin
              clientId="568208948795-5dv85a002gctb076vpor6905ur987is0.apps.googleusercontent.com"
              onSuccess={backendLogin}
              onFailure={error =>
                console.log('Google login failed:', error)
              }
              cookiePolicy="single_host_origin"
              style={{
                marginLeft: '1.5em',
                marginTop: '1em',
              }}
              color="black"
              bg="white"
              border="1px"
              borderRadius="10px"
              borderColor="orangered"
            />
            USER LOGIN BUTTON
          </Button>
          <Button>
            <GoogleLogin
              clientId="568208948795-5dv85a002gctb076vpor6905ur987is0.apps.googleusercontent.com"
              onSuccess={backendSignUp}
              onFailure={error =>
                console.log('Google login failed:', error)
              }
              cookiePolicy="single_host_origin"
              style={{
                marginLeft: '1.5em',
                marginTop: '1em',
              }}
              color="black"
              bg="white"
              border="1px"
              borderRadius="10px"
              borderColor="orangered"
            />
            SIGN UP BUTTON
          </Button>
        </>
      )}
    </VStack>
  );
}
