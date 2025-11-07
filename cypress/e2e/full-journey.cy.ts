/// <reference types="cypress" />

describe('Full User Journey', () => {

it('should allow a user to search from the main nav, use pagination, and view a recipe', () => {
    // 1. Visit the homepage
    cy.visit('http://localhost:3000');

    // 2. Use the main navigation search bar
    // We use {force: true} because there might be two inputs with name="q" (one in mobile drawer)
    // and we want to ensure Cypress can interact with the visible one.
    cy.get('nav input[name="q"]:visible').type('pasta{enter}');

    // 3. Verify the URL and that results are displayed
    cy.url().should('include', '/recipe?q=pasta');

    // 3. Verify the URL and that results are displayed
    cy.url().should('include', '/recipe?q=pasta');
    cy.contains('h2', 'Search Results for: pasta').should('be.visible');
    cy.get('article').should('have.length.greaterThan', 0);

    // 4. Test pagination by clicking "Next"
    // Note: This will only work if there are enough results for a second page.
    cy.contains('a', 'Next').click();
    cy.url().should('include', 'page=2');
    cy.contains('h2', 'Search Results for: pasta').should('be.visible');

    // 5. Navigate to the first recipe on the page
    cy.get('article').first().find('a').click();

    // 6. Verify we are on a recipe detail page
    cy.url().should('match', /\/recipe\/\d+$/); // Matches /recipe/[any number]
    cy.get('h1').should('not.be.empty');
});

it('should work correctly on mobile devices, including the drawer menu search', () => {
    // 1. Set viewport to a mobile size
    cy.viewport('iphone-8');

    // 2. Visit the homepage
    cy.visit('http://localhost:3000');

    // 3. Open the mobile navigation drawer
    cy.get('button[aria-label="Open navigation menu"]').click();

    // 4. Use the search bar inside the drawer
    cy.get('div[class*="translate-x-0"] input[name="q"]').type('salad{enter}');

    // 5. Verify the URL and that results are displayed
    cy.url().should('include', '/recipe?q=salad');
    cy.contains('h2', 'Search Results for: salad').should('be.visible');
    cy.get('article').should('have.length.greaterThan', 0);
});

});