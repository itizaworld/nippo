import { Link } from '@nextui-org/link';
import { format } from 'date-fns';
import { getObjective } from '../../_actions/objectiveActions';
import { NippoEditor } from './_components/Editor';

export default async function Page({ params }: { params: { id: string } }) {
  const { object } = await getObjective(params.id);

  return (
    <div className="drop-shadow-sm">
      <div className="min-h-[500px] max-w-[1024px] mx-auto flex flex-col-reverse md:flex-row gap-[16px] md:gap-[48px]">
        <div className="px-[8px] pt-[16px] pb-[32px] w-[100%]">
          <h1 className="text-2xl font-bold pb-[8px] border-b-1">{object.name}</h1>
          <p className="mt-[32px] text-xl font-bold mb-[8px] text-gray-700">{format(new Date(), 'yyyy年 MM月dd日')}</p>
          <div className="h-[500px]">
            <NippoEditor />
          </div>
          <Link href="https://twitter.com/same_gum" className="mt-[40px]" target="_blank">
            開発進捗はXで発信しています
          </Link>
        </div>
      </div>
    </div>
  );
}
