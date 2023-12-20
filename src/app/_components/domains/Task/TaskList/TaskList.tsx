'use client';

import { Button, Card } from '@nextui-org/react';
import { FC } from 'react';
import { Icon } from '~/app/_components/uiParts/icons';
export const TaskList: FC = () => {
  return (
    <div className="w-full">
      <p className="text-md font-bold mb-[16px] text-gray-700">タスク一覧</p>
      <Card className="md:p-[8px] p-[4px] flex flex-col rounded-[8px]" shadow="none" radius="none">
        ここにタスク一覧が表示されます
      </Card>
      <Button className="mt-[8px]" size="sm" color="primary" variant="light" startContent={<Icon icon="PLUS" />}>
        タスクの追加
      </Button>
    </div>
  );
};
