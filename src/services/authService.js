import apiClient from '../config/apiClient';

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

class AuthService {
  /**
   * Register a new user
   * @param {Object} userData - { username, email, password }
   * @returns {Promise<Object>} Response with user and token
   */
  async register(userData) {
    try {
      const response = await apiClient.post('/users/register', userData);
      
      if (response.data.success) {
        const { user, token } = response.data.data;
        
        // Store auth data
        this.setAuthData(user, token);
        
        return response.data;
      }
      
      throw new Error(response.data.message || 'Registration failed');
    } catch (error) {
      throw error;
    }
  }

  /**
   * Login user
   * @param {Object} credentials - { email, password }
   * @returns {Promise<Object>} Response with user and token
   */
  async login(credentials) {
    try {
      const response = await apiClient.post('/users/login', credentials);
      
      if (response.data.success) {
        const { user, token } = response.data.data;
        
        // Store auth data
        this.setAuthData(user, token);
        
        return response.data;
      }
      
      throw new Error(response.data.message || 'Login failed');
    } catch (error) {
      throw error;
    }
  }

  /**
   * Logout user
   */
  logout() {
    this.clearAuthData();
  }

  /**
   * Get current user from localStorage
   * @returns {Object|null} User object or null
   */
  getCurrentUser() {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  /**
   * Get authentication token
   * @returns {string|null} Token or null
   */
  getToken() {
    return localStorage.getItem('token');
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} True if authenticated
   */
  isAuthenticated() {
    const token = this.getToken();
    const user = this.getCurrentUser();
    return !!(token && user);
  }

  /**
   * Store authentication data
   * @param {Object} user - User object
   * @param {string} token - JWT token
   */
  setAuthData(user, token) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('username', user.username);
  }

  /**
   * Clear authentication data
   */
  clearAuthData() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  /**
   * Update user profile
   * @param {string} userId - User ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} Updated user data
   */
  async updateProfile(userId, updateData) {
    try {
      const response = await apiClient.put(`/users/${userId}`, updateData);
      
      if (response.data.success) {
        // Update stored user data
        const currentUser = this.getCurrentUser();
        const updatedUser = { ...currentUser, ...response.data.data };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        return response.data;
      }
      
      throw new Error(response.data.message || 'Update failed');
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get user profile by ID
   * @param {string} userId - User ID
   * @returns {Promise<Object>} User data
   */
  async getUserProfile(userId) {
    try {
      const response = await apiClient.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();
