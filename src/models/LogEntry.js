const mongoose = require("mongoose");
const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true
};
const requiredNumber = {
  type: Number,
  required: true
};

const LogEntrySchema = new Schema(
  {
    title: requiredString,
    description: String,
    comments: String,
    image: String,
    rating: { type: Number, min: 0, max: 10, default: 0 },
    latitude: {
      ...requiredNumber,
      min: -90,
      max: 90
    },
    longitude: {
      ...requiredNumber,
      min: -180,
      max: 180
    },
    visitDate: {
      type: Date,
      required: true
    }
  },
  { timestamps: true, collection: "travel" }
);

module.exports = mongoose.model("LogEntry", LogEntrySchema);
