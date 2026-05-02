const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FITS Electronics API",
      version: "1.0.0",
      description:
        "API Documentation for FITS E-Commerce Backend for testing endpoints.",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Category: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "MongoDB ObjectId",
              example: "507f1f77bcf86cd799439011",
            },
            name: { type: "string", example: "Headphones" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        CreateCategoryRequest: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string", minLength: 1, example: "Headphones" },
          },
        },
        CategoriesNamesResponse: {
          type: "object",
          properties: {
            message: { type: "string" },
            data: {
              type: "array",
              items: { type: "string" },
              description:
                "Sorted unique category names from the Category collection and from products",
            },
          },
        },
        ValidationErrorResponse: {
          type: "object",
          properties: {
            errors: {
              type: "object",
              additionalProperties: { type: "string" },
            },
            details: { type: "array", items: { type: "object" } },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
