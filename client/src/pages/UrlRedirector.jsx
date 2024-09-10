import { useState } from 'react';
import { redirectToOriginalUrl } from '../services/api';

const UrlRedirector = () => {
  const [shortUrl, setShortUrl] = useState('');
  const [originalUrl, setOriginalUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = new URL(shortUrl).pathname.split('/').pop(); 

    if (!code) {
      setError('Invalid URL format');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await redirectToOriginalUrl(code);
      if (response.originalUrl) {
        setOriginalUrl(response.originalUrl);
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

  return (
    <div className="flex justify-center items-center bg-gray-100 text-gray-900">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Enter Short URL</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
          <input
            type="url"
            value={shortUrl}
            onChange={(e) => setShortUrl(e.target.value)}
            placeholder="Enter short URL here"
            className="p-3 border border-gray-300 rounded-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Get Original URL
          </button>
        </form>

        {loading && (
          <div className="mt-4">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <p className="mt-2 text-xl text-gray-700">Fetching URL...</p>
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-600">
            <p className="text-xl">{error}</p>
          </div>
        )}

        {originalUrl && !loading && (
          <div className="mt-4">
            <p className="text-xl font-semibold mb-2">Original URL:</p>
            <a href={originalUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {originalUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlRedirector;
