import React from 'react';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import { LoadingStatus } from '../../reducers/pizzaReducer';

import { useAppDispatch, useAppSelector } from '../../reducers/hooks';
import { initializePizza } from '../../reducers/pizzaReducer';

import PizzaCard from './PizzaCard';
import PizzaCardSkeleton from './PizzaCard/Skeleton';
import {
  selectCategory,
  selectCurrentPage,
  selectLoadingStatus,
  selectPizzaList,
  selectSearch,
  selectSortBy,
} from '../../reducers/selectors';

const Pizzas: React.FC = () => {
  const initialized = React.useRef<boolean>(false);
  const initializedSecondary = React.useRef<boolean>(true);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const pizzaList = useAppSelector(selectPizzaList);
  const loadingStatus = useAppSelector(selectLoadingStatus);

  const category = useAppSelector(selectCategory);
  const sortBy = useAppSelector(selectSortBy);
  const currentPage = useAppSelector(selectCurrentPage);
  const search = useAppSelector(selectSearch);

  React.useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      if (window.location.search) {
        const params = qs.parse(window.location.search.substring(1));

        dispatch(
          initializePizza({
            category: params.category,
            search: params.search,
            sort: params.sort,
            page: params.page,
          }),
        );
        initializedSecondary.current = false;
      }
    }
    if (initializedSecondary.current) {
      window.scroll(0, 0);

      dispatch(initializePizza({ category, sort: sortBy, page: currentPage, search }));

      const queryString = qs.stringify({
        category,
        search,
        sort: sortBy,
        page: currentPage,
      });

      navigate(`?${queryString}`);
    }
    initializedSecondary.current = true;
  }, [category, sortBy, currentPage, search]);

  const renderPizzaList = () => {
    if (loadingStatus === LoadingStatus.FULFILLED) {
      return pizzaList.length !== 0 ? (
        pizzaList.map((pizza) => <PizzaCard key={pizza.id} {...pizza} />)
      ) : (
        <div className="flex justify-center">
          Піцци за запитом: {category}, {search} не знайдено
        </div>
      );
    } else {
      return [...new Array(3)].map((_, i) => <PizzaCardSkeleton key={i} />);
    }
  };
  console.log();

  return (
    <div
      className={`${
        loadingStatus === LoadingStatus.FULFILLED && pizzaList.length === 0
          ? 'flex flex-col'
          : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-2'
      }`}>
      {renderPizzaList()}
    </div>
  );
};

export default Pizzas;
