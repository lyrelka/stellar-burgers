import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { selectIngredientById } from '../../slices/ingredients/ingredients';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();

  const ingredientData = useSelector((state) =>
    selectIngredientById(state, { payload: id, type: 'SELECT_INGREDIENT' })
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
