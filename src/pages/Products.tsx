import React from 'react';

import Categories from '../components/Pizzas/Categories';
import Sort from '../components/Pizzas/Sort';

import Pizzas from '../components/Pizzas';

import Pagination from '../components/Pagination';
import Notification from '../components/Notification';
import { selectLoadingStatus } from '../reducers/selectors';
import { useAppSelector } from '../reducers/hooks';
import { LoadingStatus } from '../reducers/pizzaReducer';
import PizzaNotFound from '../components/Pizzas/PizzaNotFound';

const Products: React.FC = () => {
  const loadingStatus = useAppSelector(selectLoadingStatus);

  return (
    <div className=" px-5 min-[400px]:px-10 sm:px-20 md:px-30 xl:px-40 custom:px-56  flex flex-col  min-h-screen h-full">
      <div className="flex flex-col w-full">
        {loadingStatus === LoadingStatus.REJECTED ? (
          <PizzaNotFound />
        ) : (
          <>
            <div className="flex flex-row justify-between items-center my-10 ">
              <Categories />
              <Sort />
            </div>
            <Pizzas />
            <Notification />
            <Pagination />
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
