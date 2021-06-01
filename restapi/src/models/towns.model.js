const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const townsSchema = mongoose.Schema(
  {
    id: {
      type: Object,
      required: true,
      trim: true,
      unique: true
    },
    town: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
townsSchema.plugin(toJSON);
townsSchema.plugin(paginate);

/**
 * @typedef Towns
 */
const Towns = mongoose.model('Towns', townsSchema);

module.exports = Towns;
