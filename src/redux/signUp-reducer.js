const TOGGLE_SHOW_PASSWORD_SIGN_UP = 'TOGGLE_SHOW_PASSWORD_SIGN_UP';
const TOGGLE_SHOW_CONFIRM_SIGN_UP = 'TOGGLE_SHOW_CONFIRM_SIGN_UP';
const SIGN_UP_ERRORS ='SIGN_UP_ERRORS';

const initialState = {
  errors: [],
  showPassword: false,
  showConfirmPassword: false,
}

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_ERRORS:
      return { ...state, errors: action.errors}
    case TOGGLE_SHOW_PASSWORD_SIGN_UP:
      return {...state, showPassword: !state.showPassword}
    case TOGGLE_SHOW_CONFIRM_SIGN_UP:
      return {...state, showConfirmPassword: !state.showConfirmPassword}
    default:
      return state
  }
}

export const signUpError = (errors) => ({
  type: SIGN_UP_ERRORS,
  errors,
})

export const toggleShowPassword = () => ({
  type: TOGGLE_SHOW_PASSWORD_SIGN_UP,
})

export const toggleShowConfirmPassword = () => ({
  type: TOGGLE_SHOW_CONFIRM_SIGN_UP,
})


export default signUpReducer;