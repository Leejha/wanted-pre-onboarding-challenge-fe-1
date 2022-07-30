import axios from 'axios';
import { SERVER_URL } from 'utils/constants';

const client = axios.create({
  withCredentials: true,
});

client.defaults.baseURL = SERVER_URL;
