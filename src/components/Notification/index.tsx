import React from 'react';
import Alert from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '../../reducers/hooks';
import { removeNotificationByIndex } from '../../reducers/notificationReducer';

const Notification: React.FC = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(({ notification }) => {
    return notification;
  });

  const handleNotificationClick = (index: number) => {
    dispatch(removeNotificationByIndex(index));
  };

  return (
    <div className=" fixed bottom-0 right-0 p-4 z-50">
      <ul className="hidden md:flex flex-col gap-2 items-end">
        {notifications.map((message, i) => {
          return (
            <li
              key={i}
              className=" max-w-40 lg:max-w-64"
              onClick={() => handleNotificationClick(i)}>
              <Alert variant="filled" severity="success">
                {message}
              </Alert>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Notification;
