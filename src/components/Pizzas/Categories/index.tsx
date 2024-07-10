import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../reducers/hooks';
import { useResizeEffect } from '../../../hooks/ResizeEffect';
import { changeCategory } from '../../../reducers/filterReducer';

import FilterListIcon from '@mui/icons-material/FilterList';

import { Category } from '../../../types';
import Popover from '../../Popover';
import RightArrowIcon from '../../svg/RightArrowIcon.svg?react';
import LeftArrowIcon from '../../svg/LeftArrowIcon.svg?react';
const categories: Category[] = Object.values(Category);

const Categories: React.FC = () => {
  const { t } = useTranslation();
  const selectedCategory = useAppSelector(({ filter }) => {
    return filter.category;
  });

  const dispatch = useAppDispatch();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const [showScrollButton, setShowScrollButton] = React.useState<boolean>(false);

  useResizeEffect(() => {
    const scrollContainer = scrollRef.current;

    if (scrollContainer) {
      const canScroll = scrollContainer.scrollWidth > scrollContainer.clientWidth;
      setShowScrollButton(canScroll);
    }
  });

  const onClickCategory = (category: Category): void => {
    dispatch(changeCategory(category));
  };

  const scrollToCategory = (direction: 'left' | 'right') => {
    const scrollContainer = scrollRef.current;

    if (scrollContainer) {
      const containerWidth = scrollContainer.clientWidth;
      const scrollLeft = scrollContainer.scrollLeft;
      const scrollWidth = scrollContainer.scrollWidth;
      return {
        left: () => {
          const newScrollLeft = scrollLeft - containerWidth;
          scrollContainer.scrollTo({
            left: newScrollLeft >= 0 ? newScrollLeft : 0,
            behavior: 'smooth',
          });
        },
        right: () => {
          const newScrollLeft = scrollLeft + containerWidth;
          const maxScrollLeft = scrollWidth - containerWidth;
          scrollContainer.scrollTo({
            left: newScrollLeft <= maxScrollLeft ? newScrollLeft : maxScrollLeft,
            behavior: 'smooth',
          });
        },
      }[direction]();
    }
  };

  return (
    <>
      {showScrollButton && (
        <div
          onClick={() => {
            scrollToCategory('left');
          }}
          className="hidden md:flex mx-4 rounded-xl items-center justify-center w-9 h-9 p-2 shadow-lg  bg-gray-300 dark:bg-gray-600 text-sky-600 hover:text-sky-700 dark:text-gray-300 dark:hover:text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-400  transition-all	duration-200	ease-in-out cursor-pointer">
          <LeftArrowIcon className="w-6 h-6" />
        </div>
      )}
      <div ref={scrollRef} className="hidden md:flex overflow-scroll ">
        <ul className="flex flex-row gap-5 my-6 ">
          {categories.map((category, index) => {
            return (
              <li
                key={index}
                onClick={() => onClickCategory(category)}
                className={` px-2 py-1 rounded-xl text-xl cursor-pointer shadow-md ${
                  selectedCategory === category
                    ? ' bg-sky-600 dark:bg-indigo-950 text-gray-100 dark:text-gray-300 transition duration-100 ease-out hover:ease-in '
                    : '  bg-gray-300 dark:bg-gray-600 text-sky-600 hover:text-sky-700 dark:text-gray-300 dark:hover:text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-400   transition-all	duration-200	ease-in-out'
                }`}>
                {t(`catalog.categories.pizza-categories.${category}`)}
              </li>
            );
          })}
        </ul>
      </div>
      {showScrollButton && (
        <div
          onClick={() => {
            scrollToCategory('right');
          }}
          className=" hidden md:flex mx-4 rounded-xl items-center justify-center w-9 h-9 p-2 shadow-lg  bg-gray-300 dark:bg-gray-600 text-sky-600 hover:text-sky-700 dark:text-gray-300 dark:hover:text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-400 transition-all	duration-200	ease-in-out  cursor-pointer ">
          <RightArrowIcon className="w-6 h-6" />
        </div>
      )}
      <Popover className="  flex md:hidden   ">
        <Popover.Button className="rounded-xl items-center justify-center w-9 h-9 shadow-lg bg-gray-300 dark:bg-gray-600 text-sky-600 hover:text-sky-700 dark:text-gray-300 dark:hover:text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-400 transition-all	duration-200	ease-in-out">
          <FilterListIcon />
        </Popover.Button>
        <Popover.List className=" absolute top-10 left-0 z-30 ">
          {categories.map((value, i) => (
            <Popover.ListItem
              onClick={() => onClickCategory(value)}
              key={i}
              className={`${
                value === selectedCategory
                  ? 'bg-gray-400  cursor-default dark:bg-gray-800 dark:text-gray-400'
                  : ' hover:bg-gray-300  dark:hover:bg-gray-400'
              }`}>
              {t(`catalog.categories.pizza-categories.${value}`)}
            </Popover.ListItem>
          ))}
        </Popover.List>
      </Popover>
    </>
  );
};

export default Categories;
