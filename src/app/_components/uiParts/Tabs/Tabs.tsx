'use client';

import { Tab, Tabs as OriginTabs } from '@nextui-org/react';
import { FC } from 'react';

type Props = {
  tabItems: { key: string; title: string; children: React.ReactNode }[];
};

export const Tabs: FC<Props> = ({ tabItems }) => {
  return (
    <div className="flex w-full flex-col">
      <OriginTabs
        aria-label="Options"
        color="primary"
        variant="underlined"
        classNames={{
          tabList: 'gap-6 w-full relative rounded-none p-0 border-b border-divider',
          cursor: 'w-full bg-[#6366f1]',
          tab: 'max-w-fit px-0 h-12',
          tabContent: 'group-data-[selected=true]:text-[#6366f1] group-data-[selected=true]:font-bold',
        }}
      >
        {tabItems.map((tabItem) => (
          <Tab
            key={tabItem.key}
            title={
              <div className="flex items-center space-x-2">
                <span>{tabItem.title}</span>
              </div>
            }
          >
            {tabItem.children}
          </Tab>
        ))}
      </OriginTabs>
    </div>
  );
};
