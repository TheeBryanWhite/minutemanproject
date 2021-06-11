const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const soldiersSchema = mongoose.Schema(
  {
    compnum: {
      type: String,
      trim: true,
    },
    rank1: {
      type: String,
      trim: true,
    },
    rank2: {
      type: String,
      trim: true,
    },
    prefix: {
      type: String,
      trim: true,
    },
    firstname: {
      type: String,
      trim: true,
    },
    middlename: {
      type: String,
      trim: true,
    },
    lastname: {
      type: String,
      trim: true,
    },
    suffix: {
      type: String,
      trim: true,
    },
    othertown: {
      type: String,
      trim: true,
    },
    altfirstname: {
      type: String,
      trim: true,
    },
    altlastname: {
      type: String,
      trim: true,
    },
    textid1: {
      type: Number,
      trim: true,
    },
    textid2: {
      type: Number,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
soldiersSchema.plugin(toJSON);
soldiersSchema.plugin(paginate);

/**
 * @typedef Soldiers
 */
const Soldiers = mongoose.model('Soldiers', soldiersSchema);

module.exports = Soldiers;
