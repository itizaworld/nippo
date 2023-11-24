import { Link } from '@nextui-org/link';
import { getObjective } from '../../_actions/objectiveActions';

export default async function Page({ params }: { params: { id: string } }) {
  const { object } = await getObjective(params.id);

  return (
    <div className="drop-shadow-sm">
      <div className="min-h-[500px] max-w-[1024px] mx-auto flex flex-col-reverse md:flex-row gap-[16px] md:gap-[48px]">
        <div className="flex flex-col p-[16px] pb-[32px]">
          <h1 className="text-2xl font-bold mb-[8px]">{object.name}</h1>
          <p className="text-slate-600 my-[24px]">日報画面は開発中です!</p>
          <Link href="https://twitter.com/same_gum" className="mt-[40px]" target="_blank">
            開発進捗はXで発信しています
          </Link>
        </div>
      </div>
    </div>
  );
}
