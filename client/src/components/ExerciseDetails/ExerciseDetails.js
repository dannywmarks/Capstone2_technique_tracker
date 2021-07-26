import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import moment from "moment";
import CommentSection from "./CommentSection";
import { getExercise, getExercisesBySearch } from "../../actions/exercises";
import { useParams, useHistory } from "react-router-dom";
import useStyles from "./styles";

const ExerciseDetails = () => {
  const dispatch = useDispatch();
  const { exercise, exercises, isLoading } = useSelector(
    (state) => state.exercises
  );
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getExercise(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (exercise) {
      dispatch(
        getExercisesBySearch({ search: "none", tags: exercise?.tags.join(",") })
      );
    }
  }, [exercise, dispatch]);

  if (!exercise) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedExercises = exercises.filter(
    ({ _id }) => _id !== exercise._id
  );

  const openExercise = (_id) => {
    history.push(`/exercises/${_id}`);
  };

  console.log(exercise, exercises, isLoading);

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.imageSection}>
          {/* <img className={classes.media} src={'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={exercise.exercise_name} /> */}
          <ReactPlayer url={exercise.link} width="100%" height="500px" />
        </div>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {exercise.exercise_name}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {exercise.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {exercise.description}
          </Typography>
          <Typography variant="h6">Created by: {exercise.name}</Typography>
          <Typography variant="body1">
            {moment(exercise.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection exercise={exercise} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
      </div>
      {recommendedExercises.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div className={classes.recommendedExercises}>
            {recommendedExercises.map(
              ({ description, name, exercise_name, link, _id }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openExercise(_id)}
                  key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    {exercise_name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {description}
                  </Typography>
                  <ReactPlayer url={link} width="200px" height="200px" />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default ExerciseDetails;
