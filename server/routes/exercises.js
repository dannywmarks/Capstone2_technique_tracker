const express = require("express");
const router = express.Router();
const {
  getExercises,
  getExercise,
  addExercise,
  updateExercise,
  deleteExercise,
} = require("../controllers/exercise");

const auth = require('../middleware/auth')

// GET: /exercises
router.get("/", getExercises);

// GET: /exercises/:id
router.get("/:id", getExercise);

// POST /exercises/add
router.post("/", addExercise);

//UPDATE edit or modify an exercise
router.patch("/:id", updateExercise);

//DELETE an exercise
router.delete("/:id", auth, deleteExercise);

module.exports = router;
