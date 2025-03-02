import axios from 'axios'
import { SERVER_URL } from './constants';

 const axiosInstance = axios.create({
    baseURL:  `${SERVER_URL}/api/v1`,
    withCredentials: true, // Include cookies in requests
 
 })

 export default axiosInstance; 