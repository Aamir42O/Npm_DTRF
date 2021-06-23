import React from "react"
import { GET_SELECTED_TESTS } from "./action"

export const getSelectedTestsAction = (selectedTests) => dispatch => {

    dispatch({
        type: GET_SELECTED_TESTS,
        payload: selectedTests
    })
}