import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// Send token to middleware set header
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const getExercises = (page) => API.get(`/exercises?page=${page}`);
export const fetchExercisesBySearch = (searchQuery) => API.get(`/exercises/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const getExercise = (id) => API.get(`exercises/${id}`)
export const addExercise = (newExercise) =>
  API.post("/exercises/", newExercise);
export const updateExercise = (id, updatedExercise) =>
  API.patch(`/exercises/${id}`, updatedExercise);
export const deleteExercise = (id) => API.delete(`/exercises/${id}`);
export const commentExercise = (comment, id) => API.post(`/exercises/${id}/commentExercise`, { comment })

export const signIn = (formData) => API.post("/users/signin", formData);

export const signUp = (formData) => API.post("/users/signup", formData);

