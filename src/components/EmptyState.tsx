import type { ReactNode } from 'react';

type EmptyStateProps = {
  icon: string;
  title: string;
  description: string;
  action?: ReactNode;
};

const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => (
  <div className='flex min-h-90 flex-col items-center justify-center gap-3 text-center my-25'>
    <div className='flex h-60 w-60 items-center justify-center'>
      <img
        src={icon}
        alt={title}
      />
    </div>
    <div>
      <h3 className='text-lg sm:text-md font-semibold text-white'>{title}</h3>
      <p className='mt-1 text-sm text-neutral-400'>{description}</p>
    </div>
    {action}
  </div>
);

export default EmptyState;