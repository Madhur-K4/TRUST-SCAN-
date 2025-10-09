import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const authAPI = {
  login: (credentials: { username: string; password: string }) =>
    api.post('/auth/login', credentials),
  register: (data: { username: string; password: string; email: string; role: 'PATIENT' | 'DOCTOR' }) =>
    api.post('/auth/register', data),
};
