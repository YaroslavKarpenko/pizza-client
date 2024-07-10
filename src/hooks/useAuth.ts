import React from 'react';
import { useAppSelector } from '../reducers/hooks';
import { selectUserEmail, selectUserId, selectUserName } from '../reducers/selectors';

const useAuth = () => {
  const email = useAppSelector(selectUserEmail);
  const name = useAppSelector(selectUserName);
  const id = useAppSelector(selectUserId);

  return {
    isAuth: !!id,
    email,
    name,
    id,
  };
};

export default useAuth;
