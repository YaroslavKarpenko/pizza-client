import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../reducers/hooks';

import { changeSortType } from '../../../reducers/filterReducer';
import { useTranslation } from 'react-i18next';

import { useClickAway } from 'react-use';

import { SortType } from '../../../types';

import Popover from '../../Popover';

const sort = Object.values(SortType);

const Sort: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const selectedSortType = useAppSelector(({ filter }) => {
    return filter.sortBy;
  });

  const sortRef = React.useRef<HTMLDivElement>(null);

  const [visible, setVisible] = React.useState<boolean>(false);

  useClickAway(sortRef, () => {
    setVisible(false);
  });

  const handleClickSortType = (sortType: SortType): void => {
    dispatch(changeSortType(sortType));
    setVisible(!visible);
  };

  const handleClickSelectedSortType = () => {
    setVisible(!visible);
  };

  return (
    <div ref={sortRef} className="flex  ">
      <div className="flex text-lg ">
        <Popover className="flex items-center ">
          <span className=" flex min-w-fit font-medium  text-gray-600 dark:text-gray-300">
            {t('catalog.sort-popup.sort-by')}
          </span>
          <Popover.Button className="px-1 font-normal italic text-sky-600 dark:text-gray-400 flex items-center ">
            {t(`catalog.sort-popup.sort.${selectedSortType}`)}
          </Popover.Button>
          <Popover.List className=" absolute top-10 right-0 z-30 flex flex-col rounded-lg bg-gray-200 dark:bg-gray-500 dark:text-gray-400 font-normal text-lg p-2 gap-2 items-center justify-center shadow-lg">
            {sort.map((value, i) => (
              <Popover.ListItem
                onClick={() => handleClickSortType(value)}
                key={i}
                className={`${
                  value === selectedSortType
                    ? 'bg-gray-400  cursor-default dark:bg-gray-800 dark:text-gray-400'
                    : ' hover:bg-gray-300  dark:hover:bg-gray-400'
                }`}>
                {t(`catalog.sort-popup.sort.${value}`)}
              </Popover.ListItem>
            ))}
          </Popover.List>
        </Popover>
        {/* <span className=" flex min-w-fit font-medium  text-gray-600 dark:text-gray-300">
          {t('catalog.sort-popup.sort-by')}
        </span>
        <span
          className="relative px-1 font-normal italic text-sky-600 dark:text-gray-400 flex items-center cursor-pointer"
          onClick={handleClickSelectedSortType}>
          {visible ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 pr-px">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          )}
          {t(`catalog.sort-popup.sort.${selectedSortType}`)}
          {visible ? (
            <Popup
              list={sort}
              selectedValue={selectedSortType}
              handleClickPopoverItem={() => handleClickSortType}
              localizationPrefix="catalog.sort-popup.sort"
              position="right"
            />
          ) : (
            ''
          )}
        </span> */}
      </div>
    </div>
  );
};

export default Sort;
