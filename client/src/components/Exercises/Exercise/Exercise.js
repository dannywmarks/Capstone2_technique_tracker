import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
  Divider
} from "@material-ui/core";
import moment from "moment";
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizon from "@material-ui/icons/MoreHoriz";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { deleteExercise } from "../../../actions/exercises";

const Exercise = ({ exercise, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const tags = exercise.tags;
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();

  const openExercise = () => history.push(`/exercises/${exercise._id}`);

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        className={classes.cardAction}
        onClick={openExercise}
      >
        <CardMedia className={classes.media}>
          <ReactPlayer url={exercise.link} width="100%" height="100%" />
        </CardMedia>

        <div className={classes.overlay}>
          <Typography variant="body2">
            {moment(exercise.createdAt).fromNow()}
          </Typography>
        </div>

        <div className={classes.title}>
          <Typography variant="h5" gutterBottom>
            {exercise.exercise_name}
          </Typography>
        </div>

        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Divider />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {exercise.description}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        {(user?.result?.googleId === exercise?.creator ||
          user?.result?._id === exercise?.creator) && (
          <Button
            style={{ color: "#303aa6" }}
            size="small"
            onClick={() => setCurrentId(exercise._id)}
          >
            <MoreHorizon fontSize="medium" />
          </Button>
        )}
        {(user?.result?.googleId === exercise?.creator ||
          user?.result?._id === exercise?.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deleteExercise(exercise._id))}
          >
            <DeleteIcon>Delete</DeleteIcon>
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Exercise;
