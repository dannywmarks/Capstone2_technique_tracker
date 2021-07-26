import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Pagination, PaginationItem } from "@material-ui/lab";
import useStyles from "./styles";
import { getExercises } from "../actions/exercises.js";

const Paginate = ({ page }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {numberOfPages} = useSelector((state) => state.exercises)
  console.log('page', page)


  useEffect(() => {
    if(page) dispatch(getExercises(page));
  }, [page, dispatch]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/exercises?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
