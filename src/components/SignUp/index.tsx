import React from 'react';
import userService from '../../services/user';
import authService from '../../services/auth';
import { useAppDispatch } from '../../reducers/hooks';
import { createUser, setUser } from '../../reducers/userReducer';

import { useLocation, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import Form from '.././Form';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const form = event.target as HTMLFormElement;

      const name = form.username.value;
      const email = form.email.value;
      const password = form.password.value;

      dispatch(createUser({ name, email, password }));
      const from = location.state?.from || '/';
      navigate(from);
    } catch (error) {
      if (error instanceof AxiosError) {
        // Обрабатываем ошибки Axios
        if (error.response) {
          // Сервер ответил с кодом, который находится за пределами 2xx
          console.error('Response error:', error.response.data);
          alert(error.response.data);
        } else if (error.request) {
          // Запрос был сделан, но ответа не было
          console.error('No response received:', error.request);
          alert('Error: No response from the server. Please try again later.');
        } else {
          // Произошло что-то еще при настройке запроса
          console.error('Axios error:', error.message);
          alert(`Error: ${error.message}`);
        }
      } else {
        // Обрабатываем другие ошибки
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <Form onSubmit={(e) => handleSignUp(e)} className="flex flex-col items-center gap-3">
      <Form.Input name="username" placeholder="username" />
      <Form.Input name="email" placeholder="email" />
      <Form.Input name="password" placeholder="password" type="password" />
      <Form.Submit>Sign In</Form.Submit>
    </Form>
    // <form onSubmit={(e) => handleSignUp(e)} className="flex flex-col items-center">
    //   <input
    //     type="name"
    //     placeholder="username"
    //     value={name}
    //     onChange={(e) => {
    //       setName(e.target.value);
    //     }}
    //     className="mb-4 p-2 border border-gray-300 rounded text-gray-700"
    //   />
    //   <input
    //     type="email"
    //     placeholder="email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //     className="mb-4 p-2 border border-gray-300 rounded text-gray-700"
    //   />
    //   <input
    //     type="password"
    //     placeholder="password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //     className="mb-4 p-2 border border-gray-300 rounded text-gray-700"
    //   />
    //   <button
    //     type="submit"
    //     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
    //     Sign Up
    //   </button>
    // </form>
  );
};

export default SignUp;
