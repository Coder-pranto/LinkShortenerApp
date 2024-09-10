const router = require('express').Router();
const {createShortUrl, urlRedirector} = require('../controllers/urlController')


router.post('/shorten' , createShortUrl)
router.get('/:code' , urlRedirector);

module.exports  = router;