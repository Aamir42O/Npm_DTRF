"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReferralDoctors = exports.getDoctors = void 0;

var _react = _interopRequireDefault(require("react"));

var _action = require("./action");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getDoctors = doctorList => dispatch => {
  dispatch({
    type: _action.GET_DOCTOR_LIST,
    payload: doctorList
  });
};

exports.getDoctors = getDoctors;

const getReferralDoctors = referralDoctorsList => dispatch => {
  dispatch({
    type: _action.GET_REFERRAL_DOCTORS,
    payload: referralDoctorsList
  });
};

exports.getReferralDoctors = getReferralDoctors;