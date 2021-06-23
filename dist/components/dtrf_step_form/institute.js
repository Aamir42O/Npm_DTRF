"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Institute = void 0;

var _formik = require("formik");

var _react = _interopRequireWildcard(require("react"));

var _async = _interopRequireDefault(require("react-select/async"));

var _Auth = _interopRequireDefault(require("../../helper/Auth"));

var _reactRedux = require("react-redux");

var _antd = require("antd");

var _formData = require("../../actions/formData");

var _authHOC = _interopRequireDefault(require("../authHOC"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Institute = props => {
  console.log(props, "PROPS");
  const [instituteName, setInstituteName] = (0, _react.useState)("");
  const [showInstituteError, setShowInstituteError] = (0, _react.useState)(false);

  const handleInstituteLoadOption = async institute => {
    if (institute.length > 2) {
      console.log("INSIDE", process.env.NEXT_PUBLIC_ALL_DOCTORS); // let url = `${process.env.NEXT_PUBLIC_ALL_DOCTORS}?searchquery=${institute}`

      let url = "http://65.1.45.74:8187/v1/institute/search?searchquery=".concat(institute);
      console.log("INSIDE condition", url);
      const resp = await (0, _Auth.default)(url, "GET");
      console.log(resp);
      return resp.data.data.instituteSearchList;
    }
  };

  const formikRef = (0, _react.useRef)(); // const handleOnClickSave = async () => {
  //     var formData = new FormData()
  //     let data = {}
  //     data.dtrf_id = props.Token.dtrfToken
  //     formData.append("dtrf_id", JSON.stringify(data.dtrf_id))
  //     data.dtrf = props.formDataRedux
  //     data.dtrf.institute_info = { instituteName: instituteName }
  //     formData.append("dtrf", JSON.stringify(data.dtrf))
  //     // const url = "http://65.1.45.74:8187/v1/dtrf/save-dtrf"
  //     const url = process.env.NEXT_PUBLIC_SAVE_INCOMPLETE_DTRF
  //     const response = await reqWithToken(url, "POST", formData)
  //     console.log("INCOMEPLETE FORMDATA SEND", response)
  //     props.setFormData({ ...props.formDataRedux, institute_info: instituteName })
  //     if (response.status == 200) {
  //         successMessage("Form saved")
  //     } else {
  //         return errorMessage("Error in saving form, please try again")
  //     }
  // }

  const handleInstituteChange = e => {
    if (e == null) {
      console.log(e);
      setInstituteName(null);
    }

    if (e) {
      setShowInstituteError(false);
      setInstituteName(e);

      if (props.formDataRedux.institute_info) {
        let newFormData = JSON.parse(JSON.stringify(props.formDataRedux));
        delete newFormData.doctor_info;
        delete newFormData.test_info;
        delete newFormData.medical_info;
        props.setFormData(newFormData);
      }
    } else {}
  };

  const handleOnClickNext = () => {
    if (!instituteName) {
      return setShowInstituteError(true);
    }

    props.handleOnClickNext("institute_info", {
      instituteName
    });
    props.nextStep();
  };

  (0, _react.useEffect)(() => {
    if (props.formDataRedux.institute_info) {
      setInstituteName(props.formDataRedux.institute_info.instituteName);
    }
  }, []);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "customWrap"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-12 col-12"
  }, /*#__PURE__*/_react.default.createElement("fieldset", {
    id: "valdatinStep1"
  }, /*#__PURE__*/_react.default.createElement(_formik.Formik, {
    enableReinitialize: true,
    innerRef: formikRef,
    validate: values => {
      const errors = {};
      console.log("ERRORS", errors);
      return errors;
    },
    onSubmit: (values, _ref) => {
      let {
        setSubmitting
      } = _ref;
      // handleOnClickNext(values);
      console.log(values);
      console.log("HANDLE SUBMIT CALLED");
    }
  }, _ref2 => {
    let {
      values,
      handleChange,
      errors,
      touched
    } = _ref2;
    return /*#__PURE__*/_react.default.createElement(_formik.Form, {
      className: "row"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group col-sm-12 col-md-6 col-xs-12"
    }, /*#__PURE__*/_react.default.createElement("label", null, "Institute: ", /*#__PURE__*/_react.default.createElement("span", {
      className: "marked"
    }, "*")), /*#__PURE__*/_react.default.createElement(_async.default, {
      isClearable: true,
      cacheOptions: true,
      defaultOptions: true,
      value: instituteName,
      getOptionLabel: e => e.name,
      getOptionValue: e => e._id,
      loadOptions: handleInstituteLoadOption,
      onChange: handleInstituteChange // placeholder="Enter Test name"
      ,
      noOptionsMessage: () => 'Enter Institute name'
    }), showInstituteError && /*#__PURE__*/_react.default.createElement("div", {
      className: "formErr"
    }, "Required")));
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "row",
    id: "action1"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-12 col-12 text-right"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: "5px 20px"
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "submit",
    onClick: () => handleOnClickNext(),
    className: "btn btn-primary"
  }, "Next")))))))));
};

exports.Institute = Institute;

const mapStateToProps = state => ({
  formDataRedux: _objectSpread({}, state.formData.formData),
  Token: state.Token
});

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  setFormData: _formData.setFormData
})(Institute);

exports.default = _default;