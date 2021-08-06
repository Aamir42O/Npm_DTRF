"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _formik = require("formik");

var _TextField = _interopRequireDefault(require("./TextField"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CheckBox = props => {
  console.log(props.values.referralReason);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "checkbox-group"
  }, props.title)), /*#__PURE__*/_react.default.createElement("div", {
    role: "group",
    "aria-labelledby": "checkbox-group"
  }, props.options.map(option => /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-sm"
  }, /*#__PURE__*/_react.default.createElement("label", {
    style: {
      paddingTop: "30px"
    }
  }, /*#__PURE__*/_react.default.createElement(_formik.Field, {
    type: "checkbox",
    name: props.name,
    value: option.value
  }), option.label)), console.log(props.values[props.name].includes(option.value)), props.values[props.name].includes(option.value) && /*#__PURE__*/_react.default.createElement(_TextField.default, {
    title: "",
    name: option.value,
    placeHolder: "Enter " + option.label
  }))), /*#__PURE__*/_react.default.createElement(_formik.ErrorMessage, {
    name: props.name,
    component: "div",
    className: "formErr"
  }))));
};

var _default = CheckBox;
exports.default = _default;