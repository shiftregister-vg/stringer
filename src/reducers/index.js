import { combineReducers } from 'redux';
import * as actions from '../actions';

const projectsInitialState = [];
const projectReducer = (state = projectsInitialState, action) => {
  switch (action.type) {
    case actions.FETCHED_PROJECTS:
      return action.projects.map(project => {
        const stateProject = state.find(p => p.id === project.id)
        if (stateProject && stateProject.loaded) {
          return stateProject
        }
        return project
      })
    case actions.FETCHED_PROJECT:
      action.project = {
        ...action.project,
        loaded: true
      }

      return state.map(project => {
        if (project.id === action.project.id) {
          return {
            ...project,
            ...action.project
          }
        }
      })
    default:
      return state;
  }
};

export default combineReducers({
  projects: projectReducer
});
