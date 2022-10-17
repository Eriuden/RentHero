import axios from "axios";

export const GET_ALL_MISSIONS = "GET_ALL_MISSIONS"
export const GET_MISSION = "GET_MISSION"
export const GET_MISSION_ERRORS = "GET_MISSION_ERRORS"
export const UPDATE_MISSION = "UPDATE_MISSION"
export const DELETE_MISSION = "DELETE_MISSION"

export const ACCEPT_MISSION = "ACCEPT_MISSION"
export const ABANDON_MISSION = "ABANDON_MISSION"

export const getAllMissions = () => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/missions`)
            .then((res)=> {
                dispatch({ type: GET_ALL_MISSIONS, payload: res.data})
            })
            .catch((err) => console.log(err))
    }
}

export const getMission = () => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/missions/:id`)
            .then((res)=> {
                dispatch({ type: GET_MISSION, payload: res.data})
            })
            .catch((err) => console.log(err))
    }
}

export const addMission = (data) => {
    return (dispatch) => {
        return axios
            .post (`${process.env.REACT_APP_API_URL}/api/missions`, data)
            .then((res)=> {
                if (res.data.errors) {
                    dispatch({ type: GET_MISSION_ERRORS, payload: res.data.errors})
                } 
            })
    }
}

export const updateMission = (
    missionId,
    description,
    numberOfHero,
    wage,
    geolocalisation,
) => {
    return (dispatch) => {
        return axios({
            method:"put",
            url: `${process.env.REACT_APP_API_URL}/api/missions/${missionId}`,
            data: { description, numberOfHero, wage, geolocalisation}
        })
            .then((res) => {
                dispatch({
                    type: UPDATE_MISSION,
                    payload: { description, numberOfHero, wage, geolocalisation}
                })
            })
            .catch((err)=> console.log(err))
    }
}

export const deleteMission = (
    missionId,
    description,
    numberOfHero,
    wage,
    geolocalisation
) => {
    return (dispatch) => {
        return axios({
            method:"delete",
            url: `${process.env.REACT_APP_API_URL}/api/missions/${missionId}`,
            data: { description, numberOfHero, wage, geolocalisation}
        })
            .then((res) => {
                dispatch({ type: DELETE_MISSION, payload: { missionId }})
            })
            .catch((err) => console.log(err))
    }
}

export const acceptMission = (missionId, userId) => {
    return(dispatch) => {
        return axios({
            method:"patch",
            url:`${process.env.REACT_APP_API_URL}/api/missions/accept-mission`,
            data: { id: userId }
        })
            .then((res) => {
                dispatch({type: ACCEPT_MISSION, payload:{missionId, userId}})
            })
            .catch((err) => console.log(err))
    }
}

export const abandonMission = (missionId, userId) => {
    return(dispatch) => {
        return axios({
            method:"patch",
            url: `${process.env.REACT_APP_API_URL}/api/missions/abandon-mission`,
            data: {id: userId }
        })
            .then((res) => {
                dispatch({ type: ABANDON_MISSION, payload: {missionId, userId}})
            })
            .catch((err) => console.log(err))
    }
}