import React, { useState, useEffect } from "react";
import { Container, Grid, Grow } from "@material-ui/core";
import Exercises from "../Exercises/Exercises";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import { getExercises } from "../../actions/exercises";

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("HIT");
    dispatch(getExercises());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Exercises setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
