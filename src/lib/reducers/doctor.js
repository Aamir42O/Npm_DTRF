
import React from "react"
import { GET_DOCTOR_LIST, GET_REFERRAL_DOCTORS } from "../actions/action"

const initialState = {

    doctorList: [],
    referralDoctors: []

}

export default function Doctors(state = initialState, action) {
    const { type, payload } = action

    switch (type) {

        case GET_DOCTOR_LIST:
            return {
                ...state,
                doctorList: payload
            }
        case GET_REFERRAL_DOCTORS:
            return {
                ...state,
                referralDoctors: payload
            }
        default:
            return {
                ...state
            }

    }
}