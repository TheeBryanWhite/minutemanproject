const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const soldiersValidation = require('../../validations/soldiers.validation');
const soldiersController = require('../../controllers/soldiers.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageSoldiers'), validate(soldiersValidation.createSoldier), soldiersController.createSoldier)
  .get(validate(soldiersValidation.getSoldiers), soldiersController.getSoldiers);

router
  .route('/:soldierId')
  .get(validate(soldiersValidation.getSoldier), soldiersController.getSoldier)
  .patch(auth('manageSoldier'), validate(soldiersValidation.updateSoldier), soldiersController.updateSoldier)
  .delete(auth('manageSoldier'), validate(soldiersValidation.deleteSoldier), soldiersController.deleteSoldier);

router
  .route('/bycompany/:companyId')
  .get(validate(soldiersValidation.getSoldiersByCompany), soldiersController.getSoldiersByCompany)

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Soldiers
 *   description: Soldier management and retrieval
 */

/**
 * @swagger
 * /soldiers:
 *   post:
 *     summary: Create a soldier
 *     description: Only admins can create soldiers.
 *     tags: [Soldiers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - personnum
 *               - compnum
 *               - rank1
 *               - rank2
 *               - prefix
 *               - firstname
 *               - middlename
 *               - lastname
 *               - suffix
 *               - othertown
 *               - altfirstname
 *               - altlastname
 *               - textid1
 *               - textid2
 *             properties:
 *               personnum:
 *                 type: number
 *               compnum:
 *                 type: number
 *               rank1:
 *                 type: string
 *               rank2:
 *                 type: string
 *               prefix:
 *                  type: string
 *               firstname:
 *                  type: string
 *               middlename:
 *                  type: string
 *               lastname:
 *                  type: string
 *               suffix:
 *                  type: string
 *               othertown:
 *                  type: string
 *               altfirstname:
 *                  type: string
 *               altlastname:
 *                  type: string
 *               textid1:
 *                 type: number
 *               textid2:
 *                 type: number
 *             example:
 *               personnum: 1
 *               compnum: 1
 *               rank1: Captain
 *               rank2: General
 *               prefix: Mr.
 *               firstname: John
 *               middlename: Jacob
 *               lastname: Jingleheimerschmidt
 *               suffix: III
 *               othertown: Boston
 *               altfirstname: Not John
 *               altlastname: Not Jingleheimerschmidt
 *               textid1: 0
 *               textid2: 1
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Soldiers'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all soldiers
 *     tags: [Soldiers]
 *     parameters:
 *       - in: query
 *         name: personnum
 *         schema:
 *           type: number
 *         description: Person number
 *       - in: query
 *         name: compnum
 *         schema:
 *           type: number
 *         description: Company number
 *       - in: query
 *         name: rank1
 *         schema:
 *           type: string
 *         description: Soldier's rank
 *       - in: query
 *         name: rank2
 *         schema:
 *           type: string
 *         description: Soldier's other rank
 *       - in: query
 *         name: prefix
 *         schema:
 *           type: string
 *         description: Soldier's name prefix
 *       - in: query
 *         name: firstname
 *         schema:
 *           type: string
 *         description: Soldier's first name
 *       - in: query
 *         name: middlename
 *         schema:
 *           type: string
 *         description: Soldier's middle name
 *       - in: query
 *         name: lastname
 *         schema:
 *           type: string
 *         description: Soldier's last name
 *       - in: query
 *         name: suffix
 *         schema:
 *           type: string
 *         description: Soldier's name suffix
 *       - in: query
 *         name: othertown
 *         schema:
 *           type: string
 *         description: Soldier's town
 *       - in: query
 *         name: altfirstname
 *         schema:
 *           type: string
 *         description: Soldier's alternative first name
 *       - in: query
 *         name: altlastname
 *         schema:
 *           type: string
 *         description: Soldier's alternative last name
 *       - in: query
 *         name: textid1
 *         schema:
 *           type: number
 *         description: text id
 *       - in: query
 *         name: textid2
 *         schema:
 *           type: number
 *         description: other text id
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
 * /soldiers/{id}:
 *   get:
 *     summary: Get a soldier
 *     tags: [Soldiers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Soldier id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Soldier'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a soldier
 *     description: Only admins can update soldiers.
 *     tags: [Soldiers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Soldiers id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               personnum:
 *                 type: number
 *               compnum:
 *                 type: number
 *               rank1:
 *                 type: string
 *               rank2:
 *                 type: string
 *               prefix:
 *                  type: string
 *               firstname:
 *                  type: string
 *               middlename:
 *                  type: string
 *               lastname:
 *                  type: string
 *               suffix:
 *                  type: string
 *               othertown:
 *                  type: string
 *               altfirstname:
 *                  type: string
 *               altlastname:
 *                  type: string
 *               textid1:
 *                 type: number
 *               textid2:
 *                 type: number
 *             example:
 *               personnum: 1
 *               compnum: 1
 *               rank1: Captain
 *               rank2: General
 *               prefix: Mr.
 *               firstname: John
 *               middlename: Jacob
 *               lastname: Jingleheimerschmidt
 *               suffix: III
 *               othertown: Boston
 *               altfirstname: Not John
 *               altlastname: Not Jingleheimerschmidt
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
 *     summary: Delete a soldier
 *     description: Only admins can delete soldiers.
 *     tags: [Soldiers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Soldier id
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
