import { format } from 'date-fns';
import { Link } from '@nextui-org/link';
import { Metadata } from 'next';
import { getObjectiveBySlug, getObjectiveNippos } from '../_actions/objectiveActions';
import { URLS } from '../_constants/urls';
import { ObjectiveStickyHeader } from '../_components/domains/Objective/ObjectiveStickyHeader';
import { NippoEditor } from '~/app/_components/domains/Nippo/NippoEditor';
import { NippoPreview } from '~/app/_components/domains/Nippo/NippoPreview';
import { fetchMe } from '~/app/_actions/userActions';
import { getCurrentDate } from '~/libs/getCurrentDate';
import { generateNippoMetadata } from '~/libs/generateNippoMetadata';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { objective } = await getObjectiveBySlug(params.slug);

  return generateNippoMetadata({ title: objective.name, url: URLS.SLUG(params.slug) });
}

export default async function Page({ params }: { params: { slug: string } }) {
  const [{ objective }, { currentUser }] = await Promise.all([getObjectiveBySlug(params.slug), fetchMe()]);
  const { nippos } = await getObjectiveNippos({ objectiveId: objective._id, isMyObjective: currentUser?._id === objective.createdUserId });

  const todayNippo = nippos.find((nippo) => nippo.date === format(getCurrentDate(), 'yyyy-MM-dd'));

  return (
    <div className="drop-shadow-sm">
      <div className="min-h-[500px] max-w-[1024px] mx-auto flex gap-[16px] md:gap-[48px]">
        <div className="px-[8px] pt-[16px] pb-[32px] w-[100%]">
          <ObjectiveStickyHeader objective={objective} />
          <Link href={URLS.SLUG_DATE(objective.slug, format(getCurrentDate(), 'yyyy-MM-dd'))} className="cursor-pointer">
            <p className="mt-[32px] text-xl font-bold mb-[8px] text-gray-700">{format(getCurrentDate(), 'yyyy年 MM月dd日')}</p>
          </Link>
          {currentUser?._id === objective.createdUserId ? (
            <div className="h-[500px]">
              <NippoEditor objectiveId={objective._id} date={format(getCurrentDate(), 'yyyy-MM-dd')} nippo={todayNippo} />
            </div>
          ) : (
            <NippoPreview body={todayNippo?.body} date={format(getCurrentDate(), 'yyyy-MM-dd')} />
          )}
          <div className="mt-[40px]">
            {nippos
              .filter((nippo) => nippo._id !== todayNippo?._id)
              .map((nippo) => {
                return (
                  <div key={nippo._id}>
                    <Link href={URLS.SLUG_DATE(objective.slug, nippo.date)} className="cursor-pointer">
                      <p className="mt-[32px] text-xl font-bold mb-[8px] text-gray-700">{format(new Date(nippo.date), 'yyyy年 MM月dd日')}</p>
                    </Link>
                    <NippoPreview body={nippo.body} date={nippo.date} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
