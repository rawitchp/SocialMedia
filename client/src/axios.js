import axios from 'axios';

export const BASE_URL = 'https://handsome-lime-sweatpants.cyclic.app/api';

let user = (await JSON.parse(localStorage.getItem('user'))) || {};

export const makeRequest = axios.create({
  baseURL: BASE_URL,
  'ngrok-skip-browser-warning': 'true',
  headers: { Authorization: `Bearer ${user.access_token}` },
});
