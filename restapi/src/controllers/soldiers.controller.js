const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { soldiersService } = require('../services');

const createSoldier = catchAsync(async (req, res) => {
  const user = await soldierService.createUser(req.body);
  res.status(httpStatus.CREATED).send(soldier);
});

const getSoldiers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['lastname', 'firstname']);
  const options = {
    sortBy: 'name:desc',
    limit: 10000,
  };
  const result = await soldiersService.querySoldiers(filter, options);
  res.send(result);
});

const getSoldier = catchAsync(async (req, res) => {
  const soldier = await soldiersService.getSoldierById(req.params.soldierId);
  if (!soldier) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Soldier not found');
  }
  res.send(soldier);
});

const getSoldiersByCompany = catchAsync(async (req, res) => {
  const soldiers = await soldiersService.getSoldiersByCompany(req.params.companyId);
  if (!soldiers) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Soldiers not found');
  }
  res.send(soldiers);
});

const updateSoldier = catchAsync(async (req, res) => {
  const soldier = await soldiersService.updateSoldierById(req.params.soldierId, req.body);
  res.send(soldier);
});

const deleteSoldier = catchAsync(async (req, res) => {
  await soldiersService.deleteSoldierById(req.params.soldierId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createSoldier,
  getSoldiers,
  getSoldiersByCompany,
  getSoldier,
  updateSoldier,
  deleteSoldier,
};
