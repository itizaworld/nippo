import React from 'react';
import { Link } from '@nextui-org/link';
import { URLS } from '~/app/_constants/urls';

export const NippoFooter = () => {
  return (
    <div className="bg-[#1f2937] drop-shadow-sm">
      <div className="max-w-[1024px] mx-auto p-[24px]">
        <Link href="/" className="text-slate-50 font-bold">
          みんなの日報
        </Link>
        <p className="mt-[8px] text-slate-50 text-sm">目標達成に向けて一歩を踏み出そう</p>
        <div className="mt-[24px] flex gap-[16px]">
          <Link href={URLS.TERM} className="text-slate-50">
            利用規約
          </Link>
          <Link href={URLS.POLICY} className="text-slate-50">
            プライバシーポリシー
          </Link>
        </div>
      </div>
    </div>
  );
};
