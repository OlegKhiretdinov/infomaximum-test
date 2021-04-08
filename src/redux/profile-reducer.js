import { editCurrentUser, getCurrentUserData } from "../api/request";

const SET_USER_DATA = 'SET_USER_DATA';
const ERROR_EDIT_PROFILE = 'ERROR_EDIT_PROFILE';
const CHANGE_PROFILE = 'CHANGE_PROFILE'

const initialState = {
  firstName: '',
  secondName: '',
  email: '',
  id: null,
  errors: [],
  isChanged: false
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, ...action.currentUser }
    case ERROR_EDIT_PROFILE:
      return { ...state, errors: action.errors }
    case CHANGE_PROFILE:
      return { ...state, isChanged: !state.isChanged }
    default:
      return state
  }
}

export const setUserData = (userData) => ({
  type: SET_USER_DATA,
  currentUser: userData,
})

export const editProfileError = (errors) => ({
  type: ERROR_EDIT_PROFILE,
  errors,
})

export const profileIsChange = () => ({
  type: CHANGE_PROFILE,
})

export const editProfile = (fields) => async (dispatch, getState) => {
  const { email, firstName, secondName, password, id } = { ...getState().profile, ...fields }
  const response = await editCurrentUser(getState().login.token, id, {email, firstName, secondName, password})
  if (response.errors) {
    dispatch(editProfileError(response.errors))
  } else {
    dispatch(profileIsChange())
    dispatch(setUserData(response.data.editUser))
    dispatch(editProfileError([]))
    setTimeout((() => dispatch(profileIsChange())), 3000)
  }
}

export const setCurrentUserData = () => async (dispatch, getState) => {
  const response = await getCurrentUserData(getState().login.token)
  dispatch(setUserData(response.data.currentUser))
}

export default profileReducer
