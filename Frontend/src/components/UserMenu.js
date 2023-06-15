import React from "react"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
  Text,
  Avatar,
  Heading
} from '@chakra-ui/react'
import { FaChevronDown } from 'react-icons/fa'

export default function UserMenu({ handleLogout }) {
    return (
        <Menu>
          <MenuButton as={Button} rightIcon={<FaChevronDown />} h="60px" bg="white" border="1px" borderColor="orangered">
            <Flex align="center">
              <Avatar size="md" src="avatar.jpg" />
              <Flex flexDir="column" ml={3}>
                <Heading as="h3" size="sm">Elon Musk</Heading>
                  <Text color="gray" fontSize="14px">Tourist</Text>
              </Flex>
            </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem>My Profile</MenuItem>
              <MenuItem>My Data</MenuItem>
              <MenuItem onClick={handleLogout} color="red">Log Out</MenuItem>
            </MenuList>
        </Menu>
    )
}