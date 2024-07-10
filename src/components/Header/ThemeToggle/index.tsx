import React from 'react';
import { ThemeContext } from './ThemeContext';
import LightTheme from '../../svg/LightTheme.svg?react';
import DarkTheme from '../../svg/DarkTheme.svg?react';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  const handleClickThemeToggle = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <div
      className="flex items-center text-gray-100 dark:text-gray-300 "
      onClick={handleClickThemeToggle}>
      {theme === 'dark' ? (
        <button className="flex justify-center items-center ">
          <LightTheme className=" h-8 w-8" />
        </button>
      ) : (
        <button className="flex justify-center items-center ">
          <DarkTheme className=" h-8 w-8" />
        </button>
      )}
    </div>
  );
};

export default ThemeToggle;
