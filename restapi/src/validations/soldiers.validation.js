const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createSoldier = {
  body: Joi.object().keys({
    personnum: Joi.number().required(),
    compnum: Joi.number().required(),
    rank1: Joi.string().required(),
    rank2: Joi.string().required(),
    prefix: Joi.string().required(),
    firstname: Joi.string().required(),
    middlename: Joi.string().required(),
    lastname: Joi.string().required(),
    suffix: Joi.string().required(),
    othertown: Joi.string().required(),
    altfirstname: Joi.string().required(),
    altlastname: Joi.string().required(),
    textid1: Joi.number().required(),
    textid2: Joi.number().required(),
  }),
};

const getSoldiers = {
  query: Joi.object().keys({
    personnum: Joi.number().integer(),
    compnum: Joi.number().integer(),
    rank1: Joi.string(),
    rank2: Joi.string(),
    prefix: Joi.string(),
    firstname: Joi.string(),
    middlename: Joi.string(),
    lastname: Joi.string(),
    suffix: Joi.string(),
    othertown: Joi.string(),
    altfirstname: Joi.string(),
    altlastname: Joi.string(),
    textid1: Joi.number().integer(),
    textid2: Joi.number().integer(),
  }),
};

const getSoldier = {
  params: Joi.object().keys({
    soldierId: Joi.string().custom(objectId),
  }),
};

const updateSoldier = {
  params: Joi.object().keys({
    soldierId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      personnum: Joi.number().required(),
      compnum: Joi.number().required(),
      rank1: Joi.string().required(),
      rank2: Joi.string().required(),
      prefix: Joi.string().required(),
      firstname: Joi.string().required(),
      middlename: Joi.string().required(),
      lastname: Joi.string().required(),
      suffix: Joi.string().required(),
      othertown: Joi.string().required(),
      altfirstname: Joi.string().required(),
      altlastname: Joi.string().required(),
      textid1: Joi.number().required(),
      textid2: Joi.number().required(),
    })
    .min(1),
};

const deleteSoldier = {
  params: Joi.object().keys({
    soldierId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createSoldier,
  getSoldiers,
  getSoldier,
  updateSoldier,
  deleteSoldier,
};
