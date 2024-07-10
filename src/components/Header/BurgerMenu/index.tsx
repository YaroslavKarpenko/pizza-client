import React from 'react';
import Drawer from '../Drawer';
import { Pages } from '../../../types';
import BurgerButton from '../../svg/BurgerButton.svg?react';
import { Link } from 'react-router-dom';

const pagesList = Object.entries(Pages);

const BurgerMenu: React.FC = () => {
  return (
    <>
      <Drawer className="flex w976:hidden">
        <Drawer.Button className=" cursor-pointer focus:outline-none w-8 flex h-full text-gray-100 dark:text-gray-300  text-base sm:text-lg md:text-xl font-semibold items-center  ">
          <BurgerButton />
        </Drawer.Button>
        <Drawer.Content className="flex flex-col pt-2 w-48">
          {pagesList.map((item, id) => {
            return (
              <Drawer.CloseButton
                key={id}
                className="text-gray-100 dark:text-gray-300 text-base sm:text-lg md:text-xl font-semibold hover:font-extrabold border-b border-gray-200 dark:border-gray-700 pb-2 mb-2 last:border-b-0 last:mb-0">
                <Link to={item[1]}>{item[0]}</Link>
              </Drawer.CloseButton>
            );
          })}
        </Drawer.Content>
      </Drawer>
    </>
  );
};
export default BurgerMenu;
