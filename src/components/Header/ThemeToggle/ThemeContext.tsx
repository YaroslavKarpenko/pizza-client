import React from 'react';

export type ThemeType = 'light' | 'dark';

const getInitialTheme = (): ThemeType => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('color-theme');

    if (typeof storedPrefs === 'string') {
      return storedPrefs as ThemeType;
    }
    const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
    if (userMedia.matches) {
      return 'dark';
    }
  }
  return 'light';
};

interface ThemeContextType {
  theme: ThemeType;
  setTheme: React.Dispatch<ThemeType>;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = React.useState(getInitialTheme);

  const rawSetTheme = (rawTheme: ThemeType): void => {
    const root = window.document.documentElement;
    const isDark = rawTheme === 'dark';
    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(rawTheme);
    localStorage.setItem('color-theme', rawTheme);
  };

  React.useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
