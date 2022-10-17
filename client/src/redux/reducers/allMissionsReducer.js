import { GET_ALL_MISSIONS} from "../actions/missions.actions"

const initialstate = {}

export default function allMissionsReducer(state = initialstate, action){
    switch (action.type) {
        case GET_ALL_MISSIONS:
            return action.payload 
        default:
            return state 
    }
}