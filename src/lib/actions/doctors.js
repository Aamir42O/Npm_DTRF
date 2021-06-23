import React from 'react'
import { GET_DOCTOR_LIST, GET_REFERRAL_DOCTORS } from "./action"

export const getDoctors = (doctorList) => dispatch => {
    dispatch({
        type: GET_DOCTOR_LIST,
        payload: doctorList
    })

}

export const getReferralDoctors = (referralDoctorsList) => dispatch => {
    dispatch({
        type: GET_REFERRAL_DOCTORS,
        payload: referralDoctorsList
    })
}