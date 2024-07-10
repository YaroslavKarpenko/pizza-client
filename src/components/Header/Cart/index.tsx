import { Badge } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../reducers/hooks';
import CartIcon from '../../svg/CartIcon.svg?react';
import { useLocation } from 'react-router-dom';

const Cart: React.FC = () => {
  const totalQuantity = useAppSelector(({ cart }) => {
    return cart.totalQuantity;
  });

  const currentLocation = useLocation().pathname;

  return (
    <>
      {currentLocation !== '/cart' && (
        <Link to={'/cart'} className="flex items-center ">
          <Badge badgeContent={totalQuantity} color="success">
            <CartIcon className="h-8 w-8" />
          </Badge>
        </Link>
      )}
    </>
  );
};

export default Cart;
