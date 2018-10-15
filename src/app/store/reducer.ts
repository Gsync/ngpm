export function reducer(state = {}, action) {
  switch (action.type) {
    case 'TOGGLE_SIDENAV':
      return {
        ...state,
        showSidenav: action.payload
      };
    default:
      return state;
  }
}
