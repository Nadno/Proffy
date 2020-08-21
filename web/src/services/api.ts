import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export const apiPost = (path: string, data: object) => {
  return api.post(path, data);
};

export default api;