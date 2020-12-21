import { combineReducers, createStore } from "redux";
import authenticationReducer from "../reducers/authenticationReducer";
import userInfoReducer from '../reducers/UserInfoReducer'

const reduxStore = createStore(
  combineReducers({
    authentication: authenticationReducer,
    userAdditionalInfo: userInfoReducer
  })
);
export default reduxStore;
