/* eslint-disable no-undef */
describe('application', () => {
  const timeout = 1000000000;
  it('should navigate to the home page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/');
  });
  it('should filter on search', () => {
    cy.get('.ant-input-group-addon > .ant-btn').click({ timeout: timeout });
  });
  it('should filter gender', () => {
    cy.get(`.ant-select > .ant-select-selector`).click();
    cy.get('.ant-select-dropdown :not(.ant-select-dropdown-hidden')
      .find('.ant-select-item-option')
      .each((el) => {
        el.find('.ant-select-item-option-content').click({ timeout: timeout });
      });
  });

  it('should reset filder', () => {
    cy.get(':nth-child(3) > .ant-btn').click({ timeout: timeout });
  });
  it('should run pagination', () => {
    const findInPage = () => {
      cy.get('.ant-pagination')
        .find('li')
        .each((el) => {
          if (el.hasClass('ant-pagination-disabled')) {
            return;
          }
          cy.wrap(el).click();
        });
    };
    findInPage();
  });
});
