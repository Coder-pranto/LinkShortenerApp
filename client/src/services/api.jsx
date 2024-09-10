import axios from 'axios';

export const BASE_URL = 'http://localhost:5050';

const api = axios.create({
    baseURL: BASE_URL,
})


export const createShortUrl = (originalUrl) => api.post('/shorten', {originalUrl});
export const redirectToOriginalUrl = (code) => api.get(`/${code}`);

