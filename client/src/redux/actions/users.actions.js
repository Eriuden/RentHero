import axios from "axios"

export const GET_USER = "GET_USER"
export const GET_USERS = "GET_USERS"
export const UPLOAD_PICTURE = "UPLOAD_PICTURE"
export const UPDATE_USER = "UPDATE_USER"
export const DELETE_USER = "DELETE_USER"

export const GET_USER_ERRORS = "GET_USER_ERRORS"

export const getUsers = () => {
    return(dispatch) => {
        return axios
        .get(`${process.env.REACT_APP_API_URL}api/user`)
        .then((res) =>{
            dispatch({ type: GET_USERS, payload: res.data})
        })
        .catch((err) => console.log(err))
    }
}

export const getUser = (uid) => {
    return (dispatch) => {
        return axios

            .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
            .then((res)=> {
                dispatch({type:GET_USER, payload: res.data})
            })
            .catch((err) => console.log(err))
    }
}

export const uploadPicture = (data, id) => {
    return(dispatch) => {
        return axios
            .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data )
            .then((res) => {
                if (res.data.errors) {
                    dispatch({ type: GET_USER_ERRORS, payload: res.data.errors})
                } else {
                    dispatch ({ type:GET_USER_ERRORS, payload: ""})
                    return axios
                        .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
                        .then((res) => {
                            dispatch({ type: UPLOAD_PICTURE, payload: res.data.pictures})
                        })
                }
            })
            .catch((err) => console.log(err))
        }
}

export const updateUser = (userId, name, bio, abilities) => {
    return (dispatch) => {
        return axios({
            method:"put",
            url:`${process.env.REACT_APP_API_URL}api/user` + userId,
            data: { name, bio, abilities}
        })
            .then((res) => {
                dispatch({type: UPDATE_USER, payload: name, bio, abilities})
            })
            .catch((err) => console.log(err))
    }
}

export const deleteUser = (userId, name, email, password) => {
    return (dispatch) => {
        return axios({
            method:"delete",
            url: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
            data: {name,email,password},
        })
        .then((res)=> {
            dispatch({ type: DELETE_USER, payload: { userId }})
        })
        .catch((err) => console.log(err))
    }
}
