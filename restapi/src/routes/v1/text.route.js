const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const textValidation = require('../../validations/text.validation');
const textController = require('../../controllers/text.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageText'), validate(textValidation.createText), textController.createText)
  .get(validate(textValidation.getAllText), textController.getAllText);

router
  .route('/:textId')
  .get(auth('getText'), validate(textValidation.getText), textController.getText)
  .patch(auth('manageAllText'), validate(textValidation.updateText), textController.updateText)
  .delete(auth('manageAllText'), validate(textValidation.deleteText), textController.deleteText);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Text
 *   description: Text management and retrieval
 */

/**
 * @swagger
 * /text:
 *   post:
 *     summary: Create a text
 *     description: Only admins can create text.
 *     tags: [Text]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - textid
 *               - text
 *             properties:
 *               textid:
 *                 type: number
 *               text:
 *                 type: string
 *             example:
 *               textid: 0
 *               text: This is a fake text
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Text'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all text
 *     description: Retrieve all text entries.
 *     tags: [Text]
 *     parameters:
 *       - in: query
 *         name: textid
 *         schema:
 *           type: number
 *         description: Text's original MySQL ID
 *       - in: query
 *         name: text
 *         schema:
 *           type: string
 *         description: The text entry
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
 *                     $ref: '#/components/schemas/Text'
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
 * /text/{id}:
 *   get:
 *     summary: Get a text
 *     description: Only admins can fetch text.
 *     tags: [Text]
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
 *                $ref: '#/components/schemas/Text'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a text
 *     description: Only admins can update other text.
 *     tags: [Text]
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
 *               textid:
 *                 type: number
 *               text:
 *                 type: string
 *             example:
 *               textid: 0
 *               text: This is a fake text
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Text'
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
 *     summary: Delete a text
 *     description: Only admins can delete text.
 *     tags: [Text]
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
