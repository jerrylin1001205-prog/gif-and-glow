import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  background: string | null;
  setBackground: (bg: string | null) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: true,
  toggleTheme: () => {},
  background: null,
  setBackground: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('emojiverse-theme');
    return saved ? saved === 'dark' : true;
  });
  const [background, setBackground] = useState<string | null>(() => {
    return localStorage.getItem('emojiverse-bg');
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('emojiverse-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    if (background) {
      localStorage.setItem('emojiverse-bg', background);
    } else {
      localStorage.removeItem('emojiverse-bg');
    }
  }, [background]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme: () => setIsDark(!isDark), background, setBackground }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
