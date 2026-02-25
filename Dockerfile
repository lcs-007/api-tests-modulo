FROM cypress/included:15.10.0

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# 
ENTRYPOINT []

# Roda 3 specs (sem as debug-)
CMD ["sh", "-lc", "npx cypress run --spec cypress/e2e/api/categories.cy.js && npx cypress run --spec cypress/e2e/api/products.cy.js && npx cypress run --spec cypress/e2e/api/login.cy.js"]