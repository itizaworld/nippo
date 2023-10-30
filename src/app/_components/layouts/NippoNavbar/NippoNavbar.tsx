import React, { FC } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar';
import { Link } from '@nextui-org/link';
import { getServerSession } from 'next-auth';
import { LoginButton } from '../../domains/User/LoginButton';
import { PersonalDropdown } from '../../domains/User/PersonalDropdown';
import { authOptions } from '~/app/api/auth/[...nextauth]/route';
import { User } from '~/domains/User';

export const NippoNavbar: FC = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <Navbar isBordered isBlurred={false}>
      <NavbarBrand>
        <Link href="/" color="foreground" className="font-bold">
          みんなの日報
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        {/* TODO: 型アサーションを修正する */}
        <NavbarItem>{user ? <PersonalDropdown user={user as User} /> : <LoginButton />}</NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
