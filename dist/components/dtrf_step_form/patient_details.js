"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _formik = require("formik");

var _react = _interopRequireWildcard(require("react"));

var _constants = require("../../public/constants");

var _async = _interopRequireDefault(require("react-select/async"));

var _axios = _interopRequireDefault(require("axios"));

var _reactSelect = _interopRequireDefault(require("react-select"));

var _patientForm = _interopRequireDefault(require("./patient-form"));

var _asyncCreatable = _interopRequireDefault(require("react-select/async-creatable"));

var _reactRedux = require("react-redux");

var _jquery = require("jquery");

var _formData = require("../../actions/formData");

var _Auth = _interopRequireDefault(require("../../helper/Auth"));

var _commonHelper = require("../../helper/commonHelper");

var _router = _interopRequireDefault(require("next/router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let config = {
  headers: {
    token: process.env.NEXT_PUBLIC_TOKEN
  }
};

const PatientDetails = props => {
  const [patientEntryType, setPatientEntryType] = (0, _react.useState)();
  const [selectedPatient, setSelectedPatient] = (0, _react.useState)(null);
  const [selectedOptionForNewPatient, setSelectedOptionForNewPatient] = (0, _react.useState)();
  const [isPatientInformationLinkSent, setIsPatientInformationLinkSent] = (0, _react.useState)();
  const [, reRender] = (0, _react.useState)();
  const [isNewPatient, setIsNewPatient] = (0, _react.useState)(false);
  const [formValues, setFormValues] = (0, _react.useState)(null);
  const [isNbs, setIsNbs] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    console.log("PATIENT DETAILS", props);
    props.formValues.test_info.selectedTests.map(test => {
      if (test.sub_group == "NBS") {
        setIsNbs(true);
      }
    });

    if (props.patient_details && selectedPatient == null) {
      console.log("Iside if use effect");
      const patient = props.patient_details;
      setSelectedPatient(patient);
      props.getPatient_details(patient);
    } else {
      setFormValues(props.formValues);
      console.log("RE RENDERING !@!@!@!@!@@@@@@@@@@@@@~~~~~~");
      const patient = selectedPatient;
      setSelectedPatient(patient);
      props.getPatient_details(patient);
    }
  }, [selectedPatient]);

  const handleOnClickPrevious = () => {
    props.previousStep();
    props.handleOnClickPrevious();
  };

  const handleOnClickNext = values => {
    props.handleOnClickNext("patient_details", values);
    console.log("values", values);
    console.log(123123, props.formValues.collectionLocation.location);

    if (props.formValues.collectionLocation.location != "Home") {
      props.nextStep();
      console.log(props);
    } else {
      props.goToStep(5);
      console.log(props);
    }
  };

  const handlePatientTypeRadioButtonClick = value => {
    setPatientEntryType(value.target.value);
  };

  const handlePatientSearch = async searchString => {
    if (searchString.length > 2) {
      // const url = process.env.NEXT_PUBLIC_PATIENT_SEARCH;
      const url = "".concat(process.env.NEXT_PUBLIC_PATIENT_SEARCH, "?searchquery=").concat(searchString); // const url = `http://dtrf.aiolos.solutions:8187/v1/patient/search?searchquery=${searchString}`

      const search = {
        str: searchString
      };
      const searchedTestList = await (0, _Auth.default)(url, "GET"); // const searchedTestList = await axios.post(url, search, config);
      // console.log(searchString);

      return searchedTestList.data.data.patientSearchList;
    }
  };

  const [contactNumber, setContactNumber] = (0, _react.useState)(null);

  const handleOnchangePatientSearch = patient => {
    setResetFields(false);
    console.log("Onchange patient search", patient);

    if (props.formValues.patient_details) {
      const data = props.formValues;
      data.patient_details = null;
      props.setFormData(data);
    }

    if (!patient.__isNew__) {
      if (selectedPatient && patient._id != selectedPatient._id) {
        console.log("Condition Working123123123123123123 ");
        const diffPatient = patient;
        getPrefilledPatientDetails(_objectSpread({}, patient));
        console.log("HANDLE ON CHANGE", patient);
        setSelectedPatient(diffPatient);
        setSelectedOptionForNewPatient(null);
        setIsNewPatient(false);
        setFormValues(patient);
        reRender({});
      } else {
        getPrefilledPatientDetails(patient);
        console.log("ITS SAMEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEeee");
        setSelectedPatient(patient);
        setSelectedOptionForNewPatient(null);
        setIsNewPatient(false);
        reRender({});
      }
    } else {
      console.log("new ", selectedOptionForNewPatient);
      setSelectedPatient("new"); // setSelectedPatient(null) 

      setSelectedOptionForNewPatient(1);
      setIsNewPatient(true);
      reRender({});
      const RegExpression = /^\d*$/;

      if (RegExpression.test(patient.label)) {
        setContactNumber(patient.label);
      }
    }
  }; // ~~~~~~~~~~~~~~~~~~~~~!!!!!!!!!!!!!!!! ADMIN PANEL ~~~~~~~~~~~~~~~~~~!!!!!!!!!!!!!!!!!!!!!!


  const handleOnClickSave = async () => {
    let data = {};
    let formData = new FormData();
    data.dtrf_id = props.Token.dtrfToken;
    data.dtrf = props.formDataRedux;

    if (data.dtrf.patient_details) {
      delete data.dtrf.patient_details;
    }

    const response = await props.handleOnClickSave(_objectSpread({}, data.dtrf));
    props.setFormData(_objectSpread({}, data.dtrf));

    if (response) {
      if (response.status == 200) {
        (0, _commonHelper.successMessage)("Form saved");
      }
    } else {
      return (0, _commonHelper.errorMessage)("Error in Saving Form");
    }
  };

  const handleOnClickSaveAndExit = async () => {
    await handleOnClickSave();

    _router.default.push("/super-dtrf");
  };

  const handleOnClickTest = () => {
    props.nextStep();
  }; // ~~~~~~~~~~~~~~~~~~~~~~!!!!!!!!!!!!!!!! ADMIN PANEL CLOSE~~~~~~~~~~~~~~~!!!!!!!!!!!!!!!!!!!
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~PRefilled Patient ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  const [selectedCity, setSelectedCity] = (0, _react.useState)("");
  const [selectedState, setSelectedState] = (0, _react.useState)("");

  const getPrefilledPatientDetails = data => {
    console.log("Insite getPRefilledPatientDetails");

    if (data) {
      if (!data.isNew) {
        setPrefilledPatient(data);
        setSelectedPatient(data);
        setSelectedOptionForNewPatient(null);
        setIsNewPatient(false);
        reRender({});
      } else {
        setPrefilledPatient(data);
        setSelectedOptionForNewPatient(1);
        setIsNewPatient(true);
      }
    }
  };

  const [resetFields, setResetFields] = (0, _react.useState)(true);
  const [prefilledPatient, setPrefilledPatient] = (0, _react.useState)({});
  const [prefilledPatientLabel, setPrefilledPatientLabel] = (0, _react.useState)(); // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CLOSE Prefilled Patient CLOSE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const handleOnChangeOptionForNewPatient = option => {
    setSelectedOptionForNewPatient(option.target.value);
  };

  const handleSendLinkMedicalForm = () => {
    setIsPatientInformationLinkSent(true);
  };

  const handleCreateNewPatient = e => {
    console.log("create new");
  };

  const promiseOptions = async inputValue => new Promise(resolve => {
    resolve(handlePatientSearch(inputValue));
  });

  console.log(selectedPatient, "Selected patient");
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "customWrap"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, props.fromSuperDtrf && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-12 col-12 text-right"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: "10px 0px"
    }
  }, !props.Token.isComplete && /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    onClick: () => handleOnClickSaveAndExit(),
    className: "btn btn-primary mr-2"
  }, "Save And Exit")))), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-12 col-12"
  }, /*#__PURE__*/_react.default.createElement("fieldset", {
    id: "valdatinStep1"
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("label", null, "Enter Phone No. / Name"), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement(_asyncCreatable.default, {
    defaultOptions: true,
    loadOptions: promiseOptions,
    onChange: handleOnchangePatientSearch,
    getOptionLabel: e => {
      if (e.name) {
        if (e.mothersName) {
          if (e.hasBabyName) {
            return e.name.firstName + " " + e.name.lastName + " | " + e.contact;
          } else {
            return "Baby of " + e.name.firstName + " " + e.name.lastName + " | " + e.contact;
          }
        } else {
          return e.name.firstName + " " + e.name.lastName + " | " + e.contact;
        }
      } else {
        return "Create New";
      }
    }
  })), selectedPatient && selectedPatient != "new" && /*#__PURE__*/_react.default.createElement(_patientForm.default, {
    fromSuperDtrf: props.fromSuperDtrf,
    fromDtrfFront: props.fromDtrfFront,
    resetFields: resetFields,
    setResetFields: setResetFields,
    handleOnClickPrevious: handleOnClickPrevious,
    handleOnClickNext: handleOnClickNext,
    patient: prefilledPatient,
    editable: true,
    new: selectedPatient.isNew ? true : false,
    formValues: props.formValues,
    contactNumber: contactNumber,
    handleOnClickSave: props.handleOnClickSave
  }), selectedOptionForNewPatient == 1 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_patientForm.default, {
    handleOnClickSave: props.handleOnClickSave,
    fromSuperDtrf: props.fromSuperDtrf,
    fromDtrfFront: props.fromDtrfFront,
    resetFields: resetFields,
    setResetFields: setResetFields,
    patient: selectedPatient,
    handleOnClickPrevious: handleOnClickPrevious,
    previousStep: props.previousStep,
    handleOnClickNext: handleOnClickNext,
    new: true,
    formValues: props.formValues,
    contactNumber: contactNumber
  })))))), props.fromSuperDtrf && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !selectedPatient && selectedOptionForNewPatient != 1 && /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-2 col-2 text-left"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: "5px 20px"
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    onClick: e => _router.default.push("/super-dtrf"),
    className: "btn btn-primary mr-2"
  }, "Exit"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-10 col-6 text-reft "
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "formButttonCenter"
  }, /*#__PURE__*/_react.default.createElement("button", {
    onClick: handleOnClickPrevious,
    className: "btn btn-primary mr-2"
  }, "Previous"), !props.Token.isComplete && /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    onClick: () => handleOnClickSave(),
    className: "btn btn-primary mr-2"
  }, "Save"), /*#__PURE__*/_react.default.createElement("button", {
    onClick: handleOnClickTest,
    className: "btn btn-primary mr-2"
  }, "Next"))))), props.fromDtrfFront && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !selectedPatient && selectedOptionForNewPatient != 1 && /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-12 col-12 text-right"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "formButttonCenter"
  }, /*#__PURE__*/_react.default.createElement("button", {
    onClick: handleOnClickPrevious,
    className: "btn btn-primary mr-2"
  }, "Previous")))))));
};

const mapStateToProps = state => ({
  patient_details: state.formData.formData.patient_details ? state.formData.formData.patient_details : null,
  formDataRedux: state.formData.formData,
  Token: state.Token
});

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  getPatient_details: _formData.getPatient_details,
  setFormData: _formData.setFormData
})(PatientDetails);

exports.default = _default;