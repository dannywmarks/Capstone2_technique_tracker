import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizon from "@material-ui/icons/MoreHoriz";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { deleteExercise } from "../../../actions/exercises";

const Exercise = ({ exercise, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const tags = exercise.tags;
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        // image=""
        title={exercise.exercise_name}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{exercise.exercise_name}</Typography>
        <Typography variant="body2">
          {moment(exercise.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => setCurrentId(exercise._id)}
        >
          <MoreHorizon fontSize="medium" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography variant="h5" gutterBottom>
        {exercise.exercise_name}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {exercise.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(deleteExercise(exercise._id))}
        >
          <DeleteIcon>Delete</DeleteIcon>
        </Button>
      </CardActions>
    </Card>
  );
};

export default Exercise;
