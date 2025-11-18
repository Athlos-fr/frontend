import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Client-side validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await authAPI.login({
        email: formData.email,
        password: formData.password
      });

      if (response.data.success) {
        // Save token and user data
        localStorage.setItem('authToken', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        
        alert('Login successful! Welcome back to Athlos!');
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response?.data?.message) {
        setErrors({ server: error.response.data.message });
      } else {
        setErrors({ server: 'Login failed. Please check your credentials.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Password reset feature coming soon!');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="form-container">
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#00FFFF' }}>WELCOME BACK</h2>
        
        {errors.server && <div className="error-message">{errors.server}</div>}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <div style={{ marginBottom: '20px', textAlign: 'right' }}>
            <button 
              type="button" 
              className="auth-link" 
              onClick={handleForgotPassword}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Forgot Password?
            </button>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            style={{ width: '100%' }}
            disabled={isLoading}
          >
            {isLoading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#EAEAEA' }}>
          Don't have an account?{' '}
          <Link to="/signup" className="auth-link">Sign up here</Link>
        </p>

        <p style={{ textAlign: 'center', marginTop: '10px' }}>
          <Link to="/" className="auth-link">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;