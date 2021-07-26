import React, { useState, useEffect } from "react";
import { TextField, Button, Paper, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addExercise, updateExercise } from "../../actions/exercises";
import useStyles from "./styles";

let initialState = {
  exercise_name: "",
  reps: "",
  link: "",
  description: "",
  tags: [],
};

const Form = ({ currentId, setCurrentId }) => {
  const [exerciseData, setExerciseData] = useState(initialState);
  const exercise = useSelector((state) =>
    currentId
      ? state.exercises.exercises.find((exercise) => exercise._id === currentId)
      : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  

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
      dispatch(addExercise({ ...exerciseData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(updateExercise(currentId, { ...exerciseData, name: user?.result?.name }));
      clear();
    }
  };

  if(!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to add your own exercises.
        </Typography>
      </Paper>
    )
  }

  // destructured values from exerciseData
  const { exercise_name, reps, link, description, tags } = exerciseData;

  return (
    <Paper className={classes.paper} elevation={6}>
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
          multiline
          rows={4}
          value={description}
          onChange={handleChange}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={tags}
          onChange={(e) =>
            setExerciseData({
              ...exerciseData,
              tags: e.target.value.split(","),
            })
          }
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
          className={classes.buttonClear}
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
