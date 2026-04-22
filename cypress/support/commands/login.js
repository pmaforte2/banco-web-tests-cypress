Cypress.Commands.add('loginComCredenciaisValidas', () => {
    cy.fixture('credenciais').then(cred => {
      cy.get('#username').click().type(cred.valida.usuario)
      cy.get('#senha').click().type(cred.valida.senha)
    })
    cy.contains('button', 'Entrar').click()
})

Cypress.Commands.add('loginComCredenciaisInvalidas', () => {
    cy.fixture('credenciais').then(cred => {
      cy.get('#username').click().type(cred.invalida.usuario)
      cy.get('#senha').click().type(cred.invalida.senha)
    })
    cy.contains('button', 'Entrar').click()
})