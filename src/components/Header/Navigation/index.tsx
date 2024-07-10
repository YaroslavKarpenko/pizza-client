import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Pages } from '../../../types';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';

const pagesList = Object.entries(Pages);

const Navigation: React.FC = () => {
  const { pathname } = useLocation();

  const isThisLocation = (location: string): boolean => {
    return pathname === location;
  };

  return (
    <>
      <ul className="  hidden px-0 w976:flex flex-row flex-wrap gap-5">
        {pagesList.map((item, id) => {
          return (
            <li key={id} className="flex items-center  ">
              <Link
                to={item[1]}
                className={` inline-flex text-gray-100  dark:text-gray-300 text-base sm:text-lg md:text-xl items-center ${
                  isThisLocation(item[1]) ? 'font-extrabold' : 'font-semibold'
                } hover:text-gray-300 dark:hover:text-gray-400 p-1 rounded-sm transition-all	duration-200	ease-in-out `}>
                {id === 0 && <LocalPizzaIcon />}
                {item[0]}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default Navigation;
