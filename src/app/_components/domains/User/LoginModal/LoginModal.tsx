'use client';

import { FC, useCallback } from 'react';
import { Image, Link, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { URLS } from '~/app/_constants/urls';

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
          <p className="mb-[4px]">目標達成のための一歩を踏み出そう！</p>
          <Link href={URLS.LOGIN_TO_BACKEND}>
            <Image className="mx-auto" src="/images/sign-in-google.png" width={200} />
          </Link>
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
