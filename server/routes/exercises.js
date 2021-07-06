const router = require("express").Router();
let Exercise = require("../models/exercise.model");

//GET Get all exercises
router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
});

//GET Get a single exercise by ID
router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error " + err));
});

//POST
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const reps = Number(req.body.reps);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    reps,
    date,
  });

  //UPDATE edit or modify an exercise
  router.route("update/id:").put((req, res) => {
    Exercise.findById(req.params.id)
      .then((exercise) => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.reps = req.body.reps;
        exercise.date = req.body.date;

        exercise
          .save()
          .then(() => res.json("Exercise Updated"))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error" + err));
  });

  //DELETE an exercise
  router.route("/:id").delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
      .then(() => res.json("Exercise deleted."))
      .catch((err) => res.status(400).json("Error: " + err));
  });

  newExercise
    .save()
    .then(() => res.json("Exercise add!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
