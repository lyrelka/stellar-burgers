import orderReducer, {
  addOrderItem,
  removeOrderIngredient,
  moveOrderIngredient,
  resetOrder,
  orderBurgerThunk,
  initialState
} from './order';

describe('тесты редюсера order', () => {
  describe('тесты функций конструктора бургера', () => {
    const initialConstructorState = {
      constructorItems: {
        bun: {
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
          __v: 0,
          id: 'test1'
        },
        ingredients: [
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
            __v: 0,
            id: 'test2'
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
            __v: 0,
            id: 'test3'
          },
          {
            _id: '643d69a5c3f7b9001cfa093e',
            name: 'Филе Люминесцентного тетраодонтимформа',
            type: 'main',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/meat-03.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
            __v: 0,
            id: 'test4'
          }
        ]
      },
      isLoading: false,
      error: '',
      response: null
    };

    test('тест функции добавления булки в конструктор', () => {
      const testBun = {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0
      };

      const newState = orderReducer(
        initialConstructorState,
        addOrderItem(testBun)
      );
      const { bun } = newState.constructorItems;

      expect(bun?._id).toEqual(testBun._id);
    });

    test('тест функции добавления ингредиента в конструктор', () => {
      const testIngredient = {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0
      };
      const newState = orderReducer(
        initialConstructorState,
        addOrderItem(testIngredient)
      );
      const { ingredients } = newState.constructorItems;

      expect(ingredients).toHaveLength(initialConstructorState.constructorItems.ingredients.length + 1);
      expect(ingredients[ingredients.length - 1]._id).toEqual(testIngredient._id);
    });

    test('тест функции удаления ингредиента из конструктора', () => {
      const newState = orderReducer(
        initialConstructorState,
        removeOrderIngredient('test2')
      );
      const { ingredients } = newState.constructorItems;

      expect(ingredients).toEqual([
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
          __v: 0,
          id: 'test3'
        },
        {
          _id: '643d69a5c3f7b9001cfa093e',
          name: 'Филе Люминесцентного тетраодонтимформа',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
          __v: 0,
          id: 'test4'
        }
      ]);
    });

    test('тест функции перемещения ингредиента вниз', () => {
      const newState = orderReducer(
        initialConstructorState,
        moveOrderIngredient({ index: 1, direction: 1 })
      );
      const { ingredients } = newState.constructorItems;

      expect(ingredients).toEqual([
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
          __v: 0,
          id: 'test2'
        },
        {
          _id: '643d69a5c3f7b9001cfa093e',
          name: 'Филе Люминесцентного тетраодонтимформа',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
          __v: 0,
          id: 'test4'
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
          __v: 0,
          id: 'test3'
        }
      ]);
    });

    test('тест функции перемещения ингредиента вверх', () => {
      const newState = orderReducer(
        initialConstructorState,
        moveOrderIngredient({ index: 1, direction: -1 })
      );
      const { ingredients } = newState.constructorItems;

      expect(ingredients).toEqual([
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
          __v: 0,
          id: 'test3'
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
          __v: 0,
          id: 'test2'
        },
        {
          _id: '643d69a5c3f7b9001cfa093e',
          name: 'Филе Люминесцентного тетраодонтимформа',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
          __v: 0,
          id: 'test4'
        }
      ]);
    });
    
    test('тест функции отчистки конструктора', () => {
      const newState = orderReducer(
        initialConstructorState,
        resetOrder()
      );

      expect(newState).toEqual({
        ...initialConstructorState,
        constructorItems: {
          bun: null,
          ingredients: []
        },
        response: null
      });
    });
  });

  describe('тесты запроса создания заказа', () => {
    test('тест начала запроса создания заказа', () => {
      const action = { type: orderBurgerThunk.pending.type };
      const state = orderReducer(initialState, action);
      expect(state).toEqual({ ...initialState, isLoading: true, error: '' });
    });

    test('тест успешного запроса создания заказа', () => {
      const response = {
        name: 'Флюоресцентный люминесцентный бургер',
      order: {
        ingredients: [
          {
            _id: '643d69a5c3f7b9001cfa093d',
            name: 'Флюоресцентная булка R2-D3',
            type: 'bun',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/bun-01.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
            __v: 0
          },
          {
            _id: '643d69a5c3f7b9001cfa093e',
            name: 'Филе Люминесцентного тетраодонтимформа',
            type: 'main',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/meat-03.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
            __v: 0
          },
          {
            _id: '643d69a5c3f7b9001cfa093e',
            name: 'Филе Люминесцентного тетраодонтимформа',
            type: 'main',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/meat-03.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
            __v: 0
          },
          {
            _id: '643d69a5c3f7b9001cfa093d',
            name: 'Флюоресцентная булка R2-D3',
            type: 'bun',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/bun-01.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
            __v: 0
          }
        ],
        _id: '683ac5e8c2f30c001cb28d40',
        owner: {
          name: 'Тест',
          email: 'test@gmail.com',
          createdAt: '2025-05-22T17:09:41.113Z',
          updatedAt: '2025-05-22T19:36:47.599Z'
        },
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2025-05-31T09:03:36.153Z',
        updatedAt: '2025-05-31T09:03:36.838Z',
        number: 79591,
        price: 3952
      }
}

      const action = {
        type: orderBurgerThunk.fulfilled.type,
        payload: response
      };

      const state = orderReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        response
      });
    });

    test('тест ошибки запроса создания заказа', () => {
      const errorMessage = 'Ошибка запроса создания заказа';
      const action = {
        type: orderBurgerThunk.rejected.type,
        error: { message: errorMessage }
      };
      const state = orderReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        error: errorMessage,
        isLoading: false
      });
    });
  });
});
