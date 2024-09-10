const ensureProtocol = (url) => {
    return (!url.startsWith('http://') && !url.startsWith('https://')) ? `http://${url}` : url;
  };


  module.exports = {ensureProtocol};