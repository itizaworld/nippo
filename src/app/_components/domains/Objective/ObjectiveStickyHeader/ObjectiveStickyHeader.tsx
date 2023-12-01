import { Link } from '@nextui-org/link';
import { FC } from 'react';
import { URLS } from '~/app/_constants/urls';
import { Objective } from '~/domains/Objective';

type Props = {
  objective: Objective;
};
export const ObjectiveStickyHeader: FC<Props> = ({ objective }) => {
  return (
    <h1 className="text-xl md:text-2xl font-bold py-[8px] border-b-1 sticky md:static mx-[-8px] px-[8px] md:mx-[0px] md:px-[0px] top-0 z-10 bg-slate-50">
      <Link href={URLS.SLUG(objective.slug)} className="cursor-pointer text-inherit">
        {objective.name}
      </Link>
    </h1>
  );
};
