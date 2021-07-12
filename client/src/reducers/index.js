import { combineReducers } from "redux";

import exercises from "./exercises";
import auth from "./auth";

export const reducers = combineReducers({ exercises, auth });
