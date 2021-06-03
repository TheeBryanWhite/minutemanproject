const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const companySchema = mongoose.Schema(
  {
    compnum: {
      type: Number,
      required: true,
      trim: true,
    },
    companyname: {
      type: String,
      required: true,
      trim: true,
    },
    town: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
    entered: {
      type: mongoose.Schema.Types.ObjectId,
	    required: true,
      trim: true,
    },
    enterednote: {
      type: String,
      required: true,
      trim: true,
    },
	  textid1: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
	  textid2: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
companySchema.plugin(toJSON);
companySchema.plugin(paginate);

/**
 * @typedef Company
 */
const Company = mongoose.model('Company', companySchema);

module.exports = Company;
