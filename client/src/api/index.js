import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:5000/' })



export const getExercises = () => API.get('/exercises');
export const addExercise = (newExercise) => API.post('/exercises/', newExercise);
export const updateExercise = (id, updatedExercise) =>
  API.patch(`/exercises/${id}`, updatedExercise);
export const deleteExercise = (id) => API.delete(`/exercises/${id}`);
