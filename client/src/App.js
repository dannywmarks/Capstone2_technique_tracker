import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import ExerciseDetails from "./components/ExerciseDetails/ExerciseDetails";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"))


  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route
            path="/"
            exact
            component={() => <Redirect to="/exercises" />}
          />
          <Route path="/exercises" exact component={Home} />
          <Route path="/exercises/search" exact component={Home} />
          <Route path="/exercises/:id" component={ExerciseDetails} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to='/exercises' />)} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
