import Joi from "joi";
import { apiRequest } from "../../support/api/apiClient";
import { getAdminToken } from "../../support/api/auth";

describe("Serviço: Produtos", () => {
  let productId;
  let categoryId;

  before(() => {
    // pega token e cria uma categoria real 
    return getAdminToken().then(() => {
      const bodyCategory = {
        name: `Categoria Produto ${Date.now()}`,
        photo: "any",
      };

      return apiRequest({
        method: "POST",
        url: "/api/addCategory",
        body: bodyCategory,
      }).then((res) => {
        categoryId =
          res.body?.data?._id ||
          res.body?._id ||
          res.body?.data?.id ||
          res.body?.id;

        expect(categoryId, "ID da categoria não encontrado").to.exist;
      });
    });
  });

  it("addProduct - Deve criar um produto", () => {
    const body = {
      name: `Produto ${Date.now()}`,
      price: 100,
      quantity: 10,
      categories: categoryId, // ID real
      description: "Produto de teste",
      photos: ["any"],
      popular: false,
      visible: true,
      location: "Brasil",
      additionalDetails: "Detalhes adicionais",
      specialPrice: 90,
    };

    apiRequest({ method: "POST", url: "/api/addProduct", body }).then((res) => {
      expect(res.status).to.be.oneOf([200, 201]);

      productId =
        res.body?.data?._id ||
        res.body?._id ||
        res.body?.data?.id ||
        res.body?.id;

      expect(productId, "ID do produto não encontrado").to.exist;
    });
  });

  it("editProduct - Deve editar um produto", function () {
    if (!productId) this.skip();

    const body = {
      name: `Produto Editado ${Date.now()}`,
      price: 120,
      quantity: 20,
      categories: categoryId,
      description: "Produto editado",
      photos: ["any"],
      popular: false,
      visible: true,
      location: "Brasil",
      additionalDetails: "Editado",
      specialPrice: 100,
    };

    apiRequest({
      method: "PUT",
      url: `/api/editProduct/${productId}`,
      body,
      failOnStatusCode: false,
    }).then((res) => {
      // aqui NÃO pode aceitar 404 como sucesso
      expect(res.status).to.be.oneOf([200, 202, 204]);
    });
  });

  it("deleteProduct - Deve deletar um produto", function () {
    if (!productId) this.skip();

    // 1) tenta rota mais provável
    apiRequest({
      method: "DELETE",
      url: `/api/deleteProduct/${productId}`,
      body: {},
      failOnStatusCode: false,
    }).then((res) => {
      if (res.status !== 404) {
        expect(res.status).to.be.oneOf([200, 202, 204]);
        return;
      }

      // 2) fallback
      apiRequest({
        method: "DELETE",
        url: `/api/excluirProduto/${productId}`,
        body: {},
        failOnStatusCode: false,
      }).then((res2) => {
        expect(res2.status).to.be.oneOf([200, 202, 204]);
      });
    });
  });

  it("Contrato (addProduct) - Deve respeitar o formato esperado", () => {
    const body = {
      name: `Contrato Produto ${Date.now()}`,
      price: 100,
      quantity: 10,
      categories: categoryId,
      description: "Produto contrato",
      photos: ["any"],
      popular: false,
      visible: true,
      location: "Brasil",
      additionalDetails: "Contrato",
      specialPrice: 90,
    };

    const schema = Joi.object({
      success: Joi.boolean().optional(),
      message: Joi.string().optional(),
      data: Joi.any().optional(),
    }).unknown(true);

    apiRequest({ method: "POST", url: "/api/addProduct", body }).then((res) => {
      expect(res.status).to.be.oneOf([200, 201]);

      const validation = schema.validate(res.body);
      expect(validation.error, validation.error?.message).to.be.undefined;

      const id =
        res.body?.data?._id ||
        res.body?._id ||
        res.body?.data?.id ||
        res.body?.id;

      if (id) {
        apiRequest({
          method: "DELETE",
          url: `/api/deleteProduct/${id}`,
          body: {},
          failOnStatusCode: false,
        });
      }
    });
  });
});