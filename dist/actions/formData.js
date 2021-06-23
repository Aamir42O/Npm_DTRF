"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPatient_details = exports.setFormData = void 0;

var _action = require("./action");

const setFormData = formData => dispatch => {
  dispatch({
    type: _action.SET_FORMDATA,
    payload: formData
  });
};

exports.setFormData = setFormData;

const getPatient_details = patient_detail => dispatch => {
  dispatch({
    type: _action.DYNAMIC_PATIENT_DETAILS,
    payload: patient_detail
  });
};

exports.getPatient_details = getPatient_details;