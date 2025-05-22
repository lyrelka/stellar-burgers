import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectFeedsOrders,
  selectFeedsLoading,
  getFeedsThunk
} from '../../slices/feeds';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectFeedsLoading);
  const orders: TOrder[] = useSelector(selectFeedsOrders);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeedsThunk());
      }}
    />
  );
};
