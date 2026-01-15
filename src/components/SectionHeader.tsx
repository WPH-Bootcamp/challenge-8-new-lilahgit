import type { ReactNode } from 'react';

type SectionHeaderProps = {
  title: string;
  action?: ReactNode;
};

const SectionHeader = ({ title, action }: SectionHeaderProps) => (
  <div className='mb-6 sm:mb-10 flex items-center justify-between'>
    <h2 className='display-lg font-bold tracking-[-0.2em] text-neutral-25'>{title}</h2>
    {action}
  </div>
);

export default SectionHeader;