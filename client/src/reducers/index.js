import { combineReducers } from "redux";
import storyReducer from "./storyReducer";
import formReducer from "./formReducer";
import errorReducer from "./errorReducer";
import authmReducer from "./authReducer";

export default combineReducers({
  stories: storyReducer,
  form: formReducer,
  error: errorReducer,
  auth: authmReducer,
});
