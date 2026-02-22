import { getAdminToken } from "../../support/api/auth";

describe("Login Admin", () => {
  it("Deve retornar token", () => {
    return getAdminToken().then((token) => {
      console.log("TOKEN AQUI:", token);
      expect(token).to.exist;
    });
  });
});