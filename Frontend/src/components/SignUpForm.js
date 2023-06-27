import React from 'react';
import { useState, useEffect } from 'react';
import { Button, VStack, Badge } from '@chakra-ui/react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Avatar, AvatarBadge } from '@chakra-ui/react';

function SignUpForm() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const login = useGoogleLogin({
    onSuccess: codeResponse => setUser(codeResponse),
    onError: error => console.log('Login Failed:', error),
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
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
    localStorage.removeItem('user');
    setProfile(null);
    setUser(null);
  };

  return (
    <VStack spacing={4} align="start">
      <div>
        {profile ? (
          <div>
            <Avatar
              size={'md'}
              marginTop={'0.5em'}
              marginLeft={'3em'}
              name={profile.name}
              src={profile.picture}
              alt="user image"
            >
              <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Avatar>
            <div>
              <Button
                onClick={logOut}
                style={{
                  marginRight: '0.5em',
                  marginTop: '0.5em',
                  marginBottom: '0.5em',
                  marginLeft: '5em'
                  
                }}
                color="black"
                bg="white"
                border="1px"
                borderColor="orangered"
                size='sm'
              >
                Log out
              </Button>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => login()}
            style={{ marginLeft: '1.5em', marginTop: '1em' }}
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
    </VStack>
  );
}

export default SignUpForm;
