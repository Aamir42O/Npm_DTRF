import React from "react"
import { REF_TOKEN, DTRF_TOKEN, SEND_BY, AUTHENTICATE, ROLES, SENT_TO_BDM, IS_COMPLETE } from "../actions/action"

const initialState = {

    refToken: "",
    dtrfToken: "",
    sendBy: "",
    isAuthenticated: false,
    ROLES: [],
    sentToBdm: false,
    isComplete: false

}



export default function Token(state = initialState, action) {


    const { type, payload } = action
    switch (type) {
        case IS_COMPLETE:
            return {
                ...state,
                isComplete: payload
            }
        case SENT_TO_BDM:
            return {
                ...state,
                sentToBdm: payload
            }
        case REF_TOKEN:
            return {
                ...state,
                refToken: payload
            }
        case DTRF_TOKEN:
            return {
                ...state,
                dtrfToken: payload
            }
        case SEND_BY:
            return {
                ...state,

            }
        case AUTHENTICATE:
            return {
                ...state,
                isAuthenticated: payload

            }
        case ROLES:
            return {
                ...state,
                ROLES: payload
            }
        default:
            return {
                ...state,
                sendBy: payload
            }
    }
}

