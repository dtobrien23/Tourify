import React, { useState, useEffect, useContext } from 'react';
import { Button, VStack, Badge } from '@chakra-ui/react';
import {
  googleLogout,
  useGoogleLogin,
  GoogleLogin,
  useGoogleOneTapLogin,
} from '@react-oauth/google';
import axios from 'axios';
import { Avatar, AvatarBadge, Flex } from '@chakra-ui/react';
import { APIContext } from './APIContext';


export default function SignUpForm({ setIsLoggedIn }) {
  const [loading, setLoading] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const { globalUserInfo, setGlobalUserInfo} = useContext(APIContext)
  const [userInfoFetched, setUserInfoFetched] = useState(false);


  useEffect(() => {
    const loggedInfo = localStorage.getItem('loggedInfo');
    setUserLoggedIn(loggedInfo === 'true');
    setLoading(false);
  
    // Check if user info is cached
    const cachedUserInfo = localStorage.getItem('userInfo');
    if (loggedInfo === 'true' && cachedUserInfo) {
      setGlobalUserInfo(JSON.parse(cachedUserInfo));
      setUserInfoFetched(true);
    } 
  }, []);
  

  const backendLogin = credentialResponse => {
    console.log(credentialResponse, 'THIS IS THE CRED');
    const { credential } = credentialResponse;
    if (credential) {
      axios
        .post(`http://localhost:8001/api/user/info?idTokenString=${credential}`)
        .then(response => {
          
          console.log(
            response.data,
            'this is from the backend login for returning user'
          );
          setGlobalUserInfo(response.data)


          if (response.status === 200) {
            setGlobalUserInfo(response.data)
            setUserLoggedIn(true);
            setIsLoggedIn(true);
            localStorage.setItem('loggedInfo', 'true'); // Store logged-in state in localStorage

            // Cache the user info
            localStorage.setItem('userInfo', JSON.stringify(response.data));

            setUserInfoFetched(true);
          } else {
            setUserLoggedIn(false);
            setIsLoggedIn(false);
            localStorage.setItem('loggedInfo', 'false'); // Store logged-in state in localStorage
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
    setUserLoggedIn(false);
    setIsLoggedIn(false);
    localStorage.setItem('loggedInfo', 'false'); // Store logged-in state in localStorage
    localStorage.removeItem('userInfo');
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <Flex>
      {userLoggedIn ? (
        <Button onClick={handleLogout}>Logout</Button>
      ) : (
        <Flex
          style={{
            border: 'solid 2px white',
            borderRadius: '25px',
            boxShadow: '1px 1px 5px 1px rgba(0, 0, 0, 0.6)',
            direction: 'row',
            borderColor: 'orangered',
            paddingTop: '5px',
            paddingRight: '5px',
            paddingLeft: '5px',
            paddingBottom: '5px',
          }}
        >
          <Flex mr={2}>
            <GoogleLogin
              clientId="568208948795-5dv85a002gctb076vpor6905ur987is0.apps.googleusercontent.com"
              onSuccess={backendLogin}
              onFailure={error => console.log('Google login failed:', error)}
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
              
              shape="pill"
              text='Login'
              render={(renderProps) => (
                <>
                  <input
                    type="text"
                    name="dummy2"
                    autoComplete="new-password"
                    style={{ display: 'none' }}
                  />
                  <div onClick={renderProps.onClick}>
                    <div>Sign Up</div>
                  </div>
                </>
              )}
            />
            Login
          </Flex>
          <Flex>
            <GoogleLogin
              clientId="568208948795-5dv85a002gctb076vpor6905ur987is0.apps.googleusercontent.com"
              onSuccess={backendSignUp}
              onFailure={error => console.log('Google login failed:', error)}
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
              
              shape="pill"
              text='Sign Up'
              render={(renderProps) => (
                <>
                  <input
                    type="text"
                    name="dummy2"
                    autoComplete="new-password"
                    style={{ display: 'none' }}
                  />
                  <div onClick={renderProps.onClick}>
                    <div>Sign Up</div>
                  </div>
                </>
              )}
            />
            Sign Up
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}
