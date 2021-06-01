const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { townsService } = require('../services');

const createTown = catchAsync(async (req, res) => {
  const town = await townsService.createCompany(req.body);
  res.status(httpStatus.CREATED).send(town);
});

const getAllTowns = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['town']);
  // const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const options = {
    sortBy: 'name:desc',
    limit: 10000,
  };
  const result = await townsService.queryAllTowns(filter, options);
  res.send(result);
});

const getTown = catchAsync(async (req, res) => {
  const town = await townsService.getTownById(req.params.townId);
  if (!town) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Town not found');
  }
  res.send(town);
});

const updateTown = catchAsync(async (req, res) => {
  const town = await townsService.updateTownById(req.params.townId, req.body);
  res.send(town);
});

const deleteTown = catchAsync(async (req, res) => {
  await townsService.deleteTownById(req.params.townId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createTown,
  getAllTowns,
  getTown,
  updateTown,
  deleteTown,
};
