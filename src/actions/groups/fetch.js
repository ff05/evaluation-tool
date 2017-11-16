import ApiClient from '../../api/client'
import { APP_LOADING, APP_DONE_LOADING, LOAD_ERROR, LOAD_SUCCESS } from '../loading'
export const FETCHED_GROUPS = 'FETCHED_GROUPS'
export const FETCHED_ONE_GROUP = 'FETCHED_ONE_GROUP'

const api = new ApiClient()

export default () => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.get('/groups')
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCHED_GROUPS,
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

export const fetchOneGroup = (groupId) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

    api.get(`/groups/${groupId}`)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCHED_ONE_GROUP,
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
