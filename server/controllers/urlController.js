const Url = require('../models/url.model');
const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);
const { ensureProtocol } = require('../utils/helper');

//* Create short URL 
const createShortUrl = async (req, res) => {
  let { originalUrl } = req.body; 
  const baseUrl = process.env.BASE_URL;

  if (!originalUrl) {
    return res.status(400).json({ message: 'Invalid URL' });
  }

  const processedUrl = ensureProtocol(originalUrl);  

  const existingUrl = await Url.findOne({ originalUrl: processedUrl });

  if (existingUrl) {
    return res.status(200).json({ data: existingUrl.shortUrl });
  }

  const urlCode = nanoid();
  const shortUrl = `${baseUrl}/${urlCode}`;

  const newUrl = new Url({ originalUrl: processedUrl, shortUrl, urlCode });
  await newUrl.save();

  return res.status(201).json({ message: 'URL created', data: newUrl.shortUrl });
};

//* Redirect to original URL
const urlRedirector = async (req, res) => {
    const { code } = req.params;
    const url = await Url.findOne({ urlCode: code });

    if (url) {
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json({ message: 'URL not found' });
    }
};

module.exports = { createShortUrl, urlRedirector };
