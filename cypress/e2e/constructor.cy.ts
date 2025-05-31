describe('Тест страницы конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('/');

    cy.wait('@getIngredients');

    cy.get('[data-cy="643d69a5c3f7b9001cfa093c"]').as('bun');
    cy.get('[data-cy="643d69a5c3f7b9001cfa0941"]').as('main');
    cy.get('[data-cy="643d69a5c3f7b9001cfa0942"]').as('sauce');
  });

  it('Тест функций добавления ингредиентов', () => {
    cy.get('[data-cy="emptyTopBun"]').contains('Выберите булки');
    cy.get('[data-cy="emptyIngredients"]').contains('Выберите начинку');
    cy.get('[data-cy="emptyBottomBun"]').contains('Выберите булки');

    cy.get('@bun').contains('Добавить').click();
    cy.get('@sauce').contains('Добавить').click();
    cy.get('@main').contains('Добавить').click();

    cy.get('[data-cy="topBun"]').should('exist');
    cy.get('[data-cy="ingredients"]').children('li').should('have.length', 2);
    cy.get('[data-cy="bottomBun"]').should('exist');
  });

  describe('Тест модального окна', () => {
    it('Тест открытия модального окна', () => {
      cy.get('@bun').click();

      cy.get('[data-cy="modal"]').should('be.visible');
    });

    it('Тест закрытия модального окна кликом на кнопку', () => {
      cy.get('@bun').click();
      cy.get('[data-cy="modalCloseButton"]').click();

      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('Тест закрытия модального окна кликом на оверлей', () => {
      cy.get('@bun').click();
      cy.get('[data-cy="modalOverlay"]').click({ force: true });

      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });

  it('Тест функций создания заказа', () => {
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', 'api/orders', {
      fixture: 'order.json'
    }).as('order');

    cy.wait('@getUser');

    cy.setCookie('accessToken', 'test');
    cy.window().then((window) => {
      window.localStorage.setItem('refreshToken', 'test');
    });

    cy.get('@bun').contains('Добавить').click();
    cy.get('@sauce').contains('Добавить').click();
    cy.get('@main').contains('Добавить').click();

    cy.get('[data-cy="orderButton"]').click();

    cy.wait('@order');
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="orderNubmer"]').should('contain', '79505');
    cy.get('[data-cy="modalCloseButton"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    cy.get('[data-cy="emptyTopBun"]').contains('Выберите булки');
    cy.get('[data-cy="emptyIngredients"]').contains('Выберите начинку');
    cy.get('[data-cy="emptyBottomBun"]').contains('Выберите булки');

    cy.clearCookie('accessToken');
    window.localStorage.removeItem('refreshToken');
  });
});
