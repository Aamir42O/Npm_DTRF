import { SET_FORMDATA, REMOVE_FORMDATA, DYNAMIC_PATIENT_DETAILS } from "./action"


export const setFormData = (formData) => dispatch => {

    dispatch({
        type: SET_FORMDATA,
        payload: formData
    })
}

export const getPatient_details = (patient_detail) => dispatch => {

    dispatch({
        type: DYNAMIC_PATIENT_DETAILS,
        payload: patient_detail
    })
}