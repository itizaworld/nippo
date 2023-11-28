import { format } from 'date-fns';
import { Metadata } from 'next';
import { NippoPreview } from '~/app/_components/domains/Nippo/NippoPreview/NippoPreview';
import { getNippoByDate } from '~/app/_actions/nippoActions';
import { getObjectiveBySlug } from '~/app/_actions/objectiveActions';

type Props = { params: { slug: string; date: string } };

const getDateString = (date: string) => format(new Date(date), 'yyyy年 MM月dd日');

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [{ objective }, { nippo }] = await Promise.all([getObjectiveBySlug(params.slug), getNippoByDate(params.date)]);

  return { title: `${objective.name}:${nippo.date}` };
}

export default async function Page({ params }: Props) {
  const [{ objective }, { nippo }] = await Promise.all([getObjectiveBySlug(params.slug), getNippoByDate(params.date)]);
  const dateString = getDateString(nippo.date);

  return (
    <div className="drop-shadow-sm">
      <div className="min-h-[500px] max-w-[1024px] mx-auto flex flex-col-reverse md:flex-row gap-[16px] md:gap-[48px]">
        <div className="px-[8px] pt-[16px] pb-[32px] w-[100%]">
          <h1 className="text-2xl font-bold pb-[8px] border-b-1">{objective.name}</h1>
          <p className="mt-[32px] text-xl font-bold mb-[8px] text-gray-700">{dateString}</p>
          {nippo ? <NippoPreview body={nippo.body} /> : <div>{dateString}の日報はまだありません</div>}
        </div>
      </div>
    </div>
  );
}
