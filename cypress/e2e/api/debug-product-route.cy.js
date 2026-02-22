import { apiRequest } from "../../support/api/apiClient";
import { getAdminToken } from "../../support/api/auth";

describe("Debug rota Produto", () => {
  before(() => getAdminToken());

  it("Testar POST em /api/adicionarProduto e /api/addProduct", () => {
    const body = {
      name: `Produto Debug ${Date.now()}`,
      price: 100,
      quantity: 10,
      categories: "Geral",
      description: "Produto de teste",
      photos: ["any"],
    };

    apiRequest({
      method: "POST",
      url: "/api/adicionarProduto",
      body,
      failOnStatusCode: false,
    }).then((res) => {
      cy.task("log", `### /api/adicionarProduto -> status: ${res.status}`);
      cy.task("log", `### body: ${JSON.stringify(res.body).slice(0, 200)}`);
    });

    apiRequest({
      method: "POST",
      url: "/api/addProduct",
      body,
      failOnStatusCode: false,
    }).then((res) => {
      cy.task("log", `### /api/addProduct -> status: ${res.status}`);
      cy.task("log", `### body: ${JSON.stringify(res.body).slice(0, 200)}`);
    });
  });
});