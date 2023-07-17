import React, { useState, useEffect, useContext } from 'react';
import { Button, VStack, Badge, useDisclosure } from '@chakra-ui/react';
import {
  googleLogout,
  useGoogleLogin,
  GoogleLogin,
  useGoogleOneTapLogin,
} from '@react-oauth/google';
import axios from 'axios';
import {
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Avatar,
  AvatarBadge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { APIContext } from './APIContext';
import { MapContext } from './MapContext';

export default function SignUpForm({ setIsLoggedIn }) {
  const [loading, setLoading] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [buttonsDirection, setButtonsDirection] = useState('row');
  const { isMobile, hasTouchScreen } = useContext(MapContext);
  const { globalUserInfo, setGlobalUserInfo } = useContext(APIContext);
  const [userInfoFetched, setUserInfoFetched] = useState(false);
  const { setIsDrawerOpen } = useContext(MapContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalContent, setModalContent] = useState('signUp');

  const handleButtonClick = content => {
    setModalContent(content);
    onOpen();
  };

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

  useEffect(() => {
    console.log(hasTouchScreen);
    if (hasTouchScreen) {
      setButtonsDirection('column');
      console.log('buttonssssss', buttonsDirection);
    } else {
      setButtonsDirection('row');
    }
  }, [hasTouchScreen]);

  const backendLogin = async credentialResponse => {
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
          setGlobalUserInfo(response.data);

          if (response.status === 200) {
            setGlobalUserInfo(response.data);
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
    setIsDrawerOpen(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <Flex
      flexDirection={buttonsDirection}
      minWidth="190px"
      justifyContent="flex-end"
    >
      {userLoggedIn ? (
        <Button
          bg="#ff914d"
          color="white"
          border="solid 1px orangered"
          borderRadius="25px"
          _hover={{ bg: 'orangered', color: 'white' }}
          onClick={handleLogout}
        >
          Log Out
        </Button>
      ) : (
        <>
          <Flex mr={2}>
            <Button
              bg="white"
              border="solid 1px orangered"
              borderRadius="25px"
              onClick={() => {
                handleButtonClick('logIn');
              }}
            >
              Log In
            </Button>
          </Flex>
          <Flex>
            <Button
              bg="#ff914d"
              color="white"
              border="solid 1px orangered"
              borderRadius="25px"
              _hover={{ bg: 'orangered', color: 'white' }}
              onClick={() => handleButtonClick('signUp')}
            >
              Sign Up
            </Button>
          </Flex>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                {modalContent === 'logIn' ? 'Welcome back!' : 'Welcome!'}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {modalContent === 'logIn' ? (
                  <GoogleLogin
                    clientId="568208948795-5dv85a002gctb076vpor6905ur987is0.apps.googleusercontent.com"
                    onSuccess={backendLogin}
                    onFailure={error =>
                      console.log('Google login failed:', error)
                    }
                    cookiePolicy="single_host_origin"
                    icon="false"
                    style={{
                      marginLeft: '1.5em',
                      marginTop: '1em',
                    }}
                    color="black"
                    bg="white"
                    border="1px"
                    borderRadius="0px"
                    borderColor="orangered"
                    shape="pill"
                    buttonText="Login"
                  />
                ) : (
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
                    buttonText="Sign Up"
                    shape="pill"
                    text="Sign Up"
                  />
                )}
              </ModalBody>
              <ModalFooter />
            </ModalContent>
          </Modal>
        </>
      )}
    </Flex>
  );
}
