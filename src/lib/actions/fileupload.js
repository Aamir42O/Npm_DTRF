import {
    GET_FILES, CLEAR_DELETE_FILE, DELETE_FILE,
    GET_USG_FILE, GET_PATIENT_CONSENT_FILE, GET_OTHER_FILES, GET_DOCTOR_ATTESTATION, GET_PATIENT_DECLARATION_PNDT, GET_PATIENT_INFORMED_CONSENT, GET_CONSENT_INDEMNITY
    , GET_LIMITATION_OF_TEST, GET_PATIENT_PRIVACY, GET_PCPNDT_FILES, GET_REFERRAL_LETTER, GET_PNS_REPORT, GET_NTSCAN, GET_CBC, GET_CBC_DOC, GET_BTH, HES, HPS, HDS, GET_FILES_TO_UPLOAD, GET_FILES_REFERENCE, SENT_TO_BDM, IS_COMPLETE, SET_FILEUPLOAD, GET_MANDATORY_FILES, CLEAR_FILES
} from "./action";

export const getUsgFile = (file) => dispatch => {
    dispatch({
        type: GET_USG_FILE,
        payload: file
    })
}
export const getHESFile = (file) => dispatch => {
    dispatch({
        type: HES,
        payload: file
    })
}

export const getHPSFile = (file) => dispatch => {
    dispatch({
        type: HPS,
        payload: file
    })
}

export const getHDSFile = (file) => dispatch => {
    dispatch({
        type: HDS,
        payload: file
    })
}

export const getPatientConsentFile = (file) => dispatch => {
    dispatch({
        type: GET_PATIENT_CONSENT_FILE,
        payload: file
    })
}

export const getOtherFiles = (file) => dispatch => {
    dispatch({
        type: GET_OTHER_FILES,
        payload: file
    })
}

export const getDoctorAttestaion = (file) => dispatch => {
    dispatch({
        type: GET_DOCTOR_ATTESTATION,
        payload: file
    })
}

export const getPatientDeclarationPNDT = (file) => dispatch => {
    dispatch({
        type: GET_PATIENT_DECLARATION_PNDT,
        payload: file
    })
}

export const getPatientInformedConsent = (file) => dispatch => {
    dispatch({
        type: GET_PATIENT_INFORMED_CONSENT,
        payload: file
    })
}

export const getConsentAndIndemnity = (file) => dispatch => {
    dispatch({
        type: GET_CONSENT_INDEMNITY,
        payload: file
    })
}

export const getLimitationOfTest = (file) => dispatch => {
    dispatch({
        type: GET_LIMITATION_OF_TEST,
        payload: file
    })
}

export const getPatientPrivacy = (file) => dispatch => {
    dispatch({
        type: GET_PATIENT_PRIVACY,
        payload: file
    })
}

export const getPcpndtFiles = (file) => dispatch => {
    dispatch({
        type: GET_PCPNDT_FILES,
        payload: file
    })
}
export const getReferralLetter = (file) => dispatch => {
    dispatch({
        type: GET_REFERRAL_LETTER,
        payload: file
    })
}

export const getPnsReport = (file) => dispatch => {
    dispatch({
        type: GET_PNS_REPORT,
        payload: file
    })
}

export const getNtscan = (file) => dispatch => {
    dispatch({
        type: GET_NTSCAN,
        payload: file
    })
}

export const getCbcFile = file => dispatch => {
    dispatch({
        type: GET_CBC,
        payload: file
    })
}

export const getCbcDocFile = file => dispatch => {
    dispatch({
        type: GET_CBC_DOC,
        payload: file
    })
}


export const getBthFile = file => dispatch => {
    dispatch({
        type: GET_BTH,
        payload: file
    })
}

export const getFiles = file => dispatch => {
    dispatch({
        type: GET_FILES,
        payload: file
    })
}

export const getFilesToUpload = files => dispatch => {
    dispatch({
        type: GET_FILES_TO_UPLOAD,
        payload: files
    })
}

export const getFilesReference = ref => dispatch => {
    dispatch({
        type: GET_FILES_REFERENCE,
        payload: ref
    })
}

export const getDeletedFiles = (fileKey, file) => dispatch => {
    let payload = { [fileKey]: file }

    dispatch({
        type: DELETE_FILE,
        payload: file
    })
}

export const getClearDeleteFiles = () => dispatch => {
    dispatch({
        type: CLEAR_DELETE_FILE,
        payload: []
    })
}

export const getMandatoryFilesInRedux = payload => dispatch => {
    dispatch({
        type: GET_MANDATORY_FILES,
        payload
    })
}



export const setFileUpload = (payload) => dispatch => {
    dispatch({
        type: SET_FILEUPLOAD,
        payload
    })
}

export const clearFiles = () => dispatch => {
    dispatch({
        type: CLEAR_FILES,
        payload: {}
    })
}