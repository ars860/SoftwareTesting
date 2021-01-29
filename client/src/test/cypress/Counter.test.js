import React from "react"
import 'cypress-react-selector'
// import { createServer } from "miragejs"


describe('Login e2e tests', () => {
    before(() => {
        cy.intercept('http://localhost:3000/login', {authenticated: true})
        let counter = -1
        cy.intercept('http://localhost:3000/counter', req => {
            counter = counter + 1
            req.reply(counter.toString())
        }).as("counter")
    })

    beforeEach(() => {
        cy.visit('localhost:3001/login')
        cy.waitForReact()

        cy.get('#emailInput').type("1@1")
        cy.get('#passwordInput').type("1")

        cy.get('button').click()

        cy.get('a[href="/counter"]').click()
    })

    it('just click the button', () => {
        cy.get('.image').click()
        cy.get('.Counter').should('have.text', 1)

        cy.get('.image').click()
        cy.get('.Counter').should('have.text', 2)

        cy.get('.image').click()
        cy.get('.Counter').should('have.text', 3)
    })
})