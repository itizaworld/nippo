import { FC } from 'react';
import { Avatar } from '@nextui-org/avatar';
import { User } from '~/domains/User';

export const PersonalDropdown: FC<{ user: User }> = ({ user }) => {
  return <Avatar className="cursor-pointer" src={user.profileUrl} isBordered />;

  // TODO: menuができたら表示
  // return (
  //   <Dropdown>
  //     <DropdownTrigger>
  //       <Avatar className="cursor-pointer" src={user.image} isBordered />
  //     </DropdownTrigger>
  //     <DropdownMenu variant="faded">
  //       <DropdownItem onClick={() => signOut()} key="logout">
  //         ログアウトする
  //       </DropdownItem>
  //     </DropdownMenu>
  //   </Dropdown>
  // );
};
