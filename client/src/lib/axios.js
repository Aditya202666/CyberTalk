import axios from 'axios'

 const axiosInstance = axios.create({
    baseURL:  `${import.meta.env.SERVER}/api/v1`,
    withCredentials: true, // Include cookies in requests
 
 })

 export default axiosInstance;