import { getAdminToken } from "../../support/api/auth";

describe("Debug rota Categoria", () => {
  it("Verificar redirect e status (HTTP)", () => {
    return getAdminToken().then(() => {
      const token = Cypress.env("API_TOKEN");

      cy.request({
        method: "POST",
        url: "http://lojaebac.ebaconline.art.br/api/adicionarCategoria",
        failOnStatusCode: false,
        followRedirect: false, // 🔥 IMPORTANTÍSSIMO
        headers: { authorization: token },
        body: { name: `Categoria ${Date.now()}`, photo: "any" },
      }).then((res) => {
        cy.log(`STATUS HTTP: ${res.status}`);
        cy.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        cy.log(`BODY: ${JSON.stringify(res.body)}`);
      });
    });
  });

  it("Verificar redirect e status (HTTPS)", () => {
    return getAdminToken().then(() => {
      const token = Cypress.env("API_TOKEN");

      cy.request({
        method: "POST",
        url: "https://lojaebac.ebaconline.art.br/api/adicionarCategoria",
        failOnStatusCode: false,
        followRedirect: false, // 🔥 IMPORTANTÍSSIMO
        headers: { authorization: token },
        body: { name: `Categoria ${Date.now()}`, photo: "any" },
      }).then((res) => {
        cy.log(`STATUS HTTPS: ${res.status}`);
        cy.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        cy.log(`BODY: ${JSON.stringify(res.body)}`);
      });
    });
  });
});