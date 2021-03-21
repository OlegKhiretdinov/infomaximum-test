import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import loginReducer from "./login-reducer";
import processReducer from "./process-reducer";
import profileReducer from "./profile-reducer";
import signUpReducer from "./signUp-reducer";

const reducers = combineReducers({
  login: loginReducer,
  signUp: signUpReducer,
  profile: profileReducer,
  processList: processReducer,
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store;