import { combineReducers, createStore } from "redux";
import loginReducer from "./login-reducer";
import menuReducer from "./menu-reducer";
import processReducer from "./process-reducer";
import profileReducer from "./profile-reducer";
import signUpReducer from "./signUp-reducer";


const reducers = combineReducers({
  login: loginReducer,
  signUp: signUpReducer,
  menu: menuReducer,
  profile: profileReducer,
  processList: processReducer,
})

const store = createStore(reducers)

window.store = store

export default store;