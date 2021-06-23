"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const DisplayFiles = props => {
  console.log("Display file", props);
  const [filesKey, setFilesKey] = (0, _react.useState)(Object.keys(props.files));

  const getFileName = file => {
    let fileName;
    props.filesUploaded.map(data => {
      if (data.variable == file) {
        fileName = data.display;
      } else if (data.variable == props.files[file].fieldname) {
        fileName = data.display;
      }
    });

    if (fileName) {
      return fileName;
    } else {
      if (file == "HDS") {
        return "Confirmatory Test file for History of Down Syndrome";
      } else if (file == "HES") {
        return "Confirmatory Test File for History of Edwards Syndrome";
      } else if (file == "HPS") {
        return "Confirmatory Test File for History of Patau Syndrome";
      } else if (file == "xmlLicenseFile") {
        return "XML License File";
      }
    }
  };

  console.log(filesKey);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, filesKey.map(file => {
    if (props.files[file] && props.files[file].length > 0) {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: "col-10 col-md-8 form-group"
      }, /*#__PURE__*/_react.default.createElement("div", {
        class: "section-title mb-2 mt-0"
      }, getFileName(file), " "), props.files[file].map((test, id) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: "row mb-1"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "col-10"
      }, props.for == "Dashbaord" ? /*#__PURE__*/_react.default.createElement("a", {
        href: test.location
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "form-control mb-0",
        style: {
          height: "auto"
        }
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
      }, "Scan ".concat(id + 1)))) : /*#__PURE__*/_react.default.createElement("div", {
        className: "col-10"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "form-control mb-0",
        style: {
          height: "auto"
        }
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
      }, test.name ? test.name : test.originalname)))))))));
    }
  }));
};

var _default = DisplayFiles;
exports.default = _default;