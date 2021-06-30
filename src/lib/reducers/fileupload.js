import {
    DELETE_FILE, CLEAR_DELETE_FILE,
    GET_USG_FILE, GET_PATIENT_CONSENT_FILE, GET_OTHER_FILES, GET_DOCTOR_ATTESTATION, GET_PATIENT_DECLARATION_PNDT, GET_PATIENT_INFORMED_CONSENT, GET_CONSENT_INDEMNITY

    , GET_LIMITATION_OF_TEST, GET_PATIENT_PRIVACY, GET_PCPNDT_FILES, GET_REFERRAL_LETTER, GET_PNS_REPORT, GET_NTSCAN, GET_CBC, GET_BTH, GET_CBC_DOC, HES, HDS, HPS, GET_FILES, GET_FILES_TO_UPLOAD, GET_FILES_REFERENCE, SET_FILEUPLOAD, GET_MANDATORY_FILES, CLEAR_FILES
} from "../actions/action"

const initialState = {
    usgFile: [],
    patientConsentFile: [],
    otherFiles: [],
    doctorAttestation: [],
    patientDeclarationPNDT: [],
    patientInformedConsent: [],
    consentAndIndemnity: [],
    limitationOfTest: [],
    patientPrivacy: [],
    pcpndtFiles: [],
    referralLetter: [],
    pnsReport: [],
    ntScan: [],
    cbc: [],
    cbcDoc: [],
    bth: [],
    HES: [],
    HDS: [],
    HPS: [],
    files: {},
    filesToUpload: [],
    filesReference: [],
    deletedFiles: [],
    mandatoryFiles: []

}


export default function fileUpload(state = initialState, action) {

    const { type, payload } = action
    switch (type) {
        case CLEAR_FILES:
            return {
                ...state,
                files: {}
            }
        case GET_MANDATORY_FILES:
            return {
                ...state,
                mandatoryFiles: payload
            }
        case SET_FILEUPLOAD:
            return {
                ...payload
            }
        case DELETE_FILE:
            return {
                ...state,
                deletedFiles: [...state.deletedFiles, payload]
            }
        case CLEAR_DELETE_FILE:
            return {
                ...state,
                deletedFiles: []
            }
        case HES:
            return {
                ...state,
                HES: payload
            }
        case HPS:
            return {
                ...state,
                HPS: payload
            }
        case HDS:
            return {
                ...state,
                HDS: payload
            }
        case GET_USG_FILE:
            return {
                ...state,
                usgFile: payload
            }

        case GET_PATIENT_CONSENT_FILE:
            return {
                ...state,
                patientConsentFile: payload
            }
        case GET_OTHER_FILES:
            return {
                ...state,
                otherFiles: payload
            }
        case GET_DOCTOR_ATTESTATION:
            return {
                ...state,
                doctorAttestation: payload
            }
        case GET_PATIENT_DECLARATION_PNDT:
            return {
                ...state,
                patientDeclarationPNDT: payload
            }
        case GET_PATIENT_INFORMED_CONSENT:
            return {
                ...state,
                patientInformedConsent: payload
            }
        case GET_CONSENT_INDEMNITY:
            return {
                ...state,
                consentAndIndemnity: payload
            }
        case GET_LIMITATION_OF_TEST:
            return {
                ...state,
                limitationOfTest: payload
            }
        case GET_PATIENT_PRIVACY:
            return {
                ...state,
                patientPrivacy: payload
            }
        case GET_PCPNDT_FILES:
            return {
                ...state,
                pcpndtFiles: payload
            }
        case GET_REFERRAL_LETTER:
            return {
                ...state,
                referralLetter: payload
            }
        case GET_PNS_REPORT:
            return {
                ...state,
                pnsReport: payload
            }
        case GET_NTSCAN:
            return {
                ...state,
                ntScan: payload
            }
        case GET_CBC:
            return {
                ...state,
                cbc: payload
            }
        case GET_CBC_DOC:
            return {
                ...state,
                cbcDoc: payload
            }
        case GET_BTH: {
            return {
                ...state,
                bth: payload
            }
        }
        case GET_FILES: {
            return {
                ...state,
                files: { ...state.files, ...payload }
            }
        }
        case GET_FILES_TO_UPLOAD: {
            return {
                ...state,
                filesToUpload: payload
            }
        }
        case GET_FILES_REFERENCE: {
            return {
                ...state,
                filesReference: payload
            }
        }
        default:
            return {
                ...state,
            }
    }
}