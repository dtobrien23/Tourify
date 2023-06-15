import React from "react"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button
} from '@chakra-ui/react'
import UserDropdown from './UserDropdown'
import { FaChevronDown } from 'react-icons/fa'

export default function UserMenu({ handleLogout }) {
    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<FaChevronDown />} h="60px" bg="white" border="1px" borderColor="orangered">
              <UserDropdown />
            </MenuButton>
            <MenuList>
              <MenuItem>My Profile</MenuItem>
              <MenuItem>My Data</MenuItem>
              <MenuItem onClick={handleLogout} color="red">Log Out</MenuItem>
            </MenuList>
        </Menu>
    )
}