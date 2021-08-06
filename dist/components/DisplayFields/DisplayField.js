"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DisplayFields = props => {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, (props.data || props.data === 0) && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, props.clinical_info ? /*#__PURE__*/_react.default.createElement("div", {
    className: props.className ? props.className : "col-12 col-md-6"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, /*#__PURE__*/_react.default.createElement("label", {
    style: {
      letterSpacing: "0.3px"
    },
    className: "col-form-label col-sm-12"
  }, /*#__PURE__*/_react.default.createElement("b", null, props.title), " "), /*#__PURE__*/_react.default.createElement("label", {
    className: "col-form-label col-sm-12"
  }, props.isDate ? (0, _moment.default)(props.data).format("DD-MM-YYYY") : props.data))) : /*#__PURE__*/_react.default.createElement("div", {
    className: props.className ? props.className : "col-12 col-md-6"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "col-form-label col-sm-6 text-sm-right"
  }, /*#__PURE__*/_react.default.createElement("b", null, props.title), " "), /*#__PURE__*/_react.default.createElement("label", {
    className: "col-form-label col-sm-6"
  }, props.isDate ? (0, _moment.default)(props.data).format("DD-MM-YYYY") : props.data)))));
};

var _default = DisplayFields;
exports.default = _default;