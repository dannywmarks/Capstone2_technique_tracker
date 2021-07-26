const express = require("express");
const router = express.Router();
const {
  getExercises,
  getExercise,
  addExercise,
  updateExercise,
  deleteExercise,
  getExercisesBySearch,
  commentExercise
} = require("../controllers/exercise");

const auth = require("../middleware/auth");

// SEARCH
router.get("/search", getExercisesBySearch);
// GET: /exercises
router.get("/", getExercises);

// GET: /exercises/:id
router.get("/:id", getExercise);

// POST /exercises/add
router.post("/", auth, addExercise);

// POST /exercises/add
router.post("/:id/commentExercise", auth, commentExercise);

//UPDATE edit or modify an exercise
router.patch("/:id",auth, updateExercise);

//DELETE an exercise
router.delete("/:id", auth, deleteExercise);

module.exports = router;
