'use client';

import { Button, Link } from '@nextui-org/react';
import { format } from 'date-fns';

import { Icon } from '~/app/_components/uiParts/icons';
import { Nippo } from '~/domains/Nippo';

export const NippoShareIcon = ({ nippo }: { nippo: Nippo }) => {
  return (
    <Link
      href={`https://twitter.com/intent/tweet?text=${format(new Date(nippo.date), 'yyyy年MM月dd日')}の日報&hashtags=みんなの日報&url=${
        window.location.href
      }`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button isIconOnly size="sm" variant="light" radius="full">
        <Icon icon="TWITTER_X" height={16} width={16} />
      </Button>
    </Link>
  );
};
