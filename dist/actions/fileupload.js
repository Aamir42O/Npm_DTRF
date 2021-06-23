"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setFileUpload = exports.getMandatoryFilesInRedux = exports.getClearDeleteFiles = exports.getDeletedFiles = exports.getFilesReference = exports.getFilesToUpload = exports.getFiles = exports.getBthFile = exports.getCbcDocFile = exports.getCbcFile = exports.getNtscan = exports.getPnsReport = exports.getReferralLetter = exports.getPcpndtFiles = exports.getPatientPrivacy = exports.getLimitationOfTest = exports.getConsentAndIndemnity = exports.getPatientInformedConsent = exports.getPatientDeclarationPNDT = exports.getDoctorAttestaion = exports.getOtherFiles = exports.getPatientConsentFile = exports.getHDSFile = exports.getHPSFile = exports.getHESFile = exports.getUsgFile = void 0;

var _action = require("./action");

const getUsgFile = file => dispatch => {
  dispatch({
    type: _action.GET_USG_FILE,
    payload: file
  });
};

exports.getUsgFile = getUsgFile;

const getHESFile = file => dispatch => {
  dispatch({
    type: _action.HES,
    payload: file
  });
};

exports.getHESFile = getHESFile;

const getHPSFile = file => dispatch => {
  dispatch({
    type: _action.HPS,
    payload: file
  });
};

exports.getHPSFile = getHPSFile;

const getHDSFile = file => dispatch => {
  dispatch({
    type: _action.HDS,
    payload: file
  });
};

exports.getHDSFile = getHDSFile;

const getPatientConsentFile = file => dispatch => {
  dispatch({
    type: _action.GET_PATIENT_CONSENT_FILE,
    payload: file
  });
};

exports.getPatientConsentFile = getPatientConsentFile;

const getOtherFiles = file => dispatch => {
  dispatch({
    type: _action.GET_OTHER_FILES,
    payload: file
  });
};

exports.getOtherFiles = getOtherFiles;

const getDoctorAttestaion = file => dispatch => {
  dispatch({
    type: _action.GET_DOCTOR_ATTESTATION,
    payload: file
  });
};

exports.getDoctorAttestaion = getDoctorAttestaion;

const getPatientDeclarationPNDT = file => dispatch => {
  dispatch({
    type: _action.GET_PATIENT_DECLARATION_PNDT,
    payload: file
  });
};

exports.getPatientDeclarationPNDT = getPatientDeclarationPNDT;

const getPatientInformedConsent = file => dispatch => {
  dispatch({
    type: _action.GET_PATIENT_INFORMED_CONSENT,
    payload: file
  });
};

exports.getPatientInformedConsent = getPatientInformedConsent;

const getConsentAndIndemnity = file => dispatch => {
  dispatch({
    type: _action.GET_CONSENT_INDEMNITY,
    payload: file
  });
};

exports.getConsentAndIndemnity = getConsentAndIndemnity;

const getLimitationOfTest = file => dispatch => {
  dispatch({
    type: _action.GET_LIMITATION_OF_TEST,
    payload: file
  });
};

exports.getLimitationOfTest = getLimitationOfTest;

const getPatientPrivacy = file => dispatch => {
  dispatch({
    type: _action.GET_PATIENT_PRIVACY,
    payload: file
  });
};

exports.getPatientPrivacy = getPatientPrivacy;

const getPcpndtFiles = file => dispatch => {
  dispatch({
    type: _action.GET_PCPNDT_FILES,
    payload: file
  });
};

exports.getPcpndtFiles = getPcpndtFiles;

const getReferralLetter = file => dispatch => {
  dispatch({
    type: _action.GET_REFERRAL_LETTER,
    payload: file
  });
};

exports.getReferralLetter = getReferralLetter;

const getPnsReport = file => dispatch => {
  dispatch({
    type: _action.GET_PNS_REPORT,
    payload: file
  });
};

exports.getPnsReport = getPnsReport;

const getNtscan = file => dispatch => {
  dispatch({
    type: _action.GET_NTSCAN,
    payload: file
  });
};

exports.getNtscan = getNtscan;

const getCbcFile = file => dispatch => {
  dispatch({
    type: _action.GET_CBC,
    payload: file
  });
};

exports.getCbcFile = getCbcFile;

const getCbcDocFile = file => dispatch => {
  dispatch({
    type: _action.GET_CBC_DOC,
    payload: file
  });
};

exports.getCbcDocFile = getCbcDocFile;

const getBthFile = file => dispatch => {
  dispatch({
    type: _action.GET_BTH,
    payload: file
  });
};

exports.getBthFile = getBthFile;

const getFiles = file => dispatch => {
  dispatch({
    type: _action.GET_FILES,
    payload: file
  });
};

exports.getFiles = getFiles;

const getFilesToUpload = files => dispatch => {
  dispatch({
    type: _action.GET_FILES_TO_UPLOAD,
    payload: files
  });
};

exports.getFilesToUpload = getFilesToUpload;

const getFilesReference = ref => dispatch => {
  dispatch({
    type: _action.GET_FILES_REFERENCE,
    payload: ref
  });
};

exports.getFilesReference = getFilesReference;

const getDeletedFiles = (fileKey, file) => dispatch => {
  let payload = {
    [fileKey]: file
  };
  dispatch({
    type: _action.DELETE_FILE,
    payload: file
  });
};

exports.getDeletedFiles = getDeletedFiles;

const getClearDeleteFiles = () => dispatch => {
  dispatch({
    type: _action.CLEAR_DELETE_FILE,
    payload: []
  });
};

exports.getClearDeleteFiles = getClearDeleteFiles;

const getMandatoryFilesInRedux = payload => dispatch => {
  dispatch({
    type: _action.GET_MANDATORY_FILES,
    payload
  });
};

exports.getMandatoryFilesInRedux = getMandatoryFilesInRedux;

const setFileUpload = payload => dispatch => {
  dispatch({
    type: _action.SET_FILEUPLOAD,
    payload
  });
};

exports.setFileUpload = setFileUpload;