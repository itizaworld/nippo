import React, { FC } from 'react';
import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/navbar';
import { Link } from '@nextui-org/link';
import { LoginButton } from '../../domains/User/LoginButton';

export const NippoNavbar: FC = () => {
  return (
    <>
      <Navbar isBordered isBlurred={false}>
        <NavbarBrand>
          <Link href="/" color="foreground" className="font-bold">
            みんなの日報
          </Link>
        </NavbarBrand>
        <NavbarContent justify="end">
          <LoginButton />
        </NavbarContent>
      </Navbar>
    </>
  );
};
