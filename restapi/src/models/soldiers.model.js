const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const soldiersSchema = mongoose.Schema(
  {
    personnum: {
      type: Number,
      required: true,
      trim: true,
    },
    compnum: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
    rank1: {
      type: String,
      required: true,
      trim: true,
    },
    rank2: {
      type: String,
      required: true,
      trim: true,
    },
    prefix: {
      type: String,
	    required: true,
      trim: true,
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    middlename: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    suffix: {
      type: String,
      required: true,
      trim: true,
    },
    othertown: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
    altfirstname: {
      type: String,
      required: true,
      trim: true,
    },
    altfirstname: {
      type: String,
      required: true,
      trim: true,
    },
	  textid1: {
      type: Number,
      required: true,
      trim: true,
    },
	  textid2: {
      type: Number,
      required: true,
      trim: true,
    }
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
