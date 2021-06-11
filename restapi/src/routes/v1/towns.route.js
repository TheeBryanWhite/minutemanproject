const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const townsValidation = require('../../validations/towns.validation');
const townsController = require('../../controllers/towns.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageTown'), validate(townsValidation.createTown), townsController.createTown)
  .get(validate(townsValidation.getAllTowns), townsController.getAllTowns);

router
  .route('/:townId')
  .get(validate(townsValidation.getTown), townsController.getTown)
  .patch(auth('manageTown'), validate(townsValidation.updateTown), townsController.updateTown)
  .delete(auth('manageTown'), validate(townsValidation.deleteTown), townsController.deleteTown);

router
  .route('/byname/:townname')
  .get(validate(townsValidation.getTownsByName), townsController.getTownsByName);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Towns
 *   description: Towns management and retrieval
 */

/**
 * @swagger
 * /towns:
 *   post:
 *     summary: Create a town
 *     description: Only admins can create text.
 *     tags: [Towns]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - town
 *             properties:
 *               town:
 *                 type: string
 *             example:
 *               text: Boston
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Towns'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all towns
 *     description: Retrieve all town entries.
 *     tags: [Towns]
 *     parameters:
 *       - in: query
 *         name: town
 *         schema:
 *           type: string
 *         description: Town name
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Towns'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /town/{id}:
 *   get:
 *     summary: Get a town
 *     description: Get town by ID
 *     tags: [Towns]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Text id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Towns'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a town
 *     description: Only admins can update other towns.
 *     tags: [Towns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: text id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *             example:
 *               text: Boston
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Towns'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a town
 *     description: Only admins can delete town.
 *     tags: [Towns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Text id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
