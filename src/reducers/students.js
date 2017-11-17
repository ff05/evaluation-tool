import { FETCHED_STUDENTS, FETCHED_ONE_STUDENT } from '../actions/students/fetch'
import { ADD_STUDENT } from '../actions/students/add'
import { UPDATED_STUDENT } from '../actions/students/update'

export default function(state = [], { type, payload } = {}) {
  switch(type) {
    case FETCHED_STUDENTS :
      return [...payload]

    case ADD_STUDENT :
      return [payload, ...state]

    case UPDATED_STUDENT :
      return [payload, ...state]

    case FETCHED_ONE_STUDENT :
      const studentIds = state.map(s => s._id)
      if (studentIds.indexOf(payload._id) < 0) {
        return [{ ...payload }].concat(state)
      }
      return state.map((student) => {
        if (student._id === payload._id) {
          return { ...payload }
        }
        return student
    })

    default :
      return state
  }
}
