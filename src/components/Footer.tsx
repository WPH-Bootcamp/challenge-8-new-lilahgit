const Footer = () => (
  <footer className='border-t border-white/5 py-6'>
    <div className='mx-auto flex max-w-6xl flex-col items-start gap-2 px-4 text-xs text-neutral-600 sm:px-6 md:flex-row md:items-center md:justify-between md:text-md'>
      <a
        href='/'
        className='flex items-center gap-2 text-slate-300'
        aria-label='Go to home'
      >
        <img
          src='./Logo.svg'
          alt='Movie Explorer'
          className='w-129.11px'
        />
      </a>
      <span>Copyright ©2025 Movie Explorer</span>
    </div>
  </footer>
);

export default Footer;
