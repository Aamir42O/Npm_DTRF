

import React from "react"
import { SET_FORMDATA } from "../actions/action"
const initialState = {
    formData: {}
}

export default function formData(state = initialState, action) {
    const { type, payload } = action

    switch (type) {

        case SET_FORMDATA:
            return {
                ...state,
                formData: payload
            }

        default:
            return {
                ...state
            }

    }
}