import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ergbox.herokuapp.com'
})

export default api;