import { format } from 'date-fns';
import { NippoPreview } from '~/app/_components/domains/Nippo/NippoPreview/NippoPreview';
import { fetchMe } from '~/app/_actions/userActions';
import { getNippoByDate } from '~/app/_actions/nippoActions';

export default async function Page({ params }: { params: { date: string } }) {
  const [{ nippo }] = await Promise.all([getNippoByDate(params.date), fetchMe()]);
  const dateString = format(new Date(nippo.date), 'yyyy年 MM月dd日');

  return (
    <div className="drop-shadow-sm">
      <div className="min-h-[500px] max-w-[1024px] mx-auto flex flex-col-reverse md:flex-row gap-[16px] md:gap-[48px]">
        <div className="px-[8px] pt-[16px] pb-[32px] w-[100%]">
          <p className="mt-[32px] text-xl font-bold mb-[8px] text-gray-700">{dateString}</p>
          {nippo ? <NippoPreview body={nippo.body} /> : <div>{dateString}の日報はまだありません</div>}
        </div>
      </div>
    </div>
  );
}
