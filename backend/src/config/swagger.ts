import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import type { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:8080/v1/api', // base URL của API
      },
    ],
  },
  apis: ['./dist/routes/*.js', './dist/controllers/*.js'], // đường dẫn chứa JSDoc
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
