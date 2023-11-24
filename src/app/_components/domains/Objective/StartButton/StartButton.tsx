'use client';

import { Button, Link, useDisclosure } from '@nextui-org/react';
import { FC, useState } from 'react';
import { LoginModal } from '../../User/LoginModal';
import { postObjective } from '~/app/_actions/objectiveActions';
import { User } from '~/domains/User';
import { Objective } from '~/domains/Objective';
import { URLS } from '~/app/_constants/urls';

type Props = {
  currentUser?: User;
  objective?: Objective;
};

export const StartButton: FC<Props> = ({ currentUser, objective }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const handleClickStartButton = async () => {
    if (!currentUser) return onOpen();

    setIsLoading(true);
    try {
      await postObjective(`${currentUser.username}の日報`);
    } finally {
      setIsLoading(false);
    }
  };

  if (objective) {
    return (
      <Link href={URLS.OBJECTIVE(objective._id)}>
        <Button className="w-[200px]" color="primary" onClick={handleClickStartButton} variant="bordered">
          再開する
        </Button>
      </Link>
    );
  }

  return (
    <>
      <Button className="w-[200px]" color="primary" onClick={handleClickStartButton} variant="bordered" disabled={isLoading}>
        始める！
      </Button>
      <LoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};
