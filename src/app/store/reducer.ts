export function reducer(state = {}, action) {
  switch (action.type) {
    case 'TOGGLE_SIDENAV':
      return {
        ...state,
        showSidenav: action.payload
      };
    case 'LOAD_PROJECTS':
      return {
        ...state,
        projects: action.payload
      };
    case 'LOAD_RESOURCES':
      return {
        ...state,
        resources: action.payload
      };
    default:
      return state;
  }
}
