/// <reference types="cypress" />

describe("Testar o https://the-internet.herokuapp.com/", () => {
    it("Testar o add/remove", () => {
        entrarsite(2);
        cy.get('[onclick="addElement()"]').click();
        cy.wait(1000);
        cy.get('.added-manually').click();
        cy.get('[onclick="addElement()"]').click();
        cy.get('[onclick="addElement()"]').click();
    });

    it("Testar o login", () => {
        entrarsite(21);
        cy.get('#username').type('tomsmith');
        cy.get('#password').type('SuperSecretPassword!');
        cy.get('button').click();
        cy.get('h2').should('contain', 'Secure Area');
    });
    it("Testar o login( Fail)", () => {
        entrarsite(21);
        cy.get('#username').type('raphael');
        cy.get('#password').type('pass');
        cy.get('button').click();
        cy.get('#flash').should('contain', 'Your username is invalid!');
    });

});

function entrarsite(num) {
    cy.visit("https://the-internet.herokuapp.com/");
    if (num == 2) {
        cy.get('ul > :nth-child(2) > a').click();
    }
    if (num == 21) {
        cy.get(':nth-child(21) > a').click();
    }

}