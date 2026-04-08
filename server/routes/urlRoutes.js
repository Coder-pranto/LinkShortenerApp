const router = require('express').Router();
const {
  createShortUrl,
  redirectUrl,
  getUrlStats,
} = require('../controllers/urlController');

// create Short URL
router.post('/shorten', createShortUrl);

// analytics route
router.get('/stats/:code', getUrlStats);

// redirect (always last)
router.get('/:code', redirectUrl);

module.exports = router;
