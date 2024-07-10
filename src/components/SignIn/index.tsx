import React from 'react';

import { useAppDispatch } from '../../reducers/hooks';
import { logIn } from '../../reducers/userReducer';
import { useLocation, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import Form from '.././Form';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const form = event.target as HTMLFormElement;
      const email = form.email.value;
      const password = form.password.value;

      dispatch(logIn({ email, password }));
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
    <Form onSubmit={(e) => handleSignIn(e)} className="flex flex-col items-center gap-3">
      <Form.Input name="email" placeholder="email" />
      <Form.Input name="password" placeholder="password" type="password" />
      <Form.Submit>Sign In</Form.Submit>
    </Form>
  );
};

export default SignIn;
