import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { CartItemType, addItemToCart } from '../../../reducers/cartReducer';
import { addNotification, removeNotification } from '../../../reducers/notificationReducer';

import { Rating } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { PizzaItem } from '../../../reducers/pizzaReducer';
import FeedbackIcon from '../../svg/FeedbackIcon.svg?react';
const PizzaCard: React.FC<PizzaItem> = ({
  id,
  name,
  img,
  doughTypes,
  sizes,
  price,
  rating,
  feedback,
}) => {
  const { t } = useTranslation();
  const [selectedDough, setSelectedDough] = React.useState(doughTypes[0]);
  const [selectedSize, setSelectedSize] = React.useState(sizes[0]);
  const dispatch = useDispatch();

  const item: CartItemType = {
    id,
    name,
    img,
    selectedDough,
    selectedSize,
    price,
    quantity: 0,
  };

  const handleClickDouhType = (dough: string) => {
    setSelectedDough(dough);
  };

  const handleClickPizzaSize = (size: string) => {
    setSelectedSize(size);
  };

  const handleClickAddButton = () => {
    dispatch(addItemToCart(item));
    dispatch(addNotification(`${item.name} pizza was just added to your shopping cart!`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <div className=" mb-10 justify-self-center bg-white dark:bg-indigo-950 shadow-2xl max-w-[350px] min-w-[280px] rounded-xl">
      <div className="flex items-end h-60">
        <Link
          to={`/products/pizzas/${id}`}
          className="w-full h-full inline-block overflow-hidden relative rounded-t-xl">
          <div className="absolute left-0 top-0 w-full h-full z-10 bg-gradient-to-b from-black/10  to-black/60"></div>
          <img
            className="absolute left-0 top-0 w-full h-full z-0 object-cover"
            src={img}
            alt="Pizza"
          />
          <div className="px-1 min-[340px]:p-2 md:px-5 pb-2 absolute left-0 bottom-0 z-20 w-full flex justify-center items-end">
            <h4 className="text-lg min-[300px]:text-xl md:text-2xl lg:text-3xl font-bold text-gray-100 dark:text-gray-300">
              {name}
            </h4>
          </div>
        </Link>
      </div>
      <div className="flex flex-col px-2 pt-4 md:pt-3 lg:pt-5 ">
        <div className="flex flex-row justify-between items-center pb-4 px-2 md:px-4">
          <Rating name="read-only" defaultValue={rating} precision={0.1} readOnly />
          <div className="flex flex-row items-center justify-between w-10 cursor-pointer">
            <FeedbackIcon className="w-6 h-6 dark:text-gray-300" />
            <span className="text-sm md:text-base text-black dark:text-gray-300">{feedback}</span>
          </div>
        </div>
        <div className="flex flex-col  bg-gray-100 dark:bg-gray-500  rounded-2xl p-2 gap-2 ">
          <ul className="flex w-full gap-2 object-contain ">
            {doughTypes.map((dough, i) => (
              <li
                onClick={() => {
                  handleClickDouhType(dough);
                }}
                key={i}
                className={`flex items-center  rounded-xl justify-center flex-grow basis-1/3 cursor-pointer p-1 text-sm md:text-base text-black transition-all	duration-200	ease-in-out ${
                  selectedDough === dough
                    ? 'bg-gray-400 cursor-default  dark:bg-gray-800 dark:text-gray-300'
                    : ' hover:bg-gray-300 bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-400 '
                }`}>
                {t(`catalog.pizza-list.pizza-card.dough.${dough}`)}
              </li>
            ))}
          </ul>
          <ul className="flex w-full gap-2 ">
            {sizes.map((size, i) => (
              <li
                onClick={() => {
                  handleClickPizzaSize(size);
                }}
                key={i}
                className={`flex items-center justify-center rounded-xl flex-grow basis-1/3 cursor-pointer p-1 text-sm md:text-base text-black transition-all	duration-200	ease-in-out ${
                  selectedSize === size
                    ? 'bg-gray-400 cursor-default  dark:bg-gray-800 dark:text-gray-300 '
                    : ' hover:bg-gray-300 bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-400 rounded'
                }`}>
                {t(`catalog.pizza-list.pizza-card.size.${size}`)}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex  justify-between items-center mt-4 mb-3  ">
          <div className="text-2xl ml-8 font-bold text-gray-800 dark:text-gray-300">{price} ₴</div>
          <button
            onClick={handleClickAddButton}
            className="cursor-pointer w-36 h-10 flex rounded-xl text-gray-200 hover:text-gray-100 bg-green-700 hover:bg-green-600 items-center justify-center p-2 transition-all	duration-200	ease-in-out">
            В кошик
            <AddShoppingCartIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;
