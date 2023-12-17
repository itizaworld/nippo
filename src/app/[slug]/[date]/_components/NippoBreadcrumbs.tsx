'use client';

import { BreadcrumbItem, Breadcrumbs, Link } from '@nextui-org/react';
import { FC } from 'react';
import { URLS } from '~/app/_constants/urls';
import { Objective } from '~/domains/Objective';

type Props = {
  objective: Objective;
  date: string;
};

export const NippoBreadcrumbs: FC<Props> = ({ objective, date }) => {
  return (
    <Breadcrumbs>
      <BreadcrumbItem>
        <Link href={URLS.SLUG(objective.slug)} className="text-black">
          {objective.name}
        </Link>
      </BreadcrumbItem>
      <BreadcrumbItem>{date}</BreadcrumbItem>
    </Breadcrumbs>
  );
};
