'use client';

import { Button, useDisclosure } from '@nextui-org/react';
import { FC, useState } from 'react';
import { LoginModal } from '../../User/LoginModal';
import { postObjective } from '~/app/_actions/objectiveActions';
import { User } from '~/domains/User';

type Props = {
  currentUser?: User;
};

export const StartButton: FC<Props> = ({ currentUser }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const handleClickStartButton = async () => {
    if (!currentUser) return onOpen();

    setIsLoading(true);
    try {
      await postObjective(`${currentUser.username}の目標`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button color="primary" onClick={handleClickStartButton} variant="bordered" fullWidth disabled={isLoading}>
        始める！
      </Button>
      <LoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};
