import userReducer, {
  loginUserThunk,
  registerUserThunk,
  logoutUserThunk,
  getUserThunk,
  updateUserThunk,
  getOrdersThunk,
  initialState
} from './user';

describe('тесты редюсера user', () => {
  const userData = {
    user: {
      email: 'test@test.com',
      name: 'test'
    },
    refreshToken: 'test',
    accessToken: 'test'
  };

  describe('тесты регистрации', () => {
    test('текст начала запроса регистрации', () => {
      const action = { type: registerUserThunk.pending.type };
      const state = userReducer(initialState, action);
      expect(state).toEqual({ ...initialState, isLoading: true, error: '' });
    });

    test('тест успешного выполнения запроса регистрации', () => {
      const action = {
        type: registerUserThunk.fulfilled.type,
        payload: userData
      };

      const state = userReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        data: userData.user,
        refreshToken: userData.refreshToken,
        accessToken: userData.accessToken,
        isAuthenticated: true,
        isLoading: false
      });
    });

    test('тест ошибки запроса регистрации', () => {
      const errorMessage = 'Ошибка регистрации';
      const action = {
        type: registerUserThunk.rejected.type,
        error: { message: errorMessage }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        error: errorMessage,
        isLoading: false
      });
    });
  });

  describe('тесты логина', () => {
    test('тест начала запроса логина', () => {
      const action = { type: loginUserThunk.pending.type };
      const state = userReducer(initialState, action);
      expect(state).toEqual({ ...initialState, isLoading: true, error: '' });
    });

    test('тест успешного выполнения запроса логина', () => {
      const action = {
        type: loginUserThunk.fulfilled.type,
        payload: userData
      };

      const state = userReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        data: userData.user,
        refreshToken: userData.refreshToken,
        accessToken: userData.accessToken,
        isAuthenticated: true,
        isLoading: false
      });
    });

    test('тест ошибки запроса логина', () => {
      const errorMessage = 'Ошибка логина';
      const action = {
        type: loginUserThunk.rejected.type,
        error: { message: errorMessage }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        error: errorMessage,
        isLoading: false
      });
    });
  });

  describe('тесты выхода из профиля', () => {
    test('тест начала запроса выхода из профиля', () => {
      const action = { type: logoutUserThunk.pending.type };
      const state = userReducer(initialState, action);
      expect(state).toEqual({ ...initialState, isLoading: true, error: '' });
    });

    test('тест успешного выполнения запроса выхода из профиля', () => {
      const action = {
        type: logoutUserThunk.fulfilled.type
      };

      const state = userReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isAuthenticated: false,
        data: null,
        refreshToken: null,
        accessToken: null,
        isLoading: false
      });
    });

    test('тест ошибки запроса выхода из профиля', () => {
      const errorMessage = 'Ошибка выхода из профиля';
      const action = {
        type: logoutUserThunk.rejected.type,
        error: { message: errorMessage }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        error: errorMessage,
        isLoading: false
      });
    });
  });

  describe('тесты запроса пользователя', () => {
    test('тест начала запроса пользователя', () => {
      const action = { type: getUserThunk.pending.type };
      const state = userReducer(initialState, action);
      expect(state).toEqual({ ...initialState, isLoading: true, error: '' });
    });

    test('тест успешного выполнения запроса пользователя', () => {
      const action = {
        type: getUserThunk.fulfilled.type,
        payload: userData
      };

      const state = userReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        data: userData.user,
        isAuthenticated: true,
        isLoading: false,
      });
    });

    test('тест ошибки запроса пользователя', () => {
      const errorMessage = 'Ошибка запроса пользователя';
      const action = {
        type: getUserThunk.rejected.type,
        error: { message: errorMessage }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        error: errorMessage,
        isLoading: false
      });
    });
  });

  describe('тесты обновления данных пользователя', () => {
    test('тест начала обновления данных', () => {
      const action = { type: updateUserThunk.pending.type };
      const state = userReducer(initialState, action);
      expect(state).toEqual({ ...initialState, isLoading: true, error: '' });
    });

    test('тест успешного обновления данных', () => {
      const action = {
        type: updateUserThunk.fulfilled.type,
        payload: userData
      };

      const state = userReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        data: userData.user,
        isLoading: false,
      });
    });

    test('тест ошибки обновления данных', () => {
      const errorMessage = 'Ошибка обновления данных пользователя';
      const action = {
        type: updateUserThunk.rejected.type,
        error: { message: errorMessage }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        error: errorMessage,
        isLoading: false
      });
    });
  });

  describe('тесты запроса заказов пользователя', () => {
    test('тест начала запроса заказов пользователя', () => {
      const action = { type: getOrdersThunk.pending.type };
      const state = userReducer(initialState, action);
      expect(state).toEqual({ ...initialState, isLoading: true, error: '' });
    });

    test('тест успешного запроса заказов пользователя', () => {
      const orders = [
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
      ];

      const action = {
        type: getOrdersThunk.fulfilled.type,
        payload: orders
      };

      const state = userReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        orders,
        isLoading: false
      });
    });

    test('тест ошибки запроса заказов пользователя', () => {
      const errorMessage = 'Ошибка запроса заказов пользователя';
      const action = {
        type: getOrdersThunk.rejected.type,
        error: { message: errorMessage }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        error: errorMessage,
        isLoading: false
      });
    });
  });
});
