import { createContext, useContext, useState, useEffect } from 'react';
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Check if user is already logged in (on page refresh)
  useEffect(() => {
    const checkUser = async () => {
      try {
        // We try to fetch the profile.
        // If cookie exists, this works. If not, it fails (401).
        const { data } = await api.get("/users/me"); // We need to create this route later!
        setUser(data.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // For now, since we don't have /users/me, we skip this check to avoid errors
    setLoading(false);
    // checkUser(); <-- Uncomment this when we add the /me route backend
  }, []);


  const register = async (username, email, password) => {
    const { data } = await api.post("/auth/register", {
      username,
      email,
      password,
    });
    setUser(data.data.user);
    return data;
  };

  // 2. Login Action
  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    setUser(data.data.user); // Store user data in React state
    return data;
  };

  // 3. Logout Action
  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use the context easily
export const useAuth = () => useContext(AuthContext);