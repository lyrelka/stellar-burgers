import ingredientsReducer, {
  getIngredientsThunk,
  initialState
} from './ingredients';

describe('тесты редьюсера ingredients', () => {
  test('тест начала запроса ингредиентов', () => {
    const action = { type: getIngredientsThunk.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({ ...initialState, isLoading: true });
  });

  test('тест успешного запроса ингредиентов', () => {
    const ingredients = [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        __v: 0
      }
    ];

    const action = {
      type: getIngredientsThunk.fulfilled.type,
      payload: ingredients
    };

    const state = ingredientsReducer(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      error: '',
      ingredients: ingredients
    });
  });

  test('тест ошибки запроса ингредиентов', () => {
    const errorMessage = 'Ошибка запроса ингредиентов';
    const action = {
      type: getIngredientsThunk.rejected.type,
      error: { message: errorMessage }
    };
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: errorMessage,
      isLoading: false
    });
  });
});
