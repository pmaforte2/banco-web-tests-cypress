describe('login', () => {
  beforeEach(() => {
    // Arrange
      cy.visit('/')
  })

  it('Login com dados válidos deve permitir entrada no sistema', () => {    
    // Act
    cy.fixture('credenciais').then(cred => {
      cy.get('#username').click().type(cred.valida.usuario)
      cy.get('#senha').click().type(cred.valida.senha)
    })
    cy.contains('button', 'Entrar').click()

    // Asserts
    cy.contains('h4', 'Realizar Transferência').should('be.visible')
  })

   it('Login com dados inválidos deve apresentar mensagem de erro', () => {
    // Act
    cy.fixture('credenciais').then(cred => {
      cy.get('#username').click().type(cred.invalida.usuario)
      cy.get('#senha').click().type(cred.invalida.senha)
    })
    cy.contains('button', 'Entrar').click()

    // Asserts
    cy.get('.toast').should('have.text', 'Erro no login. Tente novamente.')
  })
})