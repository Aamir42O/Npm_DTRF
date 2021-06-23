"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _formik = require("formik");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RadioField = props => {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-6 col-12"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "mb-3"
  }, props.title, props.mandatory && /*#__PURE__*/_react.default.createElement("span", {
    className: "marked"
  }, "*")), /*#__PURE__*/_react.default.createElement("br", null), props.options.map((option, index) => {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "pretty p-default p-round"
    }, /*#__PURE__*/_react.default.createElement(_formik.Field, {
      type: "radio",
      name: props.name,
      value: option.value,
      disabled: props.disabled
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "state"
    }, /*#__PURE__*/_react.default.createElement("label", null, option.label)));
  }), /*#__PURE__*/_react.default.createElement(_formik.ErrorMessage, {
    name: props.name,
    component: "div",
    className: "formErr"
  })));
};

var _default = RadioField;
exports.default = _default;