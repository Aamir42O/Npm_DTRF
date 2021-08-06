"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _formik = require("formik");

var _constants = require("../../public/constants");

var _reactSelect = _interopRequireDefault(require("react-select"));

var _moment = _interopRequireDefault(require("moment"));

var _reactRedux = require("react-redux");

var _form = _interopRequireDefault(require("../../reducers/form"));

var _fileupload = require("../../actions/fileupload");

var _CancelOutlined = _interopRequireDefault(require("@material-ui/icons/CancelOutlined"));

var _antd = require("antd");

var _jquery = require("jquery");

var _mySelect = _interopRequireDefault(require("../mySelect"));

var _DateField = _interopRequireDefault(require("../Fields/DateField"));

var _NumberField = _interopRequireDefault(require("../Fields/NumberField"));

var _Radio = _interopRequireDefault(require("../Fields/Radio"));

var _TextField = _interopRequireDefault(require("../Fields/TextField"));

var _FileUploadDisplay = _interopRequireDefault(require("../Fields/FileUploadDisplay"));

var _async = _interopRequireDefault(require("react-select/async"));

var _Auth = _interopRequireDefault(require("../../helper/Auth"));

var _commonHelper = require("../../helper/commonHelper");

var _formData = require("../../actions/formData");

var _router = _interopRequireDefault(require("next/router"));

var _customValidator = require("../../helper/customValidator");

