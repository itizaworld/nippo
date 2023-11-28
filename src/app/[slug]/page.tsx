import { format } from 'date-fns';
import { Link } from '@nextui-org/link';
import { getObjectiveBySlug, getObjectiveNippos } from '../_actions/objectiveActions';
import { URLS } from '../_constants/urls';
import { NippoEditor } from '~/app/_components/domains/Nippo/NippoEditor';
import { NippoPreview } from '~/app/_components/domains/Nippo/NippoPreview';
import { fetchMe } from '~/app/_actions/userActions';
import { getCurrentDate } from '~/libs/getCurrentDate';

export default async function Page({ params }: { params: { slug: string } }) {
  const [{ objective }, { currentUser }] = await Promise.all([getObjectiveBySlug(params.slug), fetchMe()]);
  const { nippos } = await getObjectiveNippos({ objectiveId: objective._id, isMyObjective: currentUser?._id === objective.createdUserId });

  const todayNippo = nippos.find((nippo) => nippo.date === format(getCurrentDate(), 'yyyy-MM-dd'));

  return (
    <div className="drop-shadow-sm">
      <div className="min-h-[500px] max-w-[1024px] mx-auto flex flex-col-reverse md:flex-row gap-[16px] md:gap-[48px]">
        <div className="px-[8px] pt-[16px] pb-[32px] w-[100%]">
          <h1 className="text-2xl font-bold pb-[8px] border-b-1">{objective.name}</h1>
          <p className="mt-[32px] text-xl font-bold mb-[8px] text-gray-700">{format(getCurrentDate(), 'yyyy年 MM月dd日')}</p>
          {currentUser?._id === objective.createdUserId ? (
            <div className="h-[500px]">
              <NippoEditor objectiveId={objective._id} date={format(getCurrentDate(), 'yyyy-MM-dd')} todayNippo={todayNippo} />
            </div>
          ) : todayNippo ? (
            <NippoPreview body={todayNippo.body} />
          ) : (
            <div>今日の日報はまだありません</div>
          )}
          <div className="mt-[40px]">
            {nippos
              .filter((nippo) => nippo._id !== todayNippo?._id)
              .map((nippo) => {
                return (
                  <div key={nippo._id}>
                    <Link href={URLS.SLUG_DATE(objective.slug, nippo.date)}>
                      <p className="mt-[32px] text-xl font-bold mb-[8px] text-gray-700">{format(new Date(nippo.date), 'yyyy年 MM月dd日')}</p>
                    </Link>
                    <NippoPreview body={nippo.body} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
