import { GET_MISSION_ERRORS } from "../actions/missions.actions";
import { GET_USER_ERRORS } from "../actions/users.actions";


const initialstate = {}

export default function errorReducer(state = initialstate, action)
    switch(action.type){
        case GET_MISSION_ERRORS:
            return {
                missionErrors: action.payload,
                userErrors: []
            }
        case GET_USER_ERRORS:
            return{
                userErrors: action.payload,
                missionErrors: []
            }
            default:
                return state
    }