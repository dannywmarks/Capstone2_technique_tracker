import * as api from "../api";
import {
  CREATE,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  UPDATE,
  DELETE,
  START_LOADING,
  END_LOADING,
  FETCH_EXERCISE,
  COMMENT
} from "../constants/actionTypes";

// Action Creators exercise

export const getExercises = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.getExercises(page);

    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error.message);
  }
};

export const getExercise = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.getExercise(id);

    dispatch({ type: FETCH_EXERCISE, payload: data });
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error.message);
  }
};

export const getExercisesBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const {
      data: { data },
    } = await api.fetchExercisesBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error.message);
  }
};

export const addExercise = (exercise) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.addExercise(exercise);

    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error.message);
  }
};

export const updateExercise = (id, exercise) => async (dispatch) => {
  try {
    const { data } = await api.updateExercise(id, exercise);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteExercise = (id) => async (dispatch) => {
  try {
    await api.deleteExercise(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const commentExercise = (comment, id) => async (dispatch) => {
  try {
    const { data } = await api.commentExercise(comment, id)
    
    dispatch({ type: COMMENT, payload: data})

    return data.comments;
  } catch (error) {
    console.log(error)
  }
  
}