import { useState } from 'react';
import { createShortUrl } from '../services/api';
import { toast } from 'react-toastify';
import { FiCopy } from 'react-icons/fi'; 

const UrlShortenerForm = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalUrl) return;

    try {
      const {data} = await createShortUrl(originalUrl);
      setShortenedUrl(data.data);
      setCopied(false); 
      toast.success("Short URL created successfully!");
    } catch (error) {
      console.error('Error shortening URL:', error.message);
      toast.error('Error shortening URL');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setCopied(true);
    toast.info("Short URL copied to clipboard!");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg w-full max-w-lg">
      <h2 className="text-3xl font-semibold text-blue-600 mb-4">Shorten Your URL</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter a valid URL"
          required
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <button
          type="submit"
          className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        >
          Shorten
        </button>
      </form>

      {shortenedUrl && (
        <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Your Shortened URL:</h3>
          <div className="flex items-center space-x-2">
            <a
              href={shortenedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {shortenedUrl}
            </a>
            <button
              onClick={handleCopy}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
              title="Copy to clipboard"
            >
              <FiCopy size={20} />
            </button>
          </div>
          {copied && (
            <p className="mt-2 text-sm text-green-600">Copied to clipboard!</p>
          )}
          <p className="mt-4 text-sm text-gray-600">Click the link to be redirected.</p>
        </div>
      )}
      </div>

    </div>
  );
};

export default UrlShortenerForm;

