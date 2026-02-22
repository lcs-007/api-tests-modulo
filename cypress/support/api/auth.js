export function getAdminToken() {
  const email = Cypress.env("ADMIN_EMAIL") || "admin@admin.com";
  const password = Cypress.env("ADMIN_PASSWORD") || "admin123";

  return cy
    .request({
      method: "POST",
      url: "/public/authUser",
      failOnStatusCode: false,
      body: { email, password },
    })
    .then((res) => {
      // Se o login falhar, mostra o motivo e para
      expect(res.status, JSON.stringify(res.body)).to.eq(200);

      const token = res.body?.data?.token || res.body?.token;
      expect(token, "Token não veio na resposta").to.exist;

      Cypress.env("API_TOKEN", token);

      // ✅ NÃO use cy.log aqui
      console.log("TOKEN:", token);

      return token;
    });
}