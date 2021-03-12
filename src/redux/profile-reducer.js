const SET_USER_DATA = 'SET_USER_DATA';
const TOGGLE_SHOW_PASSWORD_EDIT = 'TOGGLE_SHOW_PASSWORD_EDIT';
const TOGGLE_SHOW_CONFIRM_EDIT = 'TOGGLE_SHOW_CONFIRM_EDIT';

const initialState = {
  firstName: '',
  secondName: '',
  email: '',
  id: null,
  showPassword: false,
  showConfirmPassword: false,
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {...state, ...action.currentUser}
    case TOGGLE_SHOW_PASSWORD_EDIT:
      return {...state, showPassword: !state.showPassword}
    case TOGGLE_SHOW_CONFIRM_EDIT:
      return {...state, showConfirmPassword: !state.showConfirmPassword}
    default:
      return state
  }
}

export const setUserData = (userData) => ({
  type: SET_USER_DATA,
  currentUser: userData,
})

export const toggleShowPassword = () => ({
  type: TOGGLE_SHOW_PASSWORD_EDIT,
})

export const toggleShowConfirmPassword = () => ({
  type: TOGGLE_SHOW_CONFIRM_EDIT,
})

export default profileReducer
