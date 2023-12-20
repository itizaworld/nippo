'use client';

import { FC, useCallback } from 'react';
import { Input, Modal, ModalBody, ModalContent } from '@nextui-org/react';
import { TaskEditor } from '../TaskEditor';
import { Task } from '~/domains/Task';

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  currentTask?: Task;
};

export const CreateModal: FC<Props> = ({ isOpen, onOpenChange, currentTask }) => {
  const handleOpenChange = useCallback(() => {
    onOpenChange();
  }, [onOpenChange]);

  return (
    <Modal isOpen={isOpen} onOpenChange={handleOpenChange} placement="center" hideCloseButton size="xl">
      <ModalContent>
        <ModalBody className="my-[8px]">
          <Input defaultValue={currentTask?.title} placeholder="タスクの名前" variant="underlined" size="lg" />
          <TaskEditor task={currentTask} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
