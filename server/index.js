require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const productsRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const categoriesRoutes = require("./routes/categories");
const errorHandler = require("./middleware/errorHandler");
const db = require("./db");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3003",
    credentials: true,
  }),
);
app.use(helmet());
app.use(express.json());
app.use(
  mongoSanitize({
    replaceWith: "_",
  }),
);

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./utils/swagger");

// Swagger Documentation Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/products", productsRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/categories", categoriesRoutes);
const adminRoutes = require("./routes/admin");
const authenticate = require("./middleware/auth");
const requireAdmin = require("./middleware/requireAdmin");

//admin routes for managing the products
app.use("/api/v1/admin", authenticate, requireAdmin, adminRoutes);

// error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await db.connect();
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
})();

process.on("SIGINT", async () => {
  await db.mongoose.disconnect();
  process.exit(0);
});
