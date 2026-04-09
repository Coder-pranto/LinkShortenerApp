import { useRouteError, useNavigate } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const errorMessage =
    error?.statusText || error?.message || 'Something went wrong';

  const errorStatus = error?.status || 500;

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4'>
      <div className='w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 text-center'>
        {/* Icon */}
        <div className='flex justify-center mb-4'>
          <div className='bg-red-100 p-4 rounded-full'>
            <FaExclamationTriangle className='text-red-600 w-10 h-10' />
          </div>
        </div>

        {/* Error Code */}
        <h1 className='text-5xl font-extrabold text-gray-800 mb-2'>
          {errorStatus}
        </h1>

        {/* Title */}
        <h2 className='text-xl font-semibold text-red-600 mb-3'>
          Oops! Something went wrong
        </h2>

        {/* Message */}
        <p className='text-gray-600 mb-6'>{errorMessage}</p>

        {/* Divider */}
        <div className='border-t border-gray-200 mb-6'></div>

        {/* Actions */}
        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
          <button
            onClick={() => window.location.reload()}
            className='px-5 py-2.5 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition duration-200 shadow-sm'
          >
            Reload Page
          </button>

          <button
            onClick={() => navigate(-1)}
            className='px-5 py-2.5 rounded-lg bg-gray-800 text-white font-medium hover:bg-gray-900 transition duration-200 shadow-sm'
          >
            Go Back
          </button>

          <button
            onClick={() => navigate('/')}
            className='px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition duration-200'
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
