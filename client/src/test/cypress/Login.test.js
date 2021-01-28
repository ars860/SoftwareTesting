import React from "react"
import 'cypress-react-selector'

//TODO
describe('Login e2e tests', () => {
    beforeEach(() => {
        cy.visit('localhost:3001/login')
        cy.waitForReact()
    })

    it('type something in forms and get message', () => {
        const email = 'email@email'
        const password = 'password@123'

        cy.get('#emailInput').type(email)
        cy.get('#passwordInput').type(password)

        cy.get('#emailInput').should('have.value', email)
        cy.get('#passwordInput').should('have.value', password)

        cy.get('button').click()
        cy.wait(1000) // kostyl
        cy.get('.error').invoke('text').then(text => expect(text).not.to.be.empty)
    })

    it('bad email', () => {
        const email = "not_actually_email"

        cy.get('#emailInput').type(email)
        cy.get('#passwordInput').type("123")

        cy.get('button').click()
        cy.wait(100) // kostyl
        cy.get('.error').should('have.text','Email should contain @!')
    })

    it('button should be disabled when fields are empty', () => {
        cy.get('button').should('to.be.disabled')

        cy.get('#emailInput').type("sdsadsadsadsadsdsad")
        cy.get('#emailInput').clear()

        cy.get('button').should('to.be.disabled')
    })
})