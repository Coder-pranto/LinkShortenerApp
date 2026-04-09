const Url = require('../models/urlModel');
const { ensureProtocol, isValidUrl, nanoid } = require('../utils/helper');

// Create Short URL

const createShortUrl = async (req, res) => {
  let { originalUrl } = req.body;
  const baseUrl = process.env.BASE_URL;

  if (!originalUrl) {
    return res.status(400).json({ message: 'URL is required' });
  }

  const processedUrl = ensureProtocol(originalUrl);

  if (!isValidUrl(processedUrl)) {
    return res.status(400).json({ message: 'Invalid URL format' });
  }

  const existing = await Url.findOne({ originalUrl: processedUrl });

  if (existing) {
    return res.status(200).json({
      message: 'Already exists',
      data: {
        shortUrl: existing.shortUrl,
        urlCode: existing.urlCode,
      },
    });
  }

  // collision-safe nanoid
  let urlCode;
  let exists = true;

  while (exists) {
    urlCode = nanoid();
    exists = await Url.findOne({ urlCode });
  }

  const shortUrl = `${baseUrl}/${urlCode}`;

  const newUrl = await Url.create({
    originalUrl: processedUrl,
    shortUrl,
    urlCode,
  });

  return res.status(201).json({
    message: 'Short URL created',
    data: {
      shortUrl: newUrl.shortUrl,
      urlCode: newUrl.urlCode,
    },
  });
};

// Redirect + Click Tracking
const redirectUrl = async (req, res) => {
    const { code } = req.params;

    const url = await Url.findOne({ urlCode: code });

    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    // click count update
    url.clicks += 1;
    await url.save();

    return res.redirect(url.originalUrl);

};

// Get Analytics
const getUrlStats = async (req, res) => {
    const { code } = req.params;

    const url = await Url.findOne({ urlCode: code });

    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    return res.json({
      originalUrl: url.originalUrl,
      shortUrl: url.shortUrl,
      clicks: url.clicks,
      createdAt: url.createdAt,
    });
};

module.exports = {
  createShortUrl,
  redirectUrl,
  getUrlStats,
};
