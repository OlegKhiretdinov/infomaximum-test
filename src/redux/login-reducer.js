const SET_TOKEN = 'SET_TOKEN';
const LOGIN_ERRORS = 'LOGIN_ERRORS';
const TOGGLE_SHOW_PASSWORD = 'TOGGLE_SHOW_PASSWORD';

const initialState = {
  token: null,
  errors: [],
  showPassword: false,
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.token}
    case LOGIN_ERRORS:
      return { ...state, errors: action.errors }
    case TOGGLE_SHOW_PASSWORD:
      return { ...state, showPassword: !state.showPassword}
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

export const ToggleShowPassword = () => ({
  type: TOGGLE_SHOW_PASSWORD,
})

export default loginReducer