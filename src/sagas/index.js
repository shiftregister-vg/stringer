import { take, put, call, fork } from 'redux-saga/effects'
import moment from 'moment'
import electron from 'electron'
import * as actions from '../actions'

function fetchProject(id) {
  return {id}
}

export default function* root() {
  const { store } = yield take('APP_INIT');
  yield put(actions.requestProjects())
}
