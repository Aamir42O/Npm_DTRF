"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DisplayFields = props => {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, (props.data || props.data === 0) && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: props.className ? props.className : "col-12 col-md-6"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "col-form-label col-sm-6 text-sm-right"
  }, /*#__PURE__*/_react.default.createElement("b", null, props.title), " "), /*#__PURE__*/_react.default.createElement("label", {
    className: "col-form-label col-sm-6"
  }, props.data)))));
};

var _default = DisplayFields;
exports.default = _default;