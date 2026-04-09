import axios from 'axios';

export const BASE_URL = 'http://localhost:5000';

const api = axios.create({
    baseURL: BASE_URL,
})


export const createShortUrl = (originalUrl) => api.post('/shorten', {originalUrl});
export const redirectToOriginalUrl = (code) =>window.open(`${BASE_URL}/${code}`, '_blank');
export const getUrlStats = (code) =>api.get(`/stats/${code}`);
  