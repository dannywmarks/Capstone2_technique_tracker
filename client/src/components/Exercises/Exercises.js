import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import Exercise from "./Exercise/Exercise";
import useStyles from "./styles";

const Exercises = ({ setCurrentId }) => {
  const { exercises, isLoading } = useSelector((state) => state.exercises);
  const classes = useStyles();

  console.log(isLoading, exercises)

  if(!exercises.length && !isLoading) return 'No Exercises'
  console.log(exercises)
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {exercises.map((exercise) => (
        <Grid key={exercise._id} item xs={12} sm={6} md={6} lg={3}>
          <Exercise exercise={exercise} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Exercises;
