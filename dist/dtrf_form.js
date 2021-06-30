"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _dtrf_basic = _interopRequireDefault(require("./components/dtrf_step_form/dtrf_basic"));

var _institute = _interopRequireDefault(require("./components/dtrf_step_form/institute"));

var _doctor_info = _interopRequireDefault(require("./components/dtrf_step_form/doctor_info"));

var _test_details = _interopRequireDefault(require("./components/dtrf_step_form/test_details"));

var _patient_details = _interopRequireDefault(require("./components/dtrf_step_form/patient_details"));

var _clinical_info = _interopRequireDefault(require("./components/dtrf_step_form/clinical_info"));

var _ChooseCollectionLocation = _interopRequireDefault(require("./components/dtrf_step_form/ChooseCollectionLocation"));

var _payment = _interopRequireDefault(require("./components/dtrf_step_form/payment"));

var _confirmation = _interopRequireDefault(require("./components/dtrf_step_form/confirmation"));

var _router = _interopRequireWildcard(require("next/router"));

var _reactBootstrap = require("react-bootstrap");

var _nav_bar = _interopRequireDefault(require("./components/nav_bar"));

var _side_bar = _interopRequireDefault(require("./components/side_bar"));

var _footer = _interopRequireDefault(require("./components/footer"));

var _store = _interopRequireDefault(require("./store"));

var _formData = require("./actions/formData");

var _reactRedux = require("react-redux");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactCookie = require("react-cookie");

var _styles = require("@material-ui/core/styles");

var _clsx = _interopRequireDefault(require("clsx"));

var _Stepper = _interopRequireDefault(require("@material-ui/core/Stepper"));

var _Step = _interopRequireDefault(require("@material-ui/core/Step"));

var _StepLabel = _interopRequireDefault(require("@material-ui/core/StepLabel"));

