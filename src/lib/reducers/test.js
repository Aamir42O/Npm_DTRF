import React from "react"
import { GET_SELECTED_TESTS } from "../actions/action"

const initialState = {
    selectedTest: []
}


export default function Tests(state = initialState, action) {


    const { type, payload } = action
    switch (type) {
        case GET_SELECTED_TESTS:
            return {
                ...state,
                selectedTest: payload
            }

        default:
            return {
                ...state
            }
    }
}