const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/categoriesController");

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Public category browsing endpoints
 */

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Get all category names
 *     description: >-
 *       Returns sorted unique category names from stored categories (admin-created)
 *       and from existing products.
 *     tags: [Categories]
 *     security: []
 *     responses:
 *       200:
 *         description: Category names retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/CategoriesNamesResponse"
 */
router.get("/", ctrl.listCategories);

module.exports = router;