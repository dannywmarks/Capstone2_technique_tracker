let Exercise = require("../models/exercise.model");
const mongoose = require("mongoose");

// Get all exercises
const getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).json(exercises);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get single exercise by ID
const getExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    res.status(200).json(exercise);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Add a single exercise
const addExercise = async (req, res) => {
  const { exercise_name, description, reps, link, tags } = req.body;

  const newExercise = new Exercise({
    exercise_name,
    description,
    reps,
    link,
    tags,
  });

  try {
    await newExercise.save();
    res.status(201).json(newExercise);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update a exercise by ID
const updateExercise = async (req, res) => {
  const { id } = req.params;
  const { exercise_name, description, reps, link, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedExercise = {
    exercise_name,
    description,
    reps,
    link,
    tags,
    _id: id,
  };

  await Exercise.findByIdAndUpdate(id, updatedExercise, {
    new: true,
    // useFindAndModify: false,
  });

  res.json(updatedExercise);
};

// Delete a exercise by ID
const deleteExercise = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No exercise with id: ${id}`);

  await Exercise.findByIdAndRemove(id);

  res.json({ message: "Exercise deleted successfully." });
};

module.exports = {
  getExercises,
  getExercise,
  addExercise,
  updateExercise,
  deleteExercise,
};
