describe('login', () => {
  beforeEach(() => {
    // Arrange
      cy.visit('/')
  })

  it('Login com dados válidos deve permitir entrada no sistema', () => {    
    // Act
    cy.loginComCredenciaisValidas()

    // Asserts
    cy.contains('h4', 'Realizar Transferência').should('be.visible')
  })

   it('Login com dados inválidos deve apresentar mensagem de erro', () => {
    // Act
    cy.loginComCredenciaisInvalidas()

    // Asserts
    cy.verificarMensagemToast('Erro no login. Tente novamente.')
  })
})