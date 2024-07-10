import React, { useEffect } from 'react';
import { useAppSelector } from '../reducers/hooks';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../reducers/hooks';
import { Link } from 'react-router-dom';
import { clearCart } from '../reducers/cartReducer';
import CartItem from '../components/CartItem';

import ClearAllIcon from '@mui/icons-material/ClearAll';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { selectCartItems, selectTotalPrice, selectTotalQuantity } from '../reducers/selectors';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const cartItems = useAppSelector(selectCartItems);
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const totalPrice = useAppSelector(selectTotalPrice);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const handleClickRemoveAll = () => {
    confirm('Ви дійсно бажаєте очистити кошик?') && dispatch(clearCart());
  };

  return (
    <div className="flex flex-col w-full min-h-screen h-full px-5 min-[400px]:px-10 sm:px-20 md:px-30 xl:px-40 custom:px-56">
      <h2 className="flex items-center justify-center my-10 md:my-20 text-slate-700 dark:text-gray-300 text-xl font-semibold">
        {t('cart.title')}
      </h2>
      {totalQuantity === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <span className=" text-slate-700 dark:text-gray-300">Зараз у кошику пусто</span>
          <span className=" text-slate-700 dark:text-gray-300">{`Але це можна виправити :)`}</span>
          <Link
            to={'/products'}
            className="flex items-center p-2 bg-sky-600 text-gray-100 dark:bg-indigo-950 dark:text-gray-300 hover:bg-gray-100 hover:text-sky-600  dark:hover:bg-gray-300 dark:hover:text-indigo-950 transition-all	duration-200	ease-in-out rounded-md w-fit border-2 border-sky-600 dark:border-gray-300  hover:border-sky-600 dark:hover:border-gray-300 shadow-lg ">
            <ArrowBackIcon />
            Повернутися до вибору піцци
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-6 gap-x-0 gap-y-0 bg-sky-600 dark:bg-gray-300 shadow-2xl items-center rounded-md text-sm md:text-base font-semibold text-gray-100 dark:text-indigo-950 h-[40px] mb-4">
            <span className="col-start-2 col-span-2 flex justify-start p-2 sm-p-4">назва</span>
            <span className="col-span-1 flex justify-center">qty</span>
            <span className="col-span-1 flex justify-end">price</span>
            <div className="col-span-1 flex justify-center">
              <button
                className="flex justify-center items-center p-1 hover:bg-gray-100 hover:text-sky-600  dark:hover:bg-indigo-950 dark:hover:text-gray-300 transition-all	duration-200	ease-in-out rounded-md"
                onClick={handleClickRemoveAll}>
                <ClearAllIcon />
              </button>
            </div>
          </div>
          <ul className=" grid grid-cols-1 gap-4 mb-4">
            {cartItems.map((item, i) => {
              return <CartItem key={i} {...item} />;
            })}
          </ul>
          <div className="grid grid-cols-6 gap-x-0 gap-y-0 bg-sky-600 dark:bg-gray-300 shadow-2xl items-center rounded-md text-sm md:text-base font-semibold text-gray-100 dark:text-indigo-950 h-[40px] mb-4">
            <span className="col-start-2 col-span-2 flex justify-start p-2 sm-p-4">Всього:</span>
            <span className="col-span-1 flex justify-center">{totalQuantity} шт.</span>
            <span className="col-span-1 flex justify-end">{totalPrice}₴</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-20 gap-4">
            <Link
              to={'/products'}
              className="flex items-center p-2 text-sky-600 bg-gray-100 dark:text-indigo-950 dark:bg-gray-300 hover:text-gray-100 hover:bg-sky-600  dark:hover:text-gray-300 dark:hover:bg-indigo-950 transition-all	duration-200	ease-in-out rounded-md w-fit border-2 border-sky-600  dark:border-gray-300 shadow-lg  ">
              <ArrowBackIcon />
              Продовжити покупки
            </Link>
            <Link
              to={'#'}
              className="flex items-center p-4 text-lg font-bold bg-sky-600 text-gray-100 dark:bg-indigo-950 dark:text-gray-300 hover:bg-gray-100 hover:text-sky-600  dark:hover:bg-gray-300 dark:hover:text-indigo-950 transition-all	duration-200	ease-in-out rounded-md w-fit border-2 dark:border-gray-300 hover:border-sky-600  shadow-lg ">
              Оформити замовлення
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
