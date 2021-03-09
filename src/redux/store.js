import { combineReducers, createStore } from "redux";
import loginReducer from "./login-reducer";
import signUpReducer from "./signUp-reducer";


const reducers = combineReducers({
  login: loginReducer,
  signUp: signUpReducer,
})

const store = createStore(reducers)

window.store = store

export default store;