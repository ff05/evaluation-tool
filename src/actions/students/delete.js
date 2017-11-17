import ApiClient from '../../api/client'
import { APP_LOADING, APP_DONE_LOADING, LOAD_ERROR, LOAD_SUCCESS } from '../loading'
export const STUDENT_REMOVED = 'STUDENT_REMOVED'

const api = new ApiClient()

export default (student) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.delete(`/groups/${student.group}/students/${student._id}`, {...student})
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: STUDENT_REMOVED,
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
