import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const themes = {
  light: {
    name: 'Light',
    primary: '#6366f1',
    secondary: '#8b5cf6',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1e293b',
    textSecondary: '#64748b',
    border: '#e2e8f0',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    cardBg: '#ffffff',
    cardHover: '#f8fafc',
    buttonText: '#ffffff',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  dark: {
    name: 'Dark',
    primary: '#818cf8',
    secondary: '#a78bfa',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    border: '#334155',
    success: '#34d399',
    error: '#f87171',
    warning: '#fbbf24',
    cardBg: '#1e293b',
    cardHover: '#334155',
    buttonText: '#ffffff',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  gradient: {
    name: 'Gradient',
    primary: '#ec4899',
    secondary: '#8b5cf6',
    background: '#1a1a2e',
    surface: '#16213e',
    text: '#ffffff',
    textSecondary: '#cbd5e1',
    border: '#0f3460',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    cardBg: 'linear-gradient(135deg, #667eea22 0%, #764ba222 100%)',
    cardHover: 'linear-gradient(135deg, #667eea33 0%, #764ba233 100%)',
    buttonText: '#ffffff',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  neon: {
    name: 'Neon',
    primary: '#00ff88',
    secondary: '#00d4ff',
    background: '#0a0e27',
    surface: '#151a35',
    text: '#ffffff',
    textSecondary: '#a0aec0',
    border: '#2d3748',
    success: '#00ff88',
    error: '#ff0055',
    warning: '#ffaa00',
    cardBg: '#151a35',
    cardHover: '#1e2642',
    buttonText: '#0a0e27',
    gradient: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)'
  },
  pastel: {
    name: 'Pastel',
    primary: '#a78bfa',
    secondary: '#f472b6',
    background: '#fef3f2',
    surface: '#fff7ed',
    text: '#44403c',
    textSecondary: '#78716c',
    border: '#fde4e4',
    success: '#86efac',
    error: '#fca5a5',
    warning: '#fcd34d',
    cardBg: '#ffffff',
    cardHover: '#fff7ed',
    buttonText: '#ffffff',
    gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)'
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
    
    // Apply theme variables to CSS
    const theme = themes[currentTheme];
    Object.keys(theme).forEach(key => {
      if (key !== 'name') {
        document.documentElement.style.setProperty(`--${key}`, theme[key]);
      }
    });
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const value = {
    currentTheme,
    theme: themes[currentTheme],
    themes,
    changeTheme
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
