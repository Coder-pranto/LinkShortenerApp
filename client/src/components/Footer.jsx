import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-blue-600 text-white mt-12'>
      <div className='max-w-5xl mx-auto px-6 py-8 text-center'>
        {/* Brand / Description */}
        <h2 className='text-xl font-semibold mb-2'>Link Shortener App</h2>
        <p className='text-sm text-blue-100 mb-4'>
          Simplify and manage your links efficiently
        </p>

        {/* Social Icons (Optional but Professional) */}
        <div className='flex justify-center space-x-5 text-lg mb-6'>
          <a href='#' className='hover:text-gray-200 transition'>
            <FaGithub />
          </a>
          <a href='#' className='hover:text-gray-200 transition'>
            <FaLinkedin />
          </a>
          <a href='#' className='hover:text-gray-200 transition'>
            <FaGlobe />
          </a>
        </div>

        {/* Divider */}
        <div className='border-t border-blue-400 opacity-40 mb-4'></div>

        {/* Bottom */}
        <div className='text-sm text-blue-100 space-y-1'>
          <p>&copy; {currentYear} Link Shortener App. All rights reserved.</p>
          <p>
            Built by{' '}
            <span className='font-semibold text-white'>Riaj Hasan Pranto</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
