"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _formik = require("formik");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NumberField = props => {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: props.className ? props.className : "col-md-6 col-12"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement("label", null, props.title, props.mandatory && /*#__PURE__*/_react.default.createElement("span", {
    className: "marked"
  }, "*")), /*#__PURE__*/_react.default.createElement(_formik.Field, {
    type: "number",
    name: props.name,
    onKeyDown: e => ["e", "`", "#", "E", "+", "-"].includes(e.key) && e.preventDefault(),
    placeholder: props.placeholder,
    className: "form-control",
    disabled: props.disabled,
    min: props.min,
    max: props.max,
    step: props.step
  }), /*#__PURE__*/_react.default.createElement(_formik.ErrorMessage, {
    name: props.name,
    component: "div",
    className: "formErr"
  })));
};

var _default = NumberField;
exports.default = _default;