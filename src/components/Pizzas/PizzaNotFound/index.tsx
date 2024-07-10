import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../reducers/hooks';
import { initializePizza } from '../../../reducers/pizzaReducer';
import {
  selectCategory,
  selectSortBy,
  selectCurrentPage,
  selectSearch,
} from '../../../reducers/selectors';
import { useNavigate } from 'react-router-dom';

import ErrorIcon from '@mui/icons-material/Error';
import RefreshIcon from '@mui/icons-material/Refresh';
import qs from 'qs';

const PizzaNotFound: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const category = useAppSelector(selectCategory);
  const sortBy = useAppSelector(selectSortBy);
  const currentPage = useAppSelector(selectCurrentPage);
  const search = useAppSelector(selectSearch);

  const handleClickToCatalog = () => {
    dispatch(initializePizza({ category, sort: sortBy, page: currentPage }));
    const queryString = qs.stringify({
      category,
      sort: sortBy,
      page: currentPage,
      search,
    });

    navigate(`?${queryString}`);
  };

  return (
    <div className="flex flex-col mt-20 gap-4">
      <div className="flex flex-col items-center text-gray-200 ">
        <ErrorIcon fontSize="large" />
        Такої піцци не знайдено
      </div>

      <button onClick={handleClickToCatalog}>
        Refresh pizza <RefreshIcon />
      </button>
    </div>
  );
};

export default PizzaNotFound;
