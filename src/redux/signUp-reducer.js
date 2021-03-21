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

export default signUpReducer;