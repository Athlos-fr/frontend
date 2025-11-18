import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/theme.css';

const HomePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('authToken');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    alert('Logged out successfully!');
    navigate('/');
  };

  return (
    <div className="hero-section">
      <h1 className="app-title">ATHLOS</h1>
      <p style={{ color: '#EAEAEA', fontSize: '1.2rem', marginBottom: '2rem' }}>
        Enter the Arena. Compete. Conquer.
      </p>

      {isAuthenticated ? (
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#C3FF00', fontSize: '1.1rem', marginBottom: '1rem' }}>
            Welcome back, <strong>{user.username}</strong>!
          </p>
          <div className="button-group">
            <button 
              className="btn btn-secondary"
              onClick={() => alert('Dashboard coming soon!')}
            >
              Go to Dashboard
            </button>
            <button 
              className="btn btn-primary"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="button-group">
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
          
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;