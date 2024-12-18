import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://seven0120-adoptame.onrender.com/',
  withCredentials: true,
});

export default axiosInstance;
