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

export default loginReducer