import { FETCHED_GROUPS } from '../actions/groups/fetch'

export default function(state = [], { type, payload } = {}) {
  switch(type) {
    case FETCHED_GROUPS :
      return [ ...payload ]
      
    default :
      return state
  }
}
