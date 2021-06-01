const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createText = {
  body: Joi.object().keys({
    textid: Joi.number().required(),
    text: Joi.string().required()
  }),
};

const getAllText = {
  query: Joi.object().keys({
    textid: Joi.number().integer(),
    text: Joi.string()
  }),
};

const getText = {
  params: Joi.object().keys({
    textId: Joi.string().custom(objectId),
  }),
};

const updateText = {
  params: Joi.object().keys({
    textId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      textid: Joi.number().required(),
      text: Joi.string().required
    })
    .min(1),
};

const deleteText = {
  params: Joi.object().keys({
    textId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createText,
  getAllText,
  getText,
  updateText,
  deleteText,
};
