import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const handleAuthResponse = (response) => {
  if (response.data && response.data.data) {
    const { user, token } = response.data.data;

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    return { user, token };
  }
  return response.data;
};

const register = async (userData) => {
  // Calls: POST http://localhost:4000/users/register
  const response = await axios.post(`${API_URL}/users/register`, userData);
  return handleAuthResponse(response);
};

const login = async (userData) => {
  // Calls: POST http://localhost:4000/users/login
  const response = await axios.post(`${API_URL}/users/login`, userData);
  return handleAuthResponse(response);
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;
export const authAPI = authService;
