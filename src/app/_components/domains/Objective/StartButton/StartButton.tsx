'use client';

import { Button } from '@nextui-org/react';
import { FC, useState } from 'react';
import { postObjective } from '~/app/_actions/objectiveActions';
import { User } from '~/domains/User';

type Props = {
  currentUser: User;
};

export const StartButton: FC<Props> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClickStartButton = async () => {
    setIsLoading(true);
    await postObjective(`${currentUser.username}の目標`).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <Button color="primary" onClick={handleClickStartButton} variant="bordered" fullWidth disabled={isLoading}>
      始める！
    </Button>
  );
};
