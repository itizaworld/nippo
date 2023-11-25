import { format } from 'date-fns';
import { getObjective, getObjectiveNippos } from '../../_actions/objectiveActions';
import { NippoEditor } from './_components/NippoEditor';
import { NippoPreview } from './_components/NippoPreview/NippoPreview';
import { fetchMe } from '~/app/_actions/userActions';

export default async function Page({ params }: { params: { id: string } }) {
  const [{ objective }, { currentUser }] = await Promise.all([getObjective(params.id), fetchMe()]);
  const { nippos } = await getObjectiveNippos({ objectiveId: objective._id, isMyObjective: currentUser?._id === objective.createdUserId });
  const todayNippo = nippos.find((nippo) => nippo.date === format(new Date(), 'yyyy-MM-dd'));

  return (
    <div className="drop-shadow-sm">
      <div className="min-h-[500px] max-w-[1024px] mx-auto flex flex-col-reverse md:flex-row gap-[16px] md:gap-[48px]">
        <div className="px-[8px] pt-[16px] pb-[32px] w-[100%]">
          <h1 className="text-2xl font-bold pb-[8px] border-b-1">{objective.name}</h1>
          <p className="mt-[32px] text-xl font-bold mb-[8px] text-gray-700">{format(new Date(), 'yyyy年 MM月dd日')}</p>
          {currentUser?._id === objective.createdUserId ? (
            <div className="h-[500px]">
              <NippoEditor objectiveId={objective._id} date={format(new Date(), 'yyyy-MM-dd')} todayNippo={todayNippo} />
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
                  <>
                    <p key={nippo._id} className="mt-[32px] text-xl font-bold mb-[8px] text-gray-700">
                      {format(new Date(nippo.date), 'yyyy年 MM月dd日')}
                    </p>
                    <NippoPreview body={nippo.body} />
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
