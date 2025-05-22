import { FC, useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  orderBurgerThunk,
  selectConstructorItems,
  selectOrderLoading,
  selectOrderResponse,
  selectIngredientsIdList,
  resetOrder
} from '../../slices/order';
import { selectAuth, getOrdersThunk } from '../../slices/user';
import { getFeedsThunk } from '../../slices/feeds';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectAuth);
  const constructorItems = useSelector(selectConstructorItems);
  const ingredientsIdList = useSelector(selectIngredientsIdList);
  const orderRequest = useSelector(selectOrderLoading);
  const orderResponse = useSelector(selectOrderResponse);
  const [orderModalData, setOrderModalData] = useState<TOrder | null>(null);

  useEffect(() => {
    if (orderResponse?.order) {
      setOrderModalData(orderResponse.order);
      dispatch(resetOrder());
      dispatch(getOrdersThunk());
      dispatch(getFeedsThunk());
    }
  }, [orderResponse]);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (isAuthenticated) {
      dispatch(orderBurgerThunk(ingredientsIdList));
    } else {
      navigate('/login');
    }
  };

  const closeOrderModal = () => {
    setOrderModalData(null);
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
