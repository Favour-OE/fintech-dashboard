// Shared Axios instance — reads base URL and timeout from Vite environment variables
import axios from "axios"

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
})

export default apiClient
