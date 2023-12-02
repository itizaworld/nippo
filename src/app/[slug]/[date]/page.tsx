import { Metadata } from 'next';
import { getNippoByDate } from '~/app/_actions/nippoActions';
import { getObjectiveBySlug } from '~/app/_actions/objectiveActions';
import { URLS } from '~/app/_constants/urls';
import { generateNippoMetadata } from '~/libs/generateNippoMetadata';
import { fetchMe } from '~/app/_actions/userActions';
import { NippoEditor } from '~/app/_components/domains/Nippo/NippoEditor';
import { getDateString } from '~/libs/getDateString';
import { ObjectiveStickyHeader } from '~/app/_components/domains/Objective/ObjectiveStickyHeader';
import { NippoPreview } from '~/app/_components/domains/Nippo/NippoPreview';

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
      <div className="min-h-[500px] max-w-[1024px] mx-auto flex gap-[16px] md:gap-[48px]">
        <div className="px-[8px] pt-[16px] pb-[32px] w-[100%]">
          <ObjectiveStickyHeader objective={objective} />
          <p className="mt-[32px] text-xl font-bold mb-[8px] text-gray-700">{dateString}</p>
          {currentUser?._id === objective.createdUserId ? (
            <NippoEditor objectiveId={objective._id} nippo={nippo} />
          ) : (
            <NippoPreview nippo={nippo} />
          )}
        </div>
      </div>
    </div>
  );
}