var _Check = _interopRequireDefault(require("@material-ui/icons/Check"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _nanoid = require("nanoid");

var _antd = require("antd");

var _fileupload = require("./actions/fileupload");

var _Auth = _interopRequireDefault(require("./helper/Auth"));

var _token = require("./actions/token");

var _authHOC = _interopRequireDefault(require("./components/authHOC"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const axios = require("axios");

let config = {
  headers: {
    token: process.env.NEXT_PUBLIC_TOKEN
  }
};

const Dtrf_form = props => {
  console.log("MAIN DTRF PROPS", props);
  const [, reRender] = (0, _react.useState)();
  const [cookies, setCookie] = (0, _reactCookie.useCookies)();
  const [loadData, setLoadData] = (0, _react.useState)(true);
  const [formValues, setFormValues] = (0, _react.useState)('');
  let [currentPage, setCurrentPage] = (0, _react.useState)(0);
  const [stepTitle, setStepTitle] = (0, _react.useState)("DTRF Basic Info");
  const [modalShow, setModalShow] = (0, _react.useState)(false);
  const [numberOfPageToggle, setNumberOfPageToggle] = (0, _react.useState)(7);
  const router = (0, _router.useRouter)();

  const getSavedDtrf = async () => {
    const url = process.env.NEXT_PUBLIC_GET_SUPER_DTRF + "/" + router.query.id;
    const res = await (0, _Auth.default)(url, "GET");
    console.log("router", router.query);
    console.log("response", res);

    if (res.data.data.dtrf.dtrf) {
      if (res.data.data.dtrf.bdm_id) {
        props.setSentToBdm(true);
      }

      if (res.data.data.dtrf.admin_status == "COMPLETE") {
        props.setIsComplete(true);
      }

      let pcpndtFiles = res.data.data.dtrf.dtrf.test_info.selectedTests.map(() => {
        return {
          scans: [],
          names: []
        };
      });
      props.getPcpndtFiles(pcpndtFiles);
      console.log("pcpndtFiles from getSavedDtrf", pcpndtFiles);

      if (res.data.data.dtrf.dtrf.medical_info && res.data.data.dtrf.dtrf.medical_info.medical_info.files) {
        if (res.data.data.dtrf.dtrf.medical_info.sample_info) {
          pcpndtFiles = res.data.data.dtrf.dtrf.medical_info.sample_info.pcpndtList;
        }

        console.log("pcpndtFiles from getSavedDtrf", pcpndtFiles);
        getFilesOnRedux(res.data.data.dtrf.dtrf.medical_info.medical_info.files, pcpndtFiles);
      }

      props.setFormData(res.data.data.dtrf.dtrf);
      setFormValues(res.data.data.dtrf.dtrf);

      if (res.data.data.dtrf.dtrf.patient_details) {
        props.getPatient_details(res.data.data.dtrf.dtrf.patient_details);
      }

      props.setDtrfToken(res.data.data.dtrf.dtrf_id);
    }
  };

  const getDtrfToken = () => {
    const dtrfToken = (0, _nanoid.nanoid)(10);
    props.setDtrfToken(dtrfToken);
  };

  (0, _react.useEffect)(() => {
    if (props.fromSuperDtrf) {
      if (router.query && router.query.id && !formValues) {
        getSavedDtrf();
      } else {
        setFormValues({});
        getDtrfToken();
      }
    } else {
      getDtrfToken();

      if (!formValues) {
        setFormValues({});
      }
    }
  }, []);

  const handleFormSubmit = form => {
    console.log(form);
  };

  const handleDontClose = () => {};

  const handleOkayButtonClick = () => {
    _router.default.push("/");
  }; //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~` New Stepper Open~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  const [activeStep, setActiveStep] = _react.default.useState(0);

  const handleOnClickPrevious = e => {
    window.scrollTo(0, 0);
    setCurrentPage(--currentPage);
    console.log("Root clickPrevious", currentPage);
    setStepTitleText(currentPage);
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    reRender({});
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const goToStep = step => {
    setCurrentPage(step);
    setStepTitleText(step);
    setActiveStep(step);
  };

  const errorMessage = msg => {
    _antd.message.error(msg);
  };

  const savePcpndtFilesOnRedux = () => {};

  const getFilesOnRedux = (files, pcpndtFiles) => {
    console.log("FILES", files);
    console.log("PCPNDTFILES", pcpndtFiles);
    const filesKey = Object.keys(files);
    filesKey.map((key, index) => {
      if (key == "PCPNDT") {
        let loop = 0;
        let pcpndt_list = [];
        pcpndtFiles.map(asd => {
          pcpndt_list.push({
            scans: [],
            names: [],
            noOfFiles: asd.noOfFiles
          });
        });
        pcpndtFiles.map((list, index) => {
          for (let i = loop; i < list.noOfFiles; i++) {
            let file = files.PCPNDT[i];
            file.saved = true;
            let name = files.PCPNDT[i].originalname;
            pcpndt_list[index].scans.push(file);
            pcpndt_list[index].names.push(name);
          }

          loop = list.noOfFiles;
        });
        console.log("PCPNDTFILES FROM DASHBOARD", pcpndt_list);
        props.getPcpndtFiles(pcpndt_list);
      } else {
        filesKey.map(file => {
          const savedFiles = files[key].map(data => {
            data.saved = true;
            return data;
          });
          props.getFiles({
            [key]: savedFiles
          });
        });
      }
    });
  };

  const handleOnClickSave = async (formValues, values) => {
    console.log(props.fileUpload);
    console.log("FORM VALUES BEFORE SAVING", formValues);
    const formData = new FormData();
    let deletedFiles = props.fileUpload.deletedFiles;

    if (deletedFiles.length > 0) {
      formData.append("deletedFiles", JSON.stringify(deletedFiles));
    }

    props.fileUpload.pcpndtFiles.map(test => {
      test.scans.map(file => {
        if (!test.saved) {
          formData.append("PCPNDT", file);
        }

        file.saved = true;
      });
    });
    const filesKey = Object.keys(props.fileUpload.files);
    filesKey.map((key, index) => {
      props.fileUpload.files[key].map(file => {
        if (!file.saved) {
          formData.append([key], file);
        }
      });
    });
    console.log(formData);
    formData.append("dtrf", JSON.stringify(formValues));
    formData.append("dtrf_id", JSON.stringify(props.Token.dtrfToken));
    const url = process.env.NEXT_PUBLIC_SAVE_INCOMPLETE_DTRF;
    const response = await (0, _Auth.default)(url, "POST", formData);

    if (response) {
      console.log("RESPONSE", response);
      let newFormData = formValues;

      if (response.data.data.files) {
        props.getClearDeleteFiles();

        if (formValues.medical_info) {
          if (formValues.medical_info.medical_info) {
            if (newFormData.medical_info) {
              newFormData.medical_info.medical_info.files = response.data.data.files;
            }
          }
        }

        getFilesOnRedux(response.data.data.files, props.fileUpload.pcpndtFiles);
      }

      console.log("NEW FORM DATA AFTER SAVING", newFormData);
      props.setFormData(newFormData);
    }

    return response;
  };

  const handleOnClickNext = async (page, values) => {
    window.scrollTo(0, 0);
    const dtrfFormData = props.formValues;

    if (page == "summery_page") {
      try {
        let formData = values;

        if (router.query.ref1) {
          dtrfFormData.followup = {};
          dtrfFormData.followup.followupForTest = router.query.ref1;
          dtrfFormData.followup.followupForDtrf = router.query.ref2;
        }

        dtrfFormData.ref_token = props.Token.refToken;
        dtrfFormData.dtrf_token = props.Token.dtrfToken;
        dtrfFormData.onlySaveDtrf = true;
        dtrfFormData.status = "Requested";
        const data = JSON.stringify(dtrfFormData);
        formData.append("formValues", data); // const response = await axios.post(process.env.NEXT_PUBLIC_DTRF_SAVE, { ...formValues, onlySaveDtrf: true, status: "Requested" }, config)

        const response = await axios.post(process.env.NEXT_PUBLIC_DTRF_SAVE, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response);

        if (response.data.message == "Success") {
          setModalShow(true);
        } else {
          errorMessage(response.data.message);
        }
      } catch (e) {
        console.log(e);
      }
    } else if (page == "patient_details" && formValues.collectionLocation.location == "Home") {
      console.log("HOME");
      goToStep(5);
      setCurrentPage(++currentPage);
      setStepTitleText(currentPage);
    } else if (true) {
      console.log("true");
      setCurrentPage(++currentPage);
      setStepTitleText(currentPage);
    }

    setFormValues(_objectSpread(_objectSpread({}, props.formValues), {}, {
      [page]: values
    }));
    props.setFormData(_objectSpread(_objectSpread({}, props.formValues), {}, {
      [page]: values
    }));
  };

  let Titles = ["Select Institute", "Select Doctor", "Select Test", "Collection Location", "Patient Information", "Clinical Information", "Payment", "Summary"];

  const setStepTitleText = pageNumber => {
    console.log("Set steptitle text", pageNumber);

    if (props.fromSuperDtrf) {
      setStepTitle(Titles[pageNumber]);
    } else {
      setStepTitle(Titles[pageNumber + 1]);
    }
  };

  const useQontoStepIconStyles = (0, _styles.makeStyles)({
    root: {
      color: '#eaeaf0',
      display: 'flex',
      height: 22,
      alignItems: 'center',
      padding: "0px"
    },
    active: {
      color: '#784af4'
    },
    circle: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor'
    },
    completed: {
      color: '#784af4',
      zIndex: 1,
      fontSize: 18
    }
  });

  function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const {
      active,
      completed
    } = props;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _clsx.default)(classes.root, {
        [classes.active]: active
      })
    }, completed ? /*#__PURE__*/_react.default.createElement(_Check.default, {
      className: classes.completed
    }) : /*#__PURE__*/_react.default.createElement("div", {
      className: classes.circle
    }));
  }

  QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: _propTypes.default.bool,

    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: _propTypes.default.bool
  };
  const useStyles = (0, _styles.makeStyles)(theme => ({
    root1: {
      width: '100%',
      padding: "0px"
    },
    button: {
      marginRight: theme.spacing(1)
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  }));

  function getSteps() {
    if (props.fromSuperDtrf) {
      return ["Institute Info", 'Doctor Info', 'Test Details', 'Choose collection', "patient Details", "Clinical History", "Payment", "Confirmation"];
    } else if (props.fromDtrfFront) {
      return ['Doctor Info', 'Test Details', 'Choose collection', "patient Details", "Clinical History", "Payment", "Confirmation"];
    }
  }

  const steps = getSteps();

  function getStepContent(step) {
    console.log("Step", step);

    if (props.fromSuperDtrf) {
      switch (step) {
        case 0:
          return /*#__PURE__*/_react.default.createElement(_institute.default, {
            fromSuperDtrf: props.fromSuperDtrf,
            nextStep: handleNext,
            previousStep: handleBack,
            handleOnClickPrevious: handleOnClickPrevious,
            handleOnClickNext: handleOnClickNext
          });

        case 1:
          return /*#__PURE__*/_react.default.createElement(_doctor_info.default, {
            fromSuperDtrf: props.fromSuperDtrf,
            nextStep: handleNext,
            previousStep: handleBack,
            handleOnClickPrevious: handleOnClickPrevious,
            handleOnClickNext: handleOnClickNext
          });

        case 2:
          return /*#__PURE__*/_react.default.createElement(_test_details.default, {
            fromSuperDtrf: props.fromSuperDtrf,
            handleOnClickSave: handleOnClickSave,
            nextStep: handleNext,
            previousStep: handleBack,
            formValues: formValues,
            handleOnClickPrevious: handleOnClickPrevious,
            handleOnClickNext: handleOnClickNext
          });
          ;

        case 3:
          return /*#__PURE__*/_react.default.createElement(_ChooseCollectionLocation.default, {
            fromSuperDtrf: props.fromSuperDtrf,
            handleOnClickSave: handleOnClickSave,
            nextStep: handleNext,
            previousStep: handleBack,
            handleOnClickPrevious: handleOnClickPrevious,
            handleOnClickNext: handleOnClickNext
          });

        case 4:
          return /*#__PURE__*/_react.default.createElement(_patient_details.default, {
            fromSuperDtrf: props.fromSuperDtrf,
            handleOnClickSave: handleOnClickSave,
            goToStep: goToStep,
            nextStep: handleNext,
            previousStep: handleBack,
            formValues: formValues,
            handleOnClickPrevious: handleOnClickPrevious,
            handleOnClickNext: handleOnClickNext
          });

        case 5:
          return /*#__PURE__*/_react.default.createElement(_clinical_info.default, {
            fromSuperDtrf: props.fromSuperDtrf,
            handleOnClickSave: handleOnClickSave,
            nextStep: handleNext,
            previousStep: handleBack,
            formValues: formValues,
            handleOnClickPrevious: handleOnClickPrevious,
            handleOnClickNext: handleOnClickNext
          });

        case 6:
          return /*#__PURE__*/_react.default.createElement(_payment.default, {
            fromSuperDtrf: props.fromSuperDtrf,
            handleOnClickSave: handleOnClickSave,
            goToStep: goToStep,
            nextStep: handleNext,
            previousStep: handleBack,
            formValues: formValues,
            handleOnClickPrevious: handleOnClickPrevious,
            handleOnClickNext: handleOnClickNext
          });

        case 7:
          return /*#__PURE__*/_react.default.createElement(_confirmation.default, {
            fromSuperDtrf: props.fromSuperDtrf,
            handleOnClickSave: handleOnClickSave,
            nextStep: handleNext,
            previousStep: handleBack,
            formValues: formValues,
            handleOnClickPrevious: handleOnClickPrevious,
            handleOnClickNext: handleOnClickNext
          });

        default:
          return 'Unknown step';
      }
    } else if (props.fromDtrfFront) {
      switch (step) {
        case 0:
          return /*#__PURE__*/_react.default.createElement(_doctor_info.default, {
            fromDtrfFront: props.fromDtrfFront,
            nextStep: handleNext,
            previousStep: handleBack,
            handleOnClickPrevious: handleOnClickPrevious,
            handleOnClickNext: handleOnClickNext
          });

        case 1:
          return /*#__PURE__*/_react.default.createElement(_test_details.default, {
            fromDtrfFront: props.fromDtrfFront,
            nextStep: handleNext,
            previousStep: handleBack,
            formValues: formValues,
            handleOnClickPrevious: handleOnClickPrevious,
            handleOnClickNext: handleOnClickNext
          });
          ;

        case 2:
          return /*#__PURE__*/_react.default.createElement(_ChooseCollectionLocation.default, {
            fromDtrfFront: props.fromDtrfFront,
            nextStep: handleNext,
            previousStep: handleBack,
            handleOnClickPrevious: handleOnClickPrevious,
            handleOnClickNext: handleOnClickNext
          });

        case 3:
          return /*#__PURE__*/_react.default.createElement(_patient_details.default, {
            fromDtrfFront: props.fromDtrfFront,
            goToStep: goToStep,
            nextStep: handleNext,
            previousStep: handleBack,
            formValues: formValues,
            handleOnClickPrevious: handleOnClickPrevious,
            handleOnClickNext: handleOnClickNext
          });

        case 4:
          return /*#__PURE__*/_react.default.createElement(_clinical_info.default, {
            fromDtrfFront: props.fromDtrfFront,
            nextStep: handleNext,
            previousStep: handleBack,
            formValues: formValues,
            handleOnClickPrevious: handleOnClickPrevious,
            handleOnClickNext: handleOnClickNext
          });

        case 5:
          return /*#__PURE__*/_react.default.createElement(_payment.default, {
            fromDtrfFront: props.fromDtrfFront,
            goToStep: goToStep,
            nextStep: handleNext,
            previousStep: handleBack,
            formValues: formValues,
            handleOnClickPrevious: handleOnClickPrevious,
            handleOnClickNext: handleOnClickNext
          });

        case 6:
          return /*#__PURE__*/_react.default.createElement(_confirmation.default, {
            fromDtrfFront: props.fromDtrfFront,
            nextStep: handleNext,
            previousStep: handleBack,
            formValues: formValues,
            handleOnClickPrevious: handleOnClickPrevious,
            handleOnClickNext: handleOnClickNext
          });

        default:
          return 'Unknown step';
      }
    }
  }

  const classes = useStyles(); //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ New Stepper Close~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal, {
    show: modalShow,
    onHide: handleDontClose,
    size: "lg",
    "aria-labelledby": "contained-modal-title-vcenter",
    centered: true,
    "data-backdrop": "static"
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Body, null), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Header, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Title, null, "Your DTRF has been successfully submitted !")), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Footer, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "text-right"
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
    variant: "primary",
    type: "submit",
    onClick: handleOkayButtonClick
  }, "Okay")))), formValues && /*#__PURE__*/_react.default.createElement("div", {
    className: "main-content"
  }, /*#__PURE__*/_react.default.createElement("section", {
    className: "section"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "section-body"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "row clearfix"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "offset-md-2 col-md-8"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "card card-primary"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/_react.default.createElement("h4", null, stepTitle)), /*#__PURE__*/_react.default.createElement("div", {
    className: "row clearfix"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "customBloodWrap"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/_react.default.createElement(_Stepper.default, {
    alternativeLabel: true,
    activeStep: activeStep
  }, console.log("Active Step", activeStep), steps.map(label => /*#__PURE__*/_react.default.createElement(_Step.default, {
    key: label
  }, /*#__PURE__*/_react.default.createElement(_StepLabel.default, null))))), getStepContent(activeStep)))))))));
};

const mapStateToProps = state => ({
  Token: state.Token,
  formValues: state.formData.formData,
  fileUpload: state.fileUpload
});

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  setFormData: _formData.setFormData,
  setDtrfToken: _token.setDtrfToken,
  getClearDeleteFiles: _fileupload.getClearDeleteFiles,
  getFiles: _fileupload.getFiles,
  getPcpndtFiles: _fileupload.getPcpndtFiles,
  setSentToBdm: _token.setSentToBdm,
  setIsComplete: _token.setIsComplete,
  setFileUpload: _fileupload.setFileUpload,
  getPatient_details: _formData.getPatient_details
})(Dtrf_form); // export default Dtrf_formsesetIsComplete


exports.default = _default;