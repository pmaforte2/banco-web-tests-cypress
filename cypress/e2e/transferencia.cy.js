describe('Transferências', () => {
    beforeEach(() => {
    // Arrange
        cy.visit('/')
        cy.fixture('credenciais').then(cred => {
            cy.get('#username').click().type(cred.valida.usuario)
            cy.get('#senha').click().type(cred.valida.senha)
        })
        cy.contains('button', 'Entrar').click()
    })
    
    it('Deve transferir quando informo dados e valor válidos', () => {
        cy.get('label[for="conta-origem"').parent().as('campo-conta-origem')
        cy.get('@campo-conta-origem').click()
        cy.get('@campo-conta-origem').contains('Maria').click()

        cy.get('label[for="conta-destino"').parent().as('campo-conta-destino')
        cy.get('@campo-conta-destino').click()
        cy.get('@campo-conta-destino').contains('Marcos').click()

        cy.get('#valor').click().type('11')

        cy.contains('button', 'Transferir').click()    
        
        // Asserts
        cy.get('.toast').should('have.text', 'Transferência realizada!')
    })
   
})