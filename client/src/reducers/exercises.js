import { CREATE, FETCH_ALL, UPDATE, DELETE } from "../constants/actionTypes";

const reducer = (exercises = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...exercises, action.payload];
    case UPDATE:
      return exercises.map((exercise) =>
        exercise._id === action.payload._id ? action.payload : exercise
      );
    case DELETE:
      return exercises.filter((exercise) => exercise._id !== action.payload);
    default:
      return exercises;
  }
};

export default reducer;
