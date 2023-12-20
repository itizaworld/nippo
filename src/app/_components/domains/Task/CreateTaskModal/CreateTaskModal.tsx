'use client';

import { FC, useCallback, useState } from 'react';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter } from '@nextui-org/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { TaskEditor } from '../TaskEditor';
import { postTask } from '~/app/_actions/taskActions';

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  objectiveId: string;
};

interface IFormInput {
  title: string;
  body: string;
}

export const CreateModal: FC<Props> = ({ isOpen, onOpenChange, objectiveId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { control, formState, getValues, handleSubmit, reset } = useForm<IFormInput>({
    defaultValues: {
      title: '',
      body: '',
    },
  });

  console.log(getValues().body);

  const handleOpenChange = useCallback(() => {
    reset();
    onOpenChange();
  }, [onOpenChange, reset]);

  const onSubmit: SubmitHandler<IFormInput> = useCallback(
    async (inputData) => {
      if (isLoading) return;
      setIsLoading(true);
      postTask({ title: inputData.title, body: inputData.body, dueDate: new Date(), objectiveId })
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
    },
    [handleOpenChange, isLoading, objectiveId],
  );

  return (
    <Modal isOpen={isOpen} onOpenChange={handleOpenChange} placement="center" hideCloseButton size="xl">
      <ModalContent>
        <ModalBody className="my-[8px]">
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                placeholder="タスクの名前"
                isInvalid={fieldState.isDirty && field.value.length === 0}
                errorMessage={fieldState.isDirty && field.value.length === 0 && 'タイトルを入力してください'}
                variant="underlined"
                size="lg"
              />
            )}
          />
          <Controller
            name="body"
            control={control}
            rules={{ required: true, minLength: 1 }}
            render={({ field }) => <TaskEditor onChangeText={async (body) => field.onChange(body)} />}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit(onSubmit)} isLoading={isLoading} isDisabled={!formState.isValid}>
            タスクを作成
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
