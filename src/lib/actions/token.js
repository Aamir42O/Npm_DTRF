import { DTRF_TOKEN, REF_TOKEN, SEND_BY, AUTHENTICATE, ROLES, IS_COMPLETE, SENT_TO_BDM, SET_ACCESS_TOKEN, PATIENT_FOUND } from "./action"


export const setRefToken = (refToken) => dispatch => {

    dispatch({
        type: REF_TOKEN,
        payload: refToken
    })
}

export const setDtrfToken = (dtrfToken) => dispatch => {
    dispatch({
        type: DTRF_TOKEN,
        payload: dtrfToken
    })
}


export const setSendBy = (sendBy) => dispatch => {
    dispatch({
        type: SEND_BY,
        payload: sendBy
    })
}


export const setAuthenticated = (isAuthenticated) => dispatch => {
    dispatch({
        type: AUTHENTICATE,
        payload: isAuthenticated
    })
}

export const setRole = (role) => dispatch => {
    dispatch({
        type: ROLES,
        payload: role
    })
}

export const setSentToBdm = (boolean) => dispatch => {
    dispatch({
        type: SENT_TO_BDM,
        payload: boolean
    })
}

export const setIsComplete = (boolean) => dispatch => {
    dispatch({
        type: IS_COMPLETE,
        payload: boolean
    })
}

export const setAccessToken = (token) => dispatch => {
    dispatch({
        type: SET_ACCESS_TOKEN,
        payload: token
    })
}

export const setPatientFoundFlag = (payload) => dispatch => {
    dispatch({
        type: PATIENT_FOUND,
        payload
    })
}