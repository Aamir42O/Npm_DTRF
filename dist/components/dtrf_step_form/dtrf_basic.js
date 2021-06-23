"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const input = /*#__PURE__*/_react.default.createRef();

const DtrfType = props => {
  const currentDateTime = (0, _moment.default)().format("YYYY-MM-DDThh:mm");
  const [name, setName] = (0, _react.useState)({});
  (0, _react.useEffect)(() => {}, []);

  const handleOnClickNext = values => {
    // values.preventDefault();
    // console.log("*********** ", values.target.value, name);
    props.handleOnClickNext("dtrf_basic", values);
    props.nextStep();
  };

  const handleNameChange = e => {
    name[e.target.name] = e.target.value;
    setName(name);
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-12 col-12"
  }, /*#__PURE__*/_react.default.createElement(Formik, {
    initialValues: {
      type: "2",
      dateTime: currentDateTime,
      bioScreening: "0"
    },
    validate: values => {
      const errors = {};

      if (!values.type) {
        errors.type = "Required";
      } else if (!values.dateTime) {
        errors.dateTime = "Required";
      } else if (!values.bioScreening) {
        errors.bioScreening = "Required";
      }

      return errors;
    },
    onSubmit: values => {
      handleOnClickNext(values);
    }
  }, _ref => {
    let {
      values
    } = _ref;
    return /*#__PURE__*/_react.default.createElement(Form, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "row pt-5 pb-5",
      style: {
        display: "block;"
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-sm-12 text-center pt-5 pb-5"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "spinner-border",
      role: "status"
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "sr-only"
    }, "Loading...")))), /*#__PURE__*/_react.default.createElement("fieldset", {
      id: "valdatinStep1"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "row clearfix"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-sm-12"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/_react.default.createElement("label", {
      className: "mb-2"
    }, "Select Type of DTRF ", /*#__PURE__*/_react.default.createElement("span", {
      className: "marked"
    }, "*")), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("div", {
      className: "pretty p-default p-round"
    }, /*#__PURE__*/_react.default.createElement(Field, {
      type: "radio",
      name: "type",
      value: "1"
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "state"
    }, /*#__PURE__*/_react.default.createElement("label", null, "Prenatal"))), /*#__PURE__*/_react.default.createElement("div", {
      className: "pretty p-default p-round"
    }, /*#__PURE__*/_react.default.createElement(Field, {
      type: "radio",
      name: "type",
      value: "2"
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "state"
    }, /*#__PURE__*/_react.default.createElement("label", null, "Cytogenetic"))))), /*#__PURE__*/_react.default.createElement(ErrorMessage, {
      name: "type",
      component: "div",
      className: "formErr"
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-md-6 col-12"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/_react.default.createElement("label", {
      htmlFor: "dateTime"
    }, "Date and Time of collection", " ", /*#__PURE__*/_react.default.createElement("span", {
      className: "marked"
    }, "*")), /*#__PURE__*/_react.default.createElement(Field, {
      type: "datetime-local",
      max: currentDateTime,
      name: "dateTime",
      id: "dateTime",
      className: "form-control"
    }), /*#__PURE__*/_react.default.createElement("label", {
      id: "timeCollectionErr",
      className: "formErr"
    }), /*#__PURE__*/_react.default.createElement(ErrorMessage, {
      name: "dateTime",
      component: "div",
      className: "formErr"
    }))), /*#__PURE__*/_react.default.createElement("div", {
      role: "group",
      className: "col-md-6 col-12 mb-4"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/_react.default.createElement("label", null, "If Biochemistry Screening was done at Lilac Insights", " ", /*#__PURE__*/_react.default.createElement("span", {
      className: "marked"
    }, "*")), /*#__PURE__*/_react.default.createElement("div", {
      className: "mt-2"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "pretty p-default p-round"
    }, /*#__PURE__*/_react.default.createElement(Field, {
      type: "radio",
      name: "bioScreening",
      className: "custom-control-input",
      value: "1"
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "state"
    }, /*#__PURE__*/_react.default.createElement("label", {
      className: "custom-control-label"
    }, "Yes"))), /*#__PURE__*/_react.default.createElement("div", {
      className: "pretty p-default p-round"
    }, /*#__PURE__*/_react.default.createElement(Field, {
      type: "radio",
      name: "bioScreening",
      className: "custom-control-input",
      value: "0"
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "state"
    }, /*#__PURE__*/_react.default.createElement("label", {
      className: "custom-control-label"
    }, "No")))), /*#__PURE__*/_react.default.createElement(ErrorMessage, {
      name: "type",
      component: "div",
      className: "formErr"
    })))), /*#__PURE__*/_react.default.createElement("div", {
      className: "row",
      id: "action1"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-md-12 col-12 text-right"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "formButttonCenter"
    }, /*#__PURE__*/_react.default.createElement("button", {
      type: "submit",
      className: "btn btn-primary"
    }, "Next"))))));
  }))));
};

var _default = DtrfType;
exports.default = _default;