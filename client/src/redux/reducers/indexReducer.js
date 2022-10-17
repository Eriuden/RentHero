import { combineReducers } from "redux"
import userReducer from "./user.reducer"
import allUsersReducer from "./allUsersReducer"
import missionReducer from "./mission.reducer"
import allMissionsReducer from "./allMissionsReducer"
import errorReducer from "./error.reducer"

const reducers = combineReducers({
    userReducer,
    allUsersReducer,
    missionReducer,
    allMissionsReducer,
    errorReducer,
})

export default reducers