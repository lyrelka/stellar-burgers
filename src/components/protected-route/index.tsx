import React from 'react';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { selectUserLoading, selectUserData } from '../../slices/user';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isLoading = useSelector(selectUserLoading);
  const user = useSelector(selectUserData);
  const location = useLocation();

  if (isLoading) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return children;
};
