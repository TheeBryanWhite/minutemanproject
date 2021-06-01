const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTown = {
  body: Joi.object().keys({
    id: Joi.string().custom(objectId),
    town: Joi.string().required()
  }),
};

const getAllTowns = {
  query: Joi.object().keys({
    id: Joi.string().custom(objectId),
    town: Joi.string()
  }),
};

const getTown = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateTown = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      id: Joi.string().custom(objectId),
      town: Joi.string().required
    })
    .min(1),
};

const deleteTown = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTown,
  getAllTowns,
  getTown,
  updateTown,
  deleteTown,
};
