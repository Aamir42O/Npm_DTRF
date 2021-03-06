"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _reactSelect = _interopRequireDefault(require("react-select"));

var _formik = require("formik");

var _constants = require("../../public/constants");

var _router = _interopRequireWildcard(require("next/router"));

var _reactRedux = require("react-redux");

var _nanoid = require("nanoid");

var _token = require("../../actions/token");

var _axios = _interopRequireDefault(require("axios"));

var _antd = require("antd");

var _reactBootstrap = require("react-bootstrap");

var _Auth = _interopRequireDefault(require("../../helper/Auth"));

var _formData = require("../../actions/formData");

var _Radio = _interopRequireDefault(require("../Fields/Radio"));

var _NumberField = _interopRequireDefault(require("../Fields/NumberField"));

var _TextField = _interopRequireDefault(require("../Fields/TextField"));

var _DateField = _interopRequireDefault(require("../Fields/DateField"));

var _commonHelper = require("../../helper/commonHelper");

var _DisplayField = _interopRequireDefault(require("../DisplayFields/DisplayField"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const emptyFormObject = {
  salutation: "mr",
  name: {
    firstName: "",
    lastName: ""
  },
  firstName: "",
  lastName: "",
  husbandsOrFathersName: "",
  gender: "",
  dateOfBirth: (0, _moment.default)().format("YYYY-MM-DDThh:mm"),
  address: "",
  pinCode: "",
  city: "",
  state: "",
  email: "",
  contact: "",
  weight: "",
  height: "",
  smoking: "",
  folicAcidIntake: "",
  filledBy: "",
  ref_token: "",
  dtrf_token: "",
  consanguinity: "",
  medicalInformationOption: ""
};

const PatientForm = props => {
  let [fromDetails, setFormDetails] = (0, _react.useState)(emptyFormObject);
  const [, reRender] = (0, _react.useState)();
  const [filledBy, setFilledBy] = (0, _react.useState)("");
  const [editable, setEditable] = (0, _react.useState)(false); //   const [medicalInformationOption, setMedicalInformationOption] = useState();

  const [showErrorMessage, setShowErrorMessage] = (0, _react.useState)(false);
  const [selectedCity, setSelectedCity] = (0, _react.useState)({});
  const [selectedState, setSelectedState] = (0, _react.useState)({});
  const [patientEntryType, setPatientEntryType] = (0, _react.useState)();
  const [err, setErrors] = (0, _react.useState)({});
  const [isPatientInformationLinkSent, setIsPatientInformationLinkSent] = (0, _react.useState)();
  const [patient, setPatient] = (0, _react.useState)(null);
  const [salutation, setSalutation] = (0, _react.useState)('');
  const [hasNipt, setHasNipt] = (0, _react.useState)(false);
  const [hasPns, setHasPns] = (0, _react.useState)(false);
  const [hasNbs, setHasNbs] = (0, _react.useState)(false);
  const [testGroup, setTestGroup] = (0, _react.useState)("");
  const [maxAge, setMaxAge] = (0, _react.useState)(null);
  const [ageInYears, setAgeInYears] = (0, _react.useState)("");
  const [ageInMonths, setAgeInMonths] = (0, _react.useState)("");
  const [ageInDays, setAgeInDays] = (0, _react.useState)("");
  const [patientFound, setPatientFound] = (0, _react.useState)(false);
  const [patientFoundModal, setPatientFoundModal] = (0, _react.useState)(false);
  const [patientFoundDetails, setPatientFoundDetails] = (0, _react.useState)("");
  const [usePatientFound, setUsePatientFound] = (0, _react.useState)(false);
  const [gender, setGender] = (0, _react.useState)([]);
  console.log("PR))))0000000", props);
  const formikRef = (0, _react.useRef)();

  const getDataFromTest = () => {
    if (props.formValues.test_info && !maxAge && gender.length <= 0) {
      let maxxAge = null;
      let genderValidation = null;
      props.formValues.test_info.selectedTests.map(test => {
        if (!genderValidation) {
          genderValidation = test.sex;
        } else if (genderValidation.length > 1 && test.sex.length < genderValidation) {
          genderValidation = test.sex;
        } else if (test.sex.length == 1) {
          genderValidation = test.sex;
        } else if (genderValidation.length > 1 && test.sex.length == genderValidation) {
          let temp = [];
          test.sex.map((sex, id) => {
            if (genderValidation[id] == sex) {
              temp.push(sex);
            }
          });
          genderValidation = temp;
        }

        if (test.sub_group != "Both") {
          setTestGroup(test.sub_group);
        }

        if (test.sub_group == "NBS") {
          setHasNbs(true);
        }

        if (test.max_age) {
          if (maxxAge) {
            if (maxAge > test.max_age) {
              maxxAge = test.max_age;
            }
          } else {
            maxxAge = test.max_age;
          }
        }
      });
      console.log(maxxAge, "maxage");
      let temp = [];
      genderValidation.map(data => {
        temp.push(data.toLowerCase());
      });
      console.log("GENDER VALIDATION", genderValidation, temp);
      setGender(temp);
      setMaxAge(maxxAge);
    }
  };

  (0, _react.useEffect)(async () => {
    console.log("props00000000000000000000000000", props);

    if (props.testGroup && props.sendBy == "Link") {
      if (props.testGroup == "PNS") {
        setHasPns(true);
      } else if (props.testGroup == "NIPT") {
        setHasNipt(true);
      } else if (props.testGroup == "NBS") {
        setHasNbs(true);
      } else if (props.testGroup == "CYTO") {
        setHasNipt(true);
      }
    }

    if (props.sendBy == "Link") {
      setPatientEntryType("Staff");
    }

    if (props.sendBy && props.sendBy == "Link" && !props.isNew) {
      props.getPatient_details(props.patient);
    }

    if (props.sendBy == "Link") {
      setMaxAge(props.maxAge);
      setGender(props.gender);
    } else {
      getDataFromTest();
    }

    if (props.dynamicPatient.dateOfBirth && !ageInYears) {
      let age = setAgeInYMD(props.dynamicPatient.dateOfBirth);
      setAgeInYears(age.years);
      setAgeInMonths(age.months);
      setAgeInDays(age.days);

      if (props.dynamicPatient.fathersName) {
        setDateOfBirth(props.dynamicPatient.dateOfBirth);
      } else {
        setDateOfBirth("");
      }
    } // props.formValues.test_info.selectedTests.map((test) => {
    //   if (test.sub_group == "NBS") {
    //     sethasNbs(true)
    //   }
    // })


    if ((props.new || props.patient_details != 1) && props.patient != "new") {
      setSelectedCity({
        label: props.patient.city,
        value: props.patient.city
      });
      setSelectedState({
        label: props.patient.state,
        value: props.patient.state
      });
    }

    if (props.formValues.test_info) {
      props.formValues.test_info.selectedTests.map(test => {
        if (test.sub_group == "PNS") {
          setHasPns(true);
        }

        if (test.sub_group == "NIPT") {
          setHasNipt(true);
          console.log("HAS NIPT TRUE");
        }

        if (test.sub_group == "NBS") {
          setHasNbs(true);
        }
      });
    }

    if (props.patient && props.patient != "new") {
      setSelectedCity({
        label: props.patient.city,
        value: props.patient.city
      });
      setSelectedState({
        label: props.patient.state,
        value: props.patient.state
      });
    }

    setPatient(props.patient);
    reRender({});

    if (props.patient_details != 1 && props.patient) {
      if (props.new) {
        setNewFormData(props.patient_details);
        setSelectedCity({
          value: props.patient_details.city,
          label: props.patient_details.city
        });
        setSelectedState({
          value: props.patient_details.state,
          label: props.patient_details.state
        });
        setPatientEntryType(props.patient_details.filledBy);

        if (props.patient_details.filledBy == "patient") {
          setFilledBy("patient");
          setIsPatientInformationLinkSent(true);
        }
      } else {
        if (props.patient_details.filledBy == "patient") {
          setFilledBy("patient");
          setIsPatientInformationLinkSent(true);
        }

        setPatientData(props.patient_details);
        setSelectedCity({
          value: props.patient_details.city,
          label: props.patient_details.city
        });
        setSelectedState({
          value: props.patient_details.state,
          label: props.patient_details.state
        });
        setPatientEntryType(props.patient_details.filledBy);
      }
    } else {
      setEditable(true);
    }
  }, [props.patient, patient]);

  const getAgeInDate = age => {
    let presentDate = (0, _moment.default)();
    presentDate = (0, _moment.default)(presentDate).subtract(age.years, 'years').format('DD MMM YYYY');
    presentDate = (0, _moment.default)(presentDate).subtract(age.months, 'months').format('DD MMM YYYY');
    presentDate = (0, _moment.default)(presentDate).subtract(age.days, 'days').format('DD MMM YYYY');
    return (0, _moment.default)(presentDate).format("YYYY-MM-DD");
  };

  const setAgeInYMD = dob => {
    let presentDate = (0, _moment.default)();
    let DOB = (0, _moment.default)(dob);
    console.log("DOB", DOB);

    let age = _moment.default.duration((0, _moment.default)(presentDate).diff(DOB));

    let years = age.years();
    console.log(years, "age");
    let months = age.months();
    console.log(months, "moths");
    let days = age.days();
    console.log(days, "moths");
    return {
      days,
      months,
      years
    };
    console.log("AGE IN DATEOFBIRTH", dateOfBirth);
    let ageInYears = (0, _moment.default)().diff(dateOfBirth, "years");
    console.log("Age in Years", ageInYears);
    setAgeInYears(ageInYears);
    let ageInMonth = (0, _moment.default)(dateOfBirth).add(ageInYears, "years");
    ageInMonth = (0, _moment.default)(ageInMonth).format("YYYY-MM-DD");
    let ageInDays = (0, _moment.default)(dateOfBirth).add(ageInYears, "years");
    console.log("age In", ageInMonth);
    ageInMonth = (0, _moment.default)().diff(ageInMonth, "months");
    ageInDays = (0, _moment.default)(ageInDays).add(ageInMonth, "months");
    setAgeInMonths(ageInMonth);
    console.log("Age in month", ageInMonth);
    console.log(ageInDays, "age in ADD");
    ageInDays = (0, _moment.default)().diff(ageInDays, "days");
    ageInMonth = (0, _moment.default)().add(ageInMonth, "months");
    setAgeInDays(ageInDays);
    console.log("AGE IN DAYS", ageInDays);
  };

  console.log("PATIENT", patient); // !!!!!@@@@@@@@@@@@@@@@@@@@@@@@@@@!!!!!!!!!!!!!!!!!!~~~~~~~~~~~~~~~OnSaveByLink~~~~~~~~~~~~~~~~~~~~~~~~!!!!!!!!!!!!!!!!!!@@@@@@@@@@@@@@@@@@@@@

  const onSaveByLink = e => {
    console.log();
  };

  const router = (0, _router.useRouter)();

  const handleOnSubmit = e => {
    console.log("formikReff", formikRef);

    if (!(Object.keys(formikRef.current.errors).length === 0 && formikRef.current.errors.constructor === Object)) {
      (0, _commonHelper.errorMessage)("Please fill in the required fields to proceed");
    }
  }; // !!!!!!!!!!!!!!!!!!!!!!!!!!!!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~onSaveByLink Close~~~~~~~~~~~~~~~~~~~~!!!!!!!!!!!!!!!!!!!!@@@@@@@@@@@@@@@@@@2
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ADMIN PANEL CODE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  const handleOnClickSave = async patientInfo => {
    console.log("PATINET INFO ON SAVE", patientInfo);
    let data = {};
    let formData = new FormData();
    data.dtrf_id = props.Token.dtrfToken;
    data.dtrf = JSON.parse(JSON.stringify(props.formDataRedux));
    const values = JSON.parse(JSON.stringify(patientInfo));

    if (patientEntryType == "Staff") {
      values.filledBy = patientEntryType;

      if (values.dateOfBirth) {
        values.dateOfBirth = (0, _moment.default)(values.dateOfBirth).format("YYYY-MM-DD");
      }

      if (props.new || props.patient_details.isNew) {
        values.isNew = true;
      } else {
        values.isNew = false;
      }

      if (hasNbs && !props.dynamicPatient.fathersName) {
        values.isNew = true;
      }

      console.log("ADASDASDA@#@#!@#!@#", values);
    } else if (props.new || props.patient_details.isNew) {
      if (values.dateOfBirth) {
        values.dateOfBirth = (0, _moment.default)(values.dateOfBirth).format("YYYY-MM-DD");
      }

      values.filledBy = patientEntryType;
      values.isNew = true;
      console.log("VALUES ", values);
    } else {
      if (values.dateOfBirth) {
        values.dateOfBirth = (0, _moment.default)(values.dateOfBirth).format("YYYY-MM-DD");
      }

      console.log("FORM WILL BE FILLED BT PATIENT ");
      const name = {
        firstName: values.firstName,
        lastName: values.lastName
      };
      values.isNew = false;

      if (hasNbs && !props.dynamicPatient.mothersFirstName) {
        values.isNew = true;
      }

      values.name = name;
      values.filledBy = patientEntryType;
    }

    data.dtrf.patient_details = values;
    values.name = {
      firstName: values.firstName,
      lastName: values.lastName
    };
    props.getPatient_details(values);
    const response = await props.handleOnClickSave(_objectSpread(_objectSpread({}, props.formDataRedux), {}, {
      patient_details: values
    }));

    if (response) {
      props.setFormData(_objectSpread(_objectSpread({}, props.formDataRedux), {}, {
        patient_details: values
      }));

      if (response.status == 200) {
        (0, _commonHelper.successMessage)("Form saved");
      } else {
        (0, _commonHelper.errorMessage)("Error in saving form, please try again");
      }
    } else {
      (0, _commonHelper.errorMessage)("Error in saving form, please try again");
    }
  }; // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ADMIN PANEL CODE CLOSE ~~~~~~~~~~~~~~~~~~~~~~~~~~
  // My edit 


  const previousStep = () => {
    props.previousStep();
  }; // close 


  const handleOnClickPrevious = () => {
    props.handleOnClickPrevious();
  };

  const handleOnClickNext = values => {
    if (patientFound && !usePatientFound) {
      return;
    }

    if (hasNbs) {
      if (values.dateOfBirth) {
        values.dateOfBirth = (0, _moment.default)(values.dateOfBirth).format("YYYY-MM-DD");
      }

      console.log("inside condition");

      if (values.hasBabyName == "true") {
        values.hasBabyName = true;
      } else {
        values.hasBabyName = false;
      }
    }

    console.log(values.hasBabyName, "hasBabyName");
    console.log(123123123123, props.new);
    values.name = {
      firstName: values.firstName,
      lastName: values.lastName
    };

    if (props.formValues.collectionLocation.location == "Home") {
      return props.handleOnClickNext(values);
    }

    if (patientEntryType == "patient" && !isPatientInformationLinkSent) {
      (0, _commonHelper.errorMessage)("Click Send Link");
    } else {
      console.log("INSIDE ELSE");

      if (patientEntryType == "Staff") {
        values.filledBy = patientEntryType;

        if (values.dateOfBirth) {
          values.dateOfBirth = (0, _moment.default)(values.dateOfBirth).format("YYYY-MM-DD");
        }

        if (props.new || props.patient_details.isNew) {
          values.isNew = true;
        } else {
          values.isNew = false;
        }

        if (hasNbs && !props.dynamicPatient.fathersName) {
          values.isNew = true;
        }

        console.log("ADASDASDA@#@#!@#!@#", values);
        props.handleOnClickNext(values);
      } else if (props.new || props.patient_details.isNew) {
        if (values.dateOfBirth) {
          values.dateOfBirth = (0, _moment.default)(values.dateOfBirth).format("YYYY-MM-DD");
        }

        values.filledBy = patientEntryType;
        values.isNew = true;
        console.log("VALUES ", values);
        props.handleOnClickNext(values);
      } else {
        if (values.dateOfBirth) {
          values.dateOfBirth = (0, _moment.default)(values.dateOfBirth).format("YYYY-MM-DD");
        }

        console.log("FORM WILL BE FILLED BT PATIENT ");
        const name = {
          firstName: values.firstName,
          lastName: values.lastName
        };
        values.isNew = false;

        if (hasNbs && !props.dynamicPatient.mothersFirstName) {
          values.isNew = true;
        }

        values.name = name;
        values.filledBy = patientEntryType;
        props.handleOnClickNext(values);
      }
    }
  }; // const setPatientData = (patient) => {
  //   if (!patient.__isNew__) {
  //     fromDetails = patient;
  //     console.log("FromDetails", fromDetails)
  //     setFormDetails(fromDetails);
  //     setSelectedCity(cityList.find((city) => city.value == fromDetails.city));
  //     setSelectedState(
  //       stateList.find((state) => state.value == fromDetails.state)
  //     );
  //     setEditable(false);
  //     reRender({});
  //   } else {
  //     setFormDetails(emptyFormObject);
  //     reRender({});
  //   }
  // };
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TEST SET SELECTED CITY


  const setPatientData = patient => {
    if (!patient.__isNew__) {
      fromDetails = patient;
      console.log("FromDetails", fromDetails);
      setFormDetails(fromDetails);
      setSelectedCity(_constants.cityList.find(city => city.value == patient.city));
      setSelectedState(_constants.stateList.find(state => state.value == patient.state));
      setEditable(false);
      reRender({});
    } else {
      setFormDetails(emptyFormObject);
      reRender({});
    }
  }; // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CLOSE~~~~~~~~~~~~~~~~~~~~~~~~~~


  const handleCityChange = value => {
    console.log(value);
    fromDetails.city = value.value;
    setSelectedCity(value);
    setFormDetails(fromDetails);
    setShowErrorMessage(false);
    reRender({});
  };

  const handleStateChange = value => {
    console.log(value);
    fromDetails.state = value.value;
    setSelectedState(value);
    setFormDetails(fromDetails);
    setShowErrorMessage(false);
    reRender({});
  };

  const [sendLinkContact, getSendLinkContact] = (0, _react.useState)({
    contact: ""
  });

  const onChangeContact = e => {
    console.log(e.target.value);
  };

  const handleSendFormLink = async () => {
    console.log(123123, newFormData);
    console.log("INside handleSendFormLink", sendLinkContact);
    const refTokenName = "?ref_token=";
    const refId = (0, _nanoid.nanoid)(10);
    const dtrfTokenName = "?dtrf_token=";
    console.log(formikRef.current.values.contact, "Contact Number");
    props.setRefToken(refId);
    console.log("INSIDE SENDLINK HANDLE");

    if (props.new) {
      console.log("INside NEw ");
      var formData = {
        "ref_token": refId,
        "dtrf_token": props.Token.dtrfToken,
        "phone_number": formikRef.current.values.contact,
        "category": testGroup,
        "maxAge": maxAge,
        "gender": gender
      };
      const url = process.env.NEXT_PUBLIC_SEND_KYC_LINK; // const url = "http://dtrf.aiolos.solutions:8187/v1/patient/send-patient-kyc-link"

      const res = await (0, _Auth.default)(url, "POST", formData, {
        superDtrf: props.fromSuperDtrf,
        dtrfFront: props.fromDtrfFront
      }); // const res = await axios.post(process.env.NEXT_PUBLIC_SEND_KYC_LINK, formData)

      console.log(res);
    } else {
      var formData = {
        "ref_token": refId,
        "dtrf_token": props.Token.dtrfToken,
        "phone_number": formikRef.current.values.contact,
        "patient_id": props.dynamicPatient._id,
        "category": testGroup,
        "maxAge": maxAge,
        "gender": gender
      };
      console.log("Inside existing patient ", patient);
      const url = process.env.NEXT_PUBLIC_SEND_KYC_LINK; // const url = "http://dtrf.aiolos.solutions:8187/v1/patient/send-patient-kyc-link"

      const res = await (0, _Auth.default)(url, "POST", formData, {
        superDtrf: props.fromSuperDtrf,
        dtrfFront: props.fromDtrfFront
      }); // const res = await axios.post(process.env.NEXT_PUBLIC_SEND_KYC_LINK, formData)

      console.log("RESPONSE", res);
    }

    setIsPatientInformationLinkSent(true);
  };

  const handlePatientTypeRadioButtonClick = value => {
    console.log(value.target.value);

    if (value.target.value == 1) {
      console.log("INside StAFFFFFFFFF");
      setFilledBy("Staff");
      setPatientEntryType("Staff");
      setPatientEntryType("Staff");
    } else {
      setFilledBy("patient");
      setPatientEntryType("patient");
    }
  };

  const [firstName, setFirstName] = (0, _react.useState)("");
  const [lastName, setLastName] = (0, _react.useState)("");
  const [contact, setContact] = (0, _react.useState)("");
  const [dateOfBirth, setDateOfBirth] = (0, _react.useState)("");
  const [hasBabyName, setHasBabyName] = (0, _react.useState)("");
  (0, _react.useEffect)(() => {
    console.log(formikRef, "FORMIKREF");

    const tempFunc = async () => {
      if (formikRef.current.values.firstName && formikRef.current.values.lastName && formikRef.current.values.contact && formikRef.current.values.dateOfBirth) {
        console.log("INSIDE SEARCH PATIENT");
        let currentDetail = "";
        let prefilledDetail = "";

        if (props.dynamicPatient != "new") {
          currentDetail = formikRef.current.values.firstName.trim() + formikRef.current.values.lastName.trim() + formikRef.current.values.contact + (0, _moment.default)(formikRef.current.values.dateOfBirth).format("YYYY-MM-DD"); // currentDetail = firstName + lastName + contact + dateOfBirth

          prefilledDetail = props.dynamicPatient.name.firstName + props.dynamicPatient.name.lastName + props.dynamicPatient.contact + props.dynamicPatient.dateOfBirth;
        }

        console.log("Patient search condition ", currentDetail, prefilledDetail, currentDetail == prefilledDetail);

        if (currentDetail != prefilledDetail && !patientFound) {
          await searchPatient(formikRef.current.values.firstName, formikRef.current.values.lastName, formikRef.current.values.contact, (0, _moment.default)(formikRef.current.values.dateOfBirth).format("YYYY-MM-DD"));
        }
      }
    };

    if (formikRef.current && props.sendBy != "Link") {
      tempFunc();
    }
  });

  const searchPatient = async (firstName, lastName, contact, dateOfBirth) => {
    console.log("INSIDE SEARCH PATIENT", dateOfBirth);
    let errors = {}; // let dateOfBirth2 = moment(dateOfBirth).format("YYYY-MM-DD")
    // let dateOfBirth2 = moment(dateOfBirth).format("DD/MM/YYYY")

    if (!/^[a-zA-Z ]+$/.test(firstName) || !/^[a-zA-Z ]+$/.test(lastName)) {
      errors.name = "Only alphabet in name";
    } else {
      delete errors.name;
    }

    if (!/^[0-9]{10}$/.test(contact)) {
      errors.contact = "Error";
    } else {
      delete errors.contact;
    }

    console.log("SEARCH PATIENT ERRORS", errors);

    if (Object.keys(errors).length === 0 && errors.constructor === Object && !patientFound) {
      let data = {
        name: {
          firstName,
          lastName
        },
        contact,
        dateOfBirth
      };
      const url = process.env.NEXT_PUBLIC_CHECK_PATIENT; // const url = "http://localhost:8184/v1/patient/check-patient"

      const res = await (0, _Auth.default)(url, "POST", data, {
        superDtrf: props.fromSuperDtrf,
        dtrfFront: props.fromDtrfFront
      });

      if (res && res.data.message == "Patient Found") {
        console.log(res.data.data, "Patient Found");
        setPatientFoundDetails(res.data.data.patient);
        setPatientFound(true);
        setPatientFoundModal(true);
      }

      console.log(res, "PATIENT SEARCH RESPONSE");
    }
  };

  const [newFormData, setNewFormData] = (0, _react.useState)(props.patient); // Modals  

  const [modalShow, setModalShow] = (0, _react.useState)(false);
  const [newModal, setNewModal] = (0, _react.useState)(false);
  console.log("firstName", firstName, lastName, contact, dateOfBirth);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("fieldset", null, patient &&
  /*#__PURE__*/
  // !patient.hasOwnProperty("name"
  _react.default.createElement(_formik.Formik, {
    enableReinitialize: true,
    innerRef: formikRef,
    initialValues: (props.new || props.patient_details != 1) && props.patient != "new" ? {
      // This runs when patient details in REdux,
      hospitalId: props.dynamicPatient.hospitalId ? props.dynamicPatient.hospitalId : "",
      salutation: props.dynamicPatient.salutation ? props.dynamicPatient.salutation : "",
      name: props.patient.name ? props.patient.name : "",
      firstName: hasNbs && !props.dynamicPatient.mothersFirstName ? props.dynamicPatient.fathersName ? props.dynamicPatient.name.firstName : "" : props.dynamicPatient.firstName,
      lastName: hasNbs && !props.dynamicPatient.mothersFirstName ? props.dynamicPatient.fathersName ? props.dynamicPatient.name.lastName : "" : props.dynamicPatient.lastName,
      // firstName: firstName,
      // lastName: lastName,
      husbandsOrFathersName: props.dynamicPatient.husbandsOrFathersName,
      gender: props.dynamicPatient.gender,
      // dateOfBirth: dateOfBirth,
      dateOfBirth: props.dynamicPatient.dateOfBirth,
      address: props.dynamicPatient.address,
      pinCode: props.dynamicPatient.pinCode,
      city: props.dynamicPatient.city,
      state: props.dynamicPatient.state,
      email: props.dynamicPatient.email,
      contact: props.dynamicPatient.contact,
      // contact: contact,
      weight: props.dynamicPatient.weight,
      height: props.dynamicPatient.height,
      smoking: props.dynamicPatient.smoking,
      folicAcidIntake: props.dynamicPatient.folicAcidIntake,
      hasBabyName: props.dynamicPatient.hasBabyName ? props.dynamicPatient.hasBabyName.toString() : props.dynamicPatient.hasBabyName == false ? props.dynamicPatient.hasBabyName.toString() : "",
      mothersFirstName: props.dynamicPatient.gender == "female" && !props.dynamicPatient.mothersFirstName ? props.dynamicPatient.name.firstName : props.dynamicPatient.mothersFirstName ? props.dynamicPatient.mothersFirstName : "",
      mothersLastName: props.dynamicPatient.gender == "female" && !props.dynamicPatient.mothersFirstName ? props.dynamicPatient.name.lastName : props.dynamicPatient.mothersLastName ? props.dynamicPatient.mothersLastName : "",
      mothersDateOfBirth: props.dynamicPatient.gender == "female" && !props.dynamicPatient.mothersFirstName ? props.dynamicPatient.dateOfBirth : props.dynamicPatient.mothersDateOfBirth ? props.dynamicPatient.mothersDateOfBirth : "",
      fathersFirstName: props.dynamicPatient.fathersName ? props.dynamicPatient.fathersName.firstName : props.dynamicPatient.fathersFirstName ? props.dynamicPatient.fathersFirstName : props.dynamicPatient.gender == "male" ? props.dynamicPatient.name.firstName : "",
      fathersLastName: props.dynamicPatient.fathersName ? props.dynamicPatient.fathersName.lastName : props.dynamicPatient.fathersLastName ? props.dynamicPatient.fathersFirstName : props.dynamicPatient.gender == "male" ? props.dynamicPatient.name.lastName : "",
      babysFirstName: props.dynamicPatient.babysFirstName,
      babysLastName: props.dynamicPatient.babysLastName,
      dateOfBirthType: props.dynamicPatient.dateOfBirthType,
      ageInYears: ageInYears,
      ageInMonths: ageInMonths,
      ageInDays: ageInDays,
      ageType: props.dynamicPatient.ageType,
      dateOfBirth: props.dynamicPatient.dateOfBirth,
      test: props.dynamicPatient.test,
      mothersAgeInYears: props.dynamicPatient.mothersAgeInYears,
      mothersAgeInMonths: props.dynamicPatient.mothersAgeInMonths,
      mothersAgeInDays: props.dynamicPatient.mothersAgeInDays,
      mothersAgeType: props.dynamicPatient.mothersAgeType ? props.dynamicPatient.mothersAgeType : "dob"
    } : props.patient == "new" && props.new ? {
      salutation: "",
      hospitalId: "",
      name: {
        firstName: "",
        lastName: ""
      },
      firstName: "",
      lastName: "",
      husbandsOrFathersName: "",
      gender: "",
      dateOfBirth: "",
      address: "",
      pinCode: "",
      city: "",
      state: "",
      email: "",
      contact: props.contactNumber ? props.contactNumber : "",
      weight: "",
      height: "",
      smoking: "",
      folicAcidIntake: "",
      id: "",
      mothersFirstName: "",
      mothersLastName: "",
      mothersDateOfBirth: "",
      hasBabyName: "",
      babysFirstName: "",
      babysLastName: "",
      fathersFirstName: "",
      fathersLastName: "",
      dateOfBirthType: "",
      ageInYMD: "",
      ageInYears: "",
      ageInMonths: "",
      ageInDays: "",
      ageType: "dob",
      dateOfBirth: "",
      test: "",
      mothersAgeInYears: "",
      mothersAgeInMonths: "",
      mothersAgeInDays: "",
      mothersAgeType: "dob"
    } : props.patient.hasOwnProperty("name") && !props.new && {
      // THIS RUNS WHEN PATIENT DETAILS NOT IN REDUX
      hospitalId: props.patient.hospitalId ? props.patient.hospitalId : "",
      salutation: props.patient.salutation ? props.patient.salutation : "",
      firstName: hasNbs && !props.dynamicPatient.mothersName ? "" : props.patient.name.firstName,
      lastName: hasNbs && !props.dynamicPatient.mothersName ? "" : props.patient.name.lastName,
      husbandsOrFathersName: props.patient.husbandsOrFathersName,
      gender: hasNbs && !props.dynamicPatient.fathersName ? "" : props.patient.gender,
      dateOfBirth: hasNbs && !props.dynamicPatient.fathersName ? "" : props.patient.dateOfBirth,
      address: props.patient.address,
      pinCode: props.patient.pinCode,
      city: selectedCity.hasOwnProperty("value") && selectedCity,
      state: selectedState.hasOwnProperty("value") && selectedState,
      email: props.patient.email,
      contact: props.patient.contact,
      weight: hasNbs && !props.dynamicPatient.fathersName ? "" : props.patient.weight,
      height: props.patient.height,
      smoking: props.patient.smoking,
      folicAcidIntake: props.patient.folicAcidIntake,
      mothersFirstName: !props.dynamicPatient.mothersName && props.dynamicPatient.gender == "female" ? props.dynamicPatient.name.firstName : props.dynamicPatient.mothersName ? props.dynamicPatient.mothersName.firstName : "",
      mothersLastName: props.dynamicPatient.gender == "female" && !props.dynamicPatient.mothersName ? props.dynamicPatient.name.lastName : props.dynamicPatient.mothersName ? props.dynamicPatient.mothersName.lastName : "",
      mothersDateOfBirth: !props.dynamicPatient.mothersName && props.dynamicPatient.gender == "female" ? props.dynamicPatient.dateOfBirth : props.dynamicPatient.mothersDateOfBirth ? props.dynamicPatient.mothersDateOfBirth : "",
      hasBabyName: props.patient.hasBabyName ? props.patient.hasBabyName.toString() : props.patient.hasBabyName == false ? props.patient.hasBabyName.toString() : "",
      fathersFirstName: !props.dynamicPatient.mothersName && props.dynamicPatient.gender == "male" ? props.dynamicPatient.name.firstName : props.dynamicPatient.fathersName ? props.dynamicPatient.fathersName.firstName : "",
      fathersLastName: !props.dynamicPatient.mothersName && props.dynamicPatient.gender == "male" ? props.dynamicPatient.name.lastName : props.dynamicPatient.fathersName ? props.dynamicPatient.fathersName.lastName : "",
      babysFirstName: props.patient.babysFirstName,
      babysLastName: props.patient.babysLastName,
      dateOfBirthType: props.patient.dateOfBirthType,
      ageInYears: ageInYears,
      ageInMonths: ageInMonths,
      ageInDays: ageInDays,
      ageType: props.patient.ageType ? props.patient.ageType : "dob",
      dateOfBirth: hasNbs && !props.dynamicPatient.fathersName ? "" : props.patient.dateOfBirth,
      test: props.patient.test,
      mothersAgeInYears: "",
      mothersAgeInMonths: "",
      mothersAgeInDays: "",
      mothersAgeType: "dob"
    },
    validate: async values => {
      const errors = {};

      if (props.fromSuperDtrf) {
        if (props.formValues.collectionLocation.location == "Home") {
          if (values.firstName) {
            console.log("firstName valid", values.firstName);
          }

          if (values.firstName) {
            if (!/^[a-zA-Z ]+$/.test(values.firstName)) {
              errors.firstName = "Name should be in alphabets";
            }
          }

          if (values.lastName) {
            if (!/^[a-zA-Z ]+$/.test(values.lastName)) {
              errors.lastName = "Name should be in alphabets";
            }
          }

          if (values.contact) {
            if (!/^[0-9\b]+$/.test(values.contact)) {
              errors.contact = "Should only be Numbers";
            }

            if (!/^[0-9]{10}$/.test(values.contact)) {
              errors.contact = "Must be exactly 10 digits";
            }
          }
        } else if (filledBy == "patient") {} else {
          if (hasNbs) {
            console.log("INSIDE NBS VALIDATION");

            if (values.mothersDateOfBirth && values.mothersAgeType == "dob") {
              let age = setAgeInYMD(values.mothersDateOfBirth);
              values.mothersAgeInDays = age.days, values.mothersAgeInMonths = age.months;
              values.mothersAgeInYears = age.years;
            }

            if ((0, _commonHelper.hasValue)(values.mothersAgeInDays) && (0, _commonHelper.hasValue)(values.mothersAgeInMonths) && (0, _commonHelper.hasValue)(values.mothersAgeInDays) && values.mothersAgeType == "ageInYMD") {
              values.mothersDateOfBirth = getAgeInDate({
                years: values.mothersAgeInYears,
                months: values.mothersAgeInMonths,
                days: values.mothersAgeInDays
              });
            }

            if (values.ageType == "ageInYMD") {
              if (values.ageInYears) {
                console.log(maxAge);

                if (values.ageInYears > maxAge / 365) {
                  errors.ageInYears = "Age cant be greater than ".concat(maxAge / 365);
                }
              } else if ([null, '', false].includes(values.ageInYears)) {} else if (values.ageInYears < 0) {
                errors.ageInYears = "Negative values is not allowed";
              }

              if ([null, '', false].includes(values.ageInDays)) {} else if (values.ageInDays < 0) {
                errors.ageInDays = "Negative values is not allowed";
              }

              if ([null, '', false].includes(values.ageInMonths)) {}
            }

            if (values.ageType == "dob") {
              if (values.dateOfBirth) {
                const diff = (0, _moment.default)().diff(values.dateOfBirth, "years");
                console.log(diff, "dateofbirth");

                if (diff > maxAge / 365) {
                  errors.dateOfBirth = "Age cant be greater than ".concat(maxAge / 365);
                }
              }
            }

            if (!values.hasBabyName) {}

            if (!values.mothersFirstName) {}

            if (!values.mothersDateOfBirth) {}

            if (values.mothersDateOfBirth) {
              // const diff = moment(values.mothersDateOfBirth).diff(moment().format("YYYY-MM-DD"), "days")
              // if (diff >= 0) {
              //   errors.mothersDateOfBirth = "Invalid Date"
              // }
              const diff2 = (0, _moment.default)((0, _moment.default)().format("YYYY-MM-DD")).diff(values.mothersDateOfBirth, "years");

              if (diff2 < 18) {
                errors.mothersDateOfBirth = "Age should be more than 18 Years";
              }
            }

            if ([null, '', false].includes(values.weight)) {} else if (values.weight >= 10) {
              errors.weight = "Weight should be less than 10kg";
            }
          }

          if (!values.firstName) {} else if (!/^[a-zA-Z ]+$/.test(values.firstName)) {
            errors.firstName = "Name should be in alphabets";
          } // if (!values.lastName) {
          // }


          if (values.lastName) {
            if (!/^[a-zA-Z ]+$/.test(values.lastName)) {
              errors.lastName = "Name should be in alphabets";
            }
          }

          if (!values.contact) {} else if (!/^[0-9\b]+$/.test(values.contact)) {
            errors.contact = "Should only be Numbers";
          } else if (!/^[0-9]{10}$/.test(values.contact)) {
            errors.contact = "Must be exactly 10 digits";
          }

          if (!values.ageType) {}

          if (values.ageType == "dob") {
            if (!values.dateOfBirth) {} else {
              const diff = (0, _moment.default)(values.dateOfBirth).diff((0, _moment.default)().format("YYYY-MM-DD"), "days");

              if (diff > 0) {
                errors.dateOfBirth = "Future date is not allowed";
              }
            }
          }

          if (!hasNbs) {
            if (!values.husbandsOrFathersName) {} else if (!/^[a-zA-Z ]+$/.test(values.husbandsOrFathersName)) {
              errors.husbandsOrFathersName = "Name should be in alphabets";
            }
          }

          if (!values.gender) {} else {
            if (!gender.includes(values.gender)) {
              errors.gender = values.gender + " is not a valid gender for this test";
            }
          }

          if (values.email) {
            if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(values.email)) {
              errors.email = "Email address should be valid";
            }
          }

          if (values.ageType == "ageInYMD") {
            if (values.ageInMonths == 0 && values.ageInDays == 0 && values.ageInYears == 0) {
              errors.ageInYears = "Age cant be 0";
            }

            if ([null, '', false].includes(values.ageInDays)) {} else if (values.ageInDays > 31) {
              errors.ageInDays = "Day cant be greater than 31";
            } else if (!/^[0-9]\d*$/.test(values.ageInDays)) {
              errors.ageInDays = "Invalid value";
            }

            if ([null, '', false].includes(values.ageInMonths)) {} else if (values.ageInMonths < 0) {
              errors.ageInMonths = "Negative values is not allowed";
            } else if (values.ageInMonths > 12) {
              errors.ageInMonths = "Month cant be greater than 12";
            } else if (!/^[0-9]\d*$/.test(values.ageInMonths)) {
              errors.ageInMonths = "Invalid value";
            }

            if ([null, '', false].includes(values.ageInYears)) {} else if (!/^[0-9]\d*$/.test(values.ageInYears)) {
              errors.ageInYears = "Invalid value";
            }

            if (values.ageInDays && values.ageInMonths && values.ageInYears) {
              if (values.ageInDays) {
                console.log(values.ageInDays, "age in DAYs");
              }

              if (values.ageInDays < 0) {
                errors.ageInDays = "Days Cannot be negative";
              }

              if (values.ageInMonths < 0) {
                errors.ageInMonths = "Months Cannot be in negative";
              } else if (values.ageInMonths > 12) {
                errors.ageInMonths = "Months cant be greater than 12";
              }

              if (values.ageInYears < 0) {
                errors.ageInYears = "Years Cannot be in negative";
              }

              if (values.ageType == "ageInYMD" && values.ageInYears && values.ageInMonths && values.ageInDays) {
                const diff = (0, _moment.default)().subtract(values.ageInYears, "years");
                let formated = (0, _moment.default)(diff).format("YYYY-MM-DD");
                formated = (0, _moment.default)(formated).subtract(values.ageInMonths, "months");
                formated = (0, _moment.default)(formated).subtract(values.ageInDays, "days");
                formated = (0, _moment.default)(formated).format("YYYY-MM-DD");
                console.log(formated, "date of birth");
                values.dateOfBirth = formated;
              }
            }
          }

          if (values.ageType == "dob") {
            if (!values.dateOfBirth) {}

            if (values.ageType == "dob" && values.dateOfBirth) {
              let ageInYears = (0, _moment.default)().diff(values.dateOfBirth, "years");
              console.log("Age in Years", ageInYears);
              values.ageInYears = ageInYears; // setAgeInYears(ageInYears)

              let ageInMonth = (0, _moment.default)(values.dateOfBirth).add(ageInYears, "years");
              ageInMonth = (0, _moment.default)(ageInMonth).format("YYYY-MM-DD");
              let ageInDays = (0, _moment.default)(values.dateOfBirth).add(ageInYears, "years");
              console.log("age In", ageInMonth);
              ageInMonth = (0, _moment.default)().diff(ageInMonth, "months");
              ageInDays = (0, _moment.default)(ageInDays).add(ageInMonth, "months");
              console.log("Age in month", ageInMonth);
              values.ageInMonths = ageInMonth; // setAgeInMonths(ageInMonth)

              console.log(ageInDays, "age in ADD");
              ageInDays = (0, _moment.default)().diff(ageInDays, "days");
              ageInMonth = (0, _moment.default)().add(ageInMonth, "months"); // setAgeInDays(ageInDays)

              values.ageInDays = ageInDays;
              console.log("AGE IN DAYS", ageInDays);
            }
          }

          if ([null, '', false].includes(values.height)) {} else if (values.height <= 0) {
            errors.height = "Cant be 0";
          }

          if ([null, '', false].includes(values.weight)) {} else if (values.weight <= 0) {
            errors.weight = "Cant be 0";
          }

          if (hasPns || hasNipt) {
            if ([null, '', false].includes(values.height)) {} else if (values.height <= 0) {
              errors.height = "Cant be 0";
            } else if (!Number(values.height)) {
              errors.height = "Should be Number";
            } else if (hasPns && (values.height < 61 || values.height > 198)) {
              errors.height = "Height should be between 61cm and 198cm";
            }

            if ([null, '', false].includes(values.weight)) {} else if (values.weight <= 0) {
              errors.weight = "Cant be 0";
            } else if (!Number(values.weight)) {
              errors.weight = "Should be Number";
            } else if (hasPns && (values.weight < 20 || values.weight > 200)) {
              errors.weight = "Weight should be between 20kg and 200 kg ";
            }
          } // if (!values.state) {
          // }
          // if (!values.city) {
          // }


          if (!values.pinCode) {} else if (!Number(values.pinCode)) {
            errors.pinCode = "Should be Number";
          }

          if (hasPns) {
            if (!values.smoking) {}

            if (values.dateOfBirth) {
              const diff = (0, _moment.default)().diff(values.dateOfBirth, "years");

              if (diff > 55 || diff < 15) {
                errors.dateOfBirth = "Age should be between 55 and 15";
              }
            }
          }
        }
      }

      if (props.fromDtrfFront) {
        if (props.formValues.collectionLocation.location == "Home") {
          if (values.firstName) {
            console.log("firstName valid", values.firstName);
          }

          if (!values.firstName) {
            errors.firstName = "Required";
          } else if (!/^[a-zA-Z ]+$/.test(values.firstName)) {
            errors.firstName = "Name should be in alphabets";
          }

          if (!values.lastName) {
            errors.lastName = "Required";
          } else if (!/^[a-zA-Z ]+$/.test(values.lastName)) {
            errors.lastName = "Name should be in alphabets";
          }

          if (!values.contact) {
            errors.contact = "Required";
          } else if (!/^[0-9\b]+$/.test(values.contact)) {
            errors.contact = "Should only be Numbers";
          } else if (!/^[0-9]{10}$/.test(values.contact)) {
            errors.contact = "Must be exactly 10 digits";
          }
        } else if (filledBy == "patient") {
          if (!values.contact) {
            errors.contact = "Required";
          } else if (!/^[0-9\b]+$/.test(values.contact)) {
            errors.contact = "Should only be Numbers";
          } else if (!/^[0-9]{10}$/.test(values.contact)) {
            errors.contact = "Must be exactly 10 digits";
          }
        } else {
          if (hasNbs) {
            console.log("INSIDE NBS VALIDATION");

            if (values.mothersDateOfBirth && values.mothersAgeType == "dob") {
              let age = setAgeInYMD(values.mothersDateOfBirth);
              values.mothersAgeInDays = age.days, values.mothersAgeInMonths = age.months;
              values.mothersAgeInYears = age.years;
            }

            if ((0, _commonHelper.hasValue)(values.mothersAgeInDays) && (0, _commonHelper.hasValue)(values.mothersAgeInMonths) && (0, _commonHelper.hasValue)(values.mothersAgeInDays) && values.mothersAgeInYears == "ageInYMD") {
              values.mothersDateOfBirth = getAgeInDate({
                years: values.mothersAgeInYears,
                months: values.mothersAgeInMonths,
                days: values.mothersAgeInDays
              });
            }

            if (values.ageType == "ageInYMD") {
              if (values.ageInYears) {
                console.log(maxAge);

                if (values.ageInYears > maxAge / 365) {
                  errors.ageInYears = "Age cant be greater than ".concat(maxAge / 365);
                }
              } else if ([null, '', false].includes(values.ageInYears)) {
                errors.ageInYears = "Required";
              } else if (values.ageInYears < 0) {
                errors.ageInYears = "Negative values is not allowed";
              }

              if ([null, '', false].includes(values.ageInDays)) {
                errors.ageInDays = "Required";
              } else if (values.ageInDays < 0) {
                errors.ageInDays = "Negative values is not allowed";
              }

              if ([null, '', false].includes(values.ageInMonths)) {
                errors.ageInMonths = "Required";
              }
            }

            if (values.ageType == "dob") {
              if (values.dateOfBirth) {
                const diff = (0, _moment.default)().diff(values.dateOfBirth, "years");
                console.log(diff, "dateofbirth");

                if (diff > maxAge / 365) {
                  errors.dateOfBirth = "Age cant be greater than ".concat(maxAge / 365);
                }
              }
            }

            if (!values.hasBabyName) {
              errors.hasBabyName = "Required";
            }

            if (!values.mothersFirstName) {
              errors.mothersFirstName = "Required";
            }

            if (values.mothersAgeType == "dob") {
              if (!values.mothersDateOfBirth) {
                errors.mothersDateOfBirth = "Required";
              }
            } else if (values.mothersAgeType == "ageInYMD") {
              if (!(0, _commonHelper.hasValue)(values.mothersAgeInYears)) {
                errors.mothersAgeInYears = "Required";
              }

              if (!(0, _commonHelper.hasValue)(values.mothersAgeInDays)) {
                errors.mothersAgeInDays = "Required";
              }

              if (!(0, _commonHelper.hasValue)(values.mothersAgeInMonths)) {
                errors.mothersAgeInMonths = "Required";
              }
            }

            if (values.mothersDateOfBirth) {
              const diff = (0, _moment.default)((0, _moment.default)().format("YYYY-MM-DD")).diff(values.mothersDateOfBirth, "days"); // if (diff >= 0) {
              //   errors.mothersDateOfBirth = "Invalid Date"
              // }

              const diff2 = (0, _moment.default)((0, _moment.default)().format("YYYY-MM-DD")).diff(values.mothersDateOfBirth, "years");

              if (diff2 < 18) {
                errors.mothersDateOfBirth = "Age should be more than 18 Years";
              }
            }

            if (!values.mothersLastName) {
              errors.mothersLastName = "Required";
            }

            if ([null, '', false].includes(values.weight)) {
              errors.weight = "Required";
            } else if (values.weight >= 10) {
              errors.weight = "Weight should be less than 10kg";
            }
          }

          if (!values.firstName) {
            errors.firstName = "Required";
          } else if (!/^[a-zA-Z ]+$/.test(values.firstName)) {
            errors.firstName = "Name should be in alphabets";
          } // if (!values.lastName) {
          //   errors.lastName = "Required";
          // }


          if (values.lastName) {
            if (!/^[a-zA-Z ]+$/.test(values.lastName)) {
              errors.lastName = "Name should be in alphabets";
            }
          }

          if (!values.contact) {
            errors.contact = "Required";
          } else if (!/^[0-9\b]+$/.test(values.contact)) {
            errors.contact = "Should only be Numbers";
          } else if (!/^[0-9]{10}$/.test(values.contact)) {
            errors.contact = "Must be exactly 10 digits";
          }

          if (!values.ageType) {
            errors.ageType = "Required";
          }

          if (values.ageType == "dob") {
            if (!values.dateOfBirth) {
              errors.dateOfBirth = "Required";
            } else {
              const diff = (0, _moment.default)(values.dateOfBirth).diff((0, _moment.default)().format("YYYY-MM-DD"), "days");

              if (diff > 0) {
                errors.dateOfBirth = "Future date is not allowed";
              }
            }
          }

          if (!hasNbs) {
            if (!values.husbandsOrFathersName) {} else if (!/^[a-zA-Z ]+$/.test(values.husbandsOrFathersName)) {
              errors.husbandsOrFathersName = "Name should be in alphabets";
            }
          }

          if (!values.gender) {
            errors.gender = "Required";
          } else {
            if (!gender.includes(values.gender)) {
              errors.gender = values.gender + " is not a valid gender for this test";
            }
          }

          if (values.email) {
            if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(values.email)) {
              errors.email = "Email address should be valid";
            }
          }

          if (values.ageType == "ageInYMD") {
            if (values.ageInMonths == 0 && values.ageInDays == 0 && values.ageInYears == 0) {
              errors.ageInYears = "Age cant be 0";
            }

            if ([null, '', false].includes(values.ageInDays)) {
              errors.ageInDays = "Required";
            } else if (values.ageInDays > 31) {
              errors.ageInDays = "Day cant be greater than 31";
            } else if (!/^[0-9]\d*$/.test(values.ageInDays)) {
              errors.ageInDays = "Invalid value";
            }

            if ([null, '', false].includes(values.ageInMonths)) {
              errors.ageInMonths = "Required";
            } else if (values.ageInMonths < 0) {
              errors.ageInMonths = "Negative values is not allowed";
            } else if (values.ageInMonths > 12) {
              errors.ageInMonths = "Month cant be greater than 12";
            } else if (!/^[0-9]\d*$/.test(values.ageInMonths)) {
              errors.ageInMonths = "Invalid value";
            }

            if ([null, '', false].includes(values.ageInYears)) {
              errors.ageInYears = "Required";
            } else if (!/^[0-9]\d*$/.test(values.ageInYears)) {
              errors.ageInYears = "Invalid value";
            }

            if (values.ageInDays && values.ageInMonths && values.ageInYears) {
              if (values.ageInDays) {
                console.log(values.ageInDays, "age in DAYs");
              }

              if (values.ageInDays < 0) {
                errors.ageInDays = "Days Cannot be negative";
              }

              if (values.ageInMonths < 0) {
                errors.ageInMonths = "Months Cannot be in negative";
              } else if (values.ageInMonths > 12) {
                errors.ageInMonths = "Months cant be greater than 12";
              }

              if (values.ageInYears < 0) {
                errors.ageInYears = "Years Cannot be in negative";
              }

              if (values.ageType == "ageInYMD" && values.ageInYears && values.ageInMonths && values.ageInDays) {
                const diff = (0, _moment.default)().subtract(values.ageInYears, "years");
                let formated = (0, _moment.default)(diff).format("YYYY-MM-DD");
                formated = (0, _moment.default)(formated).subtract(values.ageInMonths, "months");
                formated = (0, _moment.default)(formated).subtract(values.ageInDays, "days");
                formated = (0, _moment.default)(formated).format("YYYY-MM-DD");
                console.log(formated, "date of birth");
                values.dateOfBirth = formated;
              }
            }
          }

          if (values.ageType == "dob") {
            if (!values.dateOfBirth) {
              errors.dateOfBirth = "Required";
            }

            if (values.ageType == "dob" && values.dateOfBirth) {
              let ageInYears = (0, _moment.default)().diff(values.dateOfBirth, "years");
              console.log("Age in Years", ageInYears);
              values.ageInYears = ageInYears; // setAgeInYears(ageInYears)

              let ageInMonth = (0, _moment.default)(values.dateOfBirth).add(ageInYears, "years");
              ageInMonth = (0, _moment.default)(ageInMonth).format("YYYY-MM-DD");
              let ageInDays = (0, _moment.default)(values.dateOfBirth).add(ageInYears, "years");
              console.log("age In", ageInMonth);
              ageInMonth = (0, _moment.default)().diff(ageInMonth, "months");
              ageInDays = (0, _moment.default)(ageInDays).add(ageInMonth, "months");
              console.log("Age in month", ageInMonth);
              values.ageInMonths = ageInMonth; // setAgeInMonths(ageInMonth)

              console.log(ageInDays, "age in ADD");
              ageInDays = (0, _moment.default)().diff(ageInDays, "days");
              ageInMonth = (0, _moment.default)().add(ageInMonth, "months"); // setAgeInDays(ageInDays)

              values.ageInDays = ageInDays;
              console.log("AGE IN DAYS", ageInDays);
            }
          }

          if (hasPns || hasNipt) {
            if ([null, '', false].includes(values.height)) {
              errors.height = "Required";
            } else if (!Number(values.height)) {
              errors.height = "Should be Number";
            } else if (hasPns && (values.height < 61 || values.height > 198)) {
              errors.height = "Height should be between 61cm and 198cm";
            }

            if ([null, '', false].includes(values.weight)) {
              errors.weight = "Required";
            } else if (!Number(values.weight)) {
              errors.weight = "Should be Number";
            } else if (hasPns && (values.weight < 20 || values.weight > 200)) {
              errors.weight = "Weight should be between 20kg and 200 kg ";
            }
          } // if (!values.state) {
          //   errors.state = "Required";
          // }
          // if (!values.city) {
          //   errors.city = "Required";
          // }


          if (!values.pinCode) {
            errors.pinCode = "Required";
          } else if (!Number(values.pinCode)) {
            errors.pinCode = "Should be Number";
          }

          if (hasPns) {
            if (!values.smoking) {
              errors.smoking = "Required";
            }

            if (values.dateOfBirth) {
              const diff = (0, _moment.default)().diff(values.dateOfBirth, "years");

              if (diff > 55 || diff < 15) {
                errors.dateOfBirth = "Age should be between 55 and 15";
              }
            }
          }
        }
      }

      console.log("Errors", errors);
      setErrors(errors);
      return errors;
    },
    onSubmit: async (values, _ref, errors) => {
      let {
        setSubmitting
      } = _ref;
      console.log("Errors", errors);

      if (!patientEntryType && props.dtrfFront) {
        return;
      }

      if (props.sendBy == "Link") {
        console.log(router.query);
        console.log("SElected ", selectedCity, selectedState, values);
        values.city = selectedCity.value;
        values.state = selectedState.value;
        values.ref_token = router.query.ref_token;
        values.dtrf_token = router.query.dtrf_token;
        values.name = {
          firstName: values.firstName,
          lastName: values.lastName
        };
        values.consanguinity = "2";
        console.log(values);
        console.log("FORM VALUES FROM LINK", values);

        if (router.query.id) {
          console.log("Existing patient ");
          values.confirmation = true;
          values._id = router.query.id;
          console.log("VALUES", values);
          const url = process.env.NEXT_PUBLIC_PATIENT_UPDATE;
          const res = await (0, _Auth.default)(url, "POST", _objectSpread({}, values), {
            superDtrf: props.fromSuperDtrf,
            dtrfFront: props.fromDtrfFront
          }); // const res = await axios.post(process.env.NEXT_PUBLIC_PATIENT_UPDATE, { ...values })

          if (res.status == 200) {
            props.setIsSubmitted(true);
            setModalShow(true);
          }

          console.log(res);
        } else {
          console.log("Non existing patient");

          try {
            const url = process.env.NEXT_PUBLIC_PATIENT_CREATE;
            const res = await (0, _Auth.default)(url, "POST", _objectSpread({}, values), {
              superDtrf: props.fromSuperDtrf,
              dtrfFront: props.fromDtrfFront
            }); // const res = await axios.post(process.env.NEXT_PUBLIC_PATIENT_CREATE, { ...values })

            if (res.status == 200) {
              props.setIsSubmitted(true);
              setNewModal(true);
            }

            console.log(res);
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        if (patientEntryType == "patient") {
          handleOnClickNext(values);
        } else {
          if (hasNbs) {
            delete values.folicAcidIntake;
            delete values.smoking;
            delete values.height;
            delete values.husbandsOrFathersName;
          }

          if (props.dynamicPatient && !hasNbs) {
            values._id = props.dynamicPatient._id;
          }

          console.log("Values"); // values.salutation = salutation

          values.city = selectedCity.value;
          values.state = selectedState.value;
          console.log(values);
          handleOnClickNext(values);
        }
      }
    }
  }, _ref2 => {
    let {
      values,
      handleChange,
      setValues
    } = _ref2;
    return patient && /*#__PURE__*/_react.default.createElement(_formik.Form, {
      className: "mb-2"
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal, {
      show: patientFoundModal,
      onHide: () => setPatientFoundModal(!patientFoundModal),
      size: "lg",
      "aria-labelledby": "contained-modal-title-vcenter",
      centered: true,
      "data-backdrop": "static"
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Body, null), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Header, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Title, null, "Patient Already exists with Following Information !"), /*#__PURE__*/_react.default.createElement("h4", null, "Do yo want to use it ?")), patientFoundDetails && /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-12 col-md-6"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group mb-0"
    }, /*#__PURE__*/_react.default.createElement("label", {
      className: "col-form-label col-sm-6 text-sm-right"
    }, /*#__PURE__*/_react.default.createElement("b", null, "First Name")), /*#__PURE__*/_react.default.createElement("label", {
      className: "col-form-label col-sm-6"
    }, patientFoundDetails.name.firstName))), /*#__PURE__*/_react.default.createElement("div", {
      className: "col-12 col-md-6"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group mb-0"
    }, /*#__PURE__*/_react.default.createElement("label", {
      className: "col-form-label col-sm-6 text-sm-right"
    }, /*#__PURE__*/_react.default.createElement("b", null, "Last Name")), /*#__PURE__*/_react.default.createElement("label", {
      className: "col-form-label col-sm-6"
    }, patientFoundDetails.name.lastName))), /*#__PURE__*/_react.default.createElement("div", {
      className: "col-12 col-md-6"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group mb-0"
    }, /*#__PURE__*/_react.default.createElement("label", {
      className: "col-form-label col-sm-6 text-sm-right"
    }, /*#__PURE__*/_react.default.createElement("b", null, "Contact")), /*#__PURE__*/_react.default.createElement("label", {
      className: "col-form-label col-sm-6"
    }, patientFoundDetails.contact))), /*#__PURE__*/_react.default.createElement("div", {
      className: "col-12 col-md-6"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group mb-0"
    }, /*#__PURE__*/_react.default.createElement("label", {
      className: "col-form-label col-sm-6 text-sm-right"
    }, /*#__PURE__*/_react.default.createElement("b", null, "Date oF Birth")), /*#__PURE__*/_react.default.createElement("label", {
      className: "col-form-label col-sm-6"
    }, patientFoundDetails.dateOfBirth)))), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Footer, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "text-right"
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      variant: "primary",
      type: "submit",
      onClick: e => {
        console.log(patientFoundDetails, "PAtientFOUND");
        setValues(_objectSpread(_objectSpread({}, patientFoundDetails), {}, {
          firstName: patientFoundDetails.name.firstName,
          lastName: patientFoundDetails.name.lastName
        }));
        setPatientFoundModal(!patientFoundModal);
        setUsePatientFound(true);
      }
    }, "Yes")), /*#__PURE__*/_react.default.createElement("div", {
      className: "text-right mr-2"
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      variant: "primary",
      onClick: e => {
        setUsePatientFound(false);
        setPatientFoundModal(!patientFoundModal);
      }
    }, "No")))), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal, {
      show: modalShow,
      onHide: () => setModalShow(false),
      size: "lg",
      "aria-labelledby": "contained-modal-title-vcenter",
      centered: true,
      "data-backdrop": "static"
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Body, null), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Header, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Title, null, "Information Updated successfully!")), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Footer, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "text-right"
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      variant: "primary",
      type: "submit",
      onClick: e => setModalShow(false)
    }, "Okay")))), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal, {
      show: newModal,
      onHide: () => setNewModal(false),
      size: "lg",
      "aria-labelledby": "contained-modal-title-vcenter",
      centered: true,
      "data-backdrop": "static"
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Body, null), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Header, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Title, null, "Patient Created successfully")), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Footer, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "text-right"
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      variant: "primary",
      type: "submit",
      onClick: e => setNewModal(false)
    }, "Okay")))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-12"
    }, /*#__PURE__*/_react.default.createElement("br", null), props.formValues && props.formValues.collectionLocation.location != "Home" && props.sendBy != "Link" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("b", null, "To be filled by")), /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group",
      value: "2"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "pretty p-default p-round"
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "radio",
      name: "medicalInformationOption",
      value: "1",
      onChange: handlePatientTypeRadioButtonClick,
      checked: patientEntryType == "Staff"
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "state"
    }, /*#__PURE__*/_react.default.createElement("label", null, "Staff"))), /*#__PURE__*/_react.default.createElement("div", {
      className: "pretty p-default p-round"
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "radio",
      name: "medicalInformationOption",
      value: "2",
      onChange: handlePatientTypeRadioButtonClick,
      checked: patientEntryType == "patient"
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "state"
    }, /*#__PURE__*/_react.default.createElement("label", null, "Patient")))))), (patientEntryType == "Staff" || props.formValues && props.formValues.collectionLocation.location == "Home") && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react.default.createElement(_TextField.default, {
      name: "hospitalId",
      title: "Hospital ID/Unique ID"
    }), !hasNbs && /*#__PURE__*/_react.default.createElement(_Radio.default, {
      name: "salutation",
      title: "Title",
      mandatory: false,
      options: [{
        value: "Mrs",
        label: "Mrs"
      }, {
        value: "Ms",
        label: "Ms"
      }, {
        value: "Mr",
        label: "Mr"
      }, {
        value: "Mx",
        label: "Mx"
      }]
    })), hasNbs && /*#__PURE__*/_react.default.createElement(_Radio.default, {
      name: "hasBabyName",
      title: "Has Infant been named?",
      mandatory: true,
      options: [{
        value: "true",
        label: "Yes"
      }, {
        value: "false",
        label: "No"
      }]
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, hasNbs && values.hasBabyName && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "row",
      style: {
        width: "100%"
      }
    }, /*#__PURE__*/_react.default.createElement(_DisplayField.default, {
      title: "Title",
      data: values.hasBabyName == "true" ? values.gender == "female" ? "Baby" : "Master" : "Baby Of",
      className: "col-md-2",
      clinical_info: true
    }), /*#__PURE__*/_react.default.createElement(_TextField.default, {
      name: "firstName",
      title: "First Name",
      mandatory: true,
      placeholder: "Enter first name",
      className: "col-md-5"
    }), /*#__PURE__*/_react.default.createElement(_TextField.default, {
      name: "lastName",
      title: "Last Name",
      mandatory: hasNbs ? false : true,
      placeholder: "Enter last name",
      className: "col-md-5"
    }))), !hasNbs && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_TextField.default, {
      name: "firstName",
      title: "First Name",
      mandatory: true,
      placeholder: "Enter first name",
      className: "col-sm"
    }), /*#__PURE__*/_react.default.createElement(_TextField.default, {
      name: "lastName",
      title: "Last Name",
      mandatory: true,
      placeholder: "Enter last name",
      className: "col-sm"
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react.default.createElement(_NumberField.default, {
      name: "contact",
      title: "Contact Number",
      mandatory: true,
      placeholder: "Enter Contact Number"
    }), hasNbs && /*#__PURE__*/_react.default.createElement(_Radio.default, {
      toolTip: /*#__PURE__*/_react.default.createElement("div", {
        style: {
          width: "300px",
          display: "block"
        }
      }, "Lilac Insights is an inclusive organization and is sensitive to the fact that an individual may or may not identify with the sex assigned at birth. We therefore use terminologies that are scientific and inclusive. Sex assigned at birth is the sex assigned to an individual at birth, most often based on external anatomy."),
      title: "Sex assigned at Birth",
      name: "gender",
      mandatory: true,
      options: [{
        value: "male",
        label: "Male"
      }, {
        value: "female",
        label: "Female"
      }, {
        value: "other",
        label: "Other"
      }],
      disabled: patientFound && !usePatientFound
    })), ( // !props.isNew
    props.formValues.collectionLocation.location != "Home" || props.sendBy && props.sendBy == "Link") && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react.default.createElement(_Radio.default, {
      name: "ageType",
      title: "Age In",
      mandatory: true,
      options: [{
        label: "Date Of birth",
        value: "dob"
      }, {
        label: "Years-Months-Days",
        value: "ageInYMD"
      }]
    }), values.ageType == "ageInYMD" && /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-sm my-auto"
    }, /*#__PURE__*/_react.default.createElement("label", {
      style: {
        paddingLeft: "20px"
      }
    }, "Age In")), /*#__PURE__*/_react.default.createElement(_NumberField.default, {
      name: "ageInYears",
      placeholder: "Enter age in Year",
      title: "Years",
      mandatory: true,
      disabled: patientFound && !usePatientFound,
      className: "col-sm"
    }), /*#__PURE__*/_react.default.createElement(_NumberField.default, {
      name: "ageInMonths",
      title: "Months",
      mandatory: true,
      disabled: patientFound && !usePatientFound,
      className: "col-sm"
    }), /*#__PURE__*/_react.default.createElement(_NumberField.default, {
      name: "ageInDays",
      title: "Days",
      mandatory: true,
      disabled: patientFound && !usePatientFound,
      className: "col-sm"
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, values.ageType == "dob" && /*#__PURE__*/_react.default.createElement(_DateField.default, {
      name: "dateOfBirth",
      title: hasNbs ? "Infant's Date of Birth" : "Date of Birth",
      max: (0, _moment.default)().format("YYYY-MM-DD"),
      mandatory: true
    }), !hasNbs && /*#__PURE__*/_react.default.createElement(_Radio.default, {
      toolTip: /*#__PURE__*/_react.default.createElement("div", {
        style: {
          width: "300px",
          display: "block"
        }
      }, "Lilac Insights is an inclusive organization and is sensitive to the fact that an individual may or may not identify with the sex assigned at birth. We therefore use terminologies that are scientific and inclusive. Sex assigned at birth is the sex assigned to an individual at birth, most often based on external anatomy."),
      title: "Sex assigned at Birth",
      name: "gender",
      mandatory: true,
      options: [{
        value: "male",
        label: "Male"
      }, {
        value: "female",
        label: "Female"
      }, {
        value: "other",
        label: "Other"
      }],
      disabled: patientFound && !usePatientFound
    })), hasNbs && /*#__PURE__*/_react.default.createElement(_NumberField.default, {
      name: "weight",
      placeholder: "Enter Weight",
      title: "Weight (in kg) ",
      mandatory: true,
      disabled: patientFound && !usePatientFound
    }), hasNbs && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-md-2 col-12"
    }, /*#__PURE__*/_react.default.createElement("label", {
      style: {
        paddingTop: "30px"
      }
    }, "Mother's Name")), /*#__PURE__*/_react.default.createElement(_TextField.default, {
      name: "mothersFirstName",
      title: "First Name",
      mandatory: true,
      placeholder: "Enter first name",
      disabled: patientFound && !usePatientFound,
      className: "col-md-5 col-12"
    }), /*#__PURE__*/_react.default.createElement(_TextField.default, {
      name: "mothersLastName",
      title: "Last Name",
      mandatory: true,
      placeholder: "Enter Last name",
      disabled: patientFound && !usePatientFound,
      className: "col-md-5 col-12"
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react.default.createElement(_Radio.default, {
      name: "mothersAgeType",
      title: "Mothers Age In",
      mandatory: true,
      options: [{
        label: "Date Of birth",
        value: "dob"
      }, {
        label: "Years-Months-Days",
        value: "ageInYMD"
      }]
    }), values.mothersAgeType == "dob" && /*#__PURE__*/_react.default.createElement(_DateField.default, {
      name: "mothersDateOfBirth",
      title: "Mothers DOB",
      max: (0, _moment.default)().format("YYYY-MM-DD"),
      mandatory: true
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, values.mothersAgeType == "ageInYMD" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-sm my-auto"
    }, /*#__PURE__*/_react.default.createElement("label", {
      style: {
        paddingLeft: "20px"
      }
    }, "Age In")), /*#__PURE__*/_react.default.createElement(_NumberField.default, {
      name: "mothersAgeInYears",
      placeholder: "Enter age in Year",
      title: "Years",
      mandatory: true,
      disabled: patientFound && !usePatientFound,
      className: "col-sm"
    }), /*#__PURE__*/_react.default.createElement(_NumberField.default, {
      name: "mothersAgeInMonths",
      title: "Months",
      mandatory: true,
      disabled: patientFound && !usePatientFound,
      className: "col-sm"
    }), /*#__PURE__*/_react.default.createElement(_NumberField.default, {
      name: "mothersAgeInDays",
      title: "Days",
      mandatory: true,
      disabled: patientFound && !usePatientFound,
      className: "col-sm"
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-md-2 col-12"
    }, /*#__PURE__*/_react.default.createElement("label", {
      style: {
        paddingTop: "30px"
      }
    }, "Father's Name")), /*#__PURE__*/_react.default.createElement(_TextField.default, {
      name: "fathersFirstName",
      title: "First Name",
      placeholder: "Enter first name",
      disabled: patientFound && !usePatientFound,
      className: "col-md-5 col-12"
    }), /*#__PURE__*/_react.default.createElement(_TextField.default, {
      name: "fathersLastName",
      title: "Last Name",
      placeholder: "Enter Last name",
      disabled: patientFound && !usePatientFound,
      className: "col-md-5 col-12"
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, !hasNbs && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_TextField.default, {
      name: "husbandsOrFathersName",
      title: "Husband's/Father's Name",
      placeholder: "Enter Husband's/Father Name",
      disabled: patientFound && !usePatientFound
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "col-md-6 col-12"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/_react.default.createElement("label", null, "Email"), /*#__PURE__*/_react.default.createElement(_formik.Field, {
      type: "email",
      name: "email",
      placeholder: "Enter Email",
      className: "form-control",
      disabled: patientFound && !usePatientFound
    }), /*#__PURE__*/_react.default.createElement(_formik.ErrorMessage, {
      name: "email",
      component: "div",
      className: "formErr"
    })))), /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react.default.createElement(_TextField.default, {
      name: "address",
      title: "Address",
      component: "textarea",
      mandatory: true,
      disabled: patientFound && !usePatientFound
    }), /*#__PURE__*/_react.default.createElement(_TextField.default, {
      name: "pinCode",
      title: "Pin Code",
      mandatory: true,
      disabled: patientFound && !usePatientFound
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-md-6 col-12"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/_react.default.createElement("label", null, "City", /*#__PURE__*/_react.default.createElement("span", {
      className: "marked"
    }, "*")), /*#__PURE__*/_react.default.createElement(_reactSelect.default, {
      options: _constants.cityList,
      name: "city",
      value: selectedCity.hasOwnProperty("label") ? _constants.cityList.filter(city => city.value == selectedCity.value) : "",
      onChange: handleCityChange,
      isDisabled: patientFound && !usePatientFound
    }), /*#__PURE__*/_react.default.createElement(_formik.ErrorMessage, {
      name: "city",
      component: "div",
      className: "formErr"
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: "col-md-6 col-12"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/_react.default.createElement("label", null, "State", /*#__PURE__*/_react.default.createElement("span", {
      className: "marked"
    }, "*")), /*#__PURE__*/_react.default.createElement(_reactSelect.default, {
      name: "state",
      options: _constants.stateList,
      value: selectedState.hasOwnProperty("label") ? _constants.stateList.filter(state => state.value == selectedState.value) : "",
      onChange: handleStateChange,
      name: "state",
      isDisabled: patientFound && !usePatientFound
    }), /*#__PURE__*/_react.default.createElement(_formik.ErrorMessage, {
      name: "state",
      component: "div",
      className: "formErr"
    })))), hasNipt && /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react.default.createElement(_NumberField.default, {
      name: "weight",
      placeholder: "Enter Weight",
      title: "Weight (in kg)",
      mandatory: true,
      disabled: patientFound && !usePatientFound
    }), /*#__PURE__*/_react.default.createElement(_NumberField.default, {
      name: "height",
      placeholder: "Enter Weight",
      title: "Height (in cm)",
      mandatory: true,
      disabled: patientFound && !usePatientFound
    })), hasPns && /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react.default.createElement(_NumberField.default, {
      name: "weight",
      placeholder: "Enter Weight",
      title: "Weight (in kg)",
      mandatory: true,
      disabled: patientFound && !usePatientFound
    }), /*#__PURE__*/_react.default.createElement(_NumberField.default, {
      name: "height",
      placeholder: "Enter Height",
      title: "Height (in cm)",
      mandatory: true,
      disabled: patientFound && !usePatientFound
    })), hasPns && !hasNbs && /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react.default.createElement(_Radio.default, {
      name: "smoking",
      options: [{
        value: "true",
        label: "Yes"
      }, {
        value: "false",
        label: "No"
      }],
      title: "Smoking",
      mandatory: true,
      disabled: patientFound && !usePatientFound
    }), /*#__PURE__*/_react.default.createElement(_Radio.default, {
      title: "Folic Acid Intake",
      name: "folicAcidIntake",
      options: [{
        value: "true",
        label: "Yes"
      }, {
        value: "false",
        label: "No"
      }],
      mandatory: false,
      disabled: patientFound && !usePatientFound
    })))), patientEntryType == "patient" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        padding: "5px 0px"
      }
    }, /*#__PURE__*/_react.default.createElement(_NumberField.default, {
      name: "contact",
      title: "Contact Number",
      mandatory: true,
      placeholder: "Enter Contact Number"
    }), /*#__PURE__*/_react.default.createElement("button", {
      onClick: handleSendFormLink,
      type: "button",
      className: "btn btn-info"
    }, isPatientInformationLinkSent && "Resend Link", !isPatientInformationLinkSent && "Send Link"), "\xA0\xA0", isPatientInformationLinkSent && "Link has been sent to patient"))), props.sendBy == "Link" ? /*#__PURE__*/_react.default.createElement("div", {
      className: "col-md-12 col-12 text-right"
    }, /*#__PURE__*/_react.default.createElement("button", {
      type: "submit",
      className: "btn btn-primary",
      disabled: props.isSubmitted
    }, "Save")) : /*#__PURE__*/_react.default.createElement("div", {
      className: "row",
      id: "action1"
    }, props.fromSuperDtrf && /*#__PURE__*/_react.default.createElement("div", {
      className: "col-md-2 col-2 text-left"
    }, /*#__PURE__*/_react.default.createElement("button", {
      onClick: e => _router.default.push("/super-dtrf"),
      className: "btn btn-primary"
    }, "Exit")), /*#__PURE__*/_react.default.createElement("div", {
      className: props.fromSuperDtrf ? "col-md-10 col-10 text-right" : "col-md-12 col-12 text-right"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "formButtonCenter"
    }, /*#__PURE__*/_react.default.createElement("button", {
      onClick: handleOnClickPrevious,
      className: "btn btn-primary mr-2",
      type: "button"
    }, "Previous"), props.fromSuperDtrf && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !props.Token.isComplete && /*#__PURE__*/_react.default.createElement("button", {
      type: "button",
      onClick: () => handleOnClickSave(values),
      className: "btn btn-primary mr-2"
    }, "Save")), /*#__PURE__*/_react.default.createElement("button", {
      type: "submit",
      className: "btn btn-primary",
      onClick: handleOnSubmit
    }, "Next"))))));
  })))));
};

const mapStateToProps = state => ({
  patient_details: state.formData.formData.patient_details ? state.formData.formData.patient_details : 1,
  Token: state.Token,
  dynamicPatient: state.dynamicPatient.dynamicPatient_details ? state.dynamicPatient.dynamicPatient_details : "",
  formDataRedux: state.formData.formData
});

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  setDtrfToken: _token.setDtrfToken,
  setRefToken: _token.setRefToken,
  setFormData: _formData.setFormData,
  getPatient_details: _formData.getPatient_details,
  setPatientFoundFlag: _token.setPatientFoundFlag
})((0, _router.withRouter)(PatientForm));

exports.default = _default;