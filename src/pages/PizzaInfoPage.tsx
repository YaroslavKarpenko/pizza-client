import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import services from '../services/pizza';
import Rating from '@mui/material/Rating';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PizzaItem } from '../reducers/pizzaReducer';
import useAuth from '../hooks/useAuth';

const Skeleton: React.FC = () => {
  return (
    <div className=" px-5 min-[400px]:px-10 sm:px-20 md:px-30 xl:px-40  custom:px-56 py-8 flex flex-col min-h-screen items-center justify-center">
      <CircularProgress />
    </div>
  );
};

interface review {
  user: { name: string; id: string };
  rating: number;
  content: string;
  date: string;
  pizza: string;
  id: string;
}

interface PizzaInfoPageItem extends PizzaItem {
  reviews: review[];
}

const PizzaInfoPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [pizza, setPizza] = React.useState<PizzaInfoPageItem | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  console.log(pizza);
  const { isAuth, id: userId } = useAuth();

  const [newReview, setNewReview] = React.useState({
    userId,
    pizzaId: id,
    content: '',
    rating: 1,
    date: '',
  });

  console.log(pizza);
  const fetchPizza = async () => {
    if (id) {
      setIsLoading(true);
      const pizzaById = await services.getPizzaById(id);
      setPizza(pizzaById);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchPizza();
  }, [id]);

  const handleRatingChange = (event: React.SyntheticEvent, newValue: number | null) => {
    if (newValue !== null) {
      setNewReview({ ...newReview, rating: newValue });
    }
  };

  const reviewRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const currentUserReviewIndex = React.useMemo(() => {
    return pizza?.reviews.findIndex((review) => review.user.id === userId);
  }, [pizza, userId]);

  const scrollToUserReview = () => {
    if (currentUserReviewIndex !== undefined && currentUserReviewIndex !== -1) {
      reviewRefs.current[currentUserReviewIndex]?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getFormattedDate = (): string => {
    const now = new Date();

    const padZero = (num: number): string => (num < 10 ? `0${num}` : `${num}`);

    const day = padZero(now.getDate());
    const month = padZero(now.getMonth() + 1);
    const year = now.getFullYear();
    const hours = padZero(now.getHours());
    const minutes = padZero(now.getMinutes());

    return `${day}.${month}.${year}-${hours}:${minutes}`;
  };

  const handleSubmitReviewForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const date = getFormattedDate();
      const updatedReview = { ...newReview, date };
      setNewReview(updatedReview);

      const existingReviewIndex = pizza?.reviews.findIndex((review) => review.user.id === userId);

      if (existingReviewIndex !== -1) {
        const existingReviewId = pizza?.reviews[existingReviewIndex].id;
        await services.updatePizzaReview(existingReviewId, updatedReview);
      } else {
        await services.createPizzaReview(updatedReview);
      }

      setNewReview({
        userId,
        pizzaId: id,
        content: '',
        rating: 1,
        date: '',
      });
      await fetchPizza();
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <Skeleton />
  ) : (
    <div className="mt-4 sm:mt-8 px-5 min-[400px]:px-10 sm:px-20 md:px-30 xl:px-40 custom:px-56 mx-auto text-black dark:text-gray-300">
      <Link
        to={'/products'}
        className="my-2 sm:my-4 flex items-center  text-black hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400 transition-all	duration-200	ease-in-out rounded-md w-fit">
        <ArrowBackIcon />
        Повернутися до вибору піцци
      </Link>
      <h1 className="text-3xl font-bold mb-4">{pizza?.name}</h1>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <img
            src={pizza?.img}
            alt={pizza?.name}
            className="w-full rounded-lg shadow-md object-cover max-h-96"
          />
        </div>
        <div className="flex-1">
          <p className="text-lg mb-2">
            <strong>{t('pizza-info-page.origin')}</strong> {pizza?.origin}
          </p>
          <p className="text-lg mb-2 flex items-center">
            <strong>{t('pizza-info-page.rating')}</strong>{' '}
            <Rating
              name="customized-10"
              defaultValue={pizza?.rating}
              readOnly
              precision={0.1}
              max={5}
            />
            ({pizza?.rating})
          </p>
          <div className="mb-4">
            <strong>{t('pizza-info-page.available-dough')}</strong>
            <ul className="list-disc list-inside">
              {pizza?.doughTypes.map((dough, index) => (
                <li key={index}>{dough}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <strong>{t('pizza-info-page.available-sizes')}</strong>
            <ul className="list-disc list-inside">
              {pizza?.sizes.map((size, index) => (
                <li key={index}>{size}</li>
              ))}
            </ul>
          </div>
          <p className="mb-4">
            <strong>{t('pizza-info-page.recipe')}</strong>{' '}
            {'A delicious traditional pizza with tomato sauce, mozzarella cheese, and fresh basil.'}
          </p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 flex justify-center">Reviews</h2>
        {isAuth ? (
          <>
            <button onClick={scrollToUserReview}>show your review</button>
            <form onSubmit={handleSubmitReviewForm} className="mb-4">
              <Rating
                name="simple-controlled"
                value={newReview.rating}
                onChange={handleRatingChange}
              />
              <textarea
                className="w-full p-2 border rounded-lg mb-2"
                placeholder="Leave a review..."
                rows={4}
                value={newReview.content}
                onChange={(e) =>
                  setNewReview({ ...newReview, content: e.target.value })
                }></textarea>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                {currentUserReviewIndex !== -1 ? 'Update review' : 'Submit Review'}
              </button>
            </form>
          </>
        ) : (
          <p className="flex justify-center">
            To leave a review about the product you need to log in
          </p>
        )}

        <div className="flex flex-col justify-center">
          {pizza?.reviews.length === 0 ? (
            <p className="m-4">The list of product reviews is empty...</p>
          ) : (
            pizza?.reviews.map((review, index) => (
              <div
                key={index}
                className="mb-4 p-4 border rounded-lg shadow-md"
                ref={(el) => (reviewRefs.current[index] = el)}>
                <p className="flex flex-row justify-between">
                  <span className="text-lg font-semibold">{review?.user.name}</span>
                  <span className="">{review?.date}</span>
                </p>
                <Rating
                  name="customized-10"
                  defaultValue={review?.rating}
                  readOnly
                  precision={0.1}
                  max={5}
                />
                <p>{review.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default PizzaInfoPage;
