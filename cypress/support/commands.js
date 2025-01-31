//2ª opção
// Cypress.Commands.add('fillMandatoryFieldsAndSubmit', data => { //comando customizado
//   cy.get("#firstName").type(data.firstName);
//     cy.get("#lastName").type(data.lastName);
//     cy.get("#email").type(data.email);
//     cy.get("#open-text-area").type(data.text);
//     cy.get('button[type="submit"]').click();
// })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data= {
  firstName: 'Maria',
  lastName: 'Catarina',
  email: 'mariacatarina@testemail.com',
  text: 'Test.'

} ) => { //comando customizado
  cy.get("#firstName").type(data.firstName);
    cy.get("#lastName").type(data.lastName);
    cy.get("#email").type(data.email);
    cy.get("#open-text-area").type(data.text);
    cy.contains('button', 'Enviar').click(); //usado para encontrar um elemento na página pelo seu texto. 1º elemento é uma tag e o segundo o conteudo da tag
})

