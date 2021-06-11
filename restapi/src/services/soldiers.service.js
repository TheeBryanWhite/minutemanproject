const httpStatus = require('http-status');
const { Soldiers } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a company
 * @param {Object} soldiersBody
 * @returns {Promise<Soldiers>}
 */
const createSoldier = async (soldierBody) => {
  const soldier = await Soldiers.create(soldierBody);
  return soldier;
};

/**
 * Query for soldier
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querySoldiers = async (filter, options) => {
  const soldiers = await Soldiers.paginate(filter, options);
  return soldiers;
};

/**
 * Get soldier by id
 * @param {ObjectId} id
 * @returns {Promise<Soldier>}
 */
const getSoldierById = async (id) => {
  return Soldiers.findById(id);
};

/**
 * Get soldier by company ID
 * @param {ObjectId} id
 * @returns {Promise<Soldier>}
 */
const getSoldiersByCompany = async (id) => {
  return Soldiers.find({ compnum: id });
};

/**
 * Get soldier by town ID
 * @param {ObjectId} id
 * @returns {Promise<Soldier>}
 */
const getSoldiersByTown = async (id) => {
  return Soldiers.find({ othertown: id });
};

/**
 * Get soldier by last name
 * @param {ObjectId} id
 * @returns {Promise<Soldier>}
 */
const getSoldiersByLastName = async (name) => {
  const pattern = new RegExp(name, 'i');
  return Soldiers.find({ lastname: pattern });
};

/**
 * Get soldier by first name
 * @param {ObjectId} id
 * @returns {Promise<Soldier>}
 */
const getSoldiersByFirstName = async (name) => {
  const pattern = new RegExp(name, 'i');
  return Soldiers.find({ firstname: pattern });
};

/**
 * Get soldier by complex
 * @param {ObjectId} companyId
 * @param {String} fistname
 * @param {String} lastname
 * @param {ObjectId} townId
 * @returns {Promise<Soldiers>}
 */
const getSoldiersByComplex = async (companyId, firstname, lastname, townId) => {
  const fNamePattern = new RegExp(firstname, 'i');
  const lNamePattern = new RegExp(lastname, 'i');

  let inputBody = {};

  if (companyId) {
    inputBody['compnum'] = companyId;
  }

  if (firstname) {
    inputBody['firstname'] = fNamePattern;
  }

  if (lastname) {
    inputBody['lastname'] = lNamePattern;
  }

  if (townId) {
    inputBody['townId'] = townId;
  }

  return Soldiers.find(inputBody);
};

/**
 * Update soldier by id
 * @param {ObjectId} soldierId
 * @param {Object} updateBody
 * @returns {Promise<Soldier>}
 */
const updateSoldierById = async (soldierId, updateBody) => {
  const soldier = await getSoldierById(soldierId);
  if (!soldier) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Soldier not found');
  }
  if (updateBody.soldiername && (await soldier.soldiername(updateBody.soldiername, soldierId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Company name is already taken');
  }
  Object.assign(soldier, updateBody);
  await soldier.save();
  return soldier;
};

/**
 * Delete soldier by id
 * @param {ObjectId} soldierId
 * @returns {Promise<Soldier>}
 */
const deleteSoldierById = async (soldierId) => {
  const soldier = await getSoldierById(soldierId);
  if (!soldier) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Soldier not found');
  }
  await soldier.remove();
  return soldier;
};

module.exports = {
  createSoldier,
  querySoldiers,
  getSoldierById,
  getSoldiersByCompany,
  getSoldiersByTown,
  getSoldiersByFirstName,
  getSoldiersByLastName,
  getSoldiersByComplex,
  updateSoldierById,
  deleteSoldierById,
};