var _CreateField = _interopRequireDefault(require("../CreateField"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const axios = require("axios");

const ClinicalHistory = props => {
  const [testList, setTestList] = (0, _react.useState)([]);
  const [instituteLocationRef, setInstituteLocationRef] = (0, _react.useState)([]);
  const [hasCyto, setHasCyto] = (0, _react.useState)(false);
  const [hasNipt, setHasNipt] = (0, _react.useState)(false);
  const [hasPns, setHasPns] = (0, _react.useState)(false);
  const [hasNbs, setHasNbs] = (0, _react.useState)(false);
  const [flowFields, setFlowFields] = (0, _react.useState)([]);
  const [, reRender] = (0, _react.useState)();
  const [hasCytoPrenatal, setHasCytoPrenatal] = (0, _react.useState)(false);
  const [testTrimester, setTestTrimester] = (0, _react.useState)("");
  const [isTwin, setIsTwin] = (0, _react.useState)(false);
  const [containerId, setContainerId] = (0, _react.useState)([]);
  const [containerIdValidationList, setContainerIdValidationList] = (0, _react.useState)([]);
  const [selectedContainerType, setSelectedContainerType] = (0, _react.useState)([]);
  const [sampleContainerList, setSampleContainerList] = (0, _react.useState)([]);
  const [containerIdErrors, showContainerIdErrors] = (0, _react.useState)(false);
  const [containerTypeErrors, showContainerTypeErrors] = (0, _react.useState)(false);
  const [pcpndtList, setPcpndtList] = (0, _react.useState)([]);
  const [collectionLocation, setCollectionLocation] = (0, _react.useState)([]);
  const [citiesAndStates, setCitiesAndStates] = (0, _react.useState)([]);
  const [pcpndtReference, setPcpndtReference] = (0, _react.useState)([]);
  const [hasPoc, setHasPoc] = (0, _react.useState)(false);
  const [hasPreEclampsiaTest, setHasPreEclampsiaTest] = (0, _react.useState)(false);
  const [prefilleReferrenceDoctor, setPrefilledReferrenceDoctor] = (0, _react.useState)("");
  const [prefilleReferrenceDoctorError, setPrefilledReferrenceDoctorError] = (0, _react.useState)("");
  const [sonoGrapherError, setSonographerError] = (0, _react.useState)("");
  const cytoRef = (0, _react.useRef)();
  const niptRef = (0, _react.useRef)();
  const pnsRef = (0, _react.useRef)();
  const inputFile = (0, _react.useRef)(null);
  const [gestationAgeStart, setGestationAgeStart] = (0, _react.useState)(0);
  const [gestationAgeEnd, setGestationAgeEnd] = (0, _react.useState)(0);
  const [currentGestDays, setCurrentGestDays] = (0, _react.useState)("");
  const [currentGestWeeks, setCurrentGestWeeks] = (0, _react.useState)("");
  const [selectedCity, setSelectedCity] = (0, _react.useState)({});
  const [selectedState, setSelectedState] = (0, _react.useState)({});
  const [tempData, setTempData] = (0, _react.useState)({});
  const [isDonor, setIsDonor] = (0, _react.useState)(false);
  const [sonographerName, setSonoGrapherName] = (0, _react.useState)("");
  const [isGyno, setIsGyno] = (0, _react.useState)(false);
  const [mandatoryFiles, setMandatoryFiles] = (0, _react.useState)([]);
  const [nonMandatoryFiles, setNonMandatoryFiles] = (0, _react.useState)([]);
  const [mandatoryFileReference, setMandatoryFileReference] = (0, _react.useState)([]);
  const [nonMandatoryFileReference, setNonMandatoryFileReference] = (0, _react.useState)([]);
  const [filesToUpload, setFilesToUpload] = (0, _react.useState)([]);
  const [fileUploadReference, setFileUploadReference] = (0, _react.useState)([]);
  const [containers, setContainers] = (0, _react.useState)(null);

  const handleReferrenceDoctorChange = async (doctor, from) => {
    console.log("DOCOTOR ", doctor.length > 2);
    console.log("INSIDE", process.env.NEXT_PUBLIC_ALL_REFERRAL_DOCTORS);

    if (doctor.length > 2) {
      console.log("INSIDE", process.env.NEXT_PUBLIC_ALL_REFERRAL_DOCTORS);
      let url = "".concat(process.env.NEXT_PUBLIC_ALL_DOCTORS, "?searchquery=").concat(doctor, "&").concat(from == "referringDoctor" ? "referring_doctor=1" : "sonographer=1");
      console.log("INSIDE condition", url);
      const resp = await (0, _Auth.default)(url, "GET", null, {
        superDtrf: props.fromSuperDtrf,
        dtrfFront: props.fromDtrfFront
      });
      console.log(resp);
      return resp.data.data.doctorSearchList;
    }
  };

  const getPrefilledReferenceDoctor = data => {
    console.log("data", data);
    const asd = {
      label: data.name.firstName + " " + data.name.lastName,
      value: data._id
    };
    console.log("prefilled Reference Doctor Name", asd);
    setPrefilledReferrenceDoctor(data);
  };

  const handleReferenceDoctorNameChange = e => {
    console.log(e);

    if (e) {
      e.value = e._id;
      e.label = e.name.firstName + " " + e.name.lastName;
      setPrefilledReferrenceDoctor(e);
      setPrefilledReferrenceDoctorError("");
    } else {
      setPrefilledReferrenceDoctor(null);
    }
  };

  const handleSonographerNameChange = e => {
    if (e) {
      e.value = e._id;
      e.label = e.name.firstName + " " + e.name.lastName;
      setSonoGrapherName(e);
      setSonographerError("");
    } else {
      setSonoGrapherName(null);
    }
  };

  const getMandatoryFiles = () => {
    let tempMandatoryFiles = [];
    let mandatory_Files = [];
    props.formDataRedux.test_info.selectedTests.map((test, id) => {
      if (test.mandatory_attachments) {
        test.mandatory_attachments.map(data => {
          if (id == 0) {
            tempMandatoryFiles.push(data.variable);
            mandatory_Files.push(data);
          } else {
            if (!tempMandatoryFiles.includes(data.variable)) {
              mandatory_Files.push(data);
            }
          }
        });
      }
    });
    console.log("mandatoryfiles", mandatory_Files);
    setMandatoryFiles(mandatory_Files);
    props.getMandatoryFilesInRedux(mandatory_Files);
  };

  const getFlowFields = async () => {
    const url = process.env.NEXT_PUBLIC_GET_FLOW_FIELDS;
    let formData = new FormData();
    formData.append("name", hasPns ? "1" : hasNipt ? "2" : hasCyto ? "3" : "4");
    const response = await (0, _Auth.default)(url, "POST", {
      name: hasPns ? "1" : hasNipt ? "2" : hasCyto ? "3" : "4"
    }, {
      dtrfFront: props.fromDtrfFront
    });

    if (response) {
      console.log("Response", response);
      setFlowFields([...response.data.data.flow]);
      reRender({});
    } else {
      (0, _commonHelper.errorMessage)("Error in getting Flow feilds");
    }
  };

  (0, _react.useEffect)(async () => {
    console.log("Props", props);

    if (props.formValues.doctor_info.doctorName.practice_type == "Gynaecologist-Obstetrician") {
      setIsGyno(true);
    }

    if (props.fileUpload.mandatoryFiles.length <= 0) {
      getMandatoryFiles();
    }

    if (props.formDataRedux.medical_info) {
      if (props.formDataRedux.medical_info.medical_info.referrenceDoctorName) {
        getPrefilledReferenceDoctor(props.formDataRedux.medical_info.medical_info.referrenceDoctorName);
      }

      if (props.formDataRedux.medical_info.medical_info.sonographer) {
        setSonoGrapherName(props.formDataRedux.medical_info.medical_info.sonographer);
      }

      if (props.formDataRedux.medical_info.sample_info) {
        if (props.formDataRedux.medical_info.sample_info && props.formDataRedux.medical_info.sample_info.collectionLocation.length == props.formDataRedux.test_info.selectedTests.length) {
          let asd = [];
          props.formDataRedux.medical_info.sample_info.collectionLocation.map((qwe, id) => {
            asd.push({
              city: qwe.location.city,
              state: qwe.location.state
            });
          });
          console.log(props.formValues.medical_info.sample_info.collectionLocation);
          setCollectionLocation(props.formValues.medical_info.sample_info.collectionLocation);
          console.log("!)(#*()!@*#)(!@*#)", asd);
          setCitiesAndStates(asd);
          reRender({});
        }
      }
    }

    if (testList.length == 0) {
      getTestList();
    }

    if (props.formDataRedux.medical_info) {
      setCurrentGestWeeks(props.formDataRedux.medical_info.medical_info.currentGestationalAgeWeeks);
      setCurrentGestDays(props.formDataRedux.medical_info.medical_info.currentGestationalAgeDays);
      console.log(props.formDataRedux.medical_info.currentGestationalAgeWeeks);
      console.log("Medical info exists", props.formDataRedux);

      if (props.formDataRedux.medical_info && props.formDataRedux.medical_info.sample_info) {
        setSampleContainerList(props.formDataRedux.medical_info.sample_info.sampleContainerList);
        setPcpndtList(props.pcpndtFiles);
        setPcpndtFiles(props.pcpndtFiles);
      }
    }
  }, [flowFields]);

  const handleCityChange = option => {
    console.log(option);
    citiesAndStates[id].city = option;
    console.log(citiesAndStates);
    setCitiesAndStates(citiesAndStates);
    reRender({});
  };

  const handleStateChange = (value, id) => {
    cityStateErrors[id].state = "";
    setCityStateErrors(cityStateErrors);
    citiesAndStates[id].state = value.label;
    setCitiesAndStates(citiesAndStates);
    console.log(value);
    reRender({});
  }; // ~~~~~~~~~~~~~~~~~~~~PREFILED VALUE~!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  const [prefilledData, setPrefilledData] = (0, _react.useState)(null);

  const getPrefilledValue = data => {
    if (data) {
      console.log("data", data);
      setPrefilledData(data);
      console.log(hasPns);
    }
  }; // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~PREFILED VALUE CLOSE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  const [isThalasammia, setIsThalasammia] = (0, _react.useState)(false);

  const getTestList = async () => {
    console.log("Insite GetTEstList");
    console.log("formValues", props.formValues); // const list = props.formDataRedux;

    const list = props.formValues;
    console.log("List", list);
    let name = "";
    let sampleContainers = [];
    let containerIdErrorsList = [];
    let containerIdValidation = [];
    let containerTypeErrorList = [];
    let containerIdList = [];
    let containerTypeList = [];
    let pcpndt_list = [];
    let pcpndtLocation = [];
    let pcpndtInputReference = [];
    let formsRef = [];
    let citysAndStates = [];
    let instituteRef = [];
    let cityStateError = [];
    let gestAgeStart = null;
    let gestAgeEnd = null;
    let twin = true;
    let mandatory_Files = [];
    let nonMandatory_Files = [];
    let tempMandatoryFiles = [];
    let tempNonMandatoryFiles = [];
    let mandatory_FileReference = [];
    let nonMandatory_FileReference = [];

    if (list) {
      if (list.test_info) {
        console.log("LIst", list.test_info);
        setTestList(list.test_info.selectedTests);
        list.test_info.selectedTests.map((test, id) => {
          sampleContainers.push({
            containers: []
          });
          containerIdErrorsList.push(false);
          containerIdValidation.push(false);
          containerTypeErrorList.push(false);
          containerIdList.push({
            value: ""
          });
          containerTypeList.push({
            value: ""
          });
          pcpndt_list.push({
            scans: [],
            names: []
          });
          pcpndtLocation.push({
            location: ""
          });
          pcpndtInputReference.push( /*#__PURE__*/(0, _react.createRef)());
          formsRef.push( /*#__PURE__*/(0, _react.createRef)());
          instituteRef.push( /*#__PURE__*/(0, _react.createRef)());

          if (test.mandatory_attachments) {
            test.mandatory_attachments.map(data => {
              if (id == 0) {
                tempMandatoryFiles.push(data.variable);
                mandatory_Files.push(data);
              } else {
                if (!tempMandatoryFiles.includes(data.variable)) {
                  mandatory_Files.push(data);
                }
              }
            });
          }

          if (test.non_mandatory_attachments) {
            test.non_mandatory_attachments.map(data => {
              if (id == 0) {
                tempNonMandatoryFiles.push(data.variable);
                nonMandatory_Files.push(data);
              } else {
                if (!tempNonMandatoryFiles.includes(data.variable) && !tempMandatoryFiles.includes(data.variable)) {
                  nonMandatory_Files.push(data);
                }
              }
            });
          }

          console.log("MANDATORRY FILES", mandatory_Files, tempMandatoryFiles);
          console.log("NON MANDATORY FILES", nonMandatory_Files, tempNonMandatoryFiles);

          if (props.formDataRedux.medical_info && test.sub_group != "CYTO" && test.sub_group != "CMA") {
            setReferralReason(props.formDataRedux.medical_info.medical_info.referralReason);
            console.log("INSIDE USE EFFECT", props.formDataRedux.medical_info.referralReason);
            getPrefilledValue(props.formDataRedux.medical_info.medical_info);
          }

          if (test.sub_group == "CYTO" || test.sub_group == "CMA") {
            console.log("SAmple Type", test.sampleType);
            name = "3";

            if (test.sample_category == "Prenatal") {
              setHasCytoPrenatal(true);
            }

            if (test.sample_category == "Product of conception(POC)") {
              setHasPoc(true);
            }

            setHasCyto(true);
          } else if (test.sub_group == "NIPT") {
            name = "2";

            if (test.twin_with_donor_egg) {
              setIsDonor(true);
            } else {
              setIsDonor(false);
            }

            cityStateError.push({
              state: "",
              city: "",
              location: ""
            });
            setCityStateErrors(cityStateError);
            setHasNipt(true);
            citysAndStates.push({
              city: "",
              state: ""
            });
          } else if (test.sub_group == "PNS") {
            name = "1";
            nonMandatory_Files.push({
              display: "XML File",
              variable: "xmlLicenseFile"
            });

            if (!test.twin) {
              setIsTwin(false);
              twin = false;
            } else {
              if (!twin) {
                setIsTwin(false);
              } else {
                setIsTwin(true);
              }
            }

            if (test.is_thalasseima) {
              setIsThalasammia(test.is_thalasseima);
            }

            if (!gestAgeStart && !gestAgeEnd) {
              gestAgeStart = test.gestation_age_start;
              gestAgeEnd = test.gestation_age_end;
            } else {
              if (gestAgeStart <= test.gestation_age_start) {
                gestAgeStart = test.gestation_age_start;
              }

              if (gestAgeEnd >= test.gestation_age_end) {
                gestAgeEnd = test.gestation_age_end;
              }
            }

            if (test.is_pre_eclampsia) {
              setHasPreEclampsiaTest(true);
            }

            setTestTrimester(test.trimester_test);
            setHasPns(true);

            if (props.formDataRedux.doctor_info.doctorName.category == "Gynecologist" && props.formDataRedux.medical_info) {
              setSonographer(props.formDataRedux.medical_info.medical_info.sonographer);
            }
          } else if (test.sub_group == "NBS") {
            name = "4";
            setHasNbs(true);
          }
        });
        mandatory_Files.map(() => mandatory_FileReference.push( /*#__PURE__*/(0, _react.createRef)()));
        nonMandatory_Files.map(() => nonMandatory_FileReference.push( /*#__PURE__*/(0, _react.createRef)()));
        setMandatoryFileReference(mandatory_FileReference);
        setMandatoryFiles(mandatory_Files);
        props.getMandatoryFilesInRedux(mandatory_Files);
        setNonMandatoryFiles(nonMandatory_Files);
        setNonMandatoryFileReference(nonMandatory_FileReference);
        setFilesToUpload([...mandatory_Files, ...nonMandatory_Files]);
        setFileUploadReference([...mandatory_FileReference, ...nonMandatory_FileReference]);
        props.getFilesToUpload([...mandatory_Files, ...nonMandatory_Files]);
        props.getFilesReference([...mandatory_FileReference, ...nonMandatory_FileReference]);
        console.log(" GEST START ", gestAgeStart);
        console.log("GEST END", gestAgeEnd);
        setGestationAgeStart(gestAgeStart);
        setGestationAgeEnd(gestAgeEnd);

        if (!props.formDataRedux.medical_info || props.formDataRedux.medical_info && !props.formDataRedux.medical_info.sample_info) {
          setPcpndtList(pcpndtList);
          props.getPcpndtFiles(pcpndt_list);
          setCitiesAndStates(citysAndStates);
          setCollectionLocation(pcpndtLocation);
          setPcpndtList(pcpndt_list);
        }

        setInstituteLocationRef(instituteRef);
        setMultipleFormRef(formsRef);
        setPcpndtReference(pcpndtInputReference);
        setContainerIdValidationList(containerIdValidation);
        setContainerId(containerIdList);
        setSelectedContainerType(containerTypeList);
        setSampleContainerList(sampleContainers);
        showContainerIdErrors(containerIdErrorsList);
        showContainerTypeErrors(containerTypeErrorList);

        if (!props.formDataRedux.medical_info || props.formDataRedux.medical_info && !props.formDataRedux.medical_info.sample_info) {
          setPcpndtList(pcpndt_list);
        } else {
          setPcpndtList(props.pcpndtFiles);
        }

        let sampleList = [];

        for (let i = 0; i < list.test_info.selectedTests.length; i++) {
          const test = list.test_info.selectedTests[i];
          sampleList.push({
            sampleType: test.sampleType,
            test_group: test.test_group
          });
        }

        let url = process.env.NEXT_PUBLIC_GET_CONTAINERS;
        const response = await (0, _Auth.default)(url, "POST", {
          samples: sampleList
        }, {
          dtrfFront: props.fromDtrfFront,
          superDtrf: props.fromSuperDtrf
        });
        const containers = response.data.data.samples.map((e, i) => {
          return e.containers && e.containers.display_container_name.map((container, id) => {
            containerTypeList[i] = {
              id,
              value: container,
              label: container
            };
            setSelectedContainerType(containerTypeList);
            return {
              id,
              value: container,
              label: container
            };
          });
        });
        setContainers(containers);
        const url2 = process.env.NEXT_PUBLIC_GET_FLOW_FIELDS;
        let formData = new FormData();
        formData.append("name", hasPns ? "1" : hasNipt ? "2" : hasCyto ? "3" : "4");
        const resp = await (0, _Auth.default)(url2, "POST", {
          name
        }, {
          dtrfFront: props.fromDtrfFront
        });

        if (resp) {
          console.log("resp", resp);
          setFlowFields([...resp.data.data.flow]);
          reRender({});
        } else {
          (0, _commonHelper.errorMessage)("Error in getting Flow feilds");
        }

        console.log("$$$$$$$$$$$$$$$$\n", containers); // const getContainers = axios.post(process.env.NEXT_PUBLIC_GET_CONTAINERS, { samples: sampleList })
        //   .then((response) => {
        //     const containers = response.data.data.samples.map((e, i) => {
        //       return e.containers && e.containers.display_container_name.map((container, id) => {
        //         containerTypeList[i] = { id, value: container, label: container }
        //         setSelectedContainerType(containerTypeList)
        //         return { id, value: container, label: container }
        //       })
        //     })
        //     setContainers(containers)
        //     console.log("$$$$$$$$$$$$$$$$\n", containers);
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
      }
    }
  };

  const handleCytoContainerIdChange = (e, id) => {
    containerId[id].value = e.target.value;

    if (containerIdErrors[id]) {
      containerIdValidationList[id] = false;
      setContainerIdValidationList[containerIdValidationList];
    }

    if (e.target.value.length < 5 && e.target.value.length > 0) {
      containerIdValidationList[id] = true;
      setContainerIdValidationList(containerIdValidationList);
    } else {
      containerIdValidationList[id] = false;
      setContainerIdValidationList(containerIdValidationList);
    }

    setContainerId(containerId);

    if (e.target.value.length > 0) {
      containerIdErrors[id] = false;
    } else {
      containerIdErrors[id] = true;
    }

    showContainerIdErrors(containerIdErrors);
    reRender({});
  };

  const handleContainerTypeChange = (value, id) => {
    console.log("***********\n", value, id);

    if (value) {
      selectedContainerType[id] = value;
      setSelectedContainerType(selectedContainerType);
      containerTypeErrors[id] = false;
    } else {
      containerTypeErrors[id] = true;
    }

    showContainerTypeErrors(containerTypeErrors);
    reRender({});
    console.log(selectedContainerType);
  };

  const handleCytoAddContainerID = id => {
    console.log(id);

    if (!containerId[id].value) {
      let containerIdError = containerIdErrors;
      containerIdError[id] = true;
      showContainerIdErrors(containerIdError);
      reRender({});
      return false;
    }

    if (!selectedContainerType[id].value) {
      let containerTypeError = containerTypeErrors;
      containerTypeError[id] = true;
      showContainerTypeErrors(containerTypeError);
      reRender({});
      return false;
    }

    if (containerId[id].value.length > 4) {
      if (!sampleContainerList[id].containers.find(container => container.id === containerId[id].value)) {
        sampleContainerList[id].containers.push({
          id: containerId[id].value,
          type: selectedContainerType[id].value
        }); // sampleContainerList.push({id:containerId,type:selectedContainerType.value});

        setSampleContainerList(sampleContainerList);
        console.log(sampleContainerList);
      }

      reRender({});
    }
  };

  const handleCytoRemoveContainerId = (id, container_id) => {
    sampleContainerList[id].containers.splice(container_id, 1);
    setSampleContainerList(sampleContainerList);
    reRender({});
  };

  const handleOnClickPrevious = () => {
    props.previousStep();
    props.handleOnClickPrevious();
  };

  const handleOnClickNext = values => {
    console.log("firstFormikRef", firstFormikRef.current, firstFormikRef.current.errors);
    console.log("Values", values);

    if (props.fromDtrfFront) {
      handleErrorSubmit();

      for (let container of sampleContainerList) {
        if (container.containers.length <= 0) {
          (0, _commonHelper.errorMessage)("Container is empty!");
          return false;
        }
      }

      let count = 0;

      for (let pcpndt of pcpndtList) {
        if (testList[count].pcpndt) {
          if (pcpndt.scans.length <= 0) {
            (0, _commonHelper.errorMessage)("PCPNDT Scan is empty!");
            return false;
          }
        }

        count++;
      }

      if (hasCyto && !prefilleReferrenceDoctor) {
        setPrefilledReferrenceDoctorError("Required");
        return;
      }
    }

    console.log(values);

    let medical_info = _objectSpread(_objectSpread({}, values), {}, {
      hasUSGScans: true
    });

    if (props.formDataRedux.medical_info && props.fromSuperDtrf) {
      if (props.formDataRedux.medical_info.medical_info.files) {
        medical_info.files = props.formDataRedux.medical_info.medical_info.files;
      }
    }

    if (!hasCyto) {
      medical_info = _objectSpread(_objectSpread({}, medical_info), {}, {
        referralReason: referralReason
      });
    }

    if (hasPns && props.formDataRedux.doctor_info.doctorName.category == "Gynecologist") {
      medical_info.sonographer = sonographer;
    }

    console.log("values", values, "MEDICAL INFPPOOOO", medical_info, "sampleContainerList", sampleContainerList, "collectionLocation", collectionLocation, "pcpndtListpcpndtList", pcpndtList, "Referral Reason", referralReason);
    props.handleOnClickNext("medical_info", {
      medical_info: medical_info,
      sample_info: {
        sampleContainerList,
        collectionLocation,
        pcpndtList: props.fileUpload.pcpndtFiles
      }
    });
    props.nextStep();
  };

  const handleCollectioLocationChange = (e, id) => {
    collectionLocation[id].location = e.target.value;
    setCollectionLocation(collectionLocation); // if (e.target.value.length>0) {
    //   containerIdErrors[id] = false
    // }else{
    //   containerIdErrors[id] = true
    // }
    // showContainerIdErrors(containerIdErrors)

    reRender({});
  };

  const uploadPcpndtScans = (e, id) => {
    let files = [...e.target.files];
    let allowedFiles = new RegExp("application/pdf|image");
    files.map((file, id) => {
      if (file.size > 3000000) {
        const afterRemove = [...files.slice(0, id), ...files.slice(id + 1)];
        files = afterRemove;
        (0, _commonHelper.errorMessage)(file.name + " size is greater than 3mb");
      }

      if (!allowedFiles.exec(file.type)) {
        const afterRemove = [...files.slice(0, id), ...files.slice(id + 1)];
        files = afterRemove;
        (0, _commonHelper.errorMessage)(file.name + "  file type not supported");
      }
    });

    if ([...e.target.files].length > 5) {
      return (0, _commonHelper.errorMessage)("No. of Files should be less than 5");
    }

    if ([...e.target.files].length > 0) {
      if ([...pcpndtList[id].scans, ...files].length > 5) {
        (0, _commonHelper.errorMessage)("No. of Files should be less than 5 ");
        return;
      }

      console.log(e.target.files);
      pcpndtList[id].scans = [...pcpndtList[id].scans, ...files];
      pcpndtList[id].noOfFiles = pcpndtList[id].scans.length;
      pcpndtList[id].names = [...pcpndtList[id].names, e.target.files[e.target.files.length - 1].name]; // Array.from(e.target.files).forEach((test, container_id) => {
      //   pcpndtList[id].names.push(e.target.files.item(container_id).name)
      //   console.log("pcpndt scan", e.target.files.item(container_id));
      // })

      files.map(file => {
        pcpndtList[id].names.push(file.name);
      });
      console.log(id);
      console.log("PCPNDTLIST", pcpndtList);
      setPcpndtFiles(pcpndtList);
      setPcpndtList(pcpndtList);
      props.getPcpndtFiles(pcpndtList);
      console.log(pcpndtList);
      reRender({}); // reRender({});
    }
  };

  const handleUploadScansClick = async id => {
    console.log("PCPDNTREFERENCE", pcpndtReference, "ID", id);
    pcpndtReference[id].current.click();
  };

  const handleRemovePcpndtScan = (test_id, id) => {
    pcpndtList[test_id].scans.splice(id, 1);
    setPcpndtList(pcpndtList);
    reRender({});
  }; // !!!!!!!!!!!~~~~~~~~~~~~~~~~~~~ADMIN PANEL CODE ~~~~~~~~~~~~~~~~~~~~~~~~~~!!!!!!!!!!!


  const handleOnClickSave = async () => {
    let sampleContainerLocation = [];
    testList.map((test, id) => {
      if (test.pcpndt) {
        const sampleValues = multipleFormRef[id].current.values;

        if (sampleValues.instituteLocation != "yes") {
          const location = {
            city: sampleValues.city ? sampleValues.city : {},
            state: sampleValues.state ? sampleValues.state : {},
            address: sampleValues.address,
            pinCode: sampleValues.pinCode,
            id: props.formDataRedux.test_info.selectedTests[id]._id
          };
          sampleContainerLocation.push({
            location
          });
        } else {
          if (sampleValues.instituteLocation == "yes") {
            const location = {
              institute: "Institute"
            };
            sampleContainerLocation.push({
              location
            });
          }
        }
      } else {
        sampleContainerLocation.push({
          location: ""
        });
      }
    });
    multipleFormRef.map(ref => {
      ref.current.handleSubmit();
    });
    var formData = new FormData();
    let data = {};
    data.dtrf_id = props.Token.dtrfToken;
    let deletedFiles = props.fileUpload.deletedFiles;
    console.log("DELETED FILES", deletedFiles);

    if (deletedFiles.length > 0) {
      formData.append("deletedFiles", JSON.stringify(deletedFiles));
    }

    data.dtrf = JSON.parse(JSON.stringify(props.formDataRedux));
    data.dtrf.medical_info = {
      medical_info: firstFormikRef.current.values
    };

    if (referralReason && referralReason.length > 0) {
      data.dtrf.medical_info.medical_info.referralReason = referralReason;
    }

    if (props.formDataRedux.medical_info) {
      if (props.formDataRedux.medical_info.medical_info.files) {
        data.dtrf.medical_info.medical_info.files = props.formDataRedux.medical_info.medical_info.files;
      }
    }

    console.log(data, "DATA");
    data.dtrf.medical_info.sample_info = {
      sampleContainerList,
      collectionLocation: sampleContainerLocation,
      pcpndtList: props.fileUpload.pcpndtFiles
    };
    console.log("SAMPLE INFO WHILE SAVING", data.dtrf.medical_info.sample_info);

    if (prefilleReferrenceDoctor) {
      data.dtrf.medical_info.medical_info.referrenceDoctorName = prefilleReferrenceDoctor;
    }

    if (sonographerName) {
      data.dtrf.medical_info.medical_info.sonographer = sonographerName;
    }

    if (!hasNbs) {
      data.dtrf.medical_info.medical_info.currentGestationalAgeWeeks = currentGestWeeks;
      data.dtrf.medical_info.medical_info.currentGestationalAgeDays = currentGestDays;
    }

    if (hasNbs) {
      const deliveryStatus = data.dtrf.medical_info.medical_info.deliveryStatus.label;
      const typeOfFeeding = data.dtrf.medical_info.medical_info.typeOfFeeding.label;
      data.dtrf.medical_info.medical_info.deliveryStatus = deliveryStatus;
      data.dtrf.medical_info.medical_info.typeOfFeeding = typeOfFeeding;
    }

    if (checkFileLength(pcpndtFiles)) {
      pcpndtFiles.map(scan => {
        scan.scans.map(file => {
          if (!file.saved) {
            formData.append("PCPNDT", file);
          }

          file.saved = true;
        });
      });
    }

    formData.append("dtrf_id", JSON.stringify(data.dtrf_id));
    formData.append("dtrf", JSON.stringify(data.dtrf));
    console.log("DATA BEFORE SAVING", data.dtrf.medical_info); // props.setFormData({ ...props.formDataRedux, medical_info: data.dtrf.medical_info })
    // const url = process.env.NEXT_PUBLIC_SAVE_INCOMPLETE_DTRF
    // const response = await reqWithToken(url, "POST", formData)

    const response = await props.handleOnClickSave(data.dtrf);
    console.log("INCOMEPLETE FORMDATA SEND", response);

    if (response) {
      if (response.status == 200) {
        return (0, _commonHelper.successMessage)("Form Data Saved Successfully");
      } else {
        return (0, _commonHelper.errorMessage)("Error in Saving Form");
      }
    } else {
      return (0, _commonHelper.errorMessage)("Error in Saving Form");
    }
  };

  const handleOnClickSaveAndExit = async () => {
    await handleOnClickSave();

    _router.default.push("/super-dtrf");
  }; // !!!!!!!!!!!~~~~~~~~~~~~~~~~~~~~ADMIN PANEL CODE CLOSE~~~~~~~~~~~~~~~~~!!!!!!!!!!!!!!!!!
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~FILE UPLOAD~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`


  const [selectedFile, setSelectedFile] = (0, _react.useState)([]);
  const [selectedFileError, setSelectedFileError] = (0, _react.useState)("");
  const [isFileSelected, setIsFileSelected] = (0, _react.useState)(false);
  const [usgFile, setUsgFile] = (0, _react.useState)([]);
  const [usgFileError, setUsgFileError] = (0, _react.useState)("");
  const [xmlLicenseFile, setXmlLicenseFile] = (0, _react.useState)([]);
  const xmlLicenseFileRef = (0, _react.useRef)();
  const [pcpndtFiles, setPcpndtFiles] = (0, _react.useState)([]);
  const [pcpndtFilesError, setPcpndtFilesError] = (0, _react.useState)("");
  const referralLetterRef = (0, _react.useRef)();
  const fileInputRef = (0, _react.useRef)();
  const patientConsentFileRef = (0, _react.useRef)();
  const removeFileRef = (0, _react.useRef)();
  const pnsReportRef = (0, _react.useRef)();
  const otherFileRef = (0, _react.useRef)();
  const doctorAttestationRef = (0, _react.useRef)();
  const patientDeclarationPNDTRef = (0, _react.useRef)();
  const patientInformedConsentRef = (0, _react.useRef)();
  const [consentAndIndemnity, setConsentAndIndemnity] = (0, _react.useState)([]);
  const [isConsentAndIndemnity, setIsConsentAndIndemnity] = (0, _react.useState)(false);
  const [consentAndIndemnityError, setConsentAndIndemnityError] = (0, _react.useState)("");
  const consentAndIndemnityRef = (0, _react.useRef)();
  const [limitationOfTest, setLimitationOfTest] = (0, _react.useState)([]);
  const [isLimitationOfTest, setIsLimitationOfTest] = (0, _react.useState)(false);
  const [limitationOfTestError, setLimitationOfTestError] = (0, _react.useState)("");
  const limitationOfTestRef = (0, _react.useRef)();
  const [patientPrivacy, setPatientPrivacy] = (0, _react.useState)([]);
  const [isPatientPrivacy, setIsPatientPrivacy] = (0, _react.useState)(false);
  const [patientPrivacyError, setPatientPrivacyError] = (0, _react.useState)("");
  const patientPrivacyRef = (0, _react.useRef)();
  const [referralLetter, setReferralLetter] = (0, _react.useState)([]);
  const [referralLetterError, setReferralLetterError] = (0, _react.useState)("");
  const [pnsReport, setPnsReport] = (0, _react.useState)([]);
  const [pnsReportError, setPnsReportError] = (0, _react.useState)("");
  const ntScanRef = (0, _react.useRef)();
  const [ntScan, setNtScan] = (0, _react.useState)([]);
  const [ntScanError, setNtScanError] = (0, _react.useState)("");
  const cbcFileRef = (0, _react.useRef)();
  const [cbcFile, setCbcFile] = (0, _react.useState)([]);
  const [cbcFileError, setCbcFileError] = (0, _react.useState)("");
  const cbcDocFileRef = (0, _react.useRef)();
  const [cbcDocFile, setCbcDocFile] = (0, _react.useState)([]);
  const [cbcDocFileError, setCbcDocFileError] = (0, _react.useState)("");
  const bthFileRef = (0, _react.useRef)();
  const [bthFile, setBthFile] = (0, _react.useState)([]);
  const [bthFileError, setBthFileError] = (0, _react.useState)("");
  const confirmatoryTestHDSRef = (0, _react.useRef)();
  const [confirmatoryTestFileHDS, setConfirmatoryTestFileHDS] = (0, _react.useState)('');
  const [confirmatoryTestHDSFileErr, setConfirmatoryTestHDSFileErr] = (0, _react.useState)("");
  const confirmatoryTestHESRef = (0, _react.useRef)();
  const [confirmatoryTestFileHES, setConfirmatoryTestFileHES] = (0, _react.useState)("");
  const [confirmatoryTestFileHESFileErr, setConfirmatoryTestFileHESFileErr] = (0, _react.useState)("");
  const confirmatoryTestHPSRef = (0, _react.useRef)();
  const [confirmatoryTestFileHPS, setConfirmatoryTestFileHPS] = (0, _react.useState)("");
  const [confirmatoryTestFileHPSFileErr, setConfirmatoryTestFileHPSFileErr] = (0, _react.useState)("");

  const checkFileLength = files => {
    if (files.length > 5) {
      (0, _commonHelper.errorMessage)("No. of files should be less than 5");
      return false;
    } else {
      return true;
    }
  };

  const handleFileUploads = (e, fileKey, displayName) => {
    console.log([...e.target.files]);
    let files = [...e.target.files];
    console.log(e.target.files);
    let allowedFiles = new RegExp("application/pdf|image|image/jpeg");
    let xmlFormat = new RegExp("text/xml");
    files.map((file, id) => {
      if (file.size > 15000000) {
        const afterRemove = [...files.slice(0, id), ...files.slice(id + 1)];
        files = afterRemove;
        (0, _commonHelper.errorMessage)(file.name + " size is greater than 15 mb");
      }

      if (!allowedFiles.exec(file.type) && e.target.name != "xmlLicenseFile") {
        const afterRemove = [...files.slice(0, id), ...files.slice(id + 1)];
        files = afterRemove;
        (0, _commonHelper.errorMessage)(file.name + "  file type not supported");
      }

      if (fileKey == "xmlLicenseFile") {
        if (!xmlFormat.exec(file.type)) {
          const afterRemove = [...files.slice(0, id), ...files.slice(id + 1)];
          files = afterRemove;
          (0, _commonHelper.errorMessage)("File should be in XML format");
        }
      }
    });

    if (files.length > 0) {
      files.map(file => {
        file.displayName = displayName;
      });
      const temp = props.fileUpload.files[fileKey] ? props.fileUpload.files[fileKey] : [];

      if ([...temp, ...files].length > 5) {
        (0, _commonHelper.errorMessage)("No. of files should be less than 5");
      } else {
        props.getFiles({
          [fileKey]: [...temp, ...files]
        });
      }

      return;
    } else {
      return;
    }
  };

  console.log("mandatory files state", mandatoryFiles);
  console.log("non mandatory files state", nonMandatoryFiles);

  const onRemoveFile = (id, name) => {
    console.log("E,ID", name, id);

    if (props.fromSuperDtrf) {
      if (props.fileUpload.files[name][id].saved) {
        props.getDeletedFiles(name, props.fileUpload.files[name][id]);
      }
    }

    const afterRemove = [...props.fileUpload.files[name].slice(0, id), ...props.fileUpload.files[name].slice(id + 1)];
    props.getFiles({
      [name]: [...afterRemove]
    });
  };

  const removeFile = variable => {
    let fileId;
    props.fileUpload.filesToUpload.map((data, index) => {
      if (data.variable == variable) {
        fileId = index;
      }
    });
    let afterRemove = [];

    if (fileId) {
      const afterRemoveFilesToUpload = [...props.fileUpload.filesToUpload.slice(0, fileId), ...props.fileUpload.filesToUpload.slice(fileId + 1)];
      const afterRemoveFilesReference = [...props.fileUpload.filesReference.slice(0, fileId), ...props.fileUpload.filesReference.slice(fileId + 1)];
      props.getFilesToUpload(afterRemoveFilesToUpload);
      props.getFilesReference(afterRemoveFilesReference);
    }
  };

  const addFile = (display, variable) => {
    props.getFilesToUpload([...props.fileUpload.filesToUpload, {
      display,
      variable
    }]);
    props.getFilesReference([...props.fileUpload.filesReference, /*#__PURE__*/(0, _react.createRef)()]);
  };

  const onRemovePcpndt = (id, container_id) => {
    console.log(pcpndtList[id]);

    if (props.fromSuperDtrf) {
      if (pcpndtList[id].scans[container_id].saved) {
        props.getDeletedFiles("PCPNDT", pcpndtList[id].scans[container_id]);
      }
    }

    const afterRemove = [...pcpndtList[id].scans.slice(0, container_id), ...pcpndtList[id].scans.slice(container_id + 1)];
    const afterRemoveName = [...pcpndtList[id].names.slice(0, container_id), ...pcpndtList[id].names.slice(container_id + 1)];
    pcpndtList[id].scans = afterRemove;
    pcpndtList[id].noOfFiles = afterRemove.length;
    pcpndtList[id].names = afterRemoveName;
    setPcpndtList([...pcpndtList.slice(0, id), pcpndtList[id], ...pcpndtList.slice(id + 1)]);
    props.getPcpndtFiles([...pcpndtList.slice(0, id), pcpndtList[id], ...pcpndtList.slice(id + 1)]);
  }; // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~FILE UPLOAD CLOSE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
  // !!!!!!!!!!!!!!!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Referral reason !!!!!!!!!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  const [referralReason, setReferralReason] = (0, _react.useState)([]);
  const [isOtherReferralReasonSelected, setIsOtherReferralReasonSelected] = (0, _react.useState)(false);
  const [prefilledReferalReason, setPrefilledReferalReason] = (0, _react.useState)("");

  const handleReferralDoctorReasonChange = e => {
    console.log("REFERAL REASON", e);

    if (e) {
      getPrefilledReferalReason(e); // setPrefilledReferalReason(e.value)

      if (e.value == "others") {
        setIsOtherReferralReasonSelected(true);
      } else {
        setIsOtherReferralReasonSelected(false);
        setReferralReason(e);
      }
    }
  };

  const handleOtherReferralReasonChange = e => {
    setReferralReason(e);
  };

  const getPrefilledReferalReason = data => {
    setPrefilledReferalReason({
      label: data,
      value: data
    });
  }; // @!!!!!!!!!!!!!!!!!!!!!!!!!!~~~~~~~~~~~~~~~~~~~~~~~REFEREAL REASON CLOSEEEEE!!!!!!!!!!!!!!!!!~~~~~~~~~~~~~~~~~~~~
  // ---------------------------------- Sonographer -----------------------------------


  console.log("ISTWIN", isTwin);
  const [sonographer, setSonographer] = (0, _react.useState)("");

  const handleSonographerChange = e => {
    if (e) {
      setSonographer(e);
    } else {
      setSonographer("");
    }
  }; // -----------------------------close-Sonographer ----------------------------


  const [isDisabled, setIsDisabled] = (0, _react.useState)(false);
  console.log("SELECTED CITY", selectedCity);
  console.log("SELECTED STATE", selectedState);
  const [cityStateErrors, setCityStateErrors] = (0, _react.useState)([]);
  const firstFormikRef = (0, _react.useRef)();
  const [multipleFormRef, setMultipleFormRef] = (0, _react.useState)();

  const handleErrorSubmit = () => {
    console.log("FIRSTFORMIKREFF", firstFormikRef);
    firstFormikRef.current.validateForm();

    if (!(Object.keys(firstFormikRef.current.errors).length === 0 && firstFormikRef.current.errors.constructor === Object)) {
      (0, _commonHelper.errorMessage)("Please fill in the required fields to proceed");
    }

    let error = false;

    if (multipleFormRef) {
      multipleFormRef.map(ref => {
        if (!(Object.keys(ref.current.errors).length === 0 && ref.current.errors.constructor === Object)) {
          error = true;
        }
      });
    }

    if (error) {
      (0, _commonHelper.errorMessage)("Please fill in the required fields to proceed");
    }
  };

  const finalSubmit = () => {
    handleErrorSubmit();
    let errors = {};

    if (props.fromDtrfFront) {
      if (hasNbs && !prefilleReferrenceDoctor) {
        setPrefilledReferrenceDoctorError("Required");
        errors.error = "Reference doctor";
      }

      if (!hasNbs) {
        if (isGyno && !sonographerName && !hasCyto) {
          setSonographerError("Required");
          errors.error = "Sonographer Required";
        }
      }

      let fileErrors = null;
      console.log("mandatoryfiles", mandatoryFiles, filesToUpload);
      mandatoryFiles.map(data => {
        console.log("mandatoryfiles", data);

        if (!props.fileUpload.files[data.variable] || props.fileUpload.files[data.variable] && props.fileUpload.files[data.variable].length <= 0) {
          if (fileErrors) {
            fileErrors = fileErrors + ", " + data.display;
          } else {
            fileErrors = data.display;
          }
        }
      });

      if (fileErrors) {
        return (0, _commonHelper.errorMessage)("Please upload following files " + fileErrors);
      }
    }

    firstFormikRef.current.handleSubmit();
    multipleFormRef.map(ref => {
      ref.current.handleSubmit();
    });

    if (!errors.hasOwnProperty("error")) {
      console.log("ERRORS FROM FORMIKREF", firstFormikRef.current.errors);

      if (Object.keys(firstFormikRef.current.errors).length === 0 && firstFormikRef.current.errors.constructor === Object) {
        let childErrors = {};
        multipleFormRef.map(ref => {
          childErrors = _objectSpread({}, ref.current.errors);
        });
        console.log("CHILD ERRORS", childErrors);

        if (Object.keys(childErrors).length === 0 && childErrors.constructor === Object) {
          const formValues = firstFormikRef.current.values;

          if (prefilleReferrenceDoctor) {
            formValues.referrenceDoctorName = prefilleReferrenceDoctor;
          }

          if (sonographerName) {
            formValues.sonographer = sonographerName;
          }

          if (!hasNbs) {
            formValues.currentGestationalAgeWeeks = currentGestWeeks;
            formValues.currentGestationalAgeDays = currentGestDays;
          }

          if (hasNbs) {
            const deliveryStatus = formValues.deliveryStatus.label;
            const typeOfFeeding = formValues.typeOfFeeding.label;
            formValues.deliveryStatus = deliveryStatus;
            formValues.typeOfFeeding = typeOfFeeding;
          }

          handleOnClickNext(formValues);
        }
      }
    }
  };

  const typeOfFeeding = [{
    value: "Breast",
    label: "Breast"
  }, {
    value: "TPN",
    label: "TPN"
  }, {
    value: "Formula",
    label: "Formula"
  }, {
    value: "Formula Trade Name",
    label: "Formula Trade Name"
  }];
  const deliveryStatus = [{
    value: "Normal",
    label: "Normal"
  }, {
    value: "Premature",
    label: "Premature"
  }, {
    value: "Sick",
    label: "Sick"
  }, {
    value: "On antibiotics",
    label: "On antibiotics"
  }];
  console.log("FLOW FIELDS", flowFields);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("fieldset", null, /*#__PURE__*/_react.default.createElement(_formik.Formik, {
    isInitialValid: false,
    validateOnBlur: true,
    validateOnMount: true,
    innerRef: firstFormikRef,
    enableReinitialize: true,
    initialValues: {
      gestationalAgeWeeks: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.gestationalAgeWeeks : "",
      gestationalAgeDays: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.gestationalAgeDays : "",
      maternalAge: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.maternalAge : "",
      motherGeneticDisease: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.motherGeneticDisease : "",
      fatherGeneticDisease: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.fatherGeneticDisease : "",
      siblingGeneticDisease: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.siblingGeneticDisease : "",
      familyHistory: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.familyHistory : "",
      presentPregnancy: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.presentPregnancy : "",
      ivfPregnancy: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.ivfPregnancy : "",
      eggUsed: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.eggUsed : "",
      ageAtEggRetrieval: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.ageAtEggRetrieval : "",
      surrogate: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.surrogate : "",
      conditionAffectsPreviousPregnancy: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.conditionAffectsPreviousPregnancy : "",
      conditionPatientIsCarrierOf: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.conditionPatientIsCarrierOf : "",
      t21RiskScore: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.t21RiskScore : "",
      t18RiskScore: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.t18RiskScore : "",
      t13RiskScore: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.t13RiskScore : "",
      familyHistory: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.familyHistory : "",
      dateOfTwinVanishOrReduced: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.dateOfTwinVanishOrReduced : "",
      otherReferralReason: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.otherReferralReason : "",
      lmpDate: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.lmpDate : "",
      usgCorrEddDate: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.usgCorrEddDate : "",
      lmpCertainity: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.lmpCertainity : "",
      Gravida: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.Gravida : "",
      Para: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.Para : "",
      Abortion: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.Abortion : "",
      Live: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.Live : "",
      historyOfDownSyndrome: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.historyOfDownSyndrome : "",
      historyOfEdwardsSyndrome: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.historyOfEdwardsSyndrome : "",
      diabetesInsulinDependent: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.diabetesInsulinDependent : "",
      insulinDate: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.insulinDate : "",
      gestational: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.gestational : "",
      patientOnHcg: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.patientOnHcg : "",
      bleedingOrSpottingTwoWeeks: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.bleedingOrSpottingTwoWeeks : "",
      typeOfConception: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.typeOfConception : "",
      typeOfProcedure: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.typeOfProcedure : "",
      extractionDate: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.extractionDate : "",
      transferDate: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.transferDate : "",
      donorDob: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.donorDob : "",
      crl: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.crl : "",
      nb: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.nb : "",
      twinType: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.twinType : "",
      twinCrl1: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.twinCrl1 : "",
      twinCrl2: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.twinCrl2 : "",
      twinNt1: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.twinNt1 : "",
      twinNt2: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.twinNt2 : "",
      twinNb1: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.twinNb1 : "",
      twinNb2: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.twinNb2 : "",
      bpd: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.bpd : "",
      dateOfScan: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.dateOfScan : '',
      fl: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.fl : "",
      hc: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.hc : "",
      nt: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.nt : "",
      crl: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.crl : "",
      bpOrMap: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.bpOrMap : "",
      bpMeasurementDate: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.bpMeasurementDate : "",
      bpLeftSystolic1: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.bpLeftSystolic1 : "",
      bpLeftDiSystolic1: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.bpLeftDiSystolic1 : "",
      bpLeftSystolic2: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.bpLeftSystolic2 : "",
      bpLeftDiSystolic2: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.bpLeftDiSystolic2 : "",
      bpRightSystolic1: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.bpRightSystolic1 : "",
      bpRightDiSystolic1: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.bpRightDiSystolic1 : "",
      bpRightSystolic2: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.bpRightSystolic2 : "",
      bpRightDiSystolic2: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.bpRightDiSystolic2 : "",
      mapReading1: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.mapReading1 : "",
      mapReading2: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.mapReading2 : "",
      familyHistoryPreEclampsia: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.familyHistoryPreEclampsia : "",
      chronicHypertension: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.chronicHypertension : "",
      uterineArteryPulsativeIndexRightPI: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.uterineArteryPulsativeIndexRightPI : "",
      uterineArteryPulsativeIndexLeftPI: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.uterineArteryPulsativeIndexLeftPI : "",
      previousPregnancy: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.previousPregnancy : "",
      spontaneousAbortion: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.spontaneousAbortion : "",
      prevPregDate: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.prevPregDate : "",
      terminationPregnancy: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.terminationPregnancy : "",
      referralReason: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.referralReason : [],
      consanguinity: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.consanguinity : "",
      instituteLocation: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.instituteLocation : "",
      usgDate: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.usgDate : "",
      sampleCollectionDate: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.sampleCollectionDate : "",
      currentGestationalAgeWeeks: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.currentGestationalAgeWeeks : "",
      currentGestationalAgeDays: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.currentGestationalAgeDays : "",
      additionalSymptoms: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.additionalSymptoms : "",
      deliveryStatus: props.formDataRedux.medical_info ? {
        value: props.formDataRedux.medical_info.medical_info.deliveryStatus,
        label: props.formDataRedux.medical_info.medical_info.deliveryStatus
      } : "",
      typeOfFeeding: props.formDataRedux.medical_info ? {
        value: props.formDataRedux.medical_info.medical_info.typeOfFeeding,
        label: props.formDataRedux.medical_info.medical_info.typeOfFeeding
      } : "",
      hoTransfusion: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.hoTransfusion : "",
      dateOfHoTransfusion: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.dateOfHoTransfusion : "",
      firstFeedingDate: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.firstFeedingDate : "",
      monochorionicType: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.monochorionicType : "",
      historyOfPatauSyndrome: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.historyOfPatauSyndrome : "",
      confirmatoryTestHDS: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.confirmatoryTestHDS : "",
      confirmatoryTestHES: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.confirmatoryTestHES : "",
      confirmatoryTestHPS: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.confirmatoryTestHPS : "",
      timeOfDiabetes: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.timeOfDiabetes : "",
      advanceMaternalAge: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.advanceMaternalAge : "",
      geneticDiseaseInFMS: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.geneticDiseaseInFMS : "",
      Others: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.Others : "",
      fmfId: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.fmfId : ""
    },
    validate: values => {
      let errors = {};
      errors = (0, _customValidator.validateField)(hasPns ? _customValidator.pnsField : hasCyto ? _customValidator.cytoFlow : hasNbs ? _customValidator.nbsFlow : _customValidator.niptFlow, props.formDataRedux.patient_details ? _objectSpread(_objectSpread({}, values), props.formDataRedux.patient_details) : _objectSpread({}, values), {
        calculateCurrentGestational: true,
        validateGestation: hasPns ? true : false,
        gestationalAgeStart: gestationAgeStart,
        gestationalAgeEnd: gestationAgeEnd,
        testType: hasPreEclampsiaTest ? "hasPreEclampsia" : hasCytoPrenatal ? "cytoPrenatal" : "",
        testTrimester,
        isRequired: props.fromDtrfFront ? true : false
      }, values);

      if (!values.Gravida) {
        values.Live = "";
        values.Abortion = "";
        values.Para = "";
      }

      if (hasCyto && props.fromDtrfFront) {
        if (values.referralReason.length > 0) {
          if (values.referralReason.includes("Family History of any chromosomal abnormality")) {
            if (!values.familyHistory) {
              errors.referralReason = "Please fill the checked Field";
            }
          }

          if (values.referralReason.includes("Advance Maternal Age")) {
            if (!values.advanceMaternalAge) {
              errors.referralReason = "Please fill the checked Field";
            }
          }

          if (values.referralReason.includes("Genetic Disease in Father/Mother/Sibling")) {
            if (!values.geneticDiseaseInFMS) {
              errors.referralReason = "Please fill the checked Field";
            }
          }

          if (values.referralReason.includes("Consanguinity")) {
            if (!values.consanguinity) {
              errors.referralReason = "Please fill the checked Field";
            }
          }

          if (values.referralReason.includes("Others")) {
            if (!values.Others) {
              errors.referralReason = "Please fill the checked Field";
            }
          }
        }
      }

      console.log("ERRORRRS", errors);
      return errors;
    },
    onSubmit: values => {
      console.log("INside Submitting", values);
      setTempData(_objectSpread(_objectSpread({}, tempData), values));

      if (values.instituteLocation != "yes") {
        const location = {
          city: selectedCity.value,
          state: selectedState.value,
          address: values.address,
          pinCode: values.pinCode
        };
        values.location = _objectSpread({}, location); // handleOnClickNext(values);
      } else {
        values.location = "Institute"; // handleOnClickNext(values);
      }

      console.log(values);
    }
  }, _ref => {
    let {
      values
    } = _ref;
    return /*#__PURE__*/_react.default.createElement(_formik.Form, {
      className: "mb-2"
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
      className: "customWrap"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, hasNipt && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group col-6"
    }, /*#__PURE__*/_react.default.createElement("label", null, "Referral reason :", /*#__PURE__*/_react.default.createElement("span", {
      className: "marked"
    }, "*")), /*#__PURE__*/_react.default.createElement(_reactSelect.default, {
      isMulti: true,
      options: _constants.referralReason,
      onChange: handleReferralDoctorReasonChange,
      value: referralReason,
      name: "referralReason"
    }), /*#__PURE__*/_react.default.createElement(_formik.ErrorMessage, {
      name: "referralReason",
      component: "div",
      className: "formErr"
    })))), /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group col-6"
    }, /*#__PURE__*/_react.default.createElement("label", null, "Referring Doctor: ", (hasCyto || hasNbs) && /*#__PURE__*/_react.default.createElement("span", {
      className: "marked"
    }, "*")), /*#__PURE__*/_react.default.createElement(_async.default, {
      isClearable: true,
      cacheOptions: true,
      defaultOptions: true,
      value: prefilleReferrenceDoctor,
      getOptionLabel: e => e.name.firstName + " " + e.name.lastName,
      getOptionValue: e => e._id,
      loadOptions: e => handleReferrenceDoctorChange(e, 'referringDoctor'),
      onChange: handleReferenceDoctorNameChange // placeholder="Enter Test name"
      ,
      noOptionsMessage: () => 'Enter Doctor name'
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "formErr"
    }, prefilleReferrenceDoctorError))), /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, isGyno && /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group col-6"
    }, /*#__PURE__*/_react.default.createElement("label", null, "Sonographer: ", !hasCyto && /*#__PURE__*/_react.default.createElement("span", {
      className: "marked"
    }, "*")), /*#__PURE__*/_react.default.createElement(_async.default, {
      isClearable: true,
      cacheOptions: true,
      defaultOptions: true,
      value: sonographerName,
      getOptionLabel: e => e.name.firstName + " " + e.name.lastName,
      getOptionValue: e => e._id,
      loadOptions: e => handleReferrenceDoctorChange(e, 'sonographer'),
      onChange: handleSonographerNameChange,
      noOptionsMessage: () => 'Enter Test name'
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "formErr"
    }, sonoGrapherError))), /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, flowFields.length > 0 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, flowFields.map((field, id) => /*#__PURE__*/_react.default.createElement(_CreateField.default, _extends({}, field, {
      values: props.formDataRedux.patient_details ? _objectSpread(_objectSpread({}, values), props.formDataRedux.patient_details) : _objectSpread({}, values),
      externalValidation: {
        testType: hasPreEclampsiaTest ? "preEclampsia" : hasCytoPrenatal ? "cytoPrenatal" : "",
        testTrimester
      }
    })))), hasNipt && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, referralReason && referralReason.map(reason => reason.value == "previous pregnancy affected by genetic disorders" ? /*#__PURE__*/_react.default.createElement(_TextField.default, {
      title: "Additional,Symptoms/History",
      name: "conditionAffectsPreviousPregnancy",
      placeholder: "Enter condition that affected previous pregnancy",
      mandatory: true
    }) : reason.value == "patient is a carrier of genetic disorders" ? /*#__PURE__*/_react.default.createElement(_TextField.default, {
      title: "Name of condition that the patient is a\r carrier of",
      name: "conditionPatientIsCarrierOf",
      placeholder: "Enter condition that the patient is a carrier of",
      mandatory: true
    }) : reason.value == "serum screen risk" ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_NumberField.default, {
      title: " T21 risk score",
      name: "t21RiskScore",
      placeholder: "Enter T21 risk score",
      mandatory: true,
      min: "1",
      max: "100"
    }), /*#__PURE__*/_react.default.createElement(_NumberField.default, {
      title: "T18 risk score",
      name: "t18RiskScore",
      placeholder: "Enter T18 risk score",
      mandatory: true,
      min: "1",
      max: "100"
    }), /*#__PURE__*/_react.default.createElement(_NumberField.default, {
      title: "T13 risk score",
      name: "t13RiskScore",
      placeholder: "Enter T13 risk score",
      mandatory: true,
      min: "1",
      max: "100"
    })) : reason.value == "family history" ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_TextField.default, {
      title: "Family history",
      name: "familyHistory",
      placeholder: "Enter family history",
      mandatory: true
    })) : reason.value == "others" ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_TextField.default, {
      title: "Other Referral Reason ",
      name: "otherReferralReason",
      mandatory: true
    })) : "")), hasCyto && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-12"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "row ml-2"
    }, /*#__PURE__*/_react.default.createElement("div", {
      id: "checkbox-group"
    }, "Referral Reason")), /*#__PURE__*/_react.default.createElement("div", {
      role: "group",
      "aria-labelledby": "checkbox-group"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-6"
    }, /*#__PURE__*/_react.default.createElement("label", {
      style: {
        paddingTop: "30px",
        display: "flex"
      }
    }, /*#__PURE__*/_react.default.createElement(_formik.Field, {
      type: "checkbox",
      name: "referralReason",
      value: "Advance Maternal Age"
    }), /*#__PURE__*/_react.default.createElement("label", {
      className: "pl-2"
    }, " Advance Maternal Age "))), values.referralReason.includes("Advance Maternal Age") && /*#__PURE__*/_react.default.createElement(_TextField.default, {
      title: "",
      name: "advanceMaternalAge"
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-6"
    }, /*#__PURE__*/_react.default.createElement("label", {
      style: {
        paddingTop: "30px",
        display: "flex"
      }
    }, /*#__PURE__*/_react.default.createElement(_formik.Field, {
      type: "checkbox",
      name: "referralReason",
      value: "Genetic Disease in Father/Mother/Sibling"
    }), /*#__PURE__*/_react.default.createElement("label", {
      className: "pl-2"
    }, " Genetic Disease in Father/Mother/Sibling "))), values.referralReason.includes("Genetic Disease in Father/Mother/Sibling") && /*#__PURE__*/_react.default.createElement(_TextField.default, {
      title: "",
      name: "geneticDiseaseInFMS"
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-6"
    }, /*#__PURE__*/_react.default.createElement("label", {
      style: {
        paddingTop: "30px",
        display: "flex"
      }
    }, /*#__PURE__*/_react.default.createElement(_formik.Field, {
      type: "checkbox",
      name: "referralReason",
      value: "Consanguinity"
    }), /*#__PURE__*/_react.default.createElement("label", {
      className: "pl-2"
    }, " Consanguinity "))), values.referralReason.includes("Consanguinity") && /*#__PURE__*/_react.default.createElement(_Radio.default, {
      name: "consanguinity",
      options: [{
        value: "Yes",
        label: "Yes"
      }, {
        value: "No",
        label: "No"
      }]
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-6"
    }, /*#__PURE__*/_react.default.createElement("label", {
      style: {
        paddingTop: "30px",
        display: "flex"
      }
    }, /*#__PURE__*/_react.default.createElement(_formik.Field, {
      type: "checkbox",
      name: "referralReason",
      value: "Family History of any chromosomal abnormality"
    }), /*#__PURE__*/_react.default.createElement("label", {
      className: "pl-2"
    }, "Family History of any chromosomal abnormality"))), values.referralReason.includes("Family History of any chromosomal abnormality") && /*#__PURE__*/_react.default.createElement(_TextField.default, {
      title: "",
      name: "familyHistory"
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-6"
    }, /*#__PURE__*/_react.default.createElement("label", {
      style: {
        paddingTop: "30px",
        display: "flex"
      }
    }, /*#__PURE__*/_react.default.createElement(_formik.Field, {
      type: "checkbox",
      name: "referralReason",
      value: "Others"
    }), /*#__PURE__*/_react.default.createElement("label", {
      className: "pl-2"
    }, "Others"))), values.referralReason.includes("Others") && /*#__PURE__*/_react.default.createElement(_TextField.default, {
      title: "",
      name: "Others"
    })), /*#__PURE__*/_react.default.createElement(_formik.ErrorMessage, {
      name: "referralReason",
      component: "div",
      className: "formErr"
    })))), /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-12 col-md-12"
    }, /*#__PURE__*/_react.default.createElement("label", {
      className: "section-title"
    }, "File Upload   ", /*#__PURE__*/_react.default.createElement(_commonHelper.MousePopover, {
      content: /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h6", null, "Format"), /*#__PURE__*/_react.default.createElement("p", null, "Image,Jpeg,png,pdf,XML"), /*#__PURE__*/_react.default.createElement("h6", null, "File size"), /*#__PURE__*/_react.default.createElement("p", null, "maximum 3mb"))
    }))), props.fileUpload.filesToUpload.map((data, id) => /*#__PURE__*/_react.default.createElement("input", {
      ref: fileUploadReference[id],
      style: {
        display: "none"
      },
      type: "file",
      name: data.variable // onChange={handleDoctorAttestationFile}
      ,
      onChange: e => handleFileUploads(e, data.variable, data.display),
      multiple: true
    })), props.fileUpload.filesToUpload.map((data, id) => /*#__PURE__*/_react.default.createElement(_FileUploadDisplay.default, {
      name: data.variable,
      ref: props.fileUpload.filesReference[id],
      files: props.fileUpload.files[data.variable] ? props.fileUpload.files[data.variable] : [],
      mandatory: props.fileUpload.mandatoryFiles[id] ? true : false,
      fileButtonName: data.display,
      removeFile: onRemoveFile
    })), values.historyOfDownSyndrome == "Yes" && values.confirmatoryTestHDS == "Yes" && /*#__PURE__*/_react.default.createElement(_FileUploadDisplay.default, {
      name: "HDS",
      ref: confirmatoryTestHDSRef,
      files: props.fileUpload.files.HDS ? props.fileUpload.files.HDS : [],
      fileButtonName: "Confirmatory Test File for History of Down Syndrome",
      removeFile: onRemoveFile
    }), values.historyOfDownSyndrome == "Yes" && values.confirmatoryTestHDS == "Yes" && (!props.fileUpload.files.HDS || props.fileUpload.files.HDS && props.fileUpload.files.HDS.length <= 0) && /*#__PURE__*/_react.default.createElement("label", null, "Report will be needed for final Risk assessment"), values.historyOfEdwardsSyndrome == "Yes" && values.confirmatoryTestHES == "Yes" && /*#__PURE__*/_react.default.createElement(_FileUploadDisplay.default, {
      name: "HES",
      ref: confirmatoryTestHESRef,
      files: props.fileUpload.files.HES ? props.fileUpload.files.HES : [],
      fileButtonName: "Confirmatory Test File for History of Edward Syndrome",
      removeFile: onRemoveFile
    }), values.historyOfEdwardsSyndrome == "Yes" && values.confirmatoryTestHES == "Yes" && (!props.fileUpload.files.HES || props.fileUpload.files.HES && props.fileUpload.files.HES.length <= 0) && /*#__PURE__*/_react.default.createElement("label", null, "Report will be needed for final Risk assessment"), values.historyOfPatauSyndrome == "Yes" && values.confirmatoryTestHPS == "Yes" && /*#__PURE__*/_react.default.createElement(_FileUploadDisplay.default, {
      name: "HPS",
      ref: confirmatoryTestHPSRef,
      files: props.fileUpload.files.HPS ? props.fileUpload.files.HPS : [],
      fileButtonName: "Confirmatory Test File for History of Patau Syndrome",
      removeFile: onRemoveFile
    }), values.historyOfPatauSyndrome == "Yes" && values.confirmatoryTestHPS == "Yes" && (!props.fileUpload.files.HPS || props.fileUpload.files.HPS && props.fileUpload.files.HPS.length <= 0) && /*#__PURE__*/_react.default.createElement("label", null, "Report will be needed for final Risk assessment")))), /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement("h4", null, "Sample Info"), /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("button", {
      ref: removeFileRef,
      type: "button",
      name: "removeButton",
      onClick: e => onRemoveFile(e),
      style: {
        display: "none"
      }
    }), /*#__PURE__*/_react.default.createElement("input", {
      ref: fileInputRef,
      style: {
        display: "none"
      },
      type: "file",
      name: "files" // onChange={handleUsgFile}
      ,
      onChange: handleFileUploads,
      multiple: true
    }), /*#__PURE__*/_react.default.createElement("input", {
      ref: patientConsentFileRef,
      style: {
        display: "none"
      },
      type: "file",
      name: "patientConsentFiles" // onChange={handlePatientConsentFile}
      ,
      onChange: handleFileUploads,
      multiple: true
    }), /*#__PURE__*/_react.default.createElement("input", {
      ref: otherFileRef,
      style: {
        display: "none"
      },
      type: "file",
      name: "otherFiles" // onChange={handleOtherFiles}
      ,
      onChange: handleFileUploads,
      multiple: true
    }), /*#__PURE__*/_react.default.createElement("input", {
      ref: doctorAttestationRef,
      style: {
        display: "none"
      },
      type: "file",
      name: "doctorAttestationFile" // onChange={handleDoctorAttestationFile}
      ,
      onChange: handleFileUploads,
      multiple: true
    }), /*#__PURE__*/_react.default.createElement("input", {
      ref: patientDeclarationPNDTRef,
      style: {
        display: "none"
      },
      type: "file",
      name: "patientDeclarationPNDT" // onChange={handlePatientDeclarationPNDT}
      ,
      onChange: handleFileUploads,
      multiple: true
    }), /*#__PURE__*/_react.default.createElement("input", {
      ref: patientInformedConsentRef,
      style: {
        display: "none"
      },
      type: "file",
      name: "patientInformedConsent" // onChange={handlePatientInformedConsent}
      ,
      onChange: handleFileUploads,
      multiple: true
    }), /*#__PURE__*/_react.default.createElement("input", {
      ref: consentAndIndemnityRef,
      style: {
        display: "none"
      },
      type: "file",
      name: "consentAndIndemnity" // onChange={handleConsentAndIndemnity}
      ,
      onChange: handleFileUploads,
      multiple: true
    }), /*#__PURE__*/_react.default.createElement("input", {
      ref: limitationOfTestRef,
      style: {
        display: "none"
      },
      type: "file",
      name: "limitationOfTest" // onChange={handleLimitationOfTest}
      ,
      onChange: handleFileUploads,
      multiple: true
    }), /*#__PURE__*/_react.default.createElement("input", {
      ref: patientPrivacyRef,
      style: {
        display: "none"
      },
      type: "file",
      name: "patientPrivacy" // onChange={handlePatientPrivacy}
      ,
      onChange: handleFileUploads,
      multiple: true
    }), /*#__PURE__*/_react.default.createElement("input", {
      ref: referralLetterRef,
      style: {
        display: "none"
      },
      type: "file",
      name: "referralLetter" // onChange={handleReferralLetter}
      ,
      onChange: handleFileUploads,
      multiple: true
    }), /*#__PURE__*/_react.default.createElement("input", {
      ref: pnsReportRef,
      style: {
        display: "none"
      },
      type: "file",
      name: "pnsReport" // onChange={handlePnsReport}
      ,
      onChange: handleFileUploads,
      multiple: true
    }), /*#__PURE__*/_react.default.createElement("input", {
      ref: ntScanRef,
      style: {
        display: "none"
      },
      type: "file",
      name: "ntScan" // onChange={handleNtScan}
      ,
      onChange: handleFileUploads,
      multiple: true
    }), /*#__PURE__*/_react.default.createElement("input", {
      ref: cbcFileRef,
      style: {
        display: "none"
      },
      type: "file",
      name: "cbcFile" // onChange={handleCbcFile}
      ,
      onChange: handleFileUploads,
      multiple: true
    }), /*#__PURE__*/_react.default.createElement("input", {
      ref: confirmatoryTestHDSRef,
      style: {
        display: "none"
      },
      type: "file",
      name: "confirmatoryTestFileHDS",
      onChange: e => handleFileUploads(e, "HDS", "Confirmatory Test File for History of Down Syndrome"),
      multiple: true
    }), /*#__PURE__*/_react.default.createElement("input", {
      ref: confirmatoryTestHESRef,
      style: {
        display: "none"
      },
      type: "file",
      name: "confirmatoryTestFileHES",
      onChange: e => handleFileUploads(e, "HES", "Confirmatory Test File for History of Edward Syndrome"),
      multiple: true
    }), /*#__PURE__*/_react.default.createElement("input", {
      ref: confirmatoryTestHPSRef,
      style: {
        display: "none"
      },
      type: "file",
      name: "confirmatoryTestFileHPS",
      onChange: e => handleFileUploads(e, "HPS", "Confirmatory Test File for History of Patau Syndrome"),
      multiple: true
    }), /*#__PURE__*/_react.default.createElement("input", {
      ref: xmlLicenseFileRef,
      style: {
        display: "none"
      },
      type: "file",
      name: "xmlLicenseFile",
      onChange: handleFileUploads,
      multiple: true
    })));
  })))), containers && testList.map((test, id) =>
  /*#__PURE__*/
  // testList.map((test, id) => (
  _react.default.createElement("div", {
    className: "customWrap mb-2"
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h6", null, test.test_name)), /*#__PURE__*/_react.default.createElement(_formik.Formik, {
    innerRef: multipleFormRef[id],
    initialValues: {
      address: collectionLocation ? collectionLocation[id].location.address : "",
      pinCode: collectionLocation ? collectionLocation[id].location.pinCode : "",
      instituteLocation: collectionLocation && collectionLocation[id].location.hasOwnProperty("institute") ? ["yes"] : "",
      city: collectionLocation ? collectionLocation[id].location.city : "",
      state: collectionLocation ? collectionLocation[id].location.state : ""
    },
    validate: values => {
      const errors = {};

      if (props.fromDtrfFront) {
        if (test.pcpndt) {
          if (values.instituteLocation != 'yes') {
            if (!values.address) {
              errors.address = "Required";
            }

            if (!values.pinCode) {
              errors.pinCode = "Required";
            } else if (!Number(values.pinCode)) {
              errors.pinCode = "Should be Number";
            }

            if (!values.city) {
              errors.city = "Reqruied";
            }

            if (!values.state) {
              errors.state = "Required";
            }
          }
        }
      }

      return errors;
    },
    onSubmit: (values, _ref2) => {
      let {
        setSubmitting
      } = _ref2;

      if (test.pcpndt) {
        if (values.instituteLocation != "yes") {
          const location = {
            city: values.city,
            state: values.state,
            address: values.address,
            pinCode: values.pinCode,
            id: props.formValues.test_info.selectedTests[id]._id
          };
          collectionLocation[id].location = location;
          setCollectionLocation(collectionLocation);
        } else {
          const location = {
            institute: "Institute"
          };
          collectionLocation[id].location = location;
        }
      }
    }
  }, _ref3 => {
    let {
      values
    } = _ref3;
    return /*#__PURE__*/_react.default.createElement(_formik.Form, null, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-12 col-md-6 form-group"
    }, /*#__PURE__*/_react.default.createElement("label", null, "Sample Container Id", /*#__PURE__*/_react.default.createElement("span", {
      className: "marked"
    }, "*")), /*#__PURE__*/_react.default.createElement("input", {
      type: "text",
      name: id,
      value: containerId[id].value,
      placeholder: "Enter Sample Container id (minimum 5 characters)",
      className: "form-control",
      onChange: value => handleCytoContainerIdChange(value, id)
    }), containerIdErrors[id] && /*#__PURE__*/_react.default.createElement("div", {
      className: "formErr"
    }, "Required"), containerIdValidationList[id] && /*#__PURE__*/_react.default.createElement("div", {
      className: "formErr"
    }, "Id should have more than 4 characters ")), /*#__PURE__*/_react.default.createElement("div", {
      className: "col-8 col-md-4 form-group"
    }, /*#__PURE__*/_react.default.createElement("label", null, "Sample Container Type", /*#__PURE__*/_react.default.createElement("span", {
      className: "marked"
    }, "*")), containers[id] ? /*#__PURE__*/_react.default.createElement(_reactSelect.default, {
      name: id,
      getOptionLabel: e => "".concat(e.label),
      getOptionValue: e => "".concat(e.value),
      options: containers[id],
      value: selectedContainerType[id],
      onChange: value => handleContainerTypeChange(value, id),
      name: "referenceDoctorState"
    }) : /*#__PURE__*/_react.default.createElement("label", null, "Containers Not Found"), /*#__PURE__*/_react.default.createElement(_formik.ErrorMessage, {
      name: "sampleContainerType",
      component: "div",
      className: "formErr"
    }), containerTypeErrors[id] && /*#__PURE__*/_react.default.createElement("div", {
      className: "formErr"
    }, "Required")), /*#__PURE__*/_react.default.createElement("div", {
      className: "col-4 col-md-2 form-group"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "row mt-1"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-md-12 col-12 text-left mt-4"
    }, /*#__PURE__*/_react.default.createElement("button", {
      name: id,
      type: "button",
      className: "btn btn-primary",
      onClick: () => handleCytoAddContainerID(id)
    }, "Add")))), /*#__PURE__*/_react.default.createElement("div", {
      className: "col-10 col-md-8 form-group"
    }, sampleContainerList[id].containers.map((test, container_id) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "row mb-1"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-10"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group mb-0"
    }, /*#__PURE__*/_react.default.createElement("label", {
      className: "form-control",
      style: {
        height: "auto"
      }
    }, test.type, ": ", test.id))), /*#__PURE__*/_react.default.createElement("div", {
      className: "col-2  text-left"
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        padding: "5px 20px"
      }
    }, /*#__PURE__*/_react.default.createElement("button", {
      name: id,
      type: "button",
      className: "btn btn-primary",
      onClick: () => handleCytoRemoveContainerId(id, container_id)
    }, "remove")))))))), test.pcpndt && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("h6", null, "PCPNDT Info"), /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement("div", {
      className: "mb-3"
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "file",
      ref: pcpndtReference[id],
      accept: "image/*,application/pdf",
      style: {
        display: 'none'
      },
      className: "form-control",
      onChange: files => uploadPcpndtScans(files, id),
      multiple: true
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-md-6 col-12"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group",
      style: {
        display: "flex"
      }
    }, /*#__PURE__*/_react.default.createElement(_formik.Field, {
      ref: instituteLocationRef[id],
      type: "checkbox",
      name: "instituteLocation",
      value: "yes"
    }), /*#__PURE__*/_react.default.createElement("label", {
      className: "mb-3 ml-3"
    }, "Sample pickup location is same as institute location ", /*#__PURE__*/_react.default.createElement("span", {
      className: "marked"
    }, "*")), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_formik.ErrorMessage, {
      name: "instituteLocation",
      component: "div",
      className: "formErr"
    })))), /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react.default.createElement("label", null, "Location ", /*#__PURE__*/_react.default.createElement("span", {
      className: "marked"
    }, "*"))), /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react.default.createElement(_TextField.default, {
      title: "Address",
      name: "address",
      mandatory: true,
      component: "textarea",
      isDisabled: values.instituteLocation == "yes" ? true : false
    }), /*#__PURE__*/_react.default.createElement(_TextField.default, {
      title: "Pin Code",
      name: "pinCode",
      mandatory: true,
      isDisabled: values.instituteLocation == "yes" ? true : false
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "col-md-6 col-12"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/_react.default.createElement("label", null, "City ", /*#__PURE__*/_react.default.createElement("span", {
      className: "marked"
    }, "*")), /*#__PURE__*/_react.default.createElement(_mySelect.default, {
      isMulti: false,
      optionList: _constants.cityList,
      name: "city",
      isDisabled: values.instituteLocation == 'yes' ? true : false
    }), /*#__PURE__*/_react.default.createElement(_formik.ErrorMessage, {
      name: "city",
      component: "div",
      className: "formErr"
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: "col-md-6 col-12"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/_react.default.createElement("label", null, "State ", /*#__PURE__*/_react.default.createElement("span", {
      className: "marked"
    }, "*")), /*#__PURE__*/_react.default.createElement(_mySelect.default, {
      isMulti: false,
      optionList: _constants.stateList,
      name: "state",
      isDisabled: values.instituteLocation == 'yes' ? true : false
    }), /*#__PURE__*/_react.default.createElement(_formik.ErrorMessage, {
      name: "state",
      component: "div",
      className: "formErr"
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: "col-4 col-md-4 form-group"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "row mt-1"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "text-right mt-4"
    }, /*#__PURE__*/_react.default.createElement("button", {
      htmlFor: "files",
      type: "button",
      className: "btn btn-primary",
      onClick: () => handleUploadScansClick(id)
    }, "Upload Scans"))))), /*#__PURE__*/_react.default.createElement("div", {
      className: "col-10 col-md-8 form-group"
    }, props.fileUpload.pcpndtFiles[id].scans.map((name, container_id) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
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
    }, name.name ? name.name : name.displayName ? name.displayName : name.originalname))), /*#__PURE__*/_react.default.createElement(_CancelOutlined.default, {
      size: "medium",
      onClick: e => onRemovePcpndt(id, container_id)
    }))))))));
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "row",
    id: "action1"
  }, props.fromSuperDtrf && /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-2 col-2 text-left"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: "5px 20px"
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    onClick: e => _router.default.push("/super-dtrf"),
    className: "btn btn-primary"
  }, "Exit"))), /*#__PURE__*/_react.default.createElement("div", {
    className: props.fromSuperDtrf ? "col-md-10 col-10 text-right" : "col-md-12 col-12 text-right"
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
    type: "submit",
    className: "btn btn-primary",
    onClick: e => {
      firstFormikRef.current.validateForm();
      finalSubmit();
    }
  }, "Next")))));
};

const mapStateToProps = state => ({
  formDataRedux: state.formData.formData,
  Token: state.Token,
  usgFile: state.fileUpload.usgFile ? state.fileUpload.usgFile : null,
  patientConsentFile: state.fileUpload.patientConsentFile ? state.fileUpload.patientConsentFile : null,
  otherFiles: state.fileUpload.otherFiles ? state.fileUpload.otherFiles : null,
  doctorAttestationFile: state.fileUpload.doctorAttestation ? state.fileUpload.doctorAttestation : null,
  patientDeclarationPNDT: state.fileUpload.patientDeclarationPNDT ? state.fileUpload.patientDeclarationPNDT : null,
  patientInformedConsent: state.fileUpload.patientInformedConsent ? state.fileUpload.patientInformedConsent : null,
  consentAndIndemnity: state.fileUpload.consentAndIndemnity ? state.fileUpload.consentAndIndemnity : null,
  limitationOfTest: state.fileUpload.limitationOfTest ? state.fileUpload.limitationOfTest : null,
  patientPrivacy: state.fileUpload.patientPrivacy ? state.fileUpload.patientPrivacy : null,
  doctors: state.Doctors.doctorList,
  pcpndtFiles: state.fileUpload.pcpndtFiles ? state.fileUpload.pcpndtFiles : null,
  referralLetter: state.fileUpload.referralLetter ? state.fileUpload.referralLetter : null,
  pnsReport: state.fileUpload.pnsReport ? state.fileUpload.pnsReport : null,
  ntScan: state.fileUpload.ntScan ? state.fileUpload.ntScan : null,
  cbc: state.fileUpload.cbc ? state.fileUpload.cbc : null,
  cbcDoc: state.fileUpload.cbcDoc ? state.fileUpload.cbcDoc : null,
  bth: state.fileUpload.bth ? state.fileUpload.bth : null,
  fileUpload: state.fileUpload
});

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  getMandatoryFilesInRedux: _fileupload.getMandatoryFilesInRedux,
  getDeletedFiles: _fileupload.getDeletedFiles,
  getFiles: _fileupload.getFiles,
  getFilesReference: _fileupload.getFilesReference,
  getFilesToUpload: _fileupload.getFilesToUpload,
  getClearDeleteFiles: _fileupload.getClearDeleteFiles,
  setFormData: _formData.setFormData,
  getPcpndtFiles: _fileupload.getPcpndtFiles
})(ClinicalHistory);

exports.default = _default;