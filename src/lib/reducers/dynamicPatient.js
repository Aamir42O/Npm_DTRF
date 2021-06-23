

import React from "react"
import { DYNAMIC_PATIENT_DETAILS } from "../actions/action"
const initialState = {
    dynamicPatient_details: {}
}

export default function formData(state = initialState, action) {
    const { type, payload } = action

    switch (type) {

        case DYNAMIC_PATIENT_DETAILS:
            return {
                ...state,
                dynamicPatient_details: payload
            }

        default:
            return {
                ...state
            }

    }
}