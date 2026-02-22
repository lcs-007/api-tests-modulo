import Joi from "joi";
import { apiRequest } from "../../support/api/apiClient";
import { getAdminToken } from "../../support/api/auth";

describe("Serviço: Categorias", () => {
  let categoryId;

  before(() => {
    return getAdminToken();
  });

  it("addCategory - Deve criar uma categoria", () => {
    const body = {
      name: `Categoria ${Date.now()}`,
      photo: "any",
    };

    apiRequest({ method: "POST", url: "/api/addCategory", body }).then((res) => {
      // Alguns ambientes podem devolver status “esquisito”, então validamos pelo body
      expect(res.body).to.exist;
      expect(res.body.success, JSON.stringify(res.body)).to.eq(true);

      categoryId =
        res.body?.data?._id ||
        res.body?._id ||
        res.body?.data?.id ||
        res.body?.id;

      expect(categoryId, "ID da categoria não encontrado").to.exist;
    });
  });

  it("editCategory - Deve editar uma categoria", function () {
    if (!categoryId) this.skip();

    const body = {
      name: `Categoria Editada ${Date.now()}`,
      photo: "any",
    };

    apiRequest({
      method: "PUT",
      url: `/api/editCategory/${categoryId}`,
      body,
    }).then((res) => {
      expect(res.body).to.exist;
      // Se a API responder success
      if (typeof res.body.success !== "undefined") {
        expect(res.body.success, JSON.stringify(res.body)).to.eq(true);
      }
    });
  });

  it("deleteCategory - Deve deletar uma categoria", function () {
    if (!categoryId) this.skip();

    apiRequest({
      method: "DELETE",
      url: `/api/excluirCategoria/${categoryId}`,
      body: {}, // apiClient vai injetar authorization no body
    }).then((res) => {
      expect(res.body).to.exist;
      if (typeof res.body.success !== "undefined") {
        expect(res.body.success, JSON.stringify(res.body)).to.eq(true);
      }
    });
  });

  it("Contrato (addCategory) - Deve respeitar o formato esperado", () => {
    const body = {
      name: `Contrato Categoria ${Date.now()}`,
      photo: "any",
    };

    const schema = Joi.object({
      success: Joi.boolean().required(),
      message: Joi.string().required(),
      data: Joi.object().required(),
    }).unknown(true);

    apiRequest({ method: "POST", url: "/api/addCategory", body }).then((res) => {
      const validation = schema.validate(res.body);
      expect(validation.error, validation.error?.message).to.be.undefined;

      const id = res.body?.data?._id;
      if (id) {
        apiRequest({ method: "DELETE", url: `/api/excluirCategoria/${id}`, body: {} });
      }
    });
  });
});