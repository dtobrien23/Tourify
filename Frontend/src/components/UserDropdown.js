import React from "react";
import {
    Flex,
    Text,
    Avatar,
    Heading
} from '@chakra-ui/react'

export default function UserDropdown() {
    return (
        <Flex align="center">
            <Avatar size="md" src="avatar.jpg" />
            <Flex flexDir="column" ml={3}>
              <Heading as="h3" size="sm">Elon Musk</Heading>
              <Text color="gray" fontSize="14px">Tourist</Text>
            </Flex>
        </Flex>
    )
}