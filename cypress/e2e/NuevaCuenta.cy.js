/// <reference types="cypress" />

describe("<NuevaCuenta/>", () => {
  it("<NuevaCuenta /> - Validacion y alertas", () => {
    cy.visit("/user/registrar");

    //Evento click
    cy.get('[data-cy="registrar-submit"]').click();

    cy.get('[data-cy="alerta"]')
      .should("exist")
      .invoke("text")
      .should("equal", "Todos los campos son obligatorios");

    //Llenar campos
    cy.get('[data-cy="nombre-input"]').type("Andres");
    cy.get('[data-cy="email-input"]').type("usuario@usuario.com");
    cy.get('[data-cy="password-input"]').type("123");
    cy.get('[data-cy="repetir-password-input"]').type("123");

    cy.get('[data-cy="registrar-submit"]').click();

    cy.get('[data-cy="alerta"]')
      .should("exist")
      .invoke("text")
      .should("equal", "El password debe tener minimo 6 caracteres");

    cy.get('[data-cy="password-input"]').clear().type("123456");
    cy.get('[data-cy="repetir-password-input"]').clear().type("123457");

    cy.get('[data-cy="registrar-submit"]').click();

    cy.get('[data-cy="alerta"]')
      .should("exist")
      .invoke("text")
      .should("equal", "Los passwords no son iguales");

    cy.get('[data-cy="repetir-password-input"]').clear().type("123456");

    cy.get('[data-cy="registrar-submit"]').click();
  });
});
