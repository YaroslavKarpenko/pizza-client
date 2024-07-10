import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../reducers/hooks';

import { refreshFilter } from '../reducers/filterReducer';

import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';

const icons = [
  <DeliveryDiningIcon fontSize="large" />,
  <LoyaltyIcon fontSize="large" />,
  <DinnerDiningIcon fontSize="large" />,
  <VolunteerActivismIcon fontSize="large" />,
  <WorkspacePremiumIcon fontSize="large" />,
  <PregnantWomanIcon fontSize="large" />,
];
const sectionsContent = [
  {
    title: 'Условия доставки',
    content: 'Мы гарантируем быструю и надежную доставку свежих пицц прямо к вам домой или в офис.',
  },
  {
    title: 'Акции и скидки',
    content:
      'При заказе двух пицц - третья в подарок! А также регулярные акции и скидки для наших постоянных клиентов.',
  },
  {
    title: 'Качество ингредиентов',
    content:
      'Мы используем только свежие и натуральные ингредиенты высшего качества для приготовления наших пицц.',
  },
  {
    title: 'Процесс приготовления',
    content: 'Каждая пицца готовится с любовью и заботой нашими опытными поварами.',
  },
  {
    title: 'Гарантии качества',
    content: 'Мы гарантируем свежесть и качество каждой пиццы, доставляемой нашей службой.',
  },
  {
    title: 'Особый подход',
    content:
      'Мы понимаем, что каждый клиент уникален, поэтому мы предлагаем индивидуальный подход к вашим пожеланиям.',
  },
];

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    window.scroll(0, 0);
    dispatch(refreshFilter());
  }, []);

  return (
    <div className="flex flex-col">
      <div className="relative min-h-screen h-full">
        <div className=" absolute h-screen w-full z-10 bg-gradient-to-b from-black/40 to-black/70 dark:from-slate-900/40 dark:to-slate-900/70 md:from-black/10 md:to-black/50 md:dark:from-slate-900/10 md:dark:to-slate-900/60"></div>
        <div className=" absolute z-0 h-screen w-full bg-home-background bg-left-bottom md:bg-center bg-no-repeat bg-cover"></div>
        <div className=" relative z-30 flex flex-col px-5 min-[400px]:px-10 sm:px-20 md:px-30 xl:px-40 custom:px-56">
          <div className="mt-40 md:mt-0 justify-center md:absolute flex flex-col right-5 min-[400px]:right-10 sm:right-20 md:right-30 xl:right-40 custom:right-56 top-[200px] items-center gap-4 sm:gap-8">
            <div className="text-2xl  min-[420px]:text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-100 dark:text-gray-300 text-center">
              Найкраща піца у вашому місті!
            </div>
            <Link
              to={'/products'}
              className="flex text-xl sm:text-2xl lg:text-3xl font-medium rounded-md border-2 border-gray-100 dark:border-gray-300 hover:border-sky-600 dark:hover:border-indigo-950 p-2 min-[420px]:p-4 sm:p-6   text-gray-100 dark:text-gray-300 hover:text-sky-600 hover:bg-gray-100 dark:hover:text-indigo-950 dark:hover:bg-gray-300 bg-sky-600 dark:bg-indigo-950 cursor-pointer transition-all	duration-200	ease-in-out ">
              Перейти до каталогу
            </Link>
          </div>
        </div>
      </div>
      <div className=" z-30 -mt-[80px] flex px-5 min-[400px]:px-10 sm:px-20 md:px-30 xl:px-40 custom:px-56 justify-center ">
        <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-14 mb-[100px] ">
          {sectionsContent.map((item, i) => {
            return (
              <li
                key={i}
                className={`flex min-w-[250px] min-[460px]:min-w-[320px] max-w-[380px] flex-col rounded-sm ${
                  i % 2 === 1
                    ? ' bg-sky-600 dark:bg-gray-300 text-gray-100 dark:text-indigo-950 '
                    : ' bg-white text-sky-600 dark:bg-indigo-950 dark:text-gray-300'
                } shadow-2xl p-6 min-[460px]:p-10`}>
                <div className="flex min-[460px]:h-[85px] mb-4 flex-row items-center">
                  {icons[i]}
                  <div className="pl-4 text-lg min-[460px]:text-2xl font-semibold">
                    {item.title}
                  </div>
                </div>

                <div className=" text-base min-[460px]:text-lg">{item.content}</div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex justify-center px-5 min-[400px]:px-10 sm:px-20 md:px-30 xl:px-40 custom:px-56 mb-20  ">
        <div className="flex flex-col md:flex-row shadow-2xl bg-white dark:bg-indigo-950 p-5 md:p-10 rounded-sm gap-4 md:gap-14 items-center justify-center  ">
          <span className="flex text-base font-semibold text-sky-600 dark:text-gray-300">
            Підписатись на розсилку
          </span>
          <form
            className="flex flex-col md:flex-row gap-4  items-center justify-between"
            onSubmit={(event) => {
              event.preventDefault;
            }}>
            <input
              className=" rounded-[4px] h-[32px] pl-3 border-2 border-sky-600 dark:border-gray-800 text-sky-600 dark:text-indigo-950"
              value={''}
              placeholder="Ваша пошта..."
              onChange={() => {}}
            />
            <button
              className=" flex justify-center items-center px-3 rounded-[4px] h-[32px] max-w-min bg-sky-600 text-gray-100 dark:bg-gray-800 dark:text-gray-300 hover:bg-sky-500 hover:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-gray-100 transition-all	duration-200	ease-in-out"
              type="submit">
              Підписатися
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
