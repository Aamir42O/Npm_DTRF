"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPatientFoundFlag = exports.setAccessToken = exports.setIsComplete = exports.setSentToBdm = exports.setRole = exports.setAuthenticated = exports.setSendBy = exports.setDtrfToken = exports.setRefToken = void 0;

var _action = require("./action");

const setRefToken = refToken => dispatch => {
  dispatch({
    type: _action.REF_TOKEN,
    payload: refToken
  });
};

exports.setRefToken = setRefToken;

const setDtrfToken = dtrfToken => dispatch => {
  dispatch({
    type: _action.DTRF_TOKEN,
    payload: dtrfToken
  });
};

exports.setDtrfToken = setDtrfToken;

const setSendBy = sendBy => dispatch => {
  dispatch({
    type: _action.SEND_BY,
    payload: sendBy
  });
};

exports.setSendBy = setSendBy;

const setAuthenticated = isAuthenticated => dispatch => {
  dispatch({
    type: _action.AUTHENTICATE,
    payload: isAuthenticated
  });
};

exports.setAuthenticated = setAuthenticated;

const setRole = role => dispatch => {
  dispatch({
    type: _action.ROLES,
    payload: role
  });
};

exports.setRole = setRole;

const setSentToBdm = boolean => dispatch => {
  dispatch({
    type: _action.SENT_TO_BDM,
    payload: boolean
  });
};

exports.setSentToBdm = setSentToBdm;

const setIsComplete = boolean => dispatch => {
  dispatch({
    type: _action.IS_COMPLETE,
    payload: boolean
  });
};

exports.setIsComplete = setIsComplete;

const setAccessToken = token => dispatch => {
  dispatch({
    type: _action.SET_ACCESS_TOKEN,
    payload: token
  });
};

exports.setAccessToken = setAccessToken;

const setPatientFoundFlag = payload => dispatch => {
  dispatch({
    type: _action.PATIENT_FOUND,
    payload
  });
};

exports.setPatientFoundFlag = setPatientFoundFlag;