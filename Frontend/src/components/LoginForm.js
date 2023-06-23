import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
} from '@chakra-ui/react';

const LoginForm = () => {
  return (
    <form>
      <VStack spacing={4} align="start">
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            //value={email}
            //onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            //value={password}
            //onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>

        <Button type="submit" colorScheme="blue">
          Log in
        </Button>
      </VStack>
    </form>
  );
};

export default LoginForm;
