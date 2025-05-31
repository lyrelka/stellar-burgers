import feedsReducer, {
  getFeedsThunk,
  initialState
} from './feeds';

describe('тесты редюсера feeds', () => {
  test('тест начала запроса заказов', () => {
    const action = { type: getFeedsThunk.pending.type };
    const state = feedsReducer(initialState, action);
    expect(state).toEqual({ ...initialState, isLoading: true, error: '' });
  });

  test('тест успешного запроса заказов', () => {
    const ordersData = {
      orders: [
        {
          _id: '68399cf9c2f30c001cb28923',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa0942',
            '643d69a5c3f7b9001cfa093c'
          ],
          status: 'done',
          name: 'Краторный spicy био-марсианский бургер',
          createdAt: '2025-05-30T11:56:41.453Z',
          updatedAt: '2025-05-30T11:56:42.176Z',
          number: 79505
        },
        {
          _id: '68399f4cc2f30c001cb28927',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2025-05-30T12:06:36.581Z',
          updatedAt: '2025-05-30T12:06:37.330Z',
          number: 79506
        }
      ],
      total: 2,
      totalToday: 1
    };

    const action = {
      type: getFeedsThunk.fulfilled.type,
      payload: ordersData
    };

    const state = feedsReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      data: ordersData
    });
  });

  test('тест ошибки запроса заказов', () => {
    const errorMessage = 'Ошибка запроса заказов пользователя';
    const action = {
      type: getFeedsThunk.rejected.type,
      error: { message: errorMessage }
    };
    const state = feedsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: errorMessage,
      isLoading: false
    });
  });
});
