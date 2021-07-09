const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
  {
    exercise_name: { type: String, required: true },
    description: { type: String, requiredL: true },
    reps: { type: Number, required: true },
    link: { type: String },
    tags: [String]
  },
  {
    timestamps: true,
  }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
