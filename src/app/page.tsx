import { Link } from '@nextui-org/link';
import { StartButton } from './_components/domains/Objective/StartButton';
import { fetchMe } from './_actions/userActions';
import { getObjectiveMe } from './_actions/objectiveActions';

export default async function Page() {
  const { currentUser } = await fetchMe();
  const objective = currentUser ? (await getObjectiveMe()).objective : undefined;

  return (
    <div className="drop-shadow-sm">
      <div className="min-h-[500px] max-w-[1024px] mx-auto flex flex-col-reverse md:flex-row justify-center gap-[16px] md:gap-[48px]">
        <div className="flex flex-col justify-center px-[16px] pb-[32px]">
          <h1 className="text-2xl font-bold mb-[8px]">目標達成に向けて一歩を踏み出そう</h1>
          <p className="text-slate-600 mb-[24px]">オンライン日報は日毎の振り返りをサポートするアプリケーションです。</p>
          <StartButton currentUser={currentUser} objective={objective} />
          <Link href="https://twitter.com/same_gum" className="mt-[40px]" target="_blank">
            開発進捗はXで発信しています
          </Link>
        </div>
      </div>
    </div>
  );
}
