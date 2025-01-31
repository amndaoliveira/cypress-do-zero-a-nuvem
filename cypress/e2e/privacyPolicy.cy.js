it('testa a página da política de privacidade de forma independente', () => {
  cy.visit('./src/privacy.html')
  cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible') // verifica se o texto está visivel na página
  cy.contains('p', 'Talking About Testing').should('be.visible')
})