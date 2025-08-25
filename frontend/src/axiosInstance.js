import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/', // öz backend URL-in
  withCredentials: true,
});

export default axiosInstance;