import { Project } from '../models/project';
import { Resource } from '../models/resource';

export interface State {
  showSidenav: boolean;
  projects: Project[];
  resources: Resource[];
}

export const initialState: State = {
  showSidenav: true,
  projects: [],
  resources: []
};

export function reducer(state: State = initialState, action): State {
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
