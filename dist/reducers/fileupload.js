"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fileUpload;

var _action = require("../actions/action");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
};

function fileUpload() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  const {
    type,
    payload
  } = action;

  switch (type) {
    case _action.CLEAR_FILES:
      return _objectSpread(_objectSpread({}, state), {}, {
        files: {}
      });

    case _action.GET_MANDATORY_FILES:
      return _objectSpread(_objectSpread({}, state), {}, {
        mandatoryFiles: payload
      });

    case _action.SET_FILEUPLOAD:
      return _objectSpread({}, payload);

    case _action.DELETE_FILE:
      return _objectSpread(_objectSpread({}, state), {}, {
        deletedFiles: [...state.deletedFiles, payload]
      });

    case _action.CLEAR_DELETE_FILE:
      return _objectSpread(_objectSpread({}, state), {}, {
        deletedFiles: []
      });

    case _action.HES:
      return _objectSpread(_objectSpread({}, state), {}, {
        HES: payload
      });

    case _action.HPS:
      return _objectSpread(_objectSpread({}, state), {}, {
        HPS: payload
      });

    case _action.HDS:
      return _objectSpread(_objectSpread({}, state), {}, {
        HDS: payload
      });

    case _action.GET_USG_FILE:
      return _objectSpread(_objectSpread({}, state), {}, {
        usgFile: payload
      });

    case _action.GET_PATIENT_CONSENT_FILE:
      return _objectSpread(_objectSpread({}, state), {}, {
        patientConsentFile: payload
      });

    case _action.GET_OTHER_FILES:
      return _objectSpread(_objectSpread({}, state), {}, {
        otherFiles: payload
      });

    case _action.GET_DOCTOR_ATTESTATION:
      return _objectSpread(_objectSpread({}, state), {}, {
        doctorAttestation: payload
      });

    case _action.GET_PATIENT_DECLARATION_PNDT:
      return _objectSpread(_objectSpread({}, state), {}, {
        patientDeclarationPNDT: payload
      });

    case _action.GET_PATIENT_INFORMED_CONSENT:
      return _objectSpread(_objectSpread({}, state), {}, {
        patientInformedConsent: payload
      });

    case _action.GET_CONSENT_INDEMNITY:
      return _objectSpread(_objectSpread({}, state), {}, {
        consentAndIndemnity: payload
      });

    case _action.GET_LIMITATION_OF_TEST:
      return _objectSpread(_objectSpread({}, state), {}, {
        limitationOfTest: payload
      });

    case _action.GET_PATIENT_PRIVACY:
      return _objectSpread(_objectSpread({}, state), {}, {
        patientPrivacy: payload
      });

    case _action.GET_PCPNDT_FILES:
      return _objectSpread(_objectSpread({}, state), {}, {
        pcpndtFiles: payload
      });

    case _action.GET_REFERRAL_LETTER:
      return _objectSpread(_objectSpread({}, state), {}, {
        referralLetter: payload
      });

    case _action.GET_PNS_REPORT:
      return _objectSpread(_objectSpread({}, state), {}, {
        pnsReport: payload
      });

    case _action.GET_NTSCAN:
      return _objectSpread(_objectSpread({}, state), {}, {
        ntScan: payload
      });

    case _action.GET_CBC:
      return _objectSpread(_objectSpread({}, state), {}, {
        cbc: payload
      });

    case _action.GET_CBC_DOC:
      return _objectSpread(_objectSpread({}, state), {}, {
        cbcDoc: payload
      });

    case _action.GET_BTH:
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          bth: payload
        });
      }

    case _action.GET_FILES:
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          files: _objectSpread(_objectSpread({}, state.files), payload)
        });
      }

    case _action.GET_FILES_TO_UPLOAD:
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          filesToUpload: payload
        });
      }

    case _action.GET_FILES_REFERENCE:
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          filesReference: payload
        });
      }

    default:
      return _objectSpread({}, state);
  }
}