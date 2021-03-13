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

export const setProcessList = (processList) => ({
  type: SET_PROCESS_LIST,
  processList,
})

export default processReducer
