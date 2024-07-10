import axios from 'axios';

// Настройка Axios для отправки куков с запросами
axios.defaults.withCredentials = true;

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: true, // Убедитесь, что эта опция включена
});

export default apiClient;
