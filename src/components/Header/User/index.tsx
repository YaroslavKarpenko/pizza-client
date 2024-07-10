import React from 'react';
import Popover from '../../Popover';
import useAuth from '../../../hooks/useAuth';
import Avatar from 'react-avatar';
import { useAppDispatch, useAppSelector } from '../../../reducers/hooks';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../../../reducers/userReducer';
import authService from '../../../services/auth';
import UserIcon from '../../svg/UserIcon.svg?react';
import LogOutIcon from '../../svg/LogOutIcon.svg?react';

import { selectUserEmail, selectUserName } from '../../../reducers/selectors';

const User: React.FC = () => {
  const userEmail = useAppSelector(selectUserEmail);
  const userName = useAppSelector(selectUserName);

  const { isAuth, name } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      const res = await authService.logout();
      console.log(res);
      dispatch(removeUser());
    } catch (error) {
      console.log(error);
    }
  };

  const navigateLogin = () => {
    navigate('/login', { state: { from: location.pathname } });
  };
  const navigateJoin = () => {
    navigate('/join', { state: { from: location.pathname } });
  };

  return (
    <>
      <Popover className="flex items-center">
        <Popover.Button>
          {isAuth ? (
            <Avatar name={name!} maxInitials={2} size="30" round="15px" />
          ) : (
            <UserIcon className="h-8 w-8" />
          )}
        </Popover.Button>
        <Popover.List className="absolute top-10 right-0 z-30 flex flex-col w-max rounded-md bg-gray-200 dark:bg-gray-500 dark:text-gray-400 font-normal text-lg p-2 gap-2 items-center justify-center shadow-lg">
          {isAuth ? (
            <>
              <section className="flex flex-col leading-4">
                <span className="flex justify-center text-black text-[14px]">{userName}</span>
                <span className=" text-gray-800 text-[10px]">{userEmail}</span>
              </section>
              <Popover.ListItem onClick={handleLogOut} className="items-center">
                <LogOutIcon className="w-5 h-5" />
                <span>Log out</span>
              </Popover.ListItem>
            </>
          ) : (
            <>
              <Popover.ListItem onClick={navigateLogin}>Sign in</Popover.ListItem>
              <Popover.ListItem onClick={navigateJoin}>Sign up</Popover.ListItem>
            </>
          )}
        </Popover.List>
      </Popover>
    </>
  );
};

export default User;
