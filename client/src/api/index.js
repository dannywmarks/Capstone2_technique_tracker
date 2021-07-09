import axios from "axios";

const url = "http://localhost:5000/exercises";

export const getExercises = () => axios.get(url);
export const addExercise = (newExercise) => axios.post(`${url}`, newExercise);
export const updateExercise = (id, updatedExercise) =>
  axios.patch(`${url}/${id}`, updatedExercise);
export const deleteExercise = (id) => axios.delete(`${url}/${id}`);
