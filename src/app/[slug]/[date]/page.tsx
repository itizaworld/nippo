import { Metadata } from 'next';
import { NippoPreview } from '~/app/_components/domains/Nippo/NippoPreview/NippoPreview';
import { getNippoByDate } from '~/app/_actions/nippoActions';
import { getObjectiveBySlug } from '~/app/_actions/objectiveActions';
import { URLS } from '~/app/_constants/urls';
import { generateNippoMetadata } from '~/libs/generateNippoMetadata';
import { fetchMe } from '~/app/_actions/userActions';
import { NippoEditor } from '~/app/_components/domains/Nippo/NippoEditor';
import { Tabs } from '~/app/_components/uiParts/Tabs';
import { getDateString } from '~/libs/getDateString';

type Props = { params: { slug: string; date: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [{ objective }] = await Promise.all([getObjectiveBySlug(params.slug)]);
  const dateString = getDateString(params.date);

  return generateNippoMetadata({ title: `${objective.name}:${dateString}`, url: URLS.SLUG_DATE(params.slug, params.date) });
}

export default async function Page({ params }: Props) {
  const [{ objective }, { nippo }, { currentUser }] = await Promise.all([
    getObjectiveBySlug(params.slug),
    getNippoByDate(params.slug, params.date),
    fetchMe(),
  ]);
  const dateString = getDateString(params.date);

  return (
    <div className="drop-shadow-sm">
      <div className="min-h-[500px] max-w-[1024px] mx-auto flex flex-col-reverse md:flex-row gap-[16px] md:gap-[48px]">
        <div className="px-[8px] pt-[16px] pb-[32px] w-[100%]">
          <h1 className="text-2xl font-bold pb-[8px] border-b-1">{objective.name}</h1>
          <p className="mt-[32px] text-xl font-bold mb-[8px] text-gray-700">{dateString}</p>
          {currentUser?._id === objective.createdUserId ? (
            <Tabs
              tabItems={[
                {
                  title: 'エディター',
                  key: 'editor',
                  children: <NippoEditor objectiveId={objective._id} date={params.date} nippo={nippo} />,
                },
                {
                  title: 'プレビュー',
                  key: 'preview',
                  children: <NippoPreview body={nippo?.body} date={params.date} />,
                },
              ]}
            />
          ) : (
            <NippoPreview body={nippo?.body} date={params.date} />
          )}
        </div>
      </div>
    </div>
  );
}
