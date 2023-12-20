'use client';

import { Card } from '@nextui-org/react';
import { FC } from 'react';
export const TaskList: FC = () => {
  return (
    <div className="w-full">
      <p className="text-md font-bold mb-[4px] text-gray-700">タスク一覧</p>
      <Card className="md:p-[8px] p-[4px] flex flex-col rounded-[8px]" shadow="none" radius="none">
        ここにタスク一覧が表示されます
      </Card>
    </div>
  );
};
