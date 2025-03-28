import axios from "axios"

// Create an axios instance
export const api = axios.create({
  baseURL: "http://localhost:5000", // Change this to your backend URL
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor to add the token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

