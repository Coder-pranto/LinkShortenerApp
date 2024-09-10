import { useState } from 'react';
import { redirectToOriginalUrl } from '../services/api';
import { FiCopy } from 'react-icons/fi'; 

const UrlRedirector = () => {
  const [shortUrl, setShortUrl] = useState('');
  const [originalUrl, setOriginalUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = new URL(shortUrl).pathname.split('/').pop();

    if (!code) {
      setError('Invalid URL format');
      return;
    }

    setLoading(true);
    setError(null);
    setOriginalUrl('');
    setCopied(false); 

    try {
      const { data } = await redirectToOriginalUrl(code);
      if (data) {
        setOriginalUrl(data.data);
      } else {
        setError('URL not found');
      }
    } catch (error) {
      console.error('Error fetching URL:', error.message);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(originalUrl);
    setCopied(true);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Retrieve Original URL</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="url"
            value={shortUrl}
            onChange={(e) => setShortUrl(e.target.value)}
            placeholder="Enter short URL here"
            className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            required
          />
          <button
            type="submit"
            className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Get Original URL
          </button>
        </form>

        {loading && (
          <div className="mt-6">
            <div className="flex justify-center items-center">
              <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            </div>
            <p className="mt-4 text-gray-600 text-lg">Fetching URL...</p>
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-600">
            <p className="text-xl">{error}</p>
          </div>
        )}

        {originalUrl && !loading && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-300 rounded-md">
            <p className="text-lg font-semibold mb-2">Original URL:</p>
            <div className="flex items-center justify-center space-x-2">
              <a
                href={originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-words"
              >
                {originalUrl}
              </a>
              <button
                onClick={handleCopy}
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
                title="Copy to clipboard"
              >
                <FiCopy size={20} />
              </button>
            </div>
            {copied && <p className="mt-2 text-green-600">Copied to clipboard!</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlRedirector;
