import React, { FC } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar';
import { Link } from '@nextui-org/link';
import { LoginButton } from '../../domains/User/LoginButton';
import { PersonalDropdown } from '../../domains/User/PersonalDropdown';
import { fetchMe } from '~/app/_actions/userActions';

export const NippoNavbar: FC = async () => {
  const { currentUser } = await fetchMe();

  return (
    <Navbar isBordered isBlurred={false} position="static">
      <NavbarBrand>
        <Link href="/" color="foreground" className="font-bold">
          みんなの日報
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>{currentUser ? <PersonalDropdown user={currentUser} /> : <LoginButton />}</NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
