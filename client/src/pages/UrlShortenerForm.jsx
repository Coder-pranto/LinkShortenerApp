import { useState } from 'react';
import QRCode from 'react-qr-code';
import QRCodeGenerator from 'qrcode';
import { createShortUrl } from '../services/api';
import { toast } from 'react-toastify';
import { FiCopy } from 'react-icons/fi';

const UrlShortenerForm = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [qrImage, setQrImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalUrl) return;
    try {
      const { data } = await createShortUrl(originalUrl);
      const shortUrl = data.data.shortUrl;
      setShortenedUrl(shortUrl);
      setCopied(false);
      // ✅ QR generate
      const qr = await QRCodeGenerator.toDataURL(shortUrl);
      setQrImage(qr);
      toast.success('Short URL created successfully!');
    } catch (error) {
      console.error('Error shortening URL:', error.message);
      toast.error('Error shortening URL');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setCopied(true);
    toast.info('Short URL copied to clipboard!');
  };

  return (
    <div className='w-full max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8'>
      <h2 className='text-3xl font-semibold text-blue-600 mb-6 text-center'>
        🔗 Shorten Your URL
      </h2>

      <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
        <input
          type='text'
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder='Enter a valid URL'
          required
          className='p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
        />

        <button
          type='submit'
          className='py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md'
        >
          Shorten URL
        </button>
      </form>

      {shortenedUrl && (
        <div className='mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg'>
          <h3 className='text-lg font-semibold mb-2'>Your Shortened URL:</h3>

          <div className='flex items-center justify-between gap-2 flex-wrap'>
            <a
              href={shortenedUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 hover:underline break-all'
            >
              {shortenedUrl}
            </a>

            <button
              onClick={handleCopy}
              className='p-2 rounded-md hover:bg-gray-200 transition'
              title='Copy'
            >
              <FiCopy size={18} />
            </button>
          </div>

          {copied && (
            <p className='mt-2 text-sm text-green-600'>Copied to clipboard!</p>
          )}

          {/* ✅ QR Code Section */}
          <div className='mt-6 flex flex-col items-center'>
            <p className='mb-2 font-medium text-gray-700'>Scan QR Code:</p>

            <div className='bg-white p-3 rounded-lg shadow'>
              <QRCode value={shortenedUrl} size={160} />
            </div>

            {/* ✅ Download Button */}
            {qrImage && (
              <a
                href={qrImage}
                download='qr-code.png'
                className='mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow'
              >
                Download QR Code
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlShortenerForm;
