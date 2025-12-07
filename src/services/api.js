import axios from "axios";

// 1. Determine the domain from Environment Variables
// Vercel sets VITE_API_URL to "https://sodal-api.onrender.com"
// Localhost sets it to undefined (defaults to empty string)
const domain = import.meta.env.VITE_API_URL || "";

// 2. Construct the Base URL
// We FORCE the "/api" prefix here.
// Production Result: "https://sodal-api.onrender.com/api"
// Localhost Result: "/api" (which hits the Vite Proxy)
const BASE_URL = `${domain}/api`;

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
