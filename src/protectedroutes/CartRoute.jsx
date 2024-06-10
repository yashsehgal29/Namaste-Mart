import React from 'react'
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../context/MyContext';
const CartRoute = () => {
  const { isAuthenticated } = useContext(MyContext);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default CartRoute
