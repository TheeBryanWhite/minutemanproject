const httpStatus = require('http-status');
const { Towns } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a town
 * @param {Object} townBody
 * @returns {Promise<Town>}
 */
const createTown = async (townBody) => {
  const town = await Towns.create(townBody);
  return town;
};

/**
 * Query for town
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAllTowns = async (filter, options) => {
  const towns = await Towns.paginate(filter, options);
  return towns;
};

/**
 * Get town by id
 * @param {ObjectId} id
 * @returns {Promise<Town>}
 */
const getTownById = async (id) => {
  return Town.findById(id);
};

/**
 * Update text by id
 * @param {ObjectId} townId
 * @param {Object} updateBody
 * @returns {Promise<Town>}
 */
const updateTownById = async (townId, updateBody) => {
  const town = await getTownById(townId);
  if (!town) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Town not found');
  }
  Object.assign(town, updateBody);
  await town.save();
  return town;
};

/**
 * Delete town by id
 * @param {ObjectId} townId
 * @returns {Promise<Town>}
 */
const deleteTownById = async (townId) => {
  const town = await getTownById(townId);
  if (!town) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Town not found');
  }
  await town.remove();
  return town;
};

module.exports = {
  createTown,
  queryAllTowns,
  getTownById,
  updateTownById,
  deleteTownById,
};
