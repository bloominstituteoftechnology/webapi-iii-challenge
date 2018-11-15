import * as aliasName from '../actions'
const initialState = {
  activeUser: [],
}

export const userReducer = (state = initialState, action) => {
  switch (action.type){
    case aliasName.FETCH_USER_SUCCESS:
      return {
        ...state,
        activeUser: action.payload
      }
    case aliasName.FETCH_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
  
}
