import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [viewMode, setViewMode] = useState('empathy');
  const toggleMode = () => setViewMode((m) => (m === 'empathy' ? 'logic' : 'empathy'));
  const isEmpathy = viewMode === 'empathy';
  return (
    <ThemeContext.Provider value={{ viewMode, toggleMode, isEmpathy }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider');
  return ctx;
};
