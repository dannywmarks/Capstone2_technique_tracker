let Exercise = require("../models/exercise.model");
const mongoose = require("mongoose");

// Get all exercises
const getExercises = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; // get starting index{
    const total = await Exercise.countDocuments({});

    const exercises = await Exercise.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      data: exercises,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
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
  const exercise = req.body;
  console.log(req.userId);
  const newExercise = new Exercise({
    ...exercise,
    creator: req.userId,
    createdAt: new Date().toISOString(),
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
    useFindAndModify: false,
  });

  res.json(updatedExercise);
};

// Delete a exercise by ID
const deleteExercise = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No exercise with id: ${id}`);

  await Exercise.findByIdAndRemove(id, { useFindAndModify: false });

  res.json({ message: "Exercise deleted successfully." });
};

// Search Exercise by Query
const getExercisesBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const exercise_name = new RegExp(searchQuery, "i");

    const exercises = await Exercise.find({
      $or: [{ exercise_name }, { tags: { $in: tags.split(",") } }],
    });
    console.log(exercises);
    res.json({ data: exercises });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const commentExercise = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  const exercise = await Exercise.findById(id);
  
  exercise.comments.push(comment);

  const updatedExercise = await Exercise.findByIdAndUpdate(id, exercise, {
    new: true,
  });

  return res.json(updatedExercise);
};

module.exports = {
  getExercises,
  getExercise,
  addExercise,
  updateExercise,
  deleteExercise,
  getExercisesBySearch,
  commentExercise,
};
