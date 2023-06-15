import React from 'react'
import {
    Flex,
    Button
} from '@chakra-ui/react'


export default function LoginButtons({ handleLogin }) {
  return (
    <Flex>
      <Button onClick={handleLogin} style={{ marginRight: '1em' }} color="black" bg="white" border='1px' borderRadius="10px" borderColor="orangered">
        Log In
      </Button>
      <Button color="white" bg="orangered" borderRadius="10px">
        Sign Up
      </Button>
    </Flex>
  )
}