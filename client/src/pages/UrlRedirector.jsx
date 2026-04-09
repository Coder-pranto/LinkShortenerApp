// import { useState } from 'react';
// import { redirectToOriginalUrl } from '../services/api';
// import { FiCopy } from 'react-icons/fi';
// import { toast } from 'react-toastify';

// const UrlRedirector = () => {
//   const [shortUrl, setShortUrl] = useState('');
//   const [originalUrl, setOriginalUrl] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [copied, setCopied] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const code = new URL(shortUrl).pathname.split('/').pop();

//       if (!code) {
//         setError('Invalid URL format');
//         return;
//       }

//       setLoading(true);
//       setError('');
//       setOriginalUrl('');
//       setCopied(false);

//       const { data } = await redirectToOriginalUrl(code);

//       if (data?.data) {
//         setOriginalUrl(data.data);
//         toast.success('Original URL retrieved!');
//       } else {
//         setError('URL not found');
//       }
//     } catch (err) {
//       console.error(err.message);
//       setError('Invalid or broken URL');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(originalUrl);
//     setCopied(true);
//     toast.info('Copied to clipboard!');
//   };

//   return (
//     <div className='w-full max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8'>
//       {/* Title */}
//       <h2 className='text-3xl font-semibold text-blue-600 mb-6 text-center'>
//         Retrieve Original URL
//       </h2>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
//         <input
//           type='url'
//           value={shortUrl}
//           onChange={(e) => setShortUrl(e.target.value)}
//           placeholder='Enter short URL here'
//           required
//           className='p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
//         />

//         <button
//           type='submit'
//           disabled={loading}
//           className='py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md disabled:opacity-70'
//         >
//           {loading ? 'Fetching...' : 'Get Original URL'}
//         </button>
//       </form>

//       {/* Loading */}
//       {loading && (
//         <div className='mt-6 flex flex-col items-center'>
//           <div className='animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full'></div>
//           <p className='mt-3 text-gray-500'>Fetching URL...</p>
//         </div>
//       )}

//       {/* Error */}
//       {error && (
//         <div className='mt-4 text-red-500 text-center font-medium'>{error}</div>
//       )}

//       {/* Result */}
//       {originalUrl && !loading && (
//         <div className='mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg'>
//           <p className='text-lg font-semibold mb-2'>Original URL:</p>

//           <div className='flex items-center justify-between gap-2 flex-wrap'>
//             <a
//               href={originalUrl}
//               target='_blank'
//               rel='noopener noreferrer'
//               className='text-blue-600 hover:underline break-all'
//             >
//               {originalUrl}
//             </a>

//             <button
//               onClick={handleCopy}
//               className='p-2 rounded-md hover:bg-gray-200 transition'
//               title='Copy'
//             >
//               <FiCopy size={18} />
//             </button>
//           </div>

//           {copied && (
//             <p className='mt-2 text-sm text-green-600'>Copied to clipboard!</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UrlRedirector;

import { useState } from 'react';
import { getUrlStats, redirectToOriginalUrl } from '../services/api';
import { FiCopy, FiExternalLink } from 'react-icons/fi';
import { toast } from 'react-toastify';

const UrlRedirector = () => {
  const [shortUrl, setShortUrl] = useState('');
  const [urlData, setUrlData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const code = new URL(shortUrl).pathname.split('/').pop();

      if (!code) {
        setError('Invalid URL format');
        return;
      }

      setLoading(true);
      setError('');
      setUrlData(null);
      setCopied(false);

      // ✅ get stats instead of redirect
      const { data } = await getUrlStats(code);

      setUrlData(data);
      toast.success('Data fetched successfully!');
    } catch (err) {
      console.error(err.message);
      setError('URL not found or invalid');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(urlData.originalUrl);
    setCopied(true);
    toast.info('Copied to clipboard!');
  };

  const handleRedirect = () => {
    const code = new URL(shortUrl).pathname.split('/').pop();
    redirectToOriginalUrl(code);
  };

  return (
    <div className='w-full max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8'>
      <h2 className='text-3xl font-bold text-blue-600 mb-6 text-center'>
        🔍 URL Insights & Redirect
      </h2>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='url'
          value={shortUrl}
          onChange={(e) => setShortUrl(e.target.value)}
          placeholder='Paste your short URL here'
          required
          className='p-3 border rounded-lg focus:ring-2 focus:ring-blue-500'
        />

        <button
          type='submit'
          disabled={loading}
          className='py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
        >
          {loading ? 'Fetching...' : 'Get Details'}
        </button>
      </form>

      {/* Loading */}
      {loading && (
        <div className='mt-6 text-center'>
          <div className='animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto'></div>
          <p className='mt-3 text-gray-500'>Loading...</p>
        </div>
      )}

      {/* Error */}
      {error && <p className='mt-4 text-red-500 text-center'>{error}</p>}

      {/* Result */}
      {urlData && !loading && (
        <div className='mt-6 p-5 bg-gray-50 rounded-xl border shadow-sm space-y-4'>
          <div>
            <p className='font-semibold'>🔗 Original URL:</p>
            <div className='flex justify-between items-center'>
              <a
                href={urlData.originalUrl}
                target='_blank'
                rel='noreferrer'
                className='text-blue-600 break-all'
              >
                {urlData.originalUrl}
              </a>

              <button onClick={handleCopy}>
                <FiCopy />
              </button>
            </div>

            {copied && (
              <p className='text-green-600 text-sm'>Copied to clipboard!</p>
            )}
          </div>

          {/* ✅ Analytics */}
          <div className='grid grid-cols-2 gap-4 text-sm'>
            <div className='bg-white p-3 rounded shadow'>
              <p className='text-gray-500'>Clicks</p>
              <p className='font-bold text-lg'>{urlData.clicks}</p>
            </div>

            <div className='bg-white p-3 rounded shadow'>
              <p className='text-gray-500'>Created At</p>
              <p className='font-bold text-sm'>
                {new Date(urlData.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* ✅ Redirect Button */}
          <button
            onClick={handleRedirect}
            className='w-full flex items-center justify-center gap-2 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition'
          >
            <FiExternalLink />
            Open Short URL
          </button>
        </div>
      )}
    </div>
  );
};

export default UrlRedirector;