import ApiClient from '../../api/client'
import { APP_LOADING, APP_DONE_LOADING, LOAD_ERROR, LOAD_SUCCESS } from '../loading'
export const ADD_GROUP = 'ADD_GROUP'

const api = new ApiClient()

export default (group) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.post('/groups', {...group})
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: ADD_GROUP,
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
