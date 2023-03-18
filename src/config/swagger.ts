import swaggerJSDoc from "swagger-jsdoc";
import { generateSchema } from "typescript-json-schema";

const program = require("typescript-json-schema").getProgramFromFiles(
  ["./src/domain/dto/CreateUserDTO.ts"],
  {}
);

const userSchema = generateSchema(program, "CreateUserDTO");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API de ejemplo",
    version: "1.0.0",
    description: "Esta es la documentación de la API de ejemplo",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Servidor de desarrollo",
    },
  ],
  components: {
    schemas: {
      CreateUser: userSchema,
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
