"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactSelect = _interopRequireDefault(require("react-select"));

var _formik = require("formik");

var _reactBootstrap = require("react-bootstrap");

var _axios = _interopRequireDefault(require("axios"));

var _async = _interopRequireDefault(require("react-select/async"));

var _moment = _interopRequireDefault(require("moment"));

var _antd = require("antd");

var _round_off = _interopRequireDefault(require("../../helper/round_off"));

var _test = require("../../actions/test");

var _reactRedux = require("react-redux");

var _formData = require("../../actions/formData");

var _form = _interopRequireDefault(require("../../reducers/form"));

var _Auth = _interopRequireDefault(require("../../helper/Auth"));

var _commonHelper = require("../../helper/commonHelper");

var _jsCookie = _interopRequireDefault(require("js-cookie"));

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

const TestDetails = props => {
  const [currentDateTime, setCurrentDateTime] = (0, _react.useState)((0, _moment.default)().format("YYYY-MM-DDThh:mm"));
  const [selectedTests, setSelectedTests] = (0, _react.useState)([]);
  const [selectedTest, setSelectedTest] = (0, _react.useState)("");
  const [showNoTestSelectedErrorMessage, setShowNoTestSelectedErrorMessage] = (0, _react.useState)(false);
  const [isSelectedTestsEmpty, setIsSelectedTestsEmpty] = (0, _react.useState)(true);
  const [showInputRequiredError, setShowInputRequiredError] = (0, _react.useState)(false);
  const [showSpecimenNotSelectedError, setShowSpecimenNotSelectedError] = (0, _react.useState)(false);
  const [doctorCategory, setDoctorCategory] = (0, _react.useState)("");
  const [sampleType, setSampleType] = (0, _react.useState)("");
  const [sampleSubType, setSampleSubType] = (0, _react.useState)("");
  const [, reRender] = (0, _react.useState)();
  const [homeCollectionLocation, setHomeCollectionLocation] = (0, _react.useState)();
  const [show, setShow] = (0, _react.useState)(false);
  const [trimesterAllowed, setTrimesterAllowed] = (0, _react.useState)("");

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const getDoctor = id => {
    if (props.formDataRedux.hasOwnProperty()) {
      const formValues = props.formDataRedux;
      setDoctorCategory(formValues.doctor_info.doctorName.testType);
    }
  };

  (0, _react.useEffect)(() => {
    getDoctor();

    if (props.formDataRedux.test_info && selectedTests.length == 0) {
      console.log("PREFILLING VALUE");
      getPrefilledSelectTests(props.formDataRedux.test_info.selectedTests);
    }
  }, [getDoctor]); // !!!!!!!!!!!!!!~~~~~~~~~~~~~~~~~~~~~~~~~~~ FROM ADMIN PANEL ~~~~~~~~~~~~~~~~~~~~~~~~~~~~!!!!!!!!!!!!!!!

  const handleOnClickSave = async () => {
    if (selectedTests.length <= 0) {
      return (0, _commonHelper.errorMessage)("Please select a test to save or proceed");
    }

    let data = {};
    let formData = new FormData();
    data.dtrf_id = props.Token.dtrfToken;
    formData.append("dtrf_id", JSON.stringify(data.dtrf_id));
    data.dtrf = props.formDataRedux;
    data.dtrf.test_info = {
      selectedTests,
      dateOfCollection: currentDateTime
    };
    formData.append("dtrf", JSON.stringify(data.dtrf));
    props.setFormData(data.dtrf);
    const response = await props.handleOnClickSave(data.dtrf);

    if (response.status == 200) {
      (0, _commonHelper.successMessage)("Form Saved");
    } else {
      (0, _commonHelper.errorMessage)("Error in saving Form");
    }
  }; // !!!!!!!!!!!!!!~~~~~~~~~~~~~~~~~~~~~~~~~~~ FROM ADMIN PANEL CLOSE ~~~~~~~~~~~~~~~~~~~~~~!!!!!!!!!!!!!!!!!


  const handleOnTestInputChange = async test => {
    if (props.fromDashBoard) {
      console.log("TESTDETAILS DASHBOARD", props.testDetails);

      if (test.length > 2) {
        const url = process.env.NEXT_PUBLIC_TEST_SEARCH; // const url = "http://65.1.45.74:8187/v1/test/search"

        const search = {
          search_string: test,
          sub_group: props.testDetails.test_info.sub_group,
          sample_type: props.testDetails.test_info.sampleType,
          container_type: props.testDetails.test_info.container_type[0].value,
          trimester_test: props.testDetails.test_info.trimester_test
        };
        const searchedTestList = await (0, _Auth.default)(url, "POST", search, {
          superDtrf: props.fromSuperDtrf,
          dtrfFront: props.fromDtrfFront ? props.fromDtrfFront : props.fromDashBoard
        });
        console.log("SEARCHED TEST LIST RESPONSE", searchedTestList); // const searchedTestList = await axios.post(url, search, config)

        return searchedTestList.data.data.testSearchList;
      }
    } else {
      if (test.length > 2) {
        const url = process.env.NEXT_PUBLIC_TEST_SEARCH; // const url = "http://65.1.45.74:8187/v1/test/search"

        const search = {
          search_string: test,
          practice_type: props.formDataRedux.doctor_info.doctorName.practice_type
        };
        const searchedTestList = await (0, _Auth.default)(url, "POST", search, {
          superDtrf: props.fromSuperDtrf,
          dtrfFront: props.fromDtrfFront
        });
        console.log("SEARCHED TEST LIST RESPONSE", searchedTestList); // const searchedTestList = await axios.post(url, search, config);

        return searchedTestList.data.data.testSearchList;
      }
    }
  };

  const handleTestChange = test => {
    console.log(test);
    setSelectedTest(test);

    if (props.formDataRedux) {
      let data = props.formDataRedux;

      if (props.formDataRedux.medical_info) {
        data.medical_info = null;
      }

      if (props.formDataRedux.payment) {
        data.payment = null;
      }

      props.setFormData(data);
    }
  };

  const handleOnClickPrevious = () => {
    console.log("props", props);
    console.log(props.handleOnClickPrevious);
    props.handleOnClickPrevious();
    props.previousStep();
  };

  const handleOnClickNext = () => {
    if (!currentDateTime) {
      return;
    }

    if (selectedTests.length == 0) {
      setShowNoTestSelectedErrorMessage(true);
      return;
    }

    props.handleOnClickNext("test_info", {
      selectedTests,
      dateOfCollection: currentDateTime
    });
    props.nextStep();
  };

  const handleRemoveTest = test => {
    if (props.fromDashBoard) {
      props.handleNewSelectedTestsForDashboard(null);
    }

    if (selectedTests.length == 1) {
      setIsSelectedTestsEmpty(true);
      setShowInputRequiredError(true);
      setSelectedTest("");
    }

    selectedTests.splice(test.target.value, 1);

    if (selectedTests.length == 1 && selectedTests[0].trimester_test) {
      console.log("INSIDE REMOVE TEST");

      if (selectedTests[0].trimester_test == "Both") {
        setTrimesterAllowed("");
      } else {
        setHplcExist(false);
      }
    }

    console.log("TEST", test.target.value);
    console.log("after remove", selectedTests);
    setSelectedTests(selectedTests);
    props.getSelectedTestsAction(selectedTests);
    console.log("getSelectionTestAction");

    if (props.formDataRedux.medical_info && props.formDataRedux.medical_info.sample_info) {
      let data = props.formDataRedux;
      data.medical_info.sample_info = null;
      props.setFormData(data);
    }

    reRender({});
  }; // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Prefilled Select Test~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  const getPrefilledSelectTests = data => {
    console.log(data);
    setSelectedTests(data);

    if (data.length > 0) {
      if (data[0].sub_group == "PNS") {
        if (data.length == 1) {
          if (data[0].trimester_test != "Both") {
            setTrimesterAllowed(data[0].trimester_test);
          } else {
            setHplcExist(true);
            setTrimesterAllowed("");
          }
        } else {
          data.map(test => {
            if (test.trimester_test == "Both") {
              setHplcExist(true);
            }

            if (test.trimester_test == "First") {
              setTrimesterAllowed(test.trimester_test);
            }

            if (test.trimester_test == "Second") {
              setTrimesterAllowed(test.trimester_test);
            }
          });
        }
      }
    }

    setShowNoTestSelectedErrorMessage(false);

    if (data[0]) {
      setHomeCollectionLocation(data[0].home_collection_possible);
    }
  }; // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CLOSE prefilled select TEst CLOSE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  const [allowedTrimesterTest, setAllowedTerimesterTest] = (0, _react.useState)(null);
  const [hplcExist, setHplcExist] = (0, _react.useState)(false);

  const handelTestAddClick = () => {
    if (!selectedTest) {
      return;
    }

    if (props.fromDashBoard) {
      if (!selectedTest) {
        return;
      }

      if (selectedTests.length >= 1) {
        return props.handleNewSelectedTestsForDashboard(selectedTests);
      }

      selectedTests.push(_objectSpread(_objectSpread({}, selectedTest), {}, {
        hasExtra: false
      }));
      setSelectedTests(selectedTests);
      setSelectedTest("");
      return handleTestAdd(selectedTests);
    }

    if (selectedTest._id) {
      const gotTest = selectedTests.find(t => t._id === selectedTest._id);

      if (gotTest) {
        (0, _commonHelper.errorMessage)("Test already exists");
        return;
      }

      if (selectedTest.sub_group == "CYTO" || selectedTest.sub_group == "CMA") {
        setShow(true);
      } else if (selectedTest.sub_group == "PNS" || selectedTest.sub_group == "NIPT") {
        if (selectedTest.trimester_test == "Both") {
          let first = false;
          let second = false;
          const testAllowed = selectedTests.map(test => {
            if (test.trimester_test == "First") {
              setTrimesterAllowed("First");
              return "First";
            }

            if (test.trimester_test == "Second") {
              setTrimesterAllowed("Second");
              return "Second";
            }

            return false;
          });

          if (testAllowed.includes("First")) {
            first = true;
          }

          if (testAllowed.includes("Second")) {
            second = true;
          }

          if (first) {
            setTrimesterAllowed("First");
          }

          if (second) {
            setTrimesterAllowed("Second");
          }

          if (first && second) {
            return (0, _commonHelper.errorMessage)("FIRST AND SECOND TRIMESTER EXIST TOGETHER");
          }

          setHplcExist(true);
          return setShow(true);
        }

        if (hplcExist) {
          console.log("INSIDE HPLC EXIST");
          let first = false;
          let second = false;
          let allowedTest;
          const testAllowed = selectedTests.map(test => {
            if (test.trimester_test == "First") {
              setTrimesterAllowed("First");
              return "First";
            }

            if (test.trimester_test == "Second") {
              setTrimesterAllowed("Second");
              return "Second";
            }

            return false;
          });

          if (testAllowed.includes("First")) {
            first = true;
            allowedTest = "First";
          }

          if (testAllowed.includes("Second")) {
            second = true;
            allowedTest = "Second";
          }

          if (first) {
            setTrimesterAllowed("First");
          }

          if (second) {
            setTrimesterAllowed("Second");
          }

          if (first && second) {
            return (0, _commonHelper.errorMessage)("FIRST AND SECOND TRIMESTER EXIST TOGETHER");
          }

          console.log("TEST ALLOWED", testAllowed);

          if (allowedTest) {
            if (allowedTest == selectedTest.trimester_test) {
              return setShow(true);
            } else {
              (0, _commonHelper.errorMessage)("Invalid Test");
            }
          }

          if (!allowedTest) {
            return setShow(true);
          }
        }

        setShow(true);
      } else if (selectedTest.sub_group == "NBS") {
        setShow(true);
      } else {
        if (props.formDataRedux.medical_info) {
          const fromValuesRedux = props.formDataRedux;
          fromValuesRedux.medical_info.sample_info = null; // props.setFormData(formValues)
        }

        selectedTests.push(_objectSpread(_objectSpread({}, selectedTest), {}, {
          hasExtra: false
        }));
        setSelectedTests(selectedTests);
        props.getSelectedTestsAction(selectedTests);
        setSelectedTest("");
        setShowNoTestSelectedErrorMessage(false);
        reRender({});
      }
    }
  };

  const HandleModalSave = values => {
    if (selectedTests.length <= 0) {
      setHomeCollectionLocation(selectedTest.home_collection_possible);

      if (selectedTest.sub_group == "PNS") {
        if (selectedTest.trimester_test != "Both") {
          setTrimesterAllowed(selectedTest.trimester_test);
        }
      }
    } else if (selectedTest.home_collection_possible !== homeCollectionLocation) {
      if (homeCollectionLocation) {
        (0, _commonHelper.errorMessage)("Only Non-Institute Collection Location is allowed");
      } else {
        (0, _commonHelper.errorMessage)("Only Institute Collection Location is allowed");
      }

      setShow(false);
      return false;
    } else if (selectedTest.sub_group == "PNS") {
      console.log("END CONDITION", trimesterAllowed);

      if (selectedTest.trimester_test != "Both") {
        if (trimesterAllowed) {
          if (selectedTest.trimester_test != trimesterAllowed) {
            setShow(false);
            return (0, _commonHelper.errorMessage)("Only ".concat(trimesterAllowed, " Trimester test allowed"));
          }
        }
      }
    } // if (selectedTest.sub_group == "CYTO" || selectedTest.sub_group == "CMA") {
    //   setSampleType(selectedTest.sample_category)
    // }


    if (selectedTest.sub_group == "PNS" || selectedTest.sub_group == "NIPT" || selectedTest.sub_group == "NBS") {
      console.log(true);
      selectedTests.push(_objectSpread(_objectSpread({}, selectedTest), values));
    } else if (selectedTest.sub_group == "CYTO" || selectedTest.sub_group == "CMA") {
      selectedTests.push(_objectSpread(_objectSpread({}, selectedTest), {}, {
        sampleType: values.sampleType,
        sampleSubType: values.sampleSubType,
        hasExtra: true
      }));
      console.log(" || selectedTest || ", selectedTests);
    }

    setSelectedTests(selectedTests);
    props.getSelectedTestsAction(selectedTests);
    setShow(false);
    setShowNoTestSelectedErrorMessage(false);

    if (props.fromDashBoard) {
      handleTestAdd(selectedTests);
    }

    setSelectedTest("");
  };

  const handleDateChange = e => {
    setCurrentDateTime(e.target.value);
  };

  const handleSampleTypeChange = e => {
    setSampleType(e.target.value);
    setSampleSubType("");
  };

  const handleSampleSubTypeChange = e => {
    setSampleSubType(e.target.value);
  };

  const handleTestAdd = tests => {
    if (tests.length == 0) {
      setShowNoTestSelectedErrorMessage(true);
      return;
    }

    props.handleNewSelectedTestsForDashboard(tests);
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(props.fromDashBoard ? "" : "customWrap")
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-12 col-12"
  }, /*#__PURE__*/_react.default.createElement("fieldset", {
    id: "valdatinStep1"
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal, {
    show: show,
    onHide: handleClose,
    size: "lg",
    "aria-labelledby": "contained-modal-title-vcenter",
    centered: true
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Header, {
    closeButton: true
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Title, null, selectedTest && selectedTest.test_name)), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Body, null, /*#__PURE__*/_react.default.createElement(_formik.Formik, {
    initialValues: {
      sampleType: "",
      sampleSubType: ""
    },
    validate: values => {
      const errors = {}; // if (selectedTest.sub_group == "CYTO" && !values.sampleType ){
      //   errors.sampleType = "Required";
      // }

      if (selectedTest.sub_group == "CYTO" || selectedTest.sub_group == "CMA") {
        if (!values.sampleType) {
          errors.sampleType = "Required";
        } else if (values.sampleType == "Product of Conception (POC)") if (!values.sampleSubType) {
          errors.sampleSubType = "Required";
        }
      }

      if (selectedTest.sub_group == "PNS") {
        if (!values.sampleType) {
          errors.sampleType = "Required";
        }
      }

      if (selectedTest.sub_group == "NBS") {
        if (!values.sampleType) {
          errors.sampleType = "Required";
        }
      }

      return errors;
    },
    onSubmit: (values, _ref) => {
      let {
        setSubmitting
      } = _ref;
      HandleModalSave(values);
    }
  }, _ref2 => {
    let {
      values
    } = _ref2;
    return /*#__PURE__*/_react.default.createElement(_formik.Form, null, (selectedTest.sub_group == "CYTO" || selectedTest.sub_group == "CMA") && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group mt-4"
    }, /*#__PURE__*/_react.default.createElement("div", {
      role: "group",
      "aria-labelledby": "my-radio-group1"
    }, values.sampleType == "Product of Conception (POC)" && /*#__PURE__*/_react.default.createElement("label", {
      className: "mb-2"
    }, /*#__PURE__*/_react.default.createElement("b", null, "Sample has to be given only in kits provided by Lilac")), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("label", {
      className: "mb-2"
    }, "Sample Type ", /*#__PURE__*/_react.default.createElement("span", {
      className: "marked"
    }, "*")), /*#__PURE__*/_react.default.createElement("br", null), selectedTest.sample_type.map((sample_type, id) => /*#__PURE__*/_react.default.createElement("div", {
      className: "pretty p-default p-round"
    }, /*#__PURE__*/_react.default.createElement(_formik.Field, {
      type: "radio",
      name: "sampleType",
      value: sample_type,
      onClick: handleSampleTypeChange
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "state"
    }, /*#__PURE__*/_react.default.createElement("label", null, sample_type))))), /*#__PURE__*/_react.default.createElement(_formik.ErrorMessage, {
      name: "sampleType",
      component: "div",
      className: "formErr"
    })), values.sampleType == "Product of Conception (POC)" && /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group mt-4"
    }, /*#__PURE__*/_react.default.createElement("div", {
      role: "group",
      "aria-labelledby": "my-radio-group1"
    }, /*#__PURE__*/_react.default.createElement("label", {
      className: "mb-2"
    }, "Sub Sample Type ", /*#__PURE__*/_react.default.createElement("span", {
      className: "marked"
    }, "*")), /*#__PURE__*/_react.default.createElement("br", null), selectedTest.sub_sample.map((sample_type, id) => /*#__PURE__*/_react.default.createElement("div", {
      className: "pretty p-default p-round"
    }, /*#__PURE__*/_react.default.createElement(_formik.Field, {
      type: "radio",
      name: "sampleSubType",
      value: sample_type,
      onClick: handleSampleSubTypeChange
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "state"
    }, /*#__PURE__*/_react.default.createElement("label", null, sample_type))))), /*#__PURE__*/_react.default.createElement(_formik.ErrorMessage, {
      name: "sampleSubType",
      component: "div",
      className: "formErr"
    })))), selectedTest.sub_group == "NBS" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group mt-4"
    }, /*#__PURE__*/_react.default.createElement("div", {
      role: "group",
      "aria-labelledby": "my-radio-group1"
    }, /*#__PURE__*/_react.default.createElement("label", {
      className: "mb-2"
    }, "Sample Type ", /*#__PURE__*/_react.default.createElement("span", {
      className: "marked"
    }, "*")), /*#__PURE__*/_react.default.createElement("br", null), selectedTest.sample_type.map((sampleType, id) => /*#__PURE__*/_react.default.createElement("div", {
      className: "pretty p-default p-round"
    }, /*#__PURE__*/_react.default.createElement(_formik.Field, {
      type: "radio",
      name: "sampleType",
      value: sampleType,
      onClick: handleSampleSubTypeChange
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "state"
    }, /*#__PURE__*/_react.default.createElement("label", null, sampleType))))), /*#__PURE__*/_react.default.createElement(_formik.ErrorMessage, {
      name: "sampleType",
      component: "div",
      className: "formErr"
    }))), (selectedTest.sub_group == "PNS" || selectedTest.sub_group == "NIPT") && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group mt-4"
    }, /*#__PURE__*/_react.default.createElement("div", {
      role: "group",
      "aria-labelledby": "my-radio-group1"
    }, selectedTest.sub_group == "PNS" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("label", {
      className: "mb-2"
    }, "Test Trimester : ", /*#__PURE__*/_react.default.createElement("b", null, selectedTest.trimester_test)), /*#__PURE__*/_react.default.createElement("br", null)), /*#__PURE__*/_react.default.createElement("label", {
      className: "mb-2"
    }, "Sample Type ", /*#__PURE__*/_react.default.createElement("span", {
      className: "marked"
    }, "*")), /*#__PURE__*/_react.default.createElement("br", null), selectedTest.sample_type.map((sample_type, id) => /*#__PURE__*/_react.default.createElement("div", {
      className: "pretty p-default p-round"
    }, /*#__PURE__*/_react.default.createElement(_formik.Field, {
      type: "radio",
      name: "sampleType",
      value: sample_type,
      onClick: handleSampleTypeChange
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "state"
    }, /*#__PURE__*/_react.default.createElement("label", null, sample_type))))), /*#__PURE__*/_react.default.createElement(_formik.ErrorMessage, {
      name: "sampleType",
      component: "div",
      className: "formErr"
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: "text-right"
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      className: "mr-2",
      variant: "secondary",
      onClick: handleClose
    }, "Cancel"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      variant: "primary",
      type: "submit"
    }, "Save")));
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-12 col-12"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "section-title mt-0"
  }, "Select Test:")), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-6 col-12"
  }, /*#__PURE__*/_react.default.createElement(_async.default, {
    isDisabled: props.fromSuperDtrf ? _jsCookie.default.get("roleAL") == "bdm" ? true : false : false,
    isClearable: true,
    cacheOptions: true,
    defaultOptions: true,
    value: selectedTest,
    getOptionLabel: e => e.display_test_name,
    getOptionValue: e => e._id,
    loadOptions: handleOnTestInputChange,
    onChange: handleTestChange // placeholder="Enter Test name"
    ,
    noOptionsMessage: () => 'Enter Test name'
  }), showNoTestSelectedErrorMessage && /*#__PURE__*/_react.default.createElement("div", {
    className: "formErr"
  }, "Required")), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-6 col-12text-left"
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    onClick: handelTestAddClick,
    className: "btn btn-primary mt-1"
  }, "Add Test"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "mt-4"
  }, selectedTests && selectedTests.length > 0 && selectedTests.map((test, id) => /*#__PURE__*/_react.default.createElement("div", {
    className: "card p-3"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-8 col-8"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "section-title mt-0"
  }, test.display_test_name)), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-4 col-4 text-right"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "custom-control custom-checkbox"
  }, /*#__PURE__*/_react.default.createElement("button", {
    value: id,
    onClick: handleRemoveTest,
    disabled: props.fromSuperDtrf ? _jsCookie.default.get("roleAL") == "bdm" ? true : false : false,
    type: "submit",
    className: "btn btn-xs btn-danger"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fas fa-times"
  }))))), test.description && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-8 col-8 mb-1"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "section-title mt-0 mb-0"
  }, "Description"), test.description))), /*#__PURE__*/_react.default.createElement("div", {
    role: "group",
    "aria-labelledby": "checkbox-group"
  }, (test.sub_group == "NIPT" || test.sub_group == "PNS" || test.sub_group == "NBS") && /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-lg-12 col-12"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, props.fromDashBoard ? /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("b", null, "Sample Type:"), " ", props.sampleType) : /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("b", null, "Sample Type:"), " ", test.sampleType)))), test.hasExtra && (test.sub_group == "CYTO" || test.sub_group == "CMA") && /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-lg-8 col-12 test-left"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("b", null, "Sample type :"), " ", test.sampleType))), test.sampleType == "Product of Conception (POC)" && /*#__PURE__*/_react.default.createElement("div", {
    className: "col-lg-8 col-12 test-left"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mb-0"
  }, /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("b", null, "Sub Sample type :"), " ", test.sampleSubType)))))))), props.fromDashBoard ? "" : /*#__PURE__*/_react.default.createElement("div", {
    className: "row",
    id: "action1"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-12 col-12 text-right"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: "5px 20px"
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    onClick: handleOnClickPrevious,
    className: "btn btn-primary mr-2"
  }, "Previous"), props.fromSuperDtrf && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !props.Token.isComplete && /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    onClick: () => handleOnClickSave(),
    className: "btn btn-primary mr-2"
  }, "Save")), /*#__PURE__*/_react.default.createElement("button", {
    onClick: handleOnClickNext,
    type: "submit",
    className: "btn btn-primary"
  }, "Next")))))))));
};

const mapStateToProps = state => ({
  formDataRedux: state.formData.formData,
  Token: state.Token
});

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  getSelectedTestsAction: _test.getSelectedTestsAction,
  setFormData: _formData.setFormData
})(TestDetails);

exports.default = _default;