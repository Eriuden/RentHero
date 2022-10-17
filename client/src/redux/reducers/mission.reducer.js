import { GET_MISSION, ACCEPT_MISSION, ABANDON_MISSION, UPDATE_MISSION, DELETE_MISSION } from "../actions/missions.actions";

const initialstate = {}

export default function missionReducer(state = initialstate, action) {
    switch(action.type) {
        case GET_MISSION:
            return action.payload 
            case ACCEPT_MISSION:
                return state.map((mission, userId)=> {
                    if (mission._id === action.payload.missionId)
                        return {
                            ...mission,
                            heroes: [action.payload,userId, ... mission.heroes]
                        }
                })
            case ABANDON_MISSION:
                return state.map((mission, userId)=> {
                    if (mission._id === action.payload.missionId)
                        return {
                            ...mission,
                            heroes: mission.heroes.filter((id) => id != action.payload.userId)
                        }
                    return mission
                })
            case UPDATE_MISSION:
                return state.map((mission) => {
                    if (mission.id === action.payload.missionId) {
                        return {
                            ...mission,
                            description: action.payload.description,
                            numberOfHero: action.payload.numberOfHero,
                            wage: action.payload.wage,
                            geolocalisation: action.payload.geolocalisation,
                        }
                    } else return mission
                })
            case DELETE_MISSION:
                return state.filter((mission) => mission._id !== action.payload.missionId)
            
            default:
                return state
    }
}