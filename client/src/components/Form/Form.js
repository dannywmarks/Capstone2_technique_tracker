import React, { useState, useEffect } from "react";
import { TextField, Button, Paper, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addExercise, updateExercise } from "../../actions/exercises";
import useStyles from "./styles";

const Form = ({ currentId, setCurrentId }) => {
  let initialState = {
    exercise_name: "",
    reps: "",
    link: "",
    description: "",
    tags: [],
  };

  const [exerciseData, setExerciseData] = useState(initialState);
  const exercise = useSelector((state) =>
    currentId
      ? state.exercises.find((exercise) => exercise._id === currentId)
      : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  // on load, checking if exercise is in app state, and if there is an exercise loading in form state
  useEffect(() => {
    if (exercise) setExerciseData(exercise);
  }, [exercise]);

  // Clears form and sets currentId to null
  const clear = () => {
    setCurrentId(0);
    setExerciseData(initialState);
  };

  // on change, saving data in initialState form state object
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExerciseData((e) => ({ ...e, [name]: value }));
  };

  // handle form on submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(addExercise(exerciseData));
      clear();
    } else {
      dispatch(updateExercise(currentId, exerciseData));
      clear();
    }
  };

  // destructured values from exerciseData
  const { exercise_name, reps, link, description, tags } = exerciseData;

  return (
    <Paper>
      <form
        className={`${classes.root} ${classes.form}`}
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Exercise
        </Typography>
        <TextField
          name="exercise_name"
          variant="outlined"
          label="Exercise_name"
          fullWidth
          value={exercise_name}
          onChange={handleChange}
        />
        <TextField
          name="reps"
          variant="outlined"
          label="Reps"
          fullWidth
          value={reps}
          onChange={handleChange}
        />
        <TextField
          name="link"
          variant="outlined"
          label="link"
          fullWidth
          value={link}
          onChange={handleChange}
        />
        <TextField
          name="description"
          variant="outlined"
          label="Description"
          fullWidth
          value={description}
          onChange={handleChange}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={tags}
          onChange={(e) => setExerciseData({ ...exerciseData, tags: e.target.value.split(',') })}
        />
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
