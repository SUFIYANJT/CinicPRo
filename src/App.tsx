import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Appointment from './components/Appointment';
import { AppLoadingSkeleton } from './components/SkeletonLoader';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  // Set class on html element for tailwind dark mode
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  if (isLoading) {
    return <AppLoadingSkeleton />;
  }

  return (
    <div className="App min-h-screen transition-colors duration-300 bg-white dark:bg-gray-900 dark:text-white">
      {isAuthenticated ? (
        <>
          <div className="flex justify-end p-2">
            <button
              onClick={() => setDarkMode(prev => !prev)}
              className="border px-3 py-1 rounded text-sm"
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
          <Appointment onLogout={handleLogout} />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
