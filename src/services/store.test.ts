import { rootReducer } from './store';

describe('тест инициализации rootReducer', () => {
  test('тест на наличие состояний', () => {
    const initialState = rootReducer(undefined, { type: '@@redux/INIT' });

    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('order');
    expect(initialState).toHaveProperty('feeds');
    expect(initialState).toHaveProperty('user');
  });
});
