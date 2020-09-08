import axios from 'axios';
import { APP_IP_SERVIDOR, APP_PORTA } from 'react-native-dotenv';

const api = axios.create({
  baseURL: `http://${APP_IP_SERVIDOR}:${APP_PORTA}/`,
});

export default api;
