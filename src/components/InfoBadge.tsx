import type { ReactNode } from 'react';

type InfoBadgeProps = {
  icon: string;
  label: string;
  value: ReactNode;
};

const InfoBadge = ({ icon, label, value }: InfoBadgeProps) => (
  <div
    className="
      flex flex-col items-center justify-center
      min-w-[112.33px] min-h-30 lg:min-w-63 lg:min-h-36.5
      gap-1
      rounded-2xl border border-[#252b37] bg-black
      px-4 py-3
      text-center"
  >
    <img src={icon} alt={label} className="h-8 w-8 opacity-80" />

    <div className="flex flex-col items-center gap-1">
      <p className="text-md sm:text-xs text-slate-400">{label}</p>
      <p className="text-xl sm:text-lg font-semibold text-white">{value}</p>
    </div>
  </div>
);


export default InfoBadge;
