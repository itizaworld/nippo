'use client';

import { FC } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from '@nextui-org/react';
import { signOut } from 'next-auth/react';
import { User } from '~/domains/User';

export const PersonalDropdown: FC<{ user: User }> = ({ user }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className="cursor-pointer" src={user.image} isBordered />
      </DropdownTrigger>
      <DropdownMenu variant="faded">
        <DropdownItem onClick={() => signOut()} key="logout">
          ログアウトする
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
