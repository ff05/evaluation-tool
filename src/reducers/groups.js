// The default export for a reducer is the reducer function, that takes 2
// arguments:
//
//   - the (current) state, should default to the initial state
//   - an action Object:
//     - type : the action type
//     - payload : [optional] payload
//
// export default function(state = [], action = {}) {
//   // based on the action type we will return a new state
//   switch(action.type) {
//     // some actions include a payload that we can use to update the state
//     // in this case the payload will contain a new recipe
//     case 'ADD_RECIPE' :
//       return state.concat([ action.payload ])
//
//     // optionally some other cases
//     // ...
//
//     // by default we return the existing state
//     default :
//       return state
//   }
// }
