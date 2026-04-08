const { customAlphabet } = require('nanoid');

const nanoid = customAlphabet(
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  6,
);


// Ensure protocol (http/https)
const ensureProtocol = (url) => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
};

// Validate URL using Node.js built-in URL class
const isValidUrl = (url) => {
  try {
    new URL(url); // যদি parse হয় → valid
    return true;
  } catch {
    return false; // error এলে → invalid
  }
};

module.exports = { ensureProtocol, isValidUrl, nanoid };
