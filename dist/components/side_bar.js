"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Side_bar;

var _reactFeather = require("react-feather");

var _react = _interopRequireWildcard(require("react"));

var _jsCookie = _interopRequireDefault(require("js-cookie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Side_bar() {
  const [instituteName, setInstituteName] = (0, _react.useState)("");

  _react.default.useEffect(() => {
    if (!instituteName) {
      setInstituteName(_jsCookie.default.get("instituteName"));
    }
  }, []);

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "main-sidebar sidebar-style-2"
  }, /*#__PURE__*/_react.default.createElement("aside", {
    id: "sidebar-wrapper"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "sidebar-brand pt-1 ",
    style: {
      lineHeight: "20px"
    }
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: "/dtrf"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "pt-2 ",
    style: {
      letterSpacing: "2px",
      fontSize: "15px",
      lineHeight: "0px"
    }
  }, instituteName ? instituteName : "Institute DTRF"))), /*#__PURE__*/_react.default.createElement("ul", {
    className: "sidebar-menu"
  }, /*#__PURE__*/_react.default.createElement("li", {
    className: "menu-header"
  }), /*#__PURE__*/_react.default.createElement("li", {
    className: "dropdown active"
  }, /*#__PURE__*/_react.default.createElement("a", {
    className: "nav-link",
    href: "/dtrf"
  }, /*#__PURE__*/_react.default.createElement("i", null, /*#__PURE__*/_react.default.createElement(_reactFeather.Monitor, null)), /*#__PURE__*/_react.default.createElement("span", null, "DTRF Dashboard"))), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("a", {
    className: "nav-link",
    href: "/dtrf_form"
  }, /*#__PURE__*/_react.default.createElement("i", null, /*#__PURE__*/_react.default.createElement(_reactFeather.Layout, null)), /*#__PURE__*/_react.default.createElement("span", null, "DTRF Form")))))));
}