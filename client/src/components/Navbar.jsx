import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <header className='bg-blue-600 text-white shadow-md'>
      <div className='max-w-6xl mx-auto px-6 py-4 flex items-center justify-between'>
        <Link to='/' className='flex items-center gap-3 group'>
          <img
            src={logo}
            alt='Logo'
            className='w-14 h-14 object-contain drop-shadow-md bg-emerald-50 rounded-full' 
          />

          <h1 className='text-2xl font-bold tracking-tight group-hover:text-blue-100 transition'>
            Link Shortener
          </h1>
        </Link>

        <div className='hidden sm:flex items-center gap-6 text-sm'>
          <span className='text-blue-100'>Smart URL Management</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
