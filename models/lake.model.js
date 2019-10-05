const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const lakeSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    species: { type: Array, required: true },
    coordinates: {
      latitude: Number,
      longitude: Number
    },
    water_quality: String,
    size_in_acres: Number,
    public: Boolean,
    license_required: Boolean,
    operating_organization: String
  },
  {
    timestamps: true
  }
);

const Lake = mongoose.model("Lakes", lakeSchema);

module.exports = Lake;
