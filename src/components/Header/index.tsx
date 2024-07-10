import React from 'react';
import LangToggle from './LangToggle';
import ThemeToggle from './ThemeToggle';
import Cart from './Cart';
import BurgerMenu from './BurgerMenu';
import Navigation from './Navigation';
import User from './User';
import Search from './Search';

const Header: React.FC = () => {
  return (
    <div className=" sticky top-0 z-40 shadow-custom">
      <div className="h-20 px-5 min-[400px]:px-10 sm:px-20 md:px-30 xl:px-40 custom:px-56 bg-sky-600 dark:bg-indigo-950 flex flex-row justify-between text-gray-100 dark:text-gray-300">
        <BurgerMenu />
        <Navigation />
        <Search />
        <div className="flex flex-row items-center gap-1 sm:gap-2 ">
          <ThemeToggle />
          <LangToggle />
          <Cart />
          <User />
        </div>
      </div>
    </div>
  );
};

export default Header;
