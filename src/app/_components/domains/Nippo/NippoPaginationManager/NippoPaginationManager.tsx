'use client';
import { useRouter } from 'next/navigation';

import { Pagination } from '@nextui-org/react';
import { FC } from 'react';
import { Nippo } from '~/domains/Nippo';
import { PaginationResult } from '~/domains/PaginationResult';

type Props = {
  nippoPagination: PaginationResult<Nippo>;
};

export const NippoPaginationManager: FC<Props> = ({ nippoPagination }) => {
  const router = useRouter();
  const handleChange = (page: number) => {
    router.push(`?page=${page}`);
  };
  return (
    <Pagination className="mt-[40px] flex justify-center" isCompact showControls onChange={handleChange} total={nippoPagination.totalPages} />
  );
};
