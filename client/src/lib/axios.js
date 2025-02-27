import axios from 'axios'

 const axiosInstance = axios.create({
    baseURL:  import.meta.env.MODE === "development" ? "http://localhost:3212/api/v1" : "/api/v1",
    withCredentials: true, // Include cookies in requests
 
 })

 export default axiosInstance;