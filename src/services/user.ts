import axios from 'axios';
// import apiClient from './client';
import { NewUserEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/users/';

const createUser = async (newUserObj: NewUserEntry) => {
  const response = await axios.post(baseUrl, newUserObj);
  return response.data;
};

export default { createUser };
