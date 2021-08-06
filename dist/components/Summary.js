"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _icons = require("@material-ui/icons");

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _DisplayField = _interopRequireDefault(require("./DisplayFields/DisplayField"));

var _DisplayFiles = _interopRequireDefault(require("./DisplayFields/DisplayFiles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Summary = props => {
  const [formValues, setFormValues] = (0, _react.useState)(null);
  const [doctor_info, setDoctor_info] = (0, _react.useState)({});
  const [test_info, setTest_info] = (0, _react.useState)({});
  const [collectionLocation, setCollectionLocation] = (0, _react.useState)({});
  const [patient_details, setPatient_details] = (0, _react.useState)({});
  const [medical_info, setMedical_info] = (0, _react.useState)({});
  const [sample_info, setSample_info] = (0, _react.useState)({});
  const [payment, setPayment] = (0, _react.useState)({});
  const [from, setFrom] = (0, _react.useState)("");
  const [is_thalasseima, setIs_thalasseima] = (0, _react.useState)(false);
  const [fileUpload, setFileUpload] = (0, _react.useState)({}); // Test GROUP

  const [hasNbs, setHasNbs] = (0, _react.useState)(false);
  const [hasNipt, setHasNipt] = (0, _react.useState)(false);
  const [hasPns, setHasPns] = (0, _react.useState)(false);
  const [hasCyto, setHasCyto] = (0, _react.useState)(false); // Test Group Close
  // Test SubGroup 

  const [hasCytoPrenatal, setHasCytoPrenatal] = (0, _react.useState)(false);
  const [hasPoc, setHasPoc] = (0, _react.useState)(false);
  const [isThalasammia, setIsThalasammia] = (0, _react.useState)(false);
  const [hasPreEclampsiaTest, setHasPreEclampsiaTest] = (0, _react.useState)(false);
  const [testTrimester, setTestTrimester] = (0, _react.useState)(false); // Test subgroup close

  const getTestDetails = () => {
    console.log("INSIDE TEST DETAILS");

    if (props.from == "Confirmation") {
      props.test_info.selectedTests.map(test => {
        if (test.sub_group == "NBS") {
          setHasNbs(true);
        }

        if (test.sub_group == "NIPT") {
          setHasNipt(true);
        }

        if (test.sub_group == "PNS") {
          setHasPns(true);
          console.log("INSIDE PNS CONDITION");

          if (test.is_thalasseima) {
            setIsThalasammia(test.is_thalasseima);
          }

          if (test.is_pre_eclampsia) {
            setHasPreEclampsiaTest(true);
          }

          setTestTrimester(test.trimester_test);
        }

        if (test.sub_group == "CYTO" || test.sub_group == "CMA") {
          if (test.sample_category == "Prenatal") {
            setHasCytoPrenatal(true);
          }

          if (test.sample_category == "Product of conception(POC)") {
            setHasPoc(true);
          }

          setHasCyto(true);
        }
      });
    }

    if (props.from == "Dashboard") {
      if (props.test_info.sub_group == "NBS") {
        setHasNbs(true);
      }

      if (props.test_info.sub_group == "NIPT") {
        setHasNipt(true);
      }

      if (props.test_info.sub_group == "PNS") {
        setHasPns(true);
        console.log("INSIDE PNS CONDITION");

        if (props.test_info.is_thalasseima) {
          setIsThalasammia(props.test_info.is_thalasseima);
        }

        if (props.test_info.is_pre_eclampsia) {
          setHasPreEclampsiaTest(true);
        }

        setTestTrimester(props.test_info.trimester_test);
      }

      if (props.test_info.sub_group == "CYTO" || props.test_info.sub_group == "CMA") {
        if (props.test_info.sample_category == "Prenatal") {
          setHasCytoPrenatal(true);
        }

        if (props.test_info.sample_category == "Product of conception(POC)") {
          setHasPoc(true);
        }

        setHasCyto(true);
      }
    }
  };

  console.log(props, "SUMMARRY PROPS");
  console.log(hasPns, "HASPNS");
  (0, _react.useEffect)(() => {
    console.log(props, "SUMMARRY PROPS");

    if (!formValues) {
      getTestDetails();
      setDoctor_info(props.doctor_info);
      setTest_info(props.test_info);
      setCollectionLocation(props.collectionLocation);
      setPatient_details(props.patient_details);
      setMedical_info(props.medical_info);
      setFrom(props.from);
      setSample_info(props.sample_info);
      setPayment(props.payment);
      setFormValues(true);
      setFileUpload(props.fileUpload);
    }
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "customWrap"
  }, formValues && /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-12 col-12"
  }, /*#__PURE__*/_react.default.createElement("fieldset", {
    id: "valdatinStep1"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "card p-3",
    style: {
      'box-shadow': 'none'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    class: "section-title mb-4 mt-0"
  }, "Doctor Information:"), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group row mb-2"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-6 col-12"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "col-form-label text-md-right col-sm-6"
  }, /*#__PURE__*/_react.default.createElement("b", null, "Doctor:")), /*#__PURE__*/_react.default.createElement("label", {
    className: "col-form-label col-sm-6"
  }, doctor_info.doctorName.name.firstName, " ", doctor_info.doctorName.name.lastName))))), from == "Confirmation" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "card p-3",
    style: {
      'box-shadow': 'none'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    class: "section-title mb-2 mt-0"
  }, "Test Information:"), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, test_info && test_info.selectedTests.map((test, id) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("b", null, test.display_test_name)), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("label", null, "Sample Type:\xA0 "), /*#__PURE__*/_react.default.createElement("label", null, test.sampleType), /*#__PURE__*/_react.default.createElement("hr", null)))), /*#__PURE__*/_react.default.createElement("div", {
    class: "section-title mb-0 mt-0"
  }, "Collection Location: \xA0", collectionLocation && (collectionLocation.location == "Home" ? "Non-Institute" : collectionLocation.location)))), from == "Dashboard" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "card p-3",
    style: {
      'box-shadow': 'none'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    class: "section-title mb-2 mt-0"
  }, "Test Information:"), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("b", null, test_info.display_test_name)), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("label", null, "Sample Type:\xA0 "), /*#__PURE__*/_react.default.createElement("label", null, test_info.sampleType), /*#__PURE__*/_react.default.createElement("hr", null)), /*#__PURE__*/_react.default.createElement("div", {
    class: "section-title mb-0 mt-0"
  }, "Collection Location: \xA0", collectionLocation && (collectionLocation.location == "Home" ? "Non-Institute" : collectionLocation.location)))), /*#__PURE__*/_react.default.createElement("div", {
    className: "card p-3",
    style: {
      'box-shadow': 'none'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    class: "section-title mb-2 mt-0"
  }, "Patient Details:"), patient_details && /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, (patient_details.isNew || patient_details.name.firstName) && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Hospital ID/ Unique ID",
    data: patient_details.hospitalId
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Salutation",
    data: patient_details.salutation
  }), hasNbs && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-2 col-12"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, (patient_details.hasBabyName || typeof patient_details.hasBabyName == "boolean") && /*#__PURE__*/_react.default.createElement("label", {
    className: "col-form-label col-sm text-sm-right"
  }, /*#__PURE__*/_react.default.createElement("b", null, patient_details.hasBabyName.toString() == "true" ? "Baby's" : "B/O"))))), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "First Name",
    data: patient_details.name ? patient_details.name.firstName ? patient_details.name.firstName : patient_details.firstName : patient_details.firstName,
    className: hasNbs ? "col-md-5 col-12" : "col-md-6 col-12"
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Last Name",
    data: patient_details.name ? patient_details.name.lastName ? patient_details.name.lastName : patient_details.lastName : patient_details.lastName,
    className: hasNbs ? "col-md-5 col-12" : "col-md-6 col-12"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Contact Number:",
    data: patient_details.contact
  })), (patient_details.isNew || collectionLocation.location != "Home") && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, !hasNbs && /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Husband's/Father Name",
    data: patient_details.husbandsOrFathersName
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Sex assigned at Birth",
    data: patient_details.gender == "male" ? "Male" : patient_details.gender == "female" ? "Female" : "Other"
  })), patient_details.ageType == "ageInYMD" && /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-sm"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "col-form-label col-sm-6 text-sm-right"
  }, /*#__PURE__*/_react.default.createElement("b", null, "Age:")))), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Years",
    data: patient_details.ageInYears,
    className: "col-sm"
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Months",
    data: patient_details.ageInMonths,
    className: "col-sm"
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Days",
    data: patient_details.ageInDays,
    className: "col-sm"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, patient_details.ageType == "dob" && /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Date of Birth",
    data: patient_details.dateOfBirth,
    className: "col-sm",
    isDate: true
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-6 col-12"
  }, /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Email:",
    data: patient_details.email,
    className: "col-sm"
  }))), hasNbs && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, patient_details.mothersFirstName && /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-2 col-12"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, /*#__PURE__*/_react.default.createElement("label", null, "Mothers"))), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "First Name",
    data: from == "Confirmation" ? patient_details.mothersFirstName : patient_details.mothersName.firstName,
    className: "col-md-5 col-12"
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Last Name",
    data: from == "Confirmation" ? patient_details.mothersLastName : patient_details.mothersName.lastName,
    className: "col-md-5 col-12"
  })), patient_details.mothersAgeType == "ageInYMD" ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-sm"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "col-form-label col-sm-6 text-sm-right"
  }, /*#__PURE__*/_react.default.createElement("b", null, "Mothers Age:")))), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Years",
    data: patient_details.mothersAgeInYears,
    className: "col-sm"
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Months",
    data: patient_details.mothersAgeInMonths,
    className: "col-sm"
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Days",
    data: patient_details.mothersAgeInDays,
    className: "col-sm"
  })), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Mothers DOB:",
    data: patient_details.mothersDateOfBirth,
    isDate: true
  })) : /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Mothers DOB:",
    data: patient_details.mothersDateOfBirth,
    isDate: true
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-2 col-12"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "col-form-label "
  }, "Fathers Name"))), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "First Name",
    data: from == "Confirmation" ? patient_details.fathersFirstName : patient_details.fathersName.firstName,
    className: "col-md-5 col-12"
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Last Name",
    data: from == "Confirmation" ? patient_details.fathersLastName : patient_details.fathersName.lastName,
    className: "col-md-5 col-12"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Residential Address",
    data: patient_details.address
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Pin Code",
    data: patient_details.pinCode
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "City",
    data: typeof patient_details.city == "object" ? patient_details.city.label : patient_details.city
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "State",
    data: typeof patient_details.state == "object" ? patient_details.state.label : patient_details.state
  })), (hasNipt || hasPns) && /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Weight: (in Kg)",
    data: patient_details.weight
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Height: (in cm)",
    data: patient_details.height
  })), hasPns && /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Smoking",
    data: patient_details.smoking == "true" ? "Yes" : "No"
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Folic Acid Intake:",
    data: patient_details.folicAcidIntake == "true" ? "Yes" : "No"
  }))))), patient_details && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, patient_details.filledBy == "patient" && from == "Confirmation" && !props.sendByLink && /*#__PURE__*/_react.default.createElement("div", {
    className: "row",
    id: "action1"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-12 col-12 text-right"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: "5px 20px"
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    onClick: e => props.onResendClick(),
    className: "btn btn-primary"
  }, "Resend Link")))))), collectionLocation.location == "Institute" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "card p-3",
    style: {
      'box-shadow': 'none'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    class: "section-title mb-2 mt-0"
  }, "Clinical Info:"), hasNbs && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Sample Collection Date",
    data: medical_info.sampleCollectionDate,
    isDate: true
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "First Feeding Date",
    data: medical_info.firstFeedingDate,
    isDate: true
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Type of Feeding",
    data: medical_info.typeOfFeeding
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "H/O Transfusion",
    data: medical_info.hoTransfusion
  }), medical_info.hoTransfusion == "Yes" && /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "H/O Transfusion Date",
    data: medical_info.dateOfHoTransfusion,
    isDate: true
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Delivery Status",
    data: medical_info.deliveryStatus
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Additional Symptoms / History",
    data: medical_info.additionalSymptoms
  }))), !hasNbs && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "USG Date",
    data: medical_info.usgDate,
    isDate: true
  }), /*#__PURE__*/_react.default.createElement("div", {
    class: "section-title mb-2 mt-0"
  }, "Gestational Age :")), /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, !hasNbs && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Weeks",
    data: medical_info.gestationalAgeWeeks
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Days",
    data: medical_info.gestationalAgeDays
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Sample Collection Date",
    data: medical_info.sampleCollectionDate,
    isDate: true
  }), from == "Confirmation" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-12 col-12"
  }, /*#__PURE__*/_react.default.createElement("h6", {
    style: {
      padding: "5px"
    }
  }, "Current Gestational Age :")), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Weeks",
    data: medical_info.currentGestationalAgeWeeks
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Days",
    data: medical_info.currentGestationalAgeDays
  })))), !hasNbs && from != "Confirmation" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, medical_info.currentGestationalAgeWeeks.map((gest, index) => /*#__PURE__*/_react.default.createElement("div", {
    className: "col-12 form-group"
  }, /*#__PURE__*/_react.default.createElement("label", null, "Current Gestational Age", " ", " ", index + 1, /*#__PURE__*/_react.default.createElement("span", {
    className: "marked"
  }, "*")), /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Weeks",
    data: medical_info.currentGestationalAgeWeeks[index]
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Days",
    data: medical_info.currentGestationalAgeDays[index]
  }))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, medical_info.referrenceDoctorName && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, medical_info.referrenceDoctorName.name ? /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-6 col-12"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "col-form-label text-md-right col-sm-6"
  }, /*#__PURE__*/_react.default.createElement("b", null, "Referring Doctor:")), /*#__PURE__*/_react.default.createElement("label", {
    className: "col-form-label col-sm-6"
  }, medical_info.referrenceDoctorName.name.firstName, " ", medical_info.referrenceDoctorName.name.lastName))) : /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-6 col-12"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "col-form-label text-md-right col-sm-6"
  }, /*#__PURE__*/_react.default.createElement("b", null, "Referring Doctor:")), /*#__PURE__*/_react.default.createElement("label", {
    className: "col-form-label col-sm-6"
  }, "Self")))), medical_info.sonographer && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, medical_info.sonographer && medical_info.sonographer.label != "Self" ? /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-6 col-12"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "col-form-label text-md-right col-sm-6"
  }, /*#__PURE__*/_react.default.createElement("b", null, "Sonographer:")), /*#__PURE__*/_react.default.createElement("label", {
    className: "col-form-label col-sm-6"
  }, medical_info.sonographer.name.firstName, " ", medical_info.sonographer.name.lastName))) : /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-6 col-12"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "col-form-label text-md-right col-sm-6"
  }, /*#__PURE__*/_react.default.createElement("b", null, "Sonographer:")), /*#__PURE__*/_react.default.createElement("label", {
    className: "col-form-label col-sm-6"
  }, "Self")))), hasCyto && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, hasCytoPrenatal && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Maternal Age",
    data: medical_info.maternalAge
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Genetic Disease in Mother",
    data: medical_info.motherGeneticDisease
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Genetic Disease in Father",
    data: medical_info.fatherGeneticDisease
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Genetic Disease in Sibling",
    data: medical_info.siblingGeneticDisease
  })), (hasPoc || hasCytoPrenatal) && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Consanguinity",
    data: medical_info.consanguinity
  })), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Family History of any chromosomal abnormality",
    data: medical_info.familyHistory
  })), (hasNipt || hasPns) && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Present pregnancy",
    data: medical_info.presentPregnancy
  }), medical_info.presentPregnancy == "Twins" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Twin type",
    data: medical_info.twinType
  })), medical_info.presentPregnancy == "Twins" && medical_info.twinType == "Monochorionic" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Monochorionic Type",
    data: medical_info.monochorionicType
  })), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Gravida",
    data: medical_info.Gravida
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Para",
    data: medical_info.Para
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Abortion",
    data: medical_info.Abortion
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Live",
    data: medical_info.Live
  })), !hasCyto && medical_info.referralReason && medical_info.referralReason.length > 0 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, medical_info.referralReason.map((reason, index) => {
    return /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
      title: "Referral Reason ".concat(index + 1),
      data: reason.value ? reason.value : reason
    });
  })), hasCyto && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, medical_info.referralReason.map(reason => {
    if (reason == "Advance Maternal Age") {
      return /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
        title: "Advance Maternal Age",
        data: medical_info.advanceMaternalAge
      });
    } else if (reason == "Genetic Disease in Father/Mother/Sibling") {
      return /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
        title: "Genetic Disease in Father/Mother/Sibling",
        data: medical_info.geneticDiseaseInFMS
      });
    } else if (reason == "Consanguinity") {
      return /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
        title: "Consanguinity",
        data: medical_info.consanguinity
      });
    } else if (reason == "Others") {
      return /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
        title: "Others",
        data: medical_info.Others
      });
    }
  })), hasNipt && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, medical_info.presentPregnancy == "Twins" && /*#__PURE__*/_react.default.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "foem-group mb-0"
  }, "Sex Chromosome Aneuploidies will not be reported for twin cases")), medical_info.presentPregnancy == "Vanishing Twin" && /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Date on which the other twin had vanished/ reduced",
    data: medical_info.dateOfTwinVanishOrReduced,
    isDate: true
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "IVF Pregnancy",
    data: medical_info.ivfPregnancy
  }), medical_info.ivfPregnancy == "Yes" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Egg used",
    data: medical_info.eggUsed
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Age at egg retrieval",
    data: medical_info.ageAtEggRetrieval
  })), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Surrogate",
    data: medical_info.surrogate
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Previous pregnancy",
    data: medical_info.previousPregnancy
  }), medical_info.previousPregnancy == "Yes" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Previous pregnancy Date",
    data: medical_info.prevPregDate,
    isDate: true
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Spontaneous Abortion",
    data: medical_info.spontaneousAbortion
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Termination of pregnancies",
    data: medical_info.terminationPregnancy
  })), medical_info.referralReason.length > 0 && medical_info.referralReason.map(reason => reason.value == "previous pregnancy affected by genetic disorders" ? /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Name of condition that affected previous\r pregnancy",
    data: medical_info.conditionAffectsPreviousPregnancy
  }) : reason.value == "patient is a carrier of genetic disorders" ? /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Name of condition that the patient is a\r carrier of",
    data: medical_info.conditionPatientIsCarrierOf
  }) : reason.value == "serum screen risk" ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "T21 risk score",
    data: medical_info.t21RiskScore
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "T18 risk score",
    data: medical_info.t18RiskScore
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "T13 risk score",
    data: medical_info.t13RiskScore
  })) : reason.value == "family history" ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "family history",
    data: medical_info.familyHistory
  })) : reason.value == "others" ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Other Referral Reason",
    data: medical_info.otherReferralReason
  })) : "")), hasPns && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "FMF ID",
    data: medical_info.fmfId
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "LMP",
    data: medical_info.lmpDate,
    isDate: true
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "USG/Corr EDD",
    data: medical_info.usgCorrEddDate,
    isDate: true
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "LMP Certainity",
    data: medical_info.lmpCertainity
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "History of Down Syndrome",
    data: medical_info.historyOfDownSyndrome
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Confirmatory Test for Hisotry of Down Syndrome",
    data: medical_info.confirmatoryTestHDS
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "History of Edward's Syndrome ONTD",
    data: medical_info.historyOfEdwardsSyndrome
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Confirmatory Test for Hisotry of Edward Syndrome",
    data: medical_info.confirmatoryTestHES
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Confirmatory Test for Hisotry of Patau Syndrome",
    data: medical_info.confirmatoryTestHPS
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "History of Patau Syndrome ONTD",
    data: medical_info.historyOfPatauSyndrome
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Diabetes Status (Insulin Dependent)",
    data: medical_info.diabetesInsulinDependent
  }), medical_info.diabetesInsulinDependent == "Yes" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Time Of diabetes",
    data: medical_info.timeOfDiabetes
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Gestational",
    data: medical_info.gestational
  })), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Patient on HCG",
    data: medical_info.patientOnHcg
  }), medical_info.patientOnHcg == "Yes" && /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Last date of HCG intake",
    data: medical_info.hcgIntakeDate,
    isDate: true
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Bleeding/Spotting in last two weeks",
    data: medical_info.bleedingOrSpottingTwoWeeks
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Type of conception",
    data: medical_info.typeOfConception
  }), medical_info.typeOfConception == "Assisted" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Type of procedure",
    data: medical_info.typeOfProcedure
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Extraction date",
    data: medical_info.extractionDate,
    isDate: true
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Transfer date",
    data: medical_info.transferDate,
    isDate: true
  }), medical_info.typeOfProcedure == "Donor" && /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Donor DOB",
    data: medical_info.donorDob
  })), testTrimester == "First" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, medical_info.presentPregnancy != "Twins" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "CRL (in mm)",
    data: medical_info.crl
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "NT (in mm)",
    data: medical_info.nt
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "NB",
    data: medical_info.nb
  }))), medical_info.presentPregnancy == "Twins" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Twin-1: CRL (in mm)",
    data: medical_info.twinCrl1
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Twin-2: CRL (in mm)",
    data: medical_info.twinCrl2
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Twin-1: NT (in mm)",
    data: medical_info.twinNt1
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Twin-2: NT (in mm)",
    data: medical_info.twinNt2
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Twin-1: NB",
    data: medical_info.twinNb1
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Twin-2: NB",
    data: medical_info.twinNb2
  })), hasPreEclampsiaTest && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, medical_info.bpOrMap == "BP" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "BP Measurement Date",
    data: medical_info.bpMeasurementDate,
    isDate: true
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "BP Left Arm - Systolic Reading 1",
    data: medical_info.bpLeftSystolic1
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "BP Left Arm - Diastolic Reading 1",
    data: medical_info.bpLeftDiSystolic1
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "BP Left Arm - Systolic Reading 2",
    data: medical_info.bpLeftSystolic2
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "BP Left Arm - Diastolic Reading 2",
    data: medical_info.bpLeftDiSystolic2
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "BP Right Arm - Systolic Reading 1",
    data: medical_info.bpRightSystolic1
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "BP Right Arm - Diastolic Reading 1",
    data: medical_info.bpRightDiSystolic1
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "BP Right Arm - Systolic Reading 2",
    data: medical_info.bpRightSystolic2
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "BP Right Arm - Diastolic Reading 2",
    data: medical_info.bpRightDiSystolic2
  })), medical_info.bpOrMap == "MAP" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: " MAP Reading-1",
    data: medical_info.mapReading1
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "MAP Reading-2",
    data: medical_info.mapReading2
  })), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Family History of Pre-eclampsia",
    data: medical_info.familyHistoryPreEclampsia
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Chronic Hypertension",
    data: medical_info.chronicHypertension
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Uterine Artery Pulsative Index - Right PI",
    data: medical_info.uterineArteryPulsativeIndexRightPI
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Uterine Artery Pulsative Index - Left PI",
    data: medical_info.uterineArteryPulsativeIndexLeftPI
  })), testTrimester == "Second" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, medical_info.bpd && /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "BPD mm",
    data: medical_info.bpd
  }), medical_info.fl && /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "FL mm",
    data: medical_info.fl
  }), medical_info.hc && /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "HC mm",
    data: medical_info.hc
  }), medical_info.dateOfScan && /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Date of Scan",
    data: medical_info.dateOfScan,
    isDate: true
  }), medical_info.crl && /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Crl",
    data: medical_info.crl
  }))), from == "Confirmation" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, props.fileUpload && /*#__PURE__*/_react.default.createElement(_DisplayFiles.default, {
    for: "Confirmation",
    files: props.fileUpload.files,
    filesUploaded: props.filesUploaded
  })), from == "Dashboard" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_DisplayFiles.default, {
    for: "Dashboard",
    files: props.files,
    filesUploaded: props.filesUploaded
  }), /*#__PURE__*/_react.default.createElement(_DisplayFiles.default, {
    for: "Dashboard",
    files: props.reports,
    filesUploaded: [{
      variable: "reports",
      display: "Reports"
    }]
  })))), from == "Confirmation" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "card p-3",
    style: {
      'box-shadow': 'none'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    class: "section-title mb-1 mt-0"
  }, "Sample Info:"), test_info.selectedTests.map((test, id) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-12 col-md-6"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "col-form-label col-sm-6"
  }, /*#__PURE__*/_react.default.createElement("b", null, "Test name : ", test.test_name)))), /*#__PURE__*/_react.default.createElement("div", {
    className: "row mb-2"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-12 col-md-6"
  }, sample_info.sampleContainerList[id].containers.map((test, container_id) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "row mb-1"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-6"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "form-control",
    style: {
      height: "auto"
    }
  }, "Sample Container ID: ", test.id))), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-6"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "form-control",
    style: {
      height: "auto"
    }
  }, "Sample Container ID: ", test.id))))))), test.pcpndt && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !sample_info.collectionLocation[id].location.hasOwnProperty("institute") ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    class: "section-title mb-1 mt-4 col-12"
  }, "Location"), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Address",
    data: sample_info.collectionLocation[id].location.address
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "Pincode",
    data: sample_info.collectionLocation[id].location.pinCode
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "City",
    data: sample_info.collectionLocation[id].location.city && sample_info.collectionLocation[id].location.city.value
  }), /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
    title: "State",
    data: sample_info.collectionLocation[id].location.state && sample_info.collectionLocation[id].location.state.value
  }))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-6"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "col-form-label col-sm-6 text-sm-right"
  }, /*#__PURE__*/_react.default.createElement("b", null, "Location")), /*#__PURE__*/_react.default.createElement("label", {
    className: "col-form-label col-sm-6"
  }, "Institute Location")))), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-12 col-md-12"
  }, sample_info.pcpndtList && /*#__PURE__*/_react.default.createElement("div", {
    className: "section-title mb-1 mt-4 col-12"
  }, "PCPNDT SCAN"), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-6"
  }, sample_info.pcpndtList[id].scans.map((name, container_id) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "row mb-1"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-10"
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: name.location
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
  }, name.name ? name.name : name.originalname ? name.originalname : name.displayName))))))))))))))), from == "Dashboard" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "card p-3",
    style: {
      'box-shadow': 'none'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    class: "section-title mb-2 mt-0"
  }, "Test Information:"), /*#__PURE__*/_react.default.createElement("div", {
    className: "row mb-2"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-12 col-md-12"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "col-form-label col-sm-6"
  }, /*#__PURE__*/_react.default.createElement("b", null, test_info.test_name)))), sample_info.samples.map((sample, index) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "row mt-2 ml-2"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "row ml-2"
  }, /*#__PURE__*/_react.default.createElement("div", {
    class: "section-title mb-1 mt-0"
  }, "Sample ", index + 1)), /*#__PURE__*/_react.default.createElement("div", {
    className: "row mb-1 ml-1 mr-1"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-6"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "form-control",
    style: {
      height: "auto"
    }
  }, "Sample  Type: ", sample.sample_type)), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-6"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "form-control",
    style: {
      height: "auto"
    }
  }, "Sample  status: ", sample.status)), sample.containers.map(sampleDetail => /*#__PURE__*/_react.default.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "form-control",
    style: {
      height: "auto"
    }
  }, "Sample Container-Type: ", sampleDetail.type), /*#__PURE__*/_react.default.createElement("label", {
    className: "form-control",
    style: {
      height: "auto"
    }
  }, "Sample Container Id: ", sampleDetail.id)))))))))))), from == "Confirmation" && /*#__PURE__*/_react.default.createElement("div", {
    className: "card p-3",
    style: {
      'box-shadow': 'none'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    class: "section-title mb-2 mt-0"
  }, "Payment Details:"), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-6"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("b", null, "Selected Tests")))), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-6"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("b", null, "Price"))))), /*#__PURE__*/_react.default.createElement("hr", {
    className: "mb-2 mt-0"
  }), test_info.selectedTests.map((test, id) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "row mb-1"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-6"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, /*#__PURE__*/_react.default.createElement("label", null, test.display_test_name))), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-6"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, /*#__PURE__*/_react.default.createElement("label", null, payment.price_entered[id].mrp)))))), /*#__PURE__*/_react.default.createElement("hr", {
    className: "mb-1 mt-1"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-6"
  }, /*#__PURE__*/_react.default.createElement("div", {
    class: "section-title mb-4 mt-0"
  }, /*#__PURE__*/_react.default.createElement("b", null, "Total"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-6"
  }, /*#__PURE__*/_react.default.createElement("div", {
    class: "section-title mb-4 mt-0"
  }, /*#__PURE__*/_react.default.createElement("b", null, /*#__PURE__*/_react.default.createElement("i", {
    class: "fas fa-rupee-sign",
    style: {
      'font-size': '16px'
    }
  }), " ", props.totalMrp)))))), from == "Dashboard" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "card p-3",
    style: {
      'box-shadow': 'none'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    class: "section-title mb-2 mt-0"
  }, "Payment Details:"), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-6"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("b", null, "Pays To")))), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-6"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("b", null, payment.paysTo)))), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-6"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("b", null, "Amount")))), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-6"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("b", null, payment.mrp))))))))))));
};

var _default = Summary;
exports.default = _default;