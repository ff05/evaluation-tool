import ApiClient from '../../api/client'
import { APP_LOADING, APP_DONE_LOADING, LOAD_ERROR, LOAD_SUCCESS } from '../loading'
export const ADD_STUDENT = 'ADD_STUDENT'

const api = new ApiClient()

export default (groupId, student) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.post(`/groups/${groupId}/students`, {...student})
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: ADD_STUDENT,
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
