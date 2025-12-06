import axios from "axios";

// Create a standalone instance
const api = axios.create({
  baseURL: "/api", // We don't need localhost:3000 because of the Proxy!
  withCredentials: true, // IMPORTANT: This tells the browser to send Cookies with requests
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
