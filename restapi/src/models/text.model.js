const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const textSchema = mongoose.Schema(
  {
    textid: {
      type: Number,
      required: true,
      trim: true,
      unique: true
    },
    text: {
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
textSchema.plugin(toJSON);
textSchema.plugin(paginate);

/**
 * @typedef Text
 */
const Text = mongoose.model('Text', textSchema);

module.exports = Text;
