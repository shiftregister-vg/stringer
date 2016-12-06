export const REQUEST_PROJECTS = 'REQUEST_PROJECTS'
export const FETCHED_PROJECTS = 'FETCHED_PROJECTS'
export const REQUEST_PROJECT = 'REQUEST_PROJECT'
export const FETCHED_PROJECT = 'FETCHED_PROJECT'


export function requestProjects() {
  return {
    type: REQUEST_PROJECTS
  }
}

export function fetchedProjects(projects) {
  return {
    type: FETCHED_PROJECTS,
    projects
  }
}

export function requestProject(id) {
  return {
    type: REQUEST_PROJECT,
    id
  }
}

export function fetchedProject(project) {
  return {
    type: FETCHED_PROJECT,
    project
  }
}
