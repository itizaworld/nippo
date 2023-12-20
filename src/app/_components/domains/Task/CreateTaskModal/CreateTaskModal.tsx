'use client';

import { FC, useCallback, useState } from 'react';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from '@nextui-org/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Task } from '~/domains/Task';

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  currentTask?: Task;
};

interface IFormInput {
  title: string;
  body: string;
}

export const CreateModal: FC<Props> = ({ isOpen, onOpenChange, currentTask }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, reset } = useForm<IFormInput>({
    defaultValues: {
      title: currentTask?.title,
      body: currentTask?.body,
    },
  });

  const handleOpenChange = useCallback(() => {
    reset();
    onOpenChange();
  }, [onOpenChange, reset]);

  const onSubmit: SubmitHandler<IFormInput> = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    new Promise((resolve) => setTimeout(resolve, 1000))
      .catch((error) => {
        // TODO: 本来はコンソールに出すのではなく、ユーザーにエラーを通知する
        console.error(error);
      })
      .then(() => {
        handleOpenChange();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [handleOpenChange, isLoading]);

  return (
    <Modal isOpen={isOpen} onOpenChange={handleOpenChange} placement="center" hideCloseButton size="xl">
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>タスクを{currentTask ? '編集' : '作成'}する</ModalHeader>
          <ModalBody>
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  label="タイトル"
                  isInvalid={fieldState.isDirty && field.value.length === 0}
                  errorMessage={fieldState.isDirty && field.value.length === 0 && 'タイトルを入力してください'}
                />
              )}
            />
            <Controller
              name="body"
              control={control}
              render={({ field, fieldState }) => (
                <Textarea
                  {...field}
                  label="説明"
                  isInvalid={fieldState.isDirty && field.value.length === 0}
                  errorMessage={fieldState.isDirty && field.value.length === 0 && 'タイトルを入力してください'}
                />
              )}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleSubmit(onSubmit)} isLoading={isLoading}>
              タスクを作成
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
