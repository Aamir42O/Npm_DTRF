"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DtrfForm = DtrfForm;

var _dtrf_form = _interopRequireDefault(require("./dtrf_form"));

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _store = _interopRequireDefault(require("./store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DtrfForm(props) {
  console.log("PROPS FORM Dtrf_form", props);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "App"
  }, /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
    store: _store.default
  }, /*#__PURE__*/_react.default.createElement(_dtrf_form.default, props)));
}