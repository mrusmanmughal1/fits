const express = require("express");
const router = express.Router();

const productsCtrl = require("../controllers/productsController");
const brandsCtrl = require("../controllers/brandsController");
const validate = require("../middleware/validate");

const { createProduct, updateProduct, idParam: productIdParam } = require("../schemas/product");
const { createBrand, updateBrand, idParam: brandIdParam } = require("../schemas/brand");

// =======================
// ADMIN - PRODUCTS
// =======================

/**
 * @swagger
 * tags:
 *   name: Admin Products
 *   description: Admin endpoints for managing products
 */

/**
 * @swagger
 * /api/v1/admin/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Admin Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - brand
 *               - category
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               brand:
 *                 type: string
 *                 description: ObjectId of the Brand
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin only
 */

/**
 * @swagger
 * /api/v1/admin/products/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Admin Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *   delete:
 *     summary: Delete a product
 *     tags: [Admin Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.post("/products", validate(createProduct), productsCtrl.createProduct);
router.put("/products/:id", validate(productIdParam, "params"), validate(updateProduct), productsCtrl.updateProduct);
router.delete("/products/:id", validate(productIdParam, "params"), productsCtrl.deleteProduct);

// =======================
// ADMIN - BRANDS
// =======================

/**
 * @swagger
 * tags:
 *   name: Admin Brands
 *   description: Admin endpoints for managing product brands
 */

/**
 * @swagger
 * /api/v1/admin/brands:
 *   get:
 *     summary: Get a list of all brands
 *     tags: [Admin Brands]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of brands retrieved successfully
 *   post:
 *     summary: Create a new brand
 *     description: Only accessible by users with the admin role. Requires a valid JWT token.
 *     tags: [Admin Brands]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               logo:
 *                 type: string
 *                 format: uri
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Brand created successfully
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: Forbidden - User is not an admin
 */

/**
 * @swagger
 * /api/v1/admin/brands/{id}:
 *   put:
 *     summary: Update an existing brand
 *     tags: [Admin Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               logo:
 *                 type: string
 *                 format: uri
 *               description:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Brand updated successfully
 *       404:
 *         description: Brand not found
 *   delete:
 *     summary: Delete a brand
 *     tags: [Admin Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Brand deleted successfully
 *       404:
 *         description: Brand not found
 */
router.get("/brands", brandsCtrl.listBrands);
router.post("/brands", validate(createBrand), brandsCtrl.createBrand);
router.put("/brands/:id", validate(brandIdParam, "params"), validate(updateBrand), brandsCtrl.updateBrand);
router.delete("/brands/:id", validate(brandIdParam, "params"), brandsCtrl.deleteBrand);

module.exports = router;
