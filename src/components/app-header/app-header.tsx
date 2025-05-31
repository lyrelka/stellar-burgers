import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectName } from '../../slices/user/user';

export const AppHeader: FC = () => {
  const userName = useSelector(selectName);
  return <AppHeaderUI userName={userName} />;
};
