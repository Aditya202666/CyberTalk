import axios from 'axios'

 const axiosInstance = axios.create({
    baseURL:  import.meta.env.MODE === "development" ? import.meta.env.VITE_BASE_URL : "/api/v1",
    withCredentials: true, // Include cookies in requests
 
 })

 export default axiosInstance;