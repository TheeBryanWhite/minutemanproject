const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const companyValidation = require('../../validations/company.validation');
const companyController = require('../../controllers/company.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageCompanies'), validate(companyValidation.createCompany), companyController.createCompany)
  .get(validate(companyValidation.getCompanies), companyController.getCompanies);

router
  .route('/:companyId')
  .get(validate(companyValidation.getCompany), companyController.getCompany)
  .patch(auth('manageCompany'), validate(companyValidation.updateCompany), companyController.updateCompany)
  .delete(auth('manageCompany'), validate(companyValidation.deleteCompany), companyController.deleteCompany);

router
  .route('/bytown/:townId')
  .get(validate(companyValidation.getCompaniesByTown), companyController.getCompaniesByTown)

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Company management and retrieval
 */

/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Create a company
 *     description: Only admins can create companies.
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - compnum
 *               - companyname
 *               - town
 *               - entered
 *               - enterednote
 *               - textid1
 *               - textid2
 *             properties:
 *               compnum:
 *                 type: number
 *               companyname:
 *                 type: string
 *               town:
 *                 type: string
 *               entered:
 *                  type: string
 *               enterednote:
 *                  type: string
 *               textid1:
 *                 type: number
 *               textid2:
 *                 type: number
 *             example:
 *               compnum: 1
 *               companyname: fake company name
 *               town: Boston
 *               entered: Boston
 *               enterednote: An example note
 *               textid1: 0
 *               textid2: 1
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Company'
 *       "400":
 *         $ref: '#/components/responses/DuplicateCompanyName'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all companies
 *     tags: [Companies]
 *     parameters:
 *       - in: query
 *         name: compnum
 *         schema:
 *           type: number
 *         description: Company number
 *       - in: query
 *         name: companyname
 *         schema:
 *           type: string
 *         description: Company name
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
 *                     $ref: '#/components/schemas/Company'
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
 * /companies/{id}:
 *   get:
 *     summary: Get a company
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Company id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Company'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a company
 *     description: Only admins can update companies.
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Companies id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               compnum:
 *                 type: number
 *               companyname:
 *                 type: string
 *               town:
 *                 type: string
 *               entered:
 *                 type: string
 *               enterednote:
 *                 type: string
 *               textid1:
 *                 type: number
 *               textid2:
 *                 type: number
 *             example:
 *               compnum: 1
 *               companyname: fake company name
 *               town: Boston
 *               entered: Boston
 *               enterednote: An example note
 *               textid1: 0
 *               textid2: 1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Company'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a company
 *     description: Only admins can delete companies.
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Company id
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
