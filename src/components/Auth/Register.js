import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../src/components/context/AuthContext.js';  // ← Add .js
import { COLORS } from '../../utils/constants.js';  // ← Add .js
import './Auth.css';

const Register = ({ onSwitchToLogin }) => {
  const { register, loading, error, clearError } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, text: '' });

  useEffect(() => {
    clearError();
  }, [clearError]);

  const validateForm = () => {
    const errors = {};

    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    const strengthMap = {
      0: { text: 'Very Weak', class: 'strength-weak' },
      1: { text: 'Weak', class: 'strength-weak' },
      2: { text: 'Fair', class: 'strength-medium' },
      3: { text: 'Good', class: 'strength-medium' },
      4: { text: 'Strong', class: 'strength-strong' },
      5: { text: 'Very Strong', class: 'strength-strong' }
    };

    return strengthMap[score] || strengthMap[0];
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

    // Calculate password strength
    if (name === 'password') {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength({ score: strength.text, text: strength.text });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const result = await register({
      username: formData.username,
      email: formData.email,
      password: formData.password
    });

    if (result.success) {
      // Registration successful - AuthContext will handle redirect
      console.log('Registration successful!');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">ATHLOS</div>
          <div className="auth-subtitle">Join the Competition</div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`form-input ${formErrors.username ? 'error' : ''}`}
              placeholder="Enter your username"
              disabled={loading}
            />
            {formErrors.username && (
              <div className="error-message">⚠️ {formErrors.username}</div>
            )}
          </div>

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
            {formData.password && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div className={`strength-fill ${passwordStrength.class}`}></div>
                </div>
                <div className="strength-text">Strength: {passwordStrength.text}</div>
              </div>
            )}
            {formErrors.password && (
              <div className="error-message">⚠️ {formErrors.password}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`form-input ${formErrors.confirmPassword ? 'error' : ''}`}
              placeholder="Confirm your password"
              disabled={loading}
            />
            {formErrors.confirmPassword && (
              <div className="error-message">⚠️ {formErrors.confirmPassword}</div>
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
            {loading ? '' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{' '}
          <a 
            href="#login" 
            className="auth-link" 
            onClick={(e) => {
              e.preventDefault();
              onSwitchToLogin();
            }}
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
