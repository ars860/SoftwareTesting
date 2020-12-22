import React from "react";
import 'cypress-react-selector';

//TODO
describe('Counter tests', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.waitForReact();
    });

    it('enter data into the fields', () => {
        cy.react('MyTextInput', { field: { name: 'email' } }).type('bugs.bunny@test.com');
        cy.react('MyTextInput', { field: { name: 'password' } }).type('SUPER SECRET STUFFZ');
    });
})