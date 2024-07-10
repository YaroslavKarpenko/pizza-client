import React from 'react';
import { useAppDispatch } from '../../reducers/hooks';
import { useTranslation } from 'react-i18next';

import {
  removeItemFromCart,
  incrementItemQuantity,
  decrementItemQuantity,
  CartItemType,
} from '../../reducers/cartReducer';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ClearIcon from '@mui/icons-material/Clear';

const CartItem: React.FC<CartItemType> = ({
  id,
  name,
  img,
  selectedDough,
  selectedSize,
  quantity,
  price,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const currentItem: CartItemType = { id, name, img, selectedDough, selectedSize, quantity, price };

  const onClickRemove = () => dispatch(removeItemFromCart(currentItem));

  const onClickIncreaseQuantity = () => dispatch(incrementItemQuantity(currentItem));

  const onClickDecreaseQuantity = () => dispatch(decrementItemQuantity(currentItem));

  return (
    <div className="grid grid-cols-6 gap-x-0 gap-y-0 bg-white dark:bg-indigo-950 shadow-2xl items-center rounded-md text-sm md:text-base text-slate-700 dark:text-gray-300 h-[150px]">
      <div className="col-span-1 flex items-center justify-center ">
        <img
          className="w-3/4 h-[50px] sm:h-[80px] object-cover  rounded-md border border-slate-700 dark:border-gray-300"
          src={img}
          alt="Product"
        />
      </div>
      <div className="col-span-2 flex flex-col justify-end p-2 sm-p-4">
        <span className="font-semibold">{name}</span>
        <span className="">
          {t('cart.dough')} {t(`cart.cart-item.dough.${selectedDough}`)}, {t('cart.size')}{' '}
          {t(`cart.cart-item.size.${selectedSize}`)}
        </span>
      </div>
      <div className="col-span-1  flex flex-col md:flex-row items-center justify-center gap-2">
        <button
          disabled={quantity === 1}
          className={`${
            quantity === 1
              ? ' text-slate-400 dark:text-gray-700 hover:bg-inherit '
              : 'dark:hover:bg-gray-300 dark:hover:text-indigo-950'
          } hover:bg-gray-100 rounded-full  transition-all	duration-200	ease-in-out h-10 w-10 items-center justify-center flex`}
          onClick={onClickDecreaseQuantity}>
          <RemoveIcon className="items-center justify-center flex " />
        </button>
        <span className=" flex items-center justify-center w-10 font-semibold">{quantity}</span>
        <button
          className=" text-slate-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-300 dark:hover:text-indigo-950  rounded-full  transition-all	duration-200	ease-in-out h-10 w-10 items-center justify-center flex"
          onClick={onClickIncreaseQuantity}>
          <AddIcon className="items-center justify-center " />
        </button>
      </div>
      <div className="col-span-1 flex flex-row items-end justify-end ">
        <span className=" font-semibold">{quantity * price}₴</span>
      </div>
      <div className="col-span-1 flex justify-center">
        <button
          onClick={onClickRemove}
          className="flex justify-center items-center p-2 rounded-full hover:bg-gray-100  dark:hover:bg-gray-300 dark:hover:text-indigo-950 transition-all	duration-200	ease-in-out">
          <ClearIcon />
        </button>
      </div>
    </div>
  );
};
export default CartItem;
