import { push } from 'react-router-redux'
import API from '../api/client'
import { AUTH_ERROR } from './loading'

const api = new API()

export const authenticate = () => {
  return dispatch => {
    if (!api.isAuthenticated()) {
      dispatch({ type: AUTH_ERROR })
      dispatch(push('/sign-in'))
      return
    }
  }
}

export default {
  authenticate
}
