import { SendSignUpData } from "../api/request";
import { setAuthToken } from "../utils/localStorage";
import { setToken } from "./login-reducer";

const SIGN_UP_ERRORS ='SIGN_UP_ERRORS';

const initialState = {
  errors: [],
}

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_ERRORS:
      return { ...state, errors: action.errors}
    default:
      return state
  }
}

export const signUpError = (errors) => ({
  type: SIGN_UP_ERRORS,
  errors,
})

export const signUp = ({firstName, secondName, email, password}) => async (dispatch) => {

  const response = await SendSignUpData (firstName, secondName, email, password)
  if(response.errors) {
    dispatch(signUpError(response.errors));
  } else {
    dispatch(setToken(response.data.signup));
    dispatch(signUpError([]));
    setAuthToken(response.data.signup)
  }
}

export default signUpReducer;
