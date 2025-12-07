import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Vital for Cookies to work across domains
  headers: {
    "Content-Type": "application/json",
  },
});

// Response Interceptor (Optional but Senior):
// If the backend says "401 Unauthorized", we can auto-logout the user here.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Logic to redirect to login page will go here later
      console.log("Session expired or not logged in");
    }
    return Promise.reject(error);
  }
);

export default api;
