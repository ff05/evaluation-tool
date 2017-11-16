import { FETCHED_GROUPS } from '../actions/groups/fetch'
import { ADD_GROUP } from '../actions/groups/add'

export default function(state = [], { type, payload } = {}) {
  switch(type) {
    case FETCHED_GROUPS :
      return [...payload]

    case ADD_GROUP :
      return [payload, ...state] 

    default :
      return state
  }
}
