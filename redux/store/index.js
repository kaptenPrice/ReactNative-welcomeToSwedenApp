import { combineReducers, createStore } from "redux";
import authenticationReducer from "../reducers/authenticationReducer";

const reduxStore = createStore(
  combineReducers({
    authentication: authenticationReducer,
  })
);
export default reduxStore;
