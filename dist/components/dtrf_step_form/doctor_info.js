"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _formik = require("formik");

var _reactSelect = _interopRequireDefault(require("react-select"));

var _creatable = _interopRequireDefault(require("react-select/creatable"));

var _constants = require("../../public/constants");

var _reactRedux = require("react-redux");

var _doctors = require("../../actions/doctors");

var _form = _interopRequireDefault(require("../../reducers/form"));

var _mySelect = _interopRequireDefault(require("../mySelect"));

var _Auth = _interopRequireDefault(require("../../helper/Auth"));

var _async = _interopRequireDefault(require("react-select/async"));

var _formData = require("../../actions/formData");

var _fileupload = require("../../actions/fileupload");

var _jsCookie = _interopRequireDefault(require("js-cookie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const axios = require("axios");

let config = {
  headers: {
    token: process.env.NEXT_PUBLIC_TOKEN
  }
};

const DoctorInfo = props => {
  const [createNewReferenceDoctor, setCreateNewReferenceDoctor] = (0, _react.useState)(false);
  const [doctorName, setDoctorName] = (0, _react.useState)("");
  const [referenceDoctorName, setReferenceDoctorName] = (0, _react.useState)("");
  const [isReferenceDoctorCompulsory, setIsReferenceDoctorCompulsory] = (0, _react.useState)(false);
  const [isDoctorNameValid, setIsDoctorNameValid] = (0, _react.useState)(false);
  const [showDoctorErrorMessage, setShowDoctorErrorMessage] = (0, _react.useState)(false);
  const [isReferenceDoctorNameValid, setIsReferenceDoctorNameValid] = (0, _react.useState)(false);
  const [showReferenceDoctorErrorMessage, setShowReferenceDoctorErrorMessage] = (0, _react.useState)(false);
  const [, set] = (0, _react.useState)("");
  const [isReferenceDoctorReasonValid, setIsReferenceDoctorReasonValid] = (0, _react.useState)(false);
  const [showReferenceDoctorReasonErrorMessage, setShowReferenceDoctorReasonErrorMessage] = (0, _react.useState)(false);
  const [referenceDoctorCity, setReferenceDoctorCity] = (0, _react.useState)("");
  const [referenceDoctorState, setReferenceDoctorState] = (0, _react.useState)("");
  const [formData, setFormData] = (0, _react.useState)({});
  const [doctorsList, setDoctorsList] = (0, _react.useState)([]);
  const [referralDoctorsList, setReferralDoctorsList] = (0, _react.useState)([]);
  const [formattedDoctorsList, setFormattedDoctorsList] = (0, _react.useState)([]);
  const [formattedReferralDoctorsList, setFormattedReferralDoctorsList] = (0, _react.useState)([]);
  const [isOtherSelected, setIsOtherSelected] = (0, _react.useState)(false);
  const [isGyno, setIsGyno] = (0, _react.useState)(false);
  const formRef = (0, _react.useRef)();
  const FirstFormRef = (0, _react.useRef)(); //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Prefilled Values!~

  const [prefilledDoctorName, setPrefilledDoctorName] = (0, _react.useState)("");
  const [sonographerName, setSonoGrapherName] = (0, _react.useState)("");

  const getPrefilledDoctorName = data => {
    const asd = data;
    asd.label = data.name.firstName + " " + data.name.lastName;
    asd.value = data._id;
    console.log("prefilledValue", asd);
    setPrefilledDoctorName(asd);
    setIsDoctorNameValid(true);
  };

  const [prefilleReferrenceDoctor, setPrefilledReferrenceDoctor] = (0, _react.useState)("");

  const getPrefilledReferenceDoctor = data => {
    console.log("data", data);
    const asd = {
      label: data.name.firstName + " " + data.name.lastName,
      value: data._id
    };
    console.log("prefilled Reference Doctor Name", asd);
    setIsReferenceDoctorNameValid(true);
    setPrefilledReferrenceDoctor(data);
    setReferenceDoctorName(data);
  };

  const [prefilledReferalReason, setPrefilledReferalReason] = (0, _react.useState)("");

  const getPrefilledReferalReason = data => {
    console.log("prefilled referal reason", data);
    setIsReferenceDoctorReasonValid(true);
    setShowReferenceDoctorReasonErrorMessage(false);
    setPrefilledReferalReason({
      label: data,
      value: data
    });
  };

  (0, _react.useEffect)(() => {
    // console.log("List", List)
    console.log("Props", props);

    if (props.doctorName != 1) {
      console.log("In useeffect referenceDoctorname");
      getPrefilledDoctorName(props.doctorName); // getPrefilledReferenceDoctor(props.referenceDoctorName)
      // getPrefilledReferenceDoctor({value:props.referenceDoctorName.name.firstName +" " +props.referenceDoctorName.name.lastName ,value:props.referenceDoctor._id})
    } // if ((props.doctorName.practice_type == "Gynaecologist-Obstetrician")) {
    //   setIsGyno(true)
    //   setSonoGrapherName(props.sonographer)
    // }
    // if (formattedDoctorsList.length == 0) {
    //   getDoctorsList();
    // }
    // if (formattedReferralDoctorsList.length == 0) {
    //   getReferralDoctorList();
    // }

  }, []);

  const handleDoctorNameChange = e => {
    if (e == null) {
      console.log(e);
      setPrefilledDoctorName(null);
    }

    if (e) {
      setShowDoctorErrorMessage(false);

      if (props.formDataRedux.test_info) {
        const data = props.formDataRedux.test_info;
        delete data.test_info;
        props.setFormData(data);
        props.clearFiles();
      }

      if (e.practice_type == 'Gynaecologist-Obstetrician') {
        setIsGyno(true);
      } else {
        setIsGyno(false);
      }

      setIsDoctorNameValid(true);
      setDoctorName(e);
      getPrefilledDoctorName(e);
    } else {
      setIsDoctorNameValid(false);
    }
  };

  console.log("IS  GYNO", isGyno);

  const handleSonographerNameChange = e => {
    if (e) {
      e.value = e._id;
      e.label = e.name.firstName + " " + e.name.lastName;
      setSonoGrapherName(e);
    } else {
      setSonoGrapherName(null);
    }
  };

  const handleReferenceDoctorNameChange = e => {
    console.log(e);

    if (e) {
      e.value = e._id;
      e.label = e.name.firstName + " " + e.name.lastName;
      setPrefilledReferrenceDoctor(e);
      setIsReferenceDoctorNameValid(true);
      setReferenceDoctorName(e);
    } else {
      setPrefilledReferrenceDoctor(null);
    }
  };

  const handleReferralDoctorReasonChange = e => {
    console.log(e);

    if (e) {
      console.log("e", e);
      console.log(e.value, e.value == "others");
      getPrefilledReferalReason(e); // setPrefilledReferalReason(e.value)

      setIsReferenceDoctorReasonValid(true);
      setShowReferenceDoctorReasonErrorMessage(false);

      if (e.value == "others") {
        setIsOtherSelected(true);
      } else {
        setIsOtherSelected(false);
        set(e.value);
      }
    }
  };

  const handleDoctorLoadOption = async doctor => {
    if (doctor.length > 2) {
      console.log("INSIDE", process.env.NEXT_PUBLIC_ALL_DOCTORS);
      let url = "".concat(process.env.NEXT_PUBLIC_ALL_DOCTORS, "?searchquery=").concat(doctor);

      if (props.fromSuperDtrf) {
        url = "".concat(process.env.NEXT_PUBLIC_ALL_DOCTORS, "?searchquery=").concat(doctor, "&institute=").concat(props.formDataRedux.institute_info.instituteName.lilac_id);
      }

      console.log("INSIDE condition", url);
      const resp = await (0, _Auth.default)(url, "GET", null, {
        superDtrf: props.fromSuperDtrf,
        dtrfFront: props.fromDtrfFront
      });
      console.log(resp);
      return resp.data.data.doctorSearchList;
    }
  };

  const handleReferrenceDoctorChange = async doctor => {
    console.log("DOCOTOR ", doctor.length > 2);
    console.log("INSIDE", process.env.NEXT_PUBLIC_ALL_REFERRAL_DOCTORS);

    if (doctor.length > 2) {
      console.log("INSIDE", process.env.NEXT_PUBLIC_ALL_REFERRAL_DOCTORS);
      let url = "".concat(process.env.NEXT_PUBLIC_ALL_REFERRAL_DOCTORS, "?searchquery=").concat(doctor);
      console.log("INSIDE condition", url);
      const resp = await (0, _Auth.default)(url, "GET", null, {
        superDtrf: props.fromSuperDtrf,
        dtrfFront: props.fromDtrfFront
      });
      console.log(resp);
      return resp.data.data.doctorSearchList;
    }
  };

  const handleOnClickNext = isNewReferralDoctor => {
    FirstFormRef.current.handleSubmit();
    FirstFormRef.current.validateForm();
    console.log("FIRST FROM ERRORS", FirstFormRef.current.errors);

    if (!isDoctorNameValid) {
      console.log("1");
      setShowDoctorErrorMessage(true);
      return;
    } else {
      setShowDoctorErrorMessage(false);
      console.log("2");
    }

    if (isNewReferralDoctor) {
      console.log("10");
      const values = formRef.current.values;
      props.handleOnClickNext("doctor_info", _objectSpread(_objectSpread({
        doctorName,
        referenceDoctorName
      }, values), {}, {
        referenceDoctorCity,
        referenceDoctorState
      }));
    } else {
      console.log("11");

      if (props.doctorName != 1) {
        const doctorName = formattedDoctorsList.filter(doctor => doctor.value == prefilledDoctorName.value);
        const referenceDoctor = formattedReferralDoctorsList.filter(doctor => doctor.value == prefilleReferrenceDoctor._id);
        props.handleOnClickNext("doctor_info", {
          doctorName: prefilledDoctorName
        }); // props.handleOnClickNext("doctor_info", { doctorName: doctorName[0], referenceDoctorName: referenceDoctor[0], });
        // props.handleOnClickNext("doctor_info", { doctorName: doctorName[0], referenceDoctorName: referenceDoctor[0], referralReason: prefilledReferalReason.value });
      } else {
        props.handleOnClickNext("doctor_info", {
          doctorName: prefilledDoctorName
        });
      }
    }

    props.nextStep();
  };

  const handleCreateNewReference = inputValue => {
    setCreateNewReferenceDoctor(true);
    setReferenceDoctorName(inputValue);
    setIsReferenceDoctorNameValid(true);
    setShowReferenceDoctorErrorMessage(false);
  };

  const handleCityChange = e => {
    setReferenceDoctorCity(e.value);
  };

  const handleStateChange = e => {
    setReferenceDoctorState(e.value);
  };

  const handleOnClickCancel = () => {
    setCreateNewReferenceDoctor(false);
    setIsReferenceDoctorNameValid(false);
  };

  console.log("createnewreference", createNewReferenceDoctor);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "customWrap"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-12 col-12"
  }, /*#__PURE__*/_react.default.createElement("fieldset", {
    id: "valdatinStep1"
  }, /*#__PURE__*/_react.default.createElement(_formik.Formik, {
    enableReinitialize: true,
    initialValues: {
      doctorName: prefilledDoctorName,
      sonographer: props.sonographer ? props.sonographer : ""
    },
    innerRef: FirstFormRef,
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
    }, /*#__PURE__*/_react.default.createElement("label", null, "Doctor: ", /*#__PURE__*/_react.default.createElement("span", {
      className: "marked"
    }, "*")), /*#__PURE__*/_react.default.createElement(_async.default, {
      isDisabled: props.fromSuperDtrf ? _jsCookie.default.get("roleAL") == "bdm" ? true : false : false,
      isClearable: true,
      cacheOptions: true,
      defaultOptions: true,
      value: prefilledDoctorName,
      getOptionLabel: e => e.name.firstName + " " + e.name.lastName + " | " + e.practice_type,
      getOptionValue: e => e._id,
      loadOptions: handleDoctorLoadOption,
      onChange: handleDoctorNameChange // placeholder="Enter Test name"
      ,
      noOptionsMessage: () => 'Enter Doctor name'
    }), showDoctorErrorMessage && /*#__PURE__*/_react.default.createElement("div", {
      className: "formErr"
    }, "Required")));
  }), createNewReferenceDoctor && /*#__PURE__*/_react.default.createElement(_formik.Formik, {
    initialValues: {
      referenceDoctorName: referenceDoctorName
    },
    innerRef: formRef,
    validate: values => {
      const errors = {};

      if (!values.referenceDoctorName) {
        errors.referenceDoctorName = "Required";
      } // else if (!values.referenceDoctorContact) {
      //     errors.referenceDoctorContact = "Required";
      // }


      return errors;
    },
    onSubmit: (values, _ref3) => {
      let {
        setSubmitting
      } = _ref3;
      // handleOnClickNextFromReferringDoctor(values)
      console.log(values);
    }
  }, _ref4 => {
    let {
      values
    } = _ref4;
    return /*#__PURE__*/_react.default.createElement(_formik.Form, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-md-12 col-12"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "section-title mb-4 mt-0"
    }, "Reference Doctor information"))), /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-md-6 col-12"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/_react.default.createElement("label", null, "Name of Doctor"), /*#__PURE__*/_react.default.createElement(_formik.Field, {
      type: "text",
      name: "referenceDoctorName",
      placeholder: "Enter doctor name",
      className: "form-control"
    }), /*#__PURE__*/_react.default.createElement(_formik.ErrorMessage, {
      name: "referenceDoctorName",
      component: "div",
      className: "formErr"
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: "col-md-6 col-12"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/_react.default.createElement("label", null, "Contact No"), /*#__PURE__*/_react.default.createElement(_formik.Field, {
      type: "text",
      name: "referenceDoctorContact",
      placeholder: "Enter contact number",
      className: "form-control"
    })))), /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-md-6 col-12"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/_react.default.createElement("label", null, "Address"), /*#__PURE__*/_react.default.createElement(_formik.Field, {
      name: "referenceDoctorAddress"
    }, _ref5 => {
      let {
        field
      } = _ref5;
      return /*#__PURE__*/_react.default.createElement("textarea", _extends({}, field, {
        className: "form-control",
        type: "text",
        placeholder: "Enter Address"
      }));
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: "col-md-6 col-12"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/_react.default.createElement("label", null, "Pin code"), /*#__PURE__*/_react.default.createElement(_formik.Field, {
      type: "text",
      name: "referenceDoctorPinCode",
      placeholder: "Enter Pin Code",
      className: "form-control"
    }), /*#__PURE__*/_react.default.createElement(_formik.ErrorMessage, {
      name: "referenceDoctorPinCode",
      component: "div",
      className: "formErr"
    })))), /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-md-6 col-12"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/_react.default.createElement("label", null, "City"), /*#__PURE__*/_react.default.createElement(_reactSelect.default, {
      options: _constants.cityList,
      onChange: handleCityChange,
      name: "referenceDoctorCity"
    }), /*#__PURE__*/_react.default.createElement(_formik.ErrorMessage, {
      name: "referenceDoctorCity",
      component: "div",
      className: "formErr"
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: "col-md-6 col-12"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/_react.default.createElement("label", null, "State"), /*#__PURE__*/_react.default.createElement(_reactSelect.default, {
      options: _constants.stateList,
      onChange: handleStateChange,
      name: "referenceDoctorState"
    }), /*#__PURE__*/_react.default.createElement(_formik.ErrorMessage, {
      name: "referenceDoctorState",
      component: "div",
      className: "formErr"
    })))));
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "row",
    id: "action1"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-12 col-12 text-right"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: "5px 20px"
    }
  }, createNewReferenceDoctor && /*#__PURE__*/_react.default.createElement("button", {
    onClick: handleOnClickCancel,
    className: "btn btn-primary mr-2"
  }, "Cancel"), props.fromSuperDtrf && /*#__PURE__*/_react.default.createElement("button", {
    style: {
      marginRight: "4px",
      marginLeft: "4px"
    },
    type: "submit",
    onClick: () => {
      props.previousStep();
      props.handleOnClickPrevious();
    },
    className: "btn btn-primary"
  }, "Previous"), /*#__PURE__*/_react.default.createElement("button", {
    type: "submit",
    onClick: () => createNewReferenceDoctor ? handleOnClickNext(true) : handleOnClickNext(false),
    className: "btn btn-primary"
  }, "Next"))))))));
};

const mapStateToProps = state => ({
  formDataRedux: state.formData.formData,
  doctorName: state.formData.formData.doctor_info ? state.formData.formData.doctor_info.doctorName : 1,
  referenceDoctorName: state.formData.formData.doctor_info ? state.formData.formData.doctor_info.referenceDoctorName : 1,
  referralReason: state.formData.formData.doctor_info ? state.formData.formData.doctor_info.referralReason : 1,
  sonographer: state.formData.formData.doctor_info ? state.formData.formData.doctor_info.sonographer : null
});

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  getDoctors: _doctors.getDoctors,
  getReferralDoctors: _doctors.getReferralDoctors,
  setFormData: _formData.setFormData,
  clearFiles: _fileupload.clearFiles
})(DoctorInfo);

exports.default = _default;