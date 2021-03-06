import { FETCHED_STUDENTS, FETCHED_ONE_STUDENT } from '../actions/students/fetch'
import { ADD_STUDENT } from '../actions/students/add'
import { UPDATED_STUDENT } from '../actions/students/update'
import { STUDENT_REMOVED } from '../actions/students/delete'

export default function(state = [], { type, payload } = {}) {
  switch(type) {
    case FETCHED_STUDENTS :
      return [...payload]

    case ADD_STUDENT :
      return [payload, ...state]

    case UPDATED_STUDENT :
    return state.map((student) => {
      if (student._id === payload._id) {
        return {
          ...student,
          days: [...student.days, payload.days[0]]
        }
      }
      return student
    })

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

    case STUDENT_REMOVED :
        return state.filter((game) => (game._id !== payload._id))

    default :
      return state
  }
}
