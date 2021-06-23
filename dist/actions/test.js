"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSelectedTestsAction = void 0;

var _react = _interopRequireDefault(require("react"));

var _action = require("./action");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getSelectedTestsAction = selectedTests => dispatch => {
  dispatch({
    type: _action.GET_SELECTED_TESTS,
    payload: selectedTests
  });
};

exports.getSelectedTestsAction = getSelectedTestsAction;