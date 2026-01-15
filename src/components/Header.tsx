import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const linkBase = 'text-sm text-slate-200/80 hover:text-white transition';

const activeClass = ({ isActive }: { isActive: boolean }) =>
  `${linkBase} ${isActive ? 'text-white' : ''}`;

export type HeaderProps = {
  variant?: 'solid' | 'overlay';
  showSearch?: boolean;
};

const Header = ({ variant = 'solid', showSearch = true }: HeaderProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setValue(searchParams.get('query') ?? '');
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    navigate(`/search?query=${encodeURIComponent(trimmed)}`);
  };

  const headerClasses = `w-full transition-colors duration-300 ${
    variant === 'overlay'
      ? 'fixed left-0 top-0 z-30'
      : 'sticky top-0 z-30 bg-black/80'
  } ${
    isScrolled
      ? variant === 'overlay'
        ? 'bg-black/40 backdrop-blur-[40px]'
        : 'backdrop-blur-[64px]'
      : ''
  }`;

  return (
    <>
      <header className={headerClasses}>
        <div className='mx-auto flex max-w-6xl items-center px-4 py-6 sm:px-6'>
          <Link
            to='/'
            className='flex items-center'
            aria-label='Go to home'
          >
            <img
              src='./Logo.svg'
              alt='Movie Explorer'
              className='w-23 md:w-[129.11px]'
            />
          </Link>

          <nav className='ml-20 hidden items-center gap-12 md:flex'>
            <NavLink
              to='/'
              className={activeClass}
            >
              Home
            </NavLink>
            <NavLink
              to='/favorites'
              className={activeClass}
            >
              Favorites
            </NavLink>
          </nav>

          <div className='ml-auto flex items-center gap-3'>
            {showSearch && (
              <div className='relative hidden items-center md:flex'>
                <img
                  src='./Search.svg'
                  alt='Search'
                  className='pointer-events-none absolute left-3 h-4 w-4 opacity-70'
                />
                <input
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      handleSubmit();
                    }
                  }}
                  placeholder='Search Movie'
                  className='h-14 w-60.75 rounded-2xl border-2 border-neutral-800 bg-[#0A0D12]/40 px-2 py-4 pl-10 pr-10 text-sm text-neutral-500 placeholder:text-slate-400 focus:border-white/30 focus:outline-none'
                />
                {value.trim().length > 0 && (
                  <button
                    type='button'
                    onClick={() => setValue('')}
                    className='absolute right-3 flex h-5 w-5 items-center justify-center rounded-full bg-white/10'
                    aria-label='Clear search'
                  >
                    <img
                      src='./Close.svg'
                      alt='Clear'
                      className='h-3 w-3'
                    />
                  </button>
                )}
              </div>
            )}
            <button
              type='button'
              onClick={() => navigate('/search')}
              className='flex h-10 w-10 items-center justify-center text-white md:hidden'
              aria-label='Search'
            >
              <img
                src='./Search.svg'
                alt='Search'
                className='h-6 w-6'
              />
            </button>
            <button
              type='button'
              onClick={() => setIsMenuOpen(true)}
              className='flex h-10 w-10 items-center justify-center text-white md:hidden'
              aria-label='Open menu'
            >
              <img
                src='./Menu.svg'
                alt='Menu'
                className='h-6 w-6'
              />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 bg-black transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
      >
        <div className='flex items-center justify-between px-4 py-6 sm:px-6'>
          <Link
            to='/'
            className='flex items-center'
            aria-label='Go to home'
          >
            <img
              src='./Logo.svg'
              alt='Movie Explorer'
              className='w-129.11px'
            />
          </Link>
          <button
            type='button'
            onClick={() => setIsMenuOpen(false)}
            className='flex h-10 w-10 items-center justify-center text-white'
            aria-label='Close menu'
          >
            <img
              src='./Close.svg'
              alt='Close'
              className='h-6 w-6'
            />
          </button>
        </div>
        <nav className='flex flex-col gap-6 px-5 pt-6 text-lg sm:px-6'>
          <NavLink
            to='/'
            className={activeClass}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to='/favorites'
            className={activeClass}
            onClick={() => setIsMenuOpen(false)}
          >
            Favorites
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Header;
