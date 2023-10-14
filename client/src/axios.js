import axios from 'axios';

export const BASE_URL = 'http://localhost:4000/api';

let user = (await JSON.parse(localStorage.getItem('user'))) || {};

export const makeRequest = axios.create({
  baseURL: BASE_URL,
  'ngrok-skip-browser-warning': 'true',
  withCredentials: true,
  headers: { Authorization: `Bearer ${user.access_token}` },
});
