import { getImageUrl } from '../lib/tmdb';

type CastCardProps = {
  name: string;
  role: string;
  image: string | null;
};

const CastCard = ({ name, role, image }: CastCardProps) => {
  const photo = getImageUrl(image, 'w185');

  return (
    <div className='flex items-center gap-4 pb-10 sm:pb-4'>
      <div className='h-26 w-17.25 rounded-lg overflow-hidden bg-white/10'>
        {photo ? (
          <img
            src={photo}
            alt={name}
            className='h-full w-full object-cover'
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center text-xs text-neutral-25'>
            N/A
          </div>
        )}
      </div>
      <div>
        <p className='text-md font-semibold text-neutral-25'>{name}</p>
        <p className='text-md text-slate-400'>{role}</p>
      </div>
    </div>
  );
};

export default CastCard;