import React from 'react';
import { useAuth } from '../../../src/components/context/AuthContext.js';  // ← Add .js

const Navigation = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav style={{
      background: 'rgba(13, 13, 13, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(142, 45, 226, 0.3)',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{
        fontSize: '1.5rem',
        fontWeight: '800',
        background: 'linear-gradient(135deg, #8E2DE2 0%, #00FFFF 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        ATHLOS
      </div>
      
      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: '#EAEAEA' }}>
            Welcome, <strong>{user.username}</strong>
          </span>
          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: '1px solid #FF375F',
              color: '#FF375F',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#FF375F';
              e.target.style.color = '#0D0D0D';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#FF375F';
            }}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
