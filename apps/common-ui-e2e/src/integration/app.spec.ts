import { getBrand } from '../support/app.po';

describe('common-ui', () => {
  beforeEach(() => cy.visit('/'));

  // eslint-disable-next-line jest/expect-expect
  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getBrand().contains('Common UI');
  });
});
