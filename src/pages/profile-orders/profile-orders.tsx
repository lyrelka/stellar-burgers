import { ProfileOrdersUI } from '@ui-pages';
import { Preloader } from '@ui';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

import { useSelector } from '../../services/store';
import { selectUserLoading, selectUserOrders } from '../../slices/user';

export const ProfileOrders: FC = () => {
  const isLoading = useSelector(selectUserLoading);
  const orders: TOrder[] = useSelector(selectUserOrders);

  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
