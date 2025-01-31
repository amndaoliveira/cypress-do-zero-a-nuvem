describe("Central de Atendimento ao Cliente TAT", () => {
  // suite de teste
  beforeEach(() => {
    cy.visit("./src/index.html"); // visita o site
  });
  it("verifica o título da aplicação", () => {
    cy.title().should("eq", "Central de Atendimento ao Cliente TAT"); // consulta o título e compara se são iguais.
  });
  it("preenche os campos obrigatórios e envia o formulário", () => {
    const longText = Cypress._.repeat("abcdefghijklmnopqrstuvwxyz", 10); // variável para criar um texto lonog

    cy.get("#firstName").type("Marcos");
    cy.get("#lastName").type("Júnior");
    cy.get("#email").type("marcosjr@emailtest.com");
    cy.get("#open-text-area").type(longText, { delay: 0 }); // delay retira o tempo padrão e permite alterar para o tempo que quiser
    cy.contains("button", "Enviar").click(); //usado para encontrar um elemento na página pelo seu texto.

    cy.get(".success").should("be.visible"); //ponto é = classe # é = id
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#firstName").type("Marcos");
    cy.get("#lastName").type("Júnior");
    cy.get("#email").type("marcosjr@emailtest,com"); // erro é aqui no , com
    cy.get("#open-text-area").type("Teste");
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("campo telefone continua vazio quando preenchido com valor não-numérico", () => {
    // encadeamento de comandos
    cy.get("#phone") // busca o campo
      .type("abcde") //tenta adicionar caracteres não numéricos
      .should("have.value", ""); // permanece vazio porque não são números
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").type("Marcos");
    cy.get("#lastName").type("Júnior");
    cy.get("#email").type("marcosjr@emailtest.com");
    cy.get("#open-text-area").type("Teste");
    cy.get("#phone-checkbox").check(); // clicar no checkbox telefone como forma de contato e o mesmo se torna obrigatório
    cy.contains("button", "Enviar").click(); //click não é muito confiável pq ja tiver marcado, ao inves de permanecer marcado ele irá desmarcar, melhor usa-lo para clicar em botoes

    cy.get(".error").should("be.visible"); // se o campo de telefone se não estiver preenchido, mostra a mensagem de erro na tela da aplicação
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    //funcionalidade .clear()
    cy.get("#firstName") // campo nome
      .type("Marcos") // adiciona o nome
      .should("have.value", "Marcos") // deve ter esse dado
      .clear() // limpa o campo
      .should("have.value", ""); // "verifica" se está vazio
    cy.get("#lastName")
      .type("Júnior")
      .should("have.value", "Júnior")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("marcosjr@emailtest.com")
      .should("have.value", "marcosjr@emailtest.com");
    cy.get("#phone")
      .type("123456789")
      .should("have.value", "123456789")
      .clear()
      .should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });
  //1ª opção, não muito usual
  // it.only("envia o formuário com sucesso usando um comando customizado", () => {
  //   cy.fillMandatoryFieldsAndSubmit(); // verificação de resultado esperado não é recomendado para ser um comando customiazdo porque o intuito é bater o olho no teste e saber o que está sendo testado

  //   cy.get(".success").should("be.visible");
  // });

  //2ª opção, atribui uma variavel (data) e passa ela como parâmetro no comando customizado
  // it.only("envia o formuário com sucesso usando um comando customizado", () => {
  //   const data = {
  //     firstName: 'Mila',
  //     lastName: 'Campana',
  //     email: 'milacampana@email.com',
  //     text: 'Teste.'
  //   }
  //   cy.fillMandatoryFieldsAndSubmit(data);

  //   cy.get(".success").should("be.visible");
  // });

  // 3ª opção, atribui os campos que vão ser usados no teste dentro do comando customizado mesmo
  it("envia o formuário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit();

    cy.get(".success").should("be.visible");
  });

  it("seleciona um produto (YouTube) por seu texto", () => {
    cy.get("#product") // identifica o elemento pelo id
      .select("YouTube") // encadeia o ponto select e passa o conteudo da option YouTube
      .should("have.value", "youtube"); // verifica s eo valor foi persistido pq o valor da option é com letra minuscula
  });
  it("seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get("#product")
      .select("mentoria") // seleciona pelo value
      .should("have.value", "mentoria");
  });

  it("seleciona um produto (Blog) por seu indice", () => {
    cy.get("#product")
      .select(1) // seleciona pelo indice
      .should("have.value", "blog");
  });

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]') // pega o campo
      .check() // marca ele
      .should("be.checked"); // verifica se está marcado
  });
  it("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]').each((typeOfService) => {
      // a função do each itera sobre um array de elementos
      cy.wrap(typeOfService) // 'empacota' o elemento typeOfService
        .check() // marca o campo
        .should("be.checked"); // verifica se foi marcado
    });
  });
  it("marca ambos checkboxes, depois desmarca o último", () => {
    cy.get('input[type="checkbox"]') // cy.get retorna 1 ou + elementos
      .check() // marca 1 ou + elementos. Assim ele vai marcar 1 check para cada checkbox
      .should("be.checked") // verifica que todos os check foram marcados
      .last() // seleciona apenas o ultimo
      .uncheck() // desmarca apenas o ultimo
      .should("not.be.checked"); // verifica se nao esta marcado
  });
  it("seleciona um arquivo da pasta fixtures", () => {
    cy.get("#file-upload") //identificar o elemento que é um input do tipo file
      .selectFile("cypress/fixtures/example.json") // encadeando o selectfile passando uma fixe que foi criada automaticamente
      .should((input) => {
        //encadeia o should passando pra ele uma função de callback, recebe o file input como argumento,
        expect(input[0].files[0].name).to.equal("example.json"); //pega input e files ambos no indice zero e name tem que ser = a example.json
      });
  });
  it("seleciona um arquivo simulando um drag-and-drop", () => {
    // simula como se um usuario estivesse arrastando um arquivo para dentro do "file upload"
    cy.get("#file-upload")
      .selectFile("cypress/fixtures/example.json", { action: "drag-drop" }) // 1 argumento é o arquivo que se quer fazer upload e o 2 é um objeto no qual se passa a propriedade action com o valor drag-drop
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });
  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json").as("sampleFile"); //nomear a fixture com o as
    cy.get("#file-upload")
      .selectFile("@sampleFile") // ao inves de passar o caminho relativo, passa o alias (as)
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });
  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.contains("a", "Política de Privacidade") // no constains seleciono a tag e passo o texto que tem nela na aplicação porque a tag dela é muito generica
      .should("have.attr", "href", "privacy.html") // verificar se tem o atribubuto(attr): href=privacy.html
      .and("have.attr", "target", "_blank"); // e(and) verifica se o atributo abre em uma nova aba. se tiver o _blank ele abre em nova aba
  });
  //abre uma nova página na mesma aba apos clicar no link ->
  it("acessa a página da política de privacidade removendo o target e então clicando no link", () => {
    cy.contains("a", "Política de Privacidade") //identifica o link de politica de privacidade
      .invoke("removeAttr", "target") // remove o atributo target
      .click(); // clica no link

    cy.contains("h1", "CAC TAT - Política de Privacidade").should("be.visible"); // verifica se o texto está visivel na página
  });
});
