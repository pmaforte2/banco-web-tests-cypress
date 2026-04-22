describe('Transferências', () => {
    beforeEach(() => {
    // Arrange
        cy.visit('/')
        cy.loginComCredenciaisValidas()
    })
    
    it('Deve transferir quando informo dados e valor válidos', () => {  
        // Act
        cy.realizarTransferecia('Maria', 'Marcos', '11')

        // Asserts
        cy.verificarMensagemToast('Transferência realizada!')
    })
   
    it('Deve apresentar erro quando tentar transferir um valor que 5000 sem o token', () => {       
        // Act
        cy.realizarTransferecia('Maria', 'Marcos', '5000.01')
        
        // Asserts
        cy.verificarMensagemToast('Autenticação necessária para transferências acima de R$5.000,00.')
    })
})