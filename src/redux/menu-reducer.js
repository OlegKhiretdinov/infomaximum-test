const TOGGLE_MENU = 'TOGGLE_MENU';

const initialState = {
  menuIsOpen: false,
}

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return {...state, menuIsOpen: !state.menuIsOpen}
    default:
      return state
  }
}

export const toggleMenu = () => ({
  type: TOGGLE_MENU,
})

export default menuReducer