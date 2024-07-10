import axios from 'axios';

import { FetchPizzaParams, Limit } from '../types';

const baseUrl = 'http://localhost:3000/api/pizzas/';

const getPizza = async ({ category, sort, page, search }: FetchPizzaParams) => {
  const params = {
    page,
    category,
    sort,
    search,
    limit: Limit.Default,
  };

  const response = await axios.get(baseUrl, { params });

  return {
    data: response.data.pizzas,
    pageCount: response.data.pageCount,
    filter: response.data.filter,
  };
};

const getPizzaById = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const createPizzaReview = async (newReviewObj) => {
  const response = await axios.post('http://localhost:3000/api/reviews/', newReviewObj);
  return response.data;
};

const updatePizzaReview = async (reviewId, updatedReview) => {
  const response = await axios.put(`http://localhost:3000/api/reviews/${reviewId}`, updatedReview);
  return response.data;
};

export default { getPizza, getPizzaById, createPizzaReview, updatePizzaReview };
