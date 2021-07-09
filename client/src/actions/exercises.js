import * as api from "../api";
import { CREATE, FETCH_ALL, UPDATE, DELETE } from "../constants/actionTypes";

// Action Creators exercise

export const getExercises = () => async (dispatch) => {
  try {
    const { data } = await api.getExercises();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const addExercise = (exercise) => async (dispatch) => {
  try {
    const { data } = await api.addExercise(exercise);

    dispatch({ type: CREATE, payload: data });
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
