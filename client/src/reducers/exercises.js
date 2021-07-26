import {
  CREATE,
  FETCH_ALL,
  FETCH_EXERCISE,
  FETCH_BY_SEARCH,
  UPDATE,
  DELETE,
  START_LOADING,
  END_LOADING,
  COMMENT,
} from "../constants/actionTypes";

const reducer = (state = { isLoading: true, exercises: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        exercises: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
      return {
        ...state,
        exercises: action.payload,
      };
    case FETCH_EXERCISE:
      return {
        ...state,
        exercise: action.payload,
      };
    case CREATE:
      return { ...state, exercises: [...state.exercises, action.payload] };
    case UPDATE:
      return {
        ...state,
        exercises: state.exercises.map((exercise) =>
          exercise._id === action.payload._id ? action.payload : exercise
        ),
      };
    case DELETE:
      return {
        ...state,
        exercises: state.exercises.filter(
          (exercise) => exercise._id !== action.payload
        ),
      };
    case COMMENT:
      return {
        ...state,
        exercises: state.exercises.map((exercise) => {
          if (exercise._id === action.payload._id) return action.payload;

          return exercise;
        }),
      };
    default:
      return state;
  }
};

export default reducer;
