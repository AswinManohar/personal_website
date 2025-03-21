import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  spaceThemeEnabled: boolean;
  toggleSpaceTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [spaceThemeEnabled, setSpaceThemeEnabled] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('spaceThemeEnabled');
    if (savedTheme !== null) {
      setSpaceThemeEnabled(JSON.parse(savedTheme));
    }
  }, []);

  const toggleSpaceTheme = () => {
    const newValue = !spaceThemeEnabled;
    setSpaceThemeEnabled(newValue);
    localStorage.setItem('spaceThemeEnabled', JSON.stringify(newValue));
  };

  return (
    <ThemeContext.Provider value={{ spaceThemeEnabled, toggleSpaceTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
