import axios from 'axios';
import { SERVER_URL } from 'utils/constants';
import userStorage from 'utils/userStorage';

const client = axios.create({});

client.defaults.baseURL = SERVER_URL;

client.interceptors.request.use(
  (config) => {
    if (!config.headers) {
      throw new Error('error');
    }

    const token = userStorage.get();
    if (!token) return;

    config.headers.authorization = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;
