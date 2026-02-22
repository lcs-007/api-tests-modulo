export function apiRequest({ method, url, body = {}, headers = {} }) {
  const token = Cypress.env("API_TOKEN");

  const finalHeaders = {
    ...headers,
    ...(token ? { authorization: token } : {}),
  };

  const finalBody =
    body && typeof body === "object"
      ? { ...body, ...(token ? { authorization: token } : {}) }
      : body;

  return cy.request({
    method,
    url,
    headers: finalHeaders,
    body: finalBody,
    failOnStatusCode: false,
  });
}