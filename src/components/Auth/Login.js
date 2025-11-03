import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.js';  // ← Add .js
import './Auth.css';

const Login = ({ onSwitchToRegister }) => {
  const { login, loading, error, clearError } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    clearError();
  }, [clearError]);

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const result = await login(formData.email, formData.password);

    if (result.success) {
      // Login successful - AuthContext will handle redirect
      console.log('Login successful!');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">ATHLOS</div>
          <div className="auth-subtitle">Enter the Arena</div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${formErrors.email ? 'error' : ''}`}
              placeholder="Enter your email"
              disabled={loading}
            />
            {formErrors.email && (
              <div className="error-message">⚠️ {formErrors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${formErrors.password ? 'error' : ''}`}
              placeholder="Enter your password"
              disabled={loading}
            />
            {formErrors.password && (
              <div className="error-message">⚠️ {formErrors.password}</div>
            )}
          </div>

          {error && (
            <div className="error-message" style={{ textAlign: 'center' }}>
              ⚠️ {error}
            </div>
          )}

          <button 
            type="submit" 
            className={`auth-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? '' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?{' '}
          <a 
            href="#register" 
            className="auth-link" 
            onClick={(e) => {
              e.preventDefault();
              onSwitchToRegister();
            }}
          >
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
