import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
} from '@chakra-ui/react';

const SignUpForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormInvalid, setIsFormInvalid] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();

    if (!username || !email || !password) {
      setIsFormInvalid(true);
      return;
    }

    // Perform form submission logic here
    // Make an API call to create a user profile

    // Set the isSubmitted state to true after successful submission
    setIsSubmitted(true);
  };

  return (
    <form>
      {isSubmitted ? (
        <div>
          <p>Application submitted!</p>
          <p>
            Thanks for submitting your application. Check your email for
            verification.
          </p>
        </div>
      ) : (
        <VStack spacing={4} align="start">
          <FormControl isRequired>
            <FormLabel>
              Username
              {isFormInvalid && !username && (
                <span style={{ color: 'red' }}> (required)</span>
              )}
            </FormLabel>
            <Input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>
              Email
              {isFormInvalid && !email && (
                <span style={{ color: 'red' }}> (required)</span>
              )}
            </FormLabel>
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>
              Password
              {isFormInvalid && !password && (
                <span style={{ color: 'red' }}> (required)</span>
              )}
            </FormLabel>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </FormControl>

          <Button onClick={handleSubmit} type="submit" colorScheme="blue">
            Create Profile
          </Button>
        </VStack>
      )}
    </form>
  );
};

export default SignUpForm;
