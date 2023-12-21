'use client';

import { Button, Card, useDisclosure } from '@nextui-org/react';
import { FC } from 'react';
import { CreateModal } from '../CreateTaskModal';
import { Icon } from '~/app/_components/uiParts/icons';
import { Task } from '~/domains/Task';

type Props = {
  objectiveId: string;
  tasks: Task[];
};

export const TaskList: FC<Props> = ({ objectiveId, tasks }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="w-full">
      <p className="text-md font-bold mb-[16px] text-gray-700">タスク一覧</p>
      <div className="flex flex-col gap-[8px]">
        {tasks.map((task) => {
          return (
            <Card key={task._id} className="md:p-[8px] p-[4px] flex flex-col rounded-[8px] cursor-pointer" shadow="none" radius="none">
              ここにタスク一覧が表示されます
            </Card>
          );
        })}
      </div>
      <Button className="mt-[8px]" size="sm" color="primary" variant="light" startContent={<Icon icon="PLUS" />} onClick={() => onOpen()}>
        タスクの追加
      </Button>
      <CreateModal isOpen={isOpen} onOpenChange={onOpenChange} objectiveId={objectiveId} />
    </div>
  );
};
