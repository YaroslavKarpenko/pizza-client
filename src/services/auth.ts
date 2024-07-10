import axios from 'axios';
import apiClient from './client';
import { AuthCredentials } from '../types';

// const baseUrl = 'http://localhost:3000/api/login/';

const login = async (authCredentials: AuthCredentials) => {
  const response = await apiClient.post('api/login/', authCredentials);
  return response.data;
};

const logout = async () => {
  const response = await axios.post('http://localhost:3000/api/logout/');
  return response.data;
};

export default { login, logout };
