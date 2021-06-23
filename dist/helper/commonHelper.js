"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MousePopover = exports.warningMessage = exports.infoMessage = exports.successMessage = exports.errorMessage = void 0;

var _antd = require("antd");

var _react = _interopRequireDefault(require("react"));

var _HelpOutline = _interopRequireDefault(require("@material-ui/icons/HelpOutline"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const errorMessage = msg => {
  _antd.message.error(msg);
};

exports.errorMessage = errorMessage;

const successMessage = msg => {
  _antd.message.success(msg);
};

exports.successMessage = successMessage;

const infoMessage = msg => {
  _antd.message.info(msg);
};

exports.infoMessage = infoMessage;

const warningMessage = msg => {
  _antd.message.warning(msg);
};

exports.warningMessage = warningMessage;

const MousePopover = props => {
  return /*#__PURE__*/_react.default.createElement(_antd.Popover, {
    content: props.content,
    trigger: "hover"
  }, /*#__PURE__*/_react.default.createElement(_HelpOutline.default, {
    fontSize: "small"
  }));
};

exports.MousePopover = MousePopover;