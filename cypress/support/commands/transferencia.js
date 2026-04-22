Cypress.Commands.add('realizarTransferecia', (contaOrigem, contaDestino, valor) => {
    cy.selecionarOpcaoComboBox('conta-origem', contaOrigem)
    cy.selecionarOpcaoComboBox('conta-destino', contaDestino)
    cy.get('#valor').click().type(valor)
    cy.contains('button', 'Transferir').click()  
})