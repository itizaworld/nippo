'use client';

import { FC, useCallback } from 'react';
import { Image, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { signIn } from 'next-auth/react';

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
};

export const LoginModal: FC<Props> = ({ isOpen, onOpenChange }) => {
  const handleOpenChange = useCallback(() => {
    onOpenChange();
  }, [onOpenChange]);

  return (
    <Modal isOpen={isOpen} onOpenChange={handleOpenChange} placement="center" hideCloseButton>
      <ModalContent>
        <ModalHeader>ようこそ みんなの日報 へ！</ModalHeader>
        <ModalBody className="pb-[24px] items-center">
          <div className="cursor-pointer" onClick={() => signIn('google')}>
            <Image className="mx-auto" src="/images/sign-in-google.png" width={200} />
          </div>
          {/* TODO: ページが作成されたら有効にする */}
          {/* <p className="text-slate-600">
            ログインする前に、
            <Link href="https://nippo.wiscro.app/terms" className="text-sky-500" target="_blank" rel="noreferrer">
              利用規約
            </Link>
            および
            <Link href="https://nippo.wiscro.app/policy" className="text-sky-500" target="_blank" rel="noreferrer">
              プライバシーポリシー
            </Link>
            に同意してください。
          </p> */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
