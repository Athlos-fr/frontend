import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.js';  // ← Add .js
import Login from './components/Auth/Login.js';  // ← Add .js
import Register from './components/Auth/Register.js';  // ← Add .js
import Navigation from './components/common/Navigation.js';  // ← lowercase 'c'

const AppContent = () => {
  const { isAuthenticated, user } = useAuth();
  const [currentView, setCurrentView] = useState('login');

  if (!isAuthenticated) {
    return currentView === 'login' ? (
      <Login onSwitchToRegister={() => setCurrentView('register')} />
    ) : (
      <Register onSwitchToLogin={() => setCurrentView('login')} />
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0D0D0D 0%, #1a1a2e 50%, #16213e 100%)' 
    }}>
      <Navigation />
      <div style={{ 
        padding: '2rem',
        textAlign: 'center',
        color: '#EAEAEA'
      }}>
        <h1 style={{
          background: 'linear-gradient(135deg, #8E2DE2 0%, #00FFFF 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontSize: '3rem',
          marginBottom: '1rem'
        }}>
          Welcome to Athlos, {user?.username}!
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
          Ready to compete and achieve greatness?
        </p>
        <div style={{
          marginTop: '2rem',
          padding: '2rem',
          background: 'rgba(31, 31, 31, 0.6)',
          borderRadius: '12px',
          border: '1px solid rgba(142, 45, 226, 0.3)',
          maxWidth: '500px',
          margin: '2rem auto'
        }}>
          <h3 style={{ color: '#00FFFF', marginBottom: '1rem' }}>
            Your Stats
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div>
              <div style={{ fontSize: '2rem', color: '#C3FF00', fontWeight: 'bold' }}>
                {user?.streak || 0}
              </div>
              <div style={{ opacity: 0.7 }}>Day Streak</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', color: '#FF00A0', fontWeight: 'bold' }}>
                {user?.totalPoints || 0}
              </div>
              <div style={{ opacity: 0.7 }}>Total Points</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
