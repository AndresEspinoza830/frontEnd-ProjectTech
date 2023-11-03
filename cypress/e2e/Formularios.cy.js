/// <reference types="cypress" />

describe("<Formularios/>", () => {
  it("<Login/> - Verificar Pantalla de Login", () => {
    cy.visit("/login");

    //Probar texto
    cy.contains("h1", "Inicia Sesion");

    cy.get('[data-cy="titulo"]')
      .invoke("text")
      .should("equal", "Inicia Sesion");

    //Revisar que el formulario exista
    cy.get('[data-cy="form-login"]').should("exist");

    //Revisar los dos inputs
    cy.get('[data-cy="email-input"]').should("exist");
    cy.get('[data-cy="password-input"]').should("exist");

    //Revisar los links
    cy.get('[data-cy="registrar-cuenta"]').should("exist");
    cy.get('[data-cy="registrar-cuenta"]')
      .should("have.attr", "href")
      .should("eq", "/registrar");

    cy.get('[data-cy="recuperar-password"]').should("exist");
    cy.get('[data-cy="recuperar-password"]')
      .should("have.attr", "href")
      .should("eq", "/olvide-password");

    cy.get('[data-cy="submit-login"]')
      .should("exist")
      .should("have.value", "Iniciar Sesion")
      .should("have.class", "bg-primary");

    cy.visit("/registrar");
  });

  it("<Registrar/> - Verificar Pantalla de Registro", () => {
    cy.visit("/registrar");

    //Verficar texto

    // cy.get('[data-cy="titulo-crear"]')
    //   .invoke("text")
    //   .should("equal", "Crea tu cuenta en ProjectTech");

    //Verificar formulario
    cy.get('[data-cy="form-registrar"]').should("exist");

    //Verificar inputs
    cy.get('[data-cy="nombre-input"]').should("exist");
    cy.get('[data-cy="email-input"]').should("exist");
    cy.get('[data-cy="password-input"]')
      .should("exist")
      .should("have.attr", "type")
      .should("eq", "password");
    cy.get('[data-cy="repetir-password-input"]')
      .should("exist")
      .should("exist")
      .should("have.attr", "type")
      .should("eq", "password");

    //Verficar links
    cy.get('[data-cy="login"]')
      .should("exist")
      .should("have.attr", "href")
      .should("eq", "/login");

    cy.get('[data-cy="olvide-password"]').should("exist");
    cy.get('[data-cy="olvide-password"]')
      .should("have.attr", "href")
      .should("eq", "/olvide-password");

    //Verificar button
    cy.get('[data-cy="registrar-submit"]')
      .should("exist")
      .should("have.value", "Crear Cuenta");

    cy.visit("/olvide-password");
  });

  it("<Olvide-Password/> - Verificar Pantalla Recuperar Password", () => {
    cy.visit("/olvide-password");

    //Verficar input
    cy.get('[data-cy="email-input"]')
      .should("exist")
      .should("have.attr", "type")
      .should("eq", "email");

    //Verificar Links
    cy.get('[data-cy="ingresar"]')
      .should("exist")
      .should("have.attr", "href")
      .should("eq", "/login");

    cy.get('[data-cy="registrar-cuenta"]')
      .should("exist")
      .should("have.attr", "href")
      .should("eq", "/registrar");

    //Verficiar submit
    cy.get('[data-cy="enviar-correo"]')
      .should("exist")
      .should("have.attr", "type")
      .should("eq", "submit");

    cy.visit("/login");
  });
});
