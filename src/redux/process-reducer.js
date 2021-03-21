import { getProcessList } from "../api/request";

const SET_PROCESS_LIST = 'SET_PROCESS_LIST';

const initialState = {
  list: []
};

const processReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_PROCESS_LIST:
      return {...state, list: action.processList}
    default:
      return state
  }
}

const setProcessListData = (processList) => ({
  type: SET_PROCESS_LIST,
  processList,
})

export const setProcessList = () => async (dispatch, getState) => {
  const response = await getProcessList(getState().login.token)
  dispatch(setProcessListData(response.data.processList))
}

export default processReducer
