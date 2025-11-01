import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Fútbol Sport",
      version: "1.0.0",
      description: "Documentación completa de la API de Fútbol Sport",
    },
    servers: [{ url: "http://localhost:5000/api" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Ingresa tu token JWT aquí (sin la palabra 'Bearer')",
        },
      },
    },
  },
  apis: ["./src/docs/*.yaml", "./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
