import { sendLoginData } from "../api/request";
import { setAuthToken } from "../utils/localStorage";

const SET_TOKEN = 'SET_TOKEN';
const LOGIN_ERRORS = 'LOGIN_ERRORS';

const initialState = {
  token: null,
  errors: [],
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.token}
    case LOGIN_ERRORS:
      return { ...state, errors: action.errors }
    default:
      return state
  }
}

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
})

export const loginError = (errors) => ({
  type: LOGIN_ERRORS,
  errors
})

export const login = (email, password) => async (dispatch) => {
  const response = await sendLoginData(email, password)
  if (response.errors) {
    dispatch(loginError(response.errors))
  } else {
    dispatch(setToken(response.data.login.token));
    dispatch(loginError([]));
    setAuthToken(response.data.login.token)
  }
}

export default loginReducer