import { GET_USERS } from "../actions/users.actions"

const initialstate = {}

export default function allUsersReducer(state = initialstate, action){
    switch(action.type) {
        case GET_USERS:
            return action.payload 
        default:
            return state
    }
}