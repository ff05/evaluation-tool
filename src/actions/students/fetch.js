import ApiClient from '../../api/client'
import { APP_LOADING, APP_DONE_LOADING, LOAD_ERROR, LOAD_SUCCESS } from '../loading'
export const FETCHED_STUDENTS = 'FETCHED_STUDENTS'
export const FETCHED_ONE_STUDENT = 'FETCHED_ONE_STUDENT'

const api = new ApiClient()

export default (group) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.get(`/groups/${group}/students`)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCHED_STUDENTS,
          payload: result.body
        })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}

export const fetchOneStudent = (studentId) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

    api.get(`/students/${studentId}`)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCHED_ONE_STUDENT,
          payload: result.body
        })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
