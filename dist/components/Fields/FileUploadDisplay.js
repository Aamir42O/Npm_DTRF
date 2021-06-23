"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _CancelOutlined = _interopRequireDefault(require("@material-ui/icons/CancelOutlined"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const FileUploadDisplay = /*#__PURE__*/_react.default.forwardRef((props, ref) => {
  console.log(props);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-12 col-md-12 form-group"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "row mt-1"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "text-left mt-4"
  }, /*#__PURE__*/_react.default.createElement("button", {
    name: props.name,
    htmlFor: "files",
    type: "button",
    className: "btn btn-primary",
    onClick: e => ref.current.click()
  }, props.fileButtonName))), /*#__PURE__*/_react.default.createElement("label", {
    className: "formErr",
    style: {
      color: "red"
    }
  }, props.fileError)), props.files.length > 0 && /*#__PURE__*/_react.default.createElement("div", {
    className: "col-10 col-md-8 form-group"
  }, props.files.map((test, id) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, test.location ? /*#__PURE__*/_react.default.createElement("a", {
    href: test.location
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "row mb-1"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-10"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-control mb-0"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "feather feather-file"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
  }), /*#__PURE__*/_react.default.createElement("polyline", {
    points: "13 2 13 9 20 9"
  })), /*#__PURE__*/_react.default.createElement("label", {
    className: "ml-2",
    style: {
      fontSize: "12px"
    }
  }, test.originalname))), /*#__PURE__*/_react.default.createElement(_CancelOutlined.default, {
    size: "medium",
    name: props.name,
    onClick: e => props.removeFile(id, props.name)
  }))) : /*#__PURE__*/_react.default.createElement("div", {
    className: "row mb-1"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-10"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-control mb-0"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "feather feather-file"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
  }), /*#__PURE__*/_react.default.createElement("polyline", {
    points: "13 2 13 9 20 9"
  })), /*#__PURE__*/_react.default.createElement("label", {
    className: "ml-2",
    style: {
      fontSize: "12px"
    }
  }, test.name))), /*#__PURE__*/_react.default.createElement(_CancelOutlined.default, {
    size: "medium",
    name: props.name,
    onClick: e => props.removeFile(id, props.name)
  }))))));
});

var _default = FileUploadDisplay;
exports.default = _default;