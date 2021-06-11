const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCompany = {
  body: Joi.object().keys({
    compnum: Joi.number().required(),
    companyname: Joi.string().required(),
    town: Joi.string().required(),
    entered: Joi.string().required(),
    enterednote: Joi.string().required(),
    textid1: Joi.number().required(),
    textid2: Joi.number().required(),
  }),
};

const getCompanies = {
  query: Joi.object().keys({
    compnum: Joi.number().integer(),
    companyname: Joi.string(),
    town: Joi.string(),
    entered: Joi.string(),
    enterednote: Joi.string(),
    textid1: Joi.number().integer(),
    textid2: Joi.number().integer(),
  }),
};

const getCompaniesByTown = {
  params: Joi.object().keys({
    townId: Joi.string().custom(objectId),
  }),
};

const getCompaniesByName = {
  params: Joi.object().keys({
    companyname: Joi.string(),
  }),
};

const getCompany = {
  params: Joi.object().keys({
    companyId: Joi.string(),
  }),
};

const updateCompany = {
  params: Joi.object().keys({
    companyId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      compnum: Joi.number().required(),
      companyname: Joi.string().required(),
      town: Joi.string().required(),
      entered: Joi.string().required(),
      enterednote: Joi.string().required(),
      textid1: Joi.number().required(),
      textid2: Joi.number().required(),
    })
    .min(1),
};

const deleteCompany = {
  params: Joi.object().keys({
    companyId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCompany,
  getCompanies,
  getCompaniesByTown,
  getCompaniesByName,
  getCompany,
  updateCompany,
  deleteCompany,
};
