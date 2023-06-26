import React from 'react';
import { useState, useEffect } from 'react';
import { Button, VStack, Badge } from '@chakra-ui/react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function SignUpForm() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const login = useGoogleLogin({
    onSuccess: codeResponse => setUser(codeResponse),
    onError: error => console.log('Login Failed:', error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json',
            },
          }
        )
        .then(res => {
          setProfile(res.data);
        })
        .catch(err => console.log(err));
    }
  }, [user]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <VStack spacing={4} align="start">
      <div>
        {profile ? (
          <div>
            <div>
              <Badge>
              <img src={profile.picture} alt="user image" />
              <h3>User Logged in</h3>
              <p>Name: {profile.name}</p>
              <p>Email Address: {profile.email}</p>
              </Badge>
            </div>
            <Button
              onClick={logOut}
              style={{ marginRight: '1em' }}
              color="black"
              bg="white"
              border="1px"
              borderRadius="10px"
              borderColor="orangered"
            >
              Log out
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => login()}
            style={{ marginRight: '1em' }}
            color="black"
            bg="white"
            border="1px"
            borderRadius="10px"
            borderColor="orangered"
          >
            Sign in with Google{' '}
          </Button>
        )}
      </div>
      );
    </VStack>
  );
}

export default SignUpForm;
