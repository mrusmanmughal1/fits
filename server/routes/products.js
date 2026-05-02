const express = require("express");
const validate = require("../middleware/validate");
const { createProduct, updateProduct, idParam } = require("../schemas/product");
const router = express.Router();
const ctrl = require("../controllers/productsController");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Public product browsing endpoints
 */

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   brand:
 *                     type: string
 */

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product data
 *       404:
 *         description: Product not found
 */
router.get("/", ctrl.listProducts);
router.get("/:id", validate(idParam, "params"), ctrl.getProduct);

module.exports = router;
