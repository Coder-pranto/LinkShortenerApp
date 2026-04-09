import { Link } from 'react-router-dom';
import { FaLink, FaSearch } from 'react-icons/fa';

const LinkAction = () => {
  return (
    <div className='flex justify-center px-4 mb-10'>
      <div className='w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 text-center'>
        {/* Heading */}
        <h2 className='text-3xl font-bold text-gray-800 mb-2'>
          Link Shortener
        </h2>
        <p className='text-gray-500 mb-6'>
          Create short URLs or retrieve original links
        </p>

        {/* Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Link to='/shorten' className='w-full sm:w-auto'>
            <button className='w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg'>
              <FaLink />
              Create Short URL
            </button>
          </Link>

          <Link to='/original_url' className='w-full sm:w-auto'>
            <button className='w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-green-700 transition duration-200 shadow-md hover:shadow-lg'>
              <FaSearch />
              View URL Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LinkAction;
