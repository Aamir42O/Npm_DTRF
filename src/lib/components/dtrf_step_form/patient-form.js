import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import Select from "react-select";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { cityList, stateList } from "../../public/constants";
import Router, { useRouter, withRouter } from "next/router";
import { connect } from "react-redux";
import { nanoid } from "nanoid";
import { setDtrfToken, setPatientFoundFlag, setRefToken } from "../../actions/token";
import axios from "axios";
import { message, Radio } from "antd";
import { Modal, Button } from "react-bootstrap";
import reqWithToken from "../../helper/Auth";
import { getPatient_details, setFormData } from "../../actions/formData";
import RadioField from "../Fields/Radio"
import NumberField from "../Fields/NumberField";
import TextField from "../Fields/TextField"
import DateFieldComponent from "../Fields/DateField"
import { successMessage, MousePopover, errorMessage, warningMessage, infoMessage, hasValue } from "../../helper/commonHelper";
import DisplayFields from "../DisplayFields/DisplayField";
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
  dateOfBirth: moment().format("YYYY-MM-DDThh:mm"),

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

const PatientForm = (props) => {


  let [fromDetails, setFormDetails] = useState(emptyFormObject);
  const [, reRender] = useState();
  const [filledBy, setFilledBy] = useState("")
  const [editable, setEditable] = useState(false);
  //   const [medicalInformationOption, setMedicalInformationOption] = useState();
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [selectedCity, setSelectedCity] = useState({});
  const [selectedState, setSelectedState] = useState({});
  const [patientEntryType, setPatientEntryType] = useState();
  const [err, setErrors] = useState({})
  const [
    isPatientInformationLinkSent,
    setIsPatientInformationLinkSent,
  ] = useState();
  const [patient, setPatient] = useState(null)
  const [salutation, setSalutation] = useState('')
  const [hasNipt, setHasNipt] = useState(false)
  const [hasPns, setHasPns] = useState(false)
  const [hasNbs, setHasNbs] = useState(false)
  const [testGroup, setTestGroup] = useState("")
  const [maxAge, setMaxAge] = useState(null)
  const [ageInYears, setAgeInYears] = useState("")
  const [ageInMonths, setAgeInMonths] = useState("")
  const [ageInDays, setAgeInDays] = useState("")
  const [patientFound, setPatientFound] = useState(false)
  const [patientFoundModal, setPatientFoundModal] = useState(false)
  const [patientFoundDetails, setPatientFoundDetails] = useState("")
  const [usePatientFound, setUsePatientFound] = useState(false)
  const [gender, setGender] = useState([])
  console.log("PR))))0000000", props)
  const formikRef = useRef()
  const getDataFromTest = () => {
    if (props.formValues.test_info && !maxAge && gender.length <= 0) {
      let maxxAge = null
      let genderValidation = null
      props.formValues.test_info.selectedTests.map((test) => {
        if (!genderValidation) {
          genderValidation = test.sex
        } else if ((genderValidation.length > 1) && test.sex.length < genderValidation) {
          genderValidation = test.sex
        } else if (test.sex.length == 1) {
          genderValidation = test.sex
        } else if ((genderValidation.length > 1) && test.sex.length == genderValidation) {
          let temp = []
          test.sex.map((sex, id) => {
            if (genderValidation[id] == sex) {
              temp.push(sex)
            }
          })
          genderValidation = temp
        }
        if (test.sub_group != "Both") {
          setTestGroup(test.sub_group)
        }
        if (test.sub_group == "NBS") {
          setHasNbs(true)
        }
        if (test.max_age) {
          if (maxxAge) {
            if (maxAge > test.max_age) {
              maxxAge = test.max_age
            }
          } else {
            maxxAge = test.max_age
          }
        }
      })
      console.log(maxxAge, "maxage")
      let temp = []
      genderValidation.map((data) => {
        temp.push(data.toLowerCase())
      })
      console.log("GENDER VALIDATION", genderValidation, temp)
      setGender(temp)
      setMaxAge(maxxAge)
    }
  }
  useEffect(async () => {
    console.log("props00000000000000000000000000", props);
    if (props.testGroup && (props.sendBy == "Link")) {
      if (props.testGroup == "PNS") {
        setHasPns(true)
      } else if (props.testGroup == "NIPT") {
        setHasNipt(true)
      } else if (props.testGroup == "NBS") {
        setHasNbs(true)
      } else if (props.testGroup == "CYTO") {
        setHasNipt(true)
      }
    }
    if (props.sendBy == "Link") {
      setPatientEntryType("Staff")
    }
    if (props.sendBy && props.sendBy == "Link" && !props.isNew) {
      props.getPatient_details(props.patient)
    }
    if (props.sendBy == "Link") {
      setMaxAge(props.maxAge)
      setGender(props.gender)
    } else {
      getDataFromTest()
    }
    if (props.dynamicPatient.dateOfBirth && !ageInYears) {
      let age = setAgeInYMD(props.dynamicPatient.dateOfBirth)
      setAgeInYears(age.years)
      setAgeInMonths(age.months)
      setAgeInDays(age.days)
      if (props.dynamicPatient.fathersName) {
        setDateOfBirth(props.dynamicPatient.dateOfBirth)
      } else {

        setDateOfBirth("")
      }
    }
    // props.formValues.test_info.selectedTests.map((test) => {
    //   if (test.sub_group == "NBS") {
    //     sethasNbs(true)
    //   }
    // })
    if ((props.new || props.patient_details != 1) && props.patient != "new") {
      setSelectedCity({ label: props.patient.city, value: props.patient.city })
      setSelectedState({ label: props.patient.state, value: props.patient.state })
    }
    if (props.formValues.test_info) {
      props.formValues.test_info.selectedTests.map((test) => {
        if (test.sub_group == "PNS") {
          setHasPns(true)
        }
        if (test.sub_group == "NIPT") {
          setHasNipt(true)
          console.log("HAS NIPT TRUE")
        }
        if (test.sub_group == "NBS") {
          setHasNbs(true)
        }
      })
    }

    if (props.patient && props.patient != "new") {
      setSelectedCity({ label: props.patient.city, value: props.patient.city })
      setSelectedState({ label: props.patient.state, value: props.patient.state })
    }

    setPatient(props.patient)
    reRender({})


    if (props.patient_details != 1 && props.patient) {
      if (props.new) {
        setNewFormData(props.patient_details)
        setSelectedCity({ value: props.patient_details.city, label: props.patient_details.city })
        setSelectedState({ value: props.patient_details.state, label: props.patient_details.state })
        setPatientEntryType(props.patient_details.filledBy)
        if (props.patient_details.filledBy == "patient") {
          setFilledBy("patient")
          setIsPatientInformationLinkSent(true)
        }
      }
      else {
        if (props.patient_details.filledBy == "patient") {
          setFilledBy("patient")
          setIsPatientInformationLinkSent(true)
        }
        setPatientData(props.patient_details);
        setSelectedCity({ value: props.patient_details.city, label: props.patient_details.city })
        setSelectedState({ value: props.patient_details.state, label: props.patient_details.state })
        setPatientEntryType(props.patient_details.filledBy)

      }
    } else {
      setEditable(true);
    }
  }, [props.patient, patient]);

  const getAgeInDate = (age) => {
    let presentDate = moment()
    presentDate = moment(presentDate).subtract(age.years, 'years').format('DD MMM YYYY');
    presentDate = moment(presentDate).subtract(age.months, 'months').format('DD MMM YYYY');
    presentDate = moment(presentDate).subtract(age.days, 'days').format('DD MMM YYYY');
    return moment(presentDate).format("YYYY-MM-DD")
  }

  const setAgeInYMD = (dob) => {
    let presentDate = moment()
    let DOB = moment(dob)
    console.log("DOB", DOB)
    let age = moment.duration(moment(presentDate).diff(DOB));
    let years = age.years();
    console.log(years, "age")
    let months = age.months();
    console.log(months, "moths")
    let days = age.days()
    console.log(days, "moths")
    return { days, months, years }

    console.log("AGE IN DATEOFBIRTH", dateOfBirth)
    let ageInYears = moment().diff(dateOfBirth, "years")
    console.log("Age in Years", ageInYears)
    setAgeInYears(ageInYears)
    let ageInMonth = moment(dateOfBirth).add(ageInYears, "years")
    ageInMonth = moment(ageInMonth).format("YYYY-MM-DD")
    let ageInDays = moment(dateOfBirth).add(ageInYears, "years")
    console.log("age In", ageInMonth)
    ageInMonth = moment().diff(ageInMonth, "months")
    ageInDays = moment(ageInDays).add(ageInMonth, "months")
    setAgeInMonths(ageInMonth)
    console.log("Age in month", ageInMonth)
    console.log(ageInDays, "age in ADD")
    ageInDays = moment().diff(ageInDays, "days")
    ageInMonth = moment().add(ageInMonth, "months")
    setAgeInDays(ageInDays)
    console.log("AGE IN DAYS", ageInDays)

  }

  console.log("PATIENT", patient)
  // !!!!!@@@@@@@@@@@@@@@@@@@@@@@@@@@!!!!!!!!!!!!!!!!!!~~~~~~~~~~~~~~~OnSaveByLink~~~~~~~~~~~~~~~~~~~~~~~~!!!!!!!!!!!!!!!!!!@@@@@@@@@@@@@@@@@@@@@


  const onSaveByLink = e => {
    console.log()
  }

  const router = useRouter()

  const handleOnSubmit = (e) => {
    console.log("formikReff", formikRef)
    if (!(Object.keys(formikRef.current.errors).length === 0 && formikRef.current.errors.constructor === Object)) {
      errorMessage("Please fill in the required fields to proceed")
    }
  }

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~onSaveByLink Close~~~~~~~~~~~~~~~~~~~~!!!!!!!!!!!!!!!!!!!!@@@@@@@@@@@@@@@@@@2

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ADMIN PANEL CODE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const handleOnClickSave = async (patientInfo) => {
    console.log("PATINET INFO ON SAVE", patientInfo)

    let data = {}
    let formData = new FormData()
    data.dtrf_id = props.Token.dtrfToken

    data.dtrf = JSON.parse(JSON.stringify(props.formDataRedux))

    const values = JSON.parse(JSON.stringify(patientInfo))
    if (patientEntryType == "Staff") {

      values.filledBy = patientEntryType
      if (values.dateOfBirth) {
        values.dateOfBirth = moment(values.dateOfBirth).format("YYYY-MM-DD")
      }
      if (props.new || props.patient_details.isNew) {
        values.isNew = true
      } else {
        values.isNew = false
      }
      if (hasNbs && !props.dynamicPatient.fathersName) {
        values.isNew = true
      }

      console.log("ADASDASDA@#@#!@#!@#", values)


    } else if (props.new || props.patient_details.isNew) {
      if (values.dateOfBirth) {
        values.dateOfBirth = moment(values.dateOfBirth).format("YYYY-MM-DD")
      }
      values.filledBy = patientEntryType
      values.isNew = true

      console.log("VALUES ", values);
    } else {
      if (values.dateOfBirth) {
        values.dateOfBirth = moment(values.dateOfBirth).format("YYYY-MM-DD")
      }
      console.log("FORM WILL BE FILLED BT PATIENT ")
      const name = { firstName: values.firstName, lastName: values.lastName }
      values.isNew = false
      if (hasNbs && !props.dynamicPatient.mothersFirstName) {
        values.isNew = true
      }

      values.name = name
      values.filledBy = patientEntryType
    }
    data.dtrf.patient_details = values
    values.name = {
      firstName: values.firstName,
      lastName: values.lastName
    }
    props.getPatient_details(values)
    const response = await props.handleOnClickSave({ ...props.formDataRedux, patient_details: values })
    if (response) {
      props.setFormData({ ...props.formDataRedux, patient_details: values })
      if (response.status == 200) {
        successMessage("Form saved")
      } else {
        errorMessage("Error in saving form, please try again")
      }
    } else {
      errorMessage("Error in saving form, please try again")
    }
  }


  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ADMIN PANEL CODE CLOSE ~~~~~~~~~~~~~~~~~~~~~~~~~~




  // My edit 
  const previousStep = () => {
    props.previousStep()
  }
  // close 
  const handleOnClickPrevious = () => {

    props.handleOnClickPrevious();

  };

  const handleOnClickNext = (values) => {
    if (patientFound && !usePatientFound) {
      return
    }
    if (hasNbs) {
      if (values.dateOfBirth) {
        values.dateOfBirth = moment(values.dateOfBirth).format("YYYY-MM-DD")
      }
      console.log("inside condition")
      if (values.hasBabyName == "true") {
        values.hasBabyName = true

      } else {
        values.hasBabyName = false
      }
    }
    console.log(values.hasBabyName, "hasBabyName")
    console.log(123123123123, props.new);
    values.name = { firstName: values.firstName, lastName: values.lastName }

    if (props.formValues.collectionLocation.location == "Home") {
      return props.handleOnClickNext(values)
    }


    if (patientEntryType == "patient" && !isPatientInformationLinkSent) {
      errorMessage("Click Send Link")
    }
    else {
      console.log("INSIDE ELSE")
      if (patientEntryType == "Staff") {
        values.filledBy = patientEntryType
        if (values.dateOfBirth) {
          values.dateOfBirth = moment(values.dateOfBirth).format("YYYY-MM-DD")
        }
        if (props.new || props.patient_details.isNew) {
          values.isNew = true
        } else {
          values.isNew = false
        }
        if (hasNbs && !props.dynamicPatient.fathersName) {
          values.isNew = true
        }

        console.log("ADASDASDA@#@#!@#!@#", values)
        props.handleOnClickNext(values)

      } else if (props.new || props.patient_details.isNew) {
        if (values.dateOfBirth) {
          values.dateOfBirth = moment(values.dateOfBirth).format("YYYY-MM-DD")
        }
        values.filledBy = patientEntryType
        values.isNew = true

        console.log("VALUES ", values);
        props.handleOnClickNext(values)
      } else {
        if (values.dateOfBirth) {
          values.dateOfBirth = moment(values.dateOfBirth).format("YYYY-MM-DD")
        }
        console.log("FORM WILL BE FILLED BT PATIENT ")
        const name = { firstName: values.firstName, lastName: values.lastName }
        values.isNew = false
        if (hasNbs && !props.dynamicPatient.mothersFirstName) {
          values.isNew = true
        }

        values.name = name
        values.filledBy = patientEntryType
        props.handleOnClickNext(values)
      }
    }
  };

  // const setPatientData = (patient) => {

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
  const setPatientData = (patient) => {

    if (!patient.__isNew__) {
      fromDetails = patient;
      console.log("FromDetails", fromDetails)
      setFormDetails(fromDetails);

      setSelectedCity(cityList.find((city) => city.value == patient.city));
      setSelectedState(
        stateList.find((state) => state.value == patient.state)
      );
      setEditable(false);
      reRender({});
    } else {
      setFormDetails(emptyFormObject);
      reRender({});
    }
  };
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CLOSE~~~~~~~~~~~~~~~~~~~~~~~~~~

  const handleCityChange = (value) => {
    console.log(value);
    fromDetails.city = value.value;
    setSelectedCity(value);

    setFormDetails(fromDetails);
    setShowErrorMessage(false);
    reRender({});
  };

  const handleStateChange = (value) => {
    console.log(value);
    fromDetails.state = value.value;
    setSelectedState(value);

    setFormDetails(fromDetails);
    setShowErrorMessage(false);
    reRender({});
  };
  const [sendLinkContact, getSendLinkContact] = useState({ contact: "" })
  const onChangeContact = e => {
    console.log(e.target.value)
  }
  const handleSendFormLink = async () => {

    console.log(123123, newFormData)
    console.log("INside handleSendFormLink", sendLinkContact)
    const refTokenName = "?ref_token="
    const refId = nanoid(10)

    const dtrfTokenName = "?dtrf_token="
    console.log(formikRef.current.values.contact, "Contact Number")
    props.setRefToken(refId)
    console.log("INSIDE SENDLINK HANDLE")
    if (props.new) {
      console.log("INside NEw ")
      var formData = {
        "ref_token": refId,
        "dtrf_token": props.Token.dtrfToken,
        "phone_number": formikRef.current.values.contact,
        "category": testGroup,
        "maxAge": maxAge,
        "gender": gender

      }
      const url = process.env.NEXT_PUBLIC_SEND_KYC_LINK
      // const url = "http://dtrf.aiolos.solutions:8187/v1/patient/send-patient-kyc-link"
      const res = await reqWithToken(url, "POST", formData, { superDtrf: props.fromSuperDtrf, dtrfFront: props.fromDtrfFront })
      // const res = await axios.post(process.env.NEXT_PUBLIC_SEND_KYC_LINK, formData)
      console.log(res)
    } else {
      var formData = {
        "ref_token": refId,
        "dtrf_token": props.Token.dtrfToken,
        "phone_number": formikRef.current.values.contact,
        "patient_id": props.dynamicPatient._id,
        "category": testGroup,
        "maxAge": maxAge,
        "gender": gender
      }
      console.log("Inside existing patient ", patient)
      const url = process.env.NEXT_PUBLIC_SEND_KYC_LINK
      // const url = "http://dtrf.aiolos.solutions:8187/v1/patient/send-patient-kyc-link"

      const res = await reqWithToken(url, "POST", formData, { superDtrf: props.fromSuperDtrf, dtrfFront: props.fromDtrfFront })

      // const res = await axios.post(process.env.NEXT_PUBLIC_SEND_KYC_LINK, formData)
      console.log("RESPONSE", res)
    }
    setIsPatientInformationLinkSent(true)
  };
  const handlePatientTypeRadioButtonClick = (value) => {
    console.log(value.target.value)
    if (value.target.value == 1) {
      console.log("INside StAFFFFFFFFF")
      setFilledBy("Staff")
      setPatientEntryType("Staff");

      setPatientEntryType("Staff");
    }
    else {
      setFilledBy("patient")
      setPatientEntryType("patient")
    }
  };
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [contact, setContact] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [hasBabyName, setHasBabyName] = useState("")

  useEffect(() => {
    console.log(formikRef, "FORMIKREF")
    const tempFunc = async () => {


      if ((formikRef.current.values.firstName && formikRef.current.values.lastName
        && formikRef.current.values.contact && formikRef.current.values.dateOfBirth)) {
        console.log("INSIDE SEARCH PATIENT")
        let currentDetail = ""
        let prefilledDetail = ""
        if (props.dynamicPatient != "new") {
          currentDetail = formikRef.current.values.firstName.trim() + formikRef.current.values.lastName.trim() + formikRef.current.values.contact + moment(formikRef.current.values.dateOfBirth).format("YYYY-MM-DD")
          // currentDetail = firstName + lastName + contact + dateOfBirth
          prefilledDetail = props.dynamicPatient.name.firstName + props.dynamicPatient.name.lastName + props.dynamicPatient.contact + props.dynamicPatient.dateOfBirth
        }
        console.log("Patient search condition ", currentDetail, prefilledDetail, currentDetail == prefilledDetail)
        if ((currentDetail != prefilledDetail) && !patientFound) {

          await searchPatient(formikRef.current.values.firstName,
            formikRef.current.values.lastName,
            formikRef.current.values.contact,
            moment(formikRef.current.values.dateOfBirth).format("YYYY-MM-DD"))
        }
      }
    }
    if (formikRef.current && props.sendBy != "Link") {
      tempFunc()
    }

  })

  const searchPatient = async (firstName, lastName, contact, dateOfBirth) => {
    console.log("INSIDE SEARCH PATIENT", dateOfBirth)
    let errors = {}
    // let dateOfBirth2 = moment(dateOfBirth).format("YYYY-MM-DD")
    // let dateOfBirth2 = moment(dateOfBirth).format("DD/MM/YYYY")
    if ((!/^[a-zA-Z ]+$/.test(firstName)) || ((!/^[a-zA-Z ]+$/.test(lastName)))) {
      errors.name = "Only alphabet in name"
    } else {
      delete errors.name
    }
    if ((!/^[0-9]{10}$/.test(contact))) {
      errors.contact = "Error"
    } else {
      delete errors.contact
    }
    console.log("SEARCH PATIENT ERRORS", errors)
    if ((Object.keys(errors).length === 0 && errors.constructor === Object) && !patientFound) {

      let data = {
        name: {
          firstName,
          lastName
        },
        contact,
        dateOfBirth
      }
      const url = process.env.NEXT_PUBLIC_CHECK_PATIENT
      // const url = "http://localhost:8184/v1/patient/check-patient"
      const res = await reqWithToken(url, "POST", data, { superDtrf: props.fromSuperDtrf, dtrfFront: props.fromDtrfFront })

      if (res && res.data.message == "Patient Found") {
        console.log(res.data.data, "Patient Found")


        setPatientFoundDetails(res.data.data.patient)
        setPatientFound(true)
        setPatientFoundModal(true)
      }
      console.log(res, "PATIENT SEARCH RESPONSE")
    }
  }
  const [newFormData, setNewFormData] = useState(props.patient)
  // Modals  
  const [modalShow, setModalShow] = useState(false)
  const [newModal, setNewModal] = useState(false)
  console.log("firstName", firstName, lastName, contact, dateOfBirth)

  return (
    <>
      <div>
        <div>
          <fieldset>
            {patient &&
              // !patient.hasOwnProperty("name"
              <Formik
                enableReinitialize
                innerRef={formikRef}
                initialValues={(props.new || props.patient_details != 1) && (props.patient != "new") ? {

                  // This runs when patient details in REdux,
                  hospitalId: props.dynamicPatient.hospitalId ? props.dynamicPatient.hospitalId : "",
                  salutation: props.dynamicPatient.salutation ? props.dynamicPatient.salutation : "",

                  name: props.patient.name ? props.patient.name : "",
                  firstName: (hasNbs && !props.dynamicPatient.mothersFirstName) ? props.dynamicPatient.fathersName ? props.dynamicPatient.name.firstName : "" : props.dynamicPatient.firstName,
                  lastName: (hasNbs && !props.dynamicPatient.mothersFirstName) ? props.dynamicPatient.fathersName ? props.dynamicPatient.name.lastName : "" : props.dynamicPatient.lastName,
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
                  mothersFirstName: (props.dynamicPatient.gender == "female" && !props.dynamicPatient.mothersFirstName) ? props.dynamicPatient.name.firstName : props.dynamicPatient.mothersFirstName ? props.dynamicPatient.mothersFirstName : "",
                  mothersLastName: (props.dynamicPatient.gender == "female" && !props.dynamicPatient.mothersFirstName) ? props.dynamicPatient.name.lastName : props.dynamicPatient.mothersLastName ? props.dynamicPatient.mothersLastName : "",
                  mothersDateOfBirth: (props.dynamicPatient.gender == "female" && !props.dynamicPatient.mothersFirstName) ? props.dynamicPatient.dateOfBirth : props.dynamicPatient.mothersDateOfBirth ? props.dynamicPatient.mothersDateOfBirth : "",
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

                  firstName: (hasNbs && !props.dynamicPatient.mothersName) ? "" : props.patient.name.firstName,
                  lastName: (hasNbs && !props.dynamicPatient.mothersName) ? "" : props.patient.name.lastName,

                  husbandsOrFathersName: props.patient.husbandsOrFathersName,
                  gender: (hasNbs && !props.dynamicPatient.fathersName) ? "" : props.patient.gender,
                  dateOfBirth: (hasNbs && !props.dynamicPatient.fathersName) ? "" : props.patient.dateOfBirth,
                  address: props.patient.address,
                  pinCode: props.patient.pinCode,
                  city: selectedCity.hasOwnProperty("value") && selectedCity,
                  state: selectedState.hasOwnProperty("value") && selectedState,
                  email: props.patient.email,
                  contact: props.patient.contact,
                  weight: (hasNbs && !props.dynamicPatient.fathersName) ? "" : props.patient.weight,
                  height: props.patient.height,
                  smoking: props.patient.smoking,
                  folicAcidIntake: props.patient.folicAcidIntake,
                  mothersFirstName: (!props.dynamicPatient.mothersName && props.dynamicPatient.gender == "female") ? props.dynamicPatient.name.firstName : props.dynamicPatient.mothersName ? props.dynamicPatient.mothersName.firstName : "",
                  mothersLastName: (props.dynamicPatient.gender == "female" && !props.dynamicPatient.mothersName) ? props.dynamicPatient.name.lastName : props.dynamicPatient.mothersName ? props.dynamicPatient.mothersName.lastName : "",
                  mothersDateOfBirth: (!props.dynamicPatient.mothersName && props.dynamicPatient.gender == "female") ? props.dynamicPatient.dateOfBirth : props.dynamicPatient.mothersDateOfBirth ? props.dynamicPatient.mothersDateOfBirth : "",
                  hasBabyName: props.patient.hasBabyName ? props.patient.hasBabyName.toString() : props.patient.hasBabyName == false ? props.patient.hasBabyName.toString() : "",
                  fathersFirstName: (!props.dynamicPatient.mothersName && props.dynamicPatient.gender == "male") ? props.dynamicPatient.name.firstName : props.dynamicPatient.fathersName ? props.dynamicPatient.fathersName.firstName : "",
                  fathersLastName: (!props.dynamicPatient.mothersName && props.dynamicPatient.gender == "male") ? props.dynamicPatient.name.lastName : props.dynamicPatient.fathersName ? props.dynamicPatient.fathersName.lastName : "",
                  babysFirstName: props.patient.babysFirstName,
                  babysLastName: props.patient.babysLastName,
                  dateOfBirthType: props.patient.dateOfBirthType,
                  ageInYears: ageInYears,
                  ageInMonths: ageInMonths,
                  ageInDays: ageInDays,
                  ageType: props.patient.ageType ? props.patient.ageType : "dob",
                  dateOfBirth: (hasNbs && !props.dynamicPatient.fathersName) ? "" : props.patient.dateOfBirth,
                  test: props.patient.test,
                  mothersAgeInYears: "",
                  mothersAgeInMonths: "",
                  mothersAgeInDays: "",
                  mothersAgeType: "dob"
                }}
                validate={async (values) => {
                  const errors = {};
                  if (props.fromSuperDtrf) {
                    if (props.formValues.collectionLocation.location == "Home") {

                      if (values.firstName) {
                        console.log("firstName valid", values.firstName)
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
                    }
                    else
                      if (filledBy == "patient") {

                      } else {
                        if (hasNbs) {
                          console.log("INSIDE NBS VALIDATION")

                          if (values.mothersDateOfBirth && values.mothersAgeType == "dob") {
                            let age = setAgeInYMD(values.mothersDateOfBirth)
                            values.mothersAgeInDays = age.days,
                              values.mothersAgeInMonths = age.months
                            values.mothersAgeInYears = age.years
                          }

                          if (hasValue(values.mothersAgeInDays) &&
                            hasValue(values.mothersAgeInMonths) &&
                            hasValue(values.mothersAgeInDays) && values.mothersAgeType == "ageInYMD") {
                            values.mothersDateOfBirth = getAgeInDate({ years: values.mothersAgeInYears, months: values.mothersAgeInMonths, days: values.mothersAgeInDays })
                          }

                          if (values.ageType == "ageInYMD") {

                            if (values.ageInYears) {
                              console.log(maxAge)
                              if (values.ageInYears > maxAge / 365) {
                                errors.ageInYears = `Age cant be greater than ${maxAge / 365}`
                              }

                            } else if ([null, '', false].includes(values.ageInYears)) {
                            } else if (values.ageInYears < 0) {
                              errors.ageInYears = "Negative values is not allowed"
                            }
                            if ([null, '', false].includes(values.ageInDays)) {
                            } else if (values.ageInDays < 0) {
                              errors.ageInDays = "Negative values is not allowed"
                            }
                            if ([null, '', false].includes(values.ageInMonths)) {
                            }
                          }
                          if (values.ageType == "dob") {
                            if (values.dateOfBirth) {
                              const diff = moment().diff(values.dateOfBirth, "years")
                              console.log(diff, "dateofbirth")
                              if (diff > maxAge / 365) {
                                errors.dateOfBirth = `Age cant be greater than ${maxAge / 365}`
                              }
                            }
                          }
                          if (!values.hasBabyName) {
                          }
                          if (!values.mothersFirstName) {
                          }
                          if (!values.mothersDateOfBirth) {
                          }
                          if (values.mothersDateOfBirth) {
                            // const diff = moment(values.mothersDateOfBirth).diff(moment().format("YYYY-MM-DD"), "days")
                            // if (diff >= 0) {
                            //   errors.mothersDateOfBirth = "Invalid Date"
                            // }
                            const diff2 = moment(moment().format("YYYY-MM-DD")).diff(values.mothersDateOfBirth, "years")
                            if (diff2 < 18) {
                              errors.mothersDateOfBirth = "Age should be more than 18 Years"
                            }
                          }
                          if ([null, '', false].includes(values.weight)) {
                          } else if (values.weight >= 10) {
                            errors.weight = "Weight should be less than 10kg"
                          }
                        }
                        if (!values.firstName) {
                        }
                        else if (!/^[a-zA-Z ]+$/.test(values.firstName)) {
                          errors.firstName = "Name should be in alphabets";
                        }
                        // if (!values.lastName) {
                        // }
                        if (values.lastName) {

                          if (!/^[a-zA-Z ]+$/.test(values.lastName)) {
                            errors.lastName = "Name should be in alphabets";
                          }
                        }
                        if (!values.contact) {

                        }
                        else if (!/^[0-9\b]+$/.test(values.contact)) {
                          errors.contact = "Should only be Numbers";
                        }
                        else if (!/^[0-9]{10}$/.test(values.contact)) {
                          errors.contact = "Must be exactly 10 digits";
                        }
                        if (!values.ageType) {
                        }
                        if (values.ageType == "dob") {
                          if (!values.dateOfBirth) {

                          } else {
                            const diff = moment(values.dateOfBirth).diff(moment().format("YYYY-MM-DD"), "days")
                            if (diff > 0) {
                              errors.dateOfBirth = "Future date is not allowed"
                            }
                          }
                        }
                        if (!hasNbs) {

                          if (!values.husbandsOrFathersName) {
                          }
                          else if (!/^[a-zA-Z ]+$/.test(values.husbandsOrFathersName)) {
                            errors.husbandsOrFathersName = "Name should be in alphabets";
                          }
                        }
                        if (!values.gender) {
                        } else {
                          if (!gender.includes(values.gender)) {
                            errors.gender = values.gender + " is not a valid gender for this test"
                          }
                        }
                        if (values.email) {

                          if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(values.email)) {
                            errors.email = "Email address should be valid";
                          }
                        }
                        if (values.ageType == "ageInYMD") {
                          if (values.ageInMonths == 0 && values.ageInDays == 0 && values.ageInYears == 0) {
                            errors.ageInYears = "Age cant be 0"
                          }
                          if ([null, '', false].includes(values.ageInDays)) {
                          } else if (values.ageInDays > 31) {
                            errors.ageInDays = "Day cant be greater than 31"
                          } else if (!(/^[0-9]\d*$/.test(values.ageInDays))) {
                            errors.ageInDays = "Invalid value"
                          }
                          if ([null, '', false].includes(values.ageInMonths)) {
                          } else if (values.ageInMonths < 0) {
                            errors.ageInMonths = "Negative values is not allowed"
                          } else if (values.ageInMonths > 12) {
                            errors.ageInMonths = "Month cant be greater than 12"
                          } else if (!(/^[0-9]\d*$/.test(values.ageInMonths))) {
                            errors.ageInMonths = "Invalid value"
                          }
                          if ([null, '', false].includes(values.ageInYears)) {
                          } else if (!(/^[0-9]\d*$/.test(values.ageInYears))) {
                            errors.ageInYears = "Invalid value"
                          }
                          if (values.ageInDays && values.ageInMonths && values.ageInYears) {
                            if (values.ageInDays) {
                              console.log(values.ageInDays, "age in DAYs")
                            }
                            if (values.ageInDays < 0) {
                              errors.ageInDays = "Days Cannot be negative"
                            }
                            if (values.ageInMonths < 0) {
                              errors.ageInMonths = "Months Cannot be in negative"
                            } else if (values.ageInMonths > 12) {
                              errors.ageInMonths = "Months cant be greater than 12"
                            }
                            if (values.ageInYears < 0) {
                              errors.ageInYears = "Years Cannot be in negative"
                            }
                            if (values.ageType == "ageInYMD" && values.ageInYears && values.ageInMonths && values.ageInDays) {
                              const diff = moment().subtract(values.ageInYears, "years")
                              let formated = moment(diff).format("YYYY-MM-DD")
                              formated = moment(formated).subtract(values.ageInMonths, "months")
                              formated = moment(formated).subtract(values.ageInDays, "days")
                              formated = moment(formated).format("YYYY-MM-DD")
                              console.log(formated, "date of birth")
                              values.dateOfBirth = formated
                            }
                          }
                        }
                        if (values.ageType == "dob") {

                          if (!values.dateOfBirth) {
                          }
                          if (values.ageType == "dob" && values.dateOfBirth) {
                            let ageInYears = moment().diff(values.dateOfBirth, "years")
                            console.log("Age in Years", ageInYears)
                            values.ageInYears = ageInYears
                            // setAgeInYears(ageInYears)
                            let ageInMonth = moment(values.dateOfBirth).add(ageInYears, "years")
                            ageInMonth = moment(ageInMonth).format("YYYY-MM-DD")
                            let ageInDays = moment(values.dateOfBirth).add(ageInYears, "years")

                            console.log("age In", ageInMonth)
                            ageInMonth = moment().diff(ageInMonth, "months")
                            ageInDays = moment(ageInDays).add(ageInMonth, "months")
                            console.log("Age in month", ageInMonth)
                            values.ageInMonths = ageInMonth
                            // setAgeInMonths(ageInMonth)

                            console.log(ageInDays, "age in ADD")
                            ageInDays = moment().diff(ageInDays, "days")
                            ageInMonth = moment().add(ageInMonth, "months")
                            // setAgeInDays(ageInDays)
                            values.ageInDays = ageInDays
                            console.log("AGE IN DAYS", ageInDays)
                          }
                        }

                        if ([null, '', false].includes(values.height)) {
                        }
                        else if (values.height <= 0) {
                          errors.height = "Cant be 0"
                        }
                        if ([null, '', false].includes(values.weight)) {
                        }
                        else if (values.weight <= 0) {
                          errors.weight = "Cant be 0"
                        }
                        if (hasPns || hasNipt) {

                          if ([null, '', false].includes(values.height)) {
                          } else if (values.height <= 0) {
                            errors.height = "Cant be 0"
                          }

                          else if (!Number(values.height)) {
                            errors.height = "Should be Number";
                          } else if (hasPns && (values.height < 61 || values.height > 198)) {
                            errors.height = "Height should be between 61cm and 198cm"
                          }
                          if ([null, '', false].includes(values.weight)) {
                          }
                          else if (values.weight <= 0) {
                            errors.weight = "Cant be 0"
                          }
                          else if (!Number(values.weight)) {
                            errors.weight = "Should be Number";
                          } else if (hasPns && (values.weight < 20 || values.weight > 200)) {
                            errors.weight = "Weight should be between 20kg and 200 kg "
                          }
                        }
                        // if (!values.state) {
                        // }
                        // if (!values.city) {
                        // }
                        if (!values.pinCode) {
                        }
                        else if (!Number(values.pinCode)) {
                          errors.pinCode = "Should be Number";
                        }

                        if (hasPns) {

                          if (!values.smoking) {
                          }

                          if (values.dateOfBirth) {
                            const diff = moment().diff(values.dateOfBirth, "years")
                            if (diff > 55 || diff < 15) {
                              errors.dateOfBirth = "Age should be between 55 and 15"
                            }
                          }


                        }
                      }

                  }

                  if (props.fromDtrfFront) {
                    if (props.formValues.collectionLocation.location == "Home") {

                      if (values.firstName) {
                        console.log("firstName valid", values.firstName)
                      }
                      if (!values.firstName) {
                        errors.firstName = "Required";
                      }
                      else if (!/^[a-zA-Z ]+$/.test(values.firstName)) {
                        errors.firstName = "Name should be in alphabets";
                      }
                      if (!values.lastName) {
                        errors.lastName = "Required";
                      }
                      else if (!/^[a-zA-Z ]+$/.test(values.lastName)) {
                        errors.lastName = "Name should be in alphabets";
                      }
                      if (!values.contact) {

                        errors.contact = "Required";
                      }
                      else if (!/^[0-9\b]+$/.test(values.contact)) {
                        errors.contact = "Should only be Numbers";
                      }
                      else if (!/^[0-9]{10}$/.test(values.contact)) {
                        errors.contact = "Must be exactly 10 digits";
                      }
                    }
                    else
                      if (filledBy == "patient") {
                        if (!values.contact) {

                          errors.contact = "Required";
                        }
                        else if (!/^[0-9\b]+$/.test(values.contact)) {
                          errors.contact = "Should only be Numbers";
                        }
                        else if (!/^[0-9]{10}$/.test(values.contact)) {
                          errors.contact = "Must be exactly 10 digits";
                        }
                      } else {
                        if (hasNbs) {
                          console.log("INSIDE NBS VALIDATION")


                          if (values.mothersDateOfBirth && values.mothersAgeType == "dob") {
                            let age = setAgeInYMD(values.mothersDateOfBirth)
                            values.mothersAgeInDays = age.days,
                              values.mothersAgeInMonths = age.months
                            values.mothersAgeInYears = age.years
                          }

                          if (hasValue(values.mothersAgeInDays) &&
                            hasValue(values.mothersAgeInMonths) &&
                            hasValue(values.mothersAgeInDays) && values.mothersAgeInYears == "ageInYMD") {
                            values.mothersDateOfBirth = getAgeInDate({ years: values.mothersAgeInYears, months: values.mothersAgeInMonths, days: values.mothersAgeInDays })
                          }
                          if (values.ageType == "ageInYMD") {

                            if (values.ageInYears) {
                              console.log(maxAge)
                              if (values.ageInYears > maxAge / 365) {
                                errors.ageInYears = `Age cant be greater than ${maxAge / 365}`
                              }

                            } else if ([null, '', false].includes(values.ageInYears)) {
                              errors.ageInYears = "Required"
                            } else if (values.ageInYears < 0) {
                              errors.ageInYears = "Negative values is not allowed"
                            }
                            if ([null, '', false].includes(values.ageInDays)) {
                              errors.ageInDays = "Required"
                            } else if (values.ageInDays < 0) {
                              errors.ageInDays = "Negative values is not allowed"
                            }
                            if ([null, '', false].includes(values.ageInMonths)) {
                              errors.ageInMonths = "Required"
                            }
                          }
                          if (values.ageType == "dob") {
                            if (values.dateOfBirth) {
                              const diff = moment().diff(values.dateOfBirth, "years")
                              console.log(diff, "dateofbirth")
                              if (diff > maxAge / 365) {
                                errors.dateOfBirth = `Age cant be greater than ${maxAge / 365}`
                              }
                            }
                          }
                          if (!values.hasBabyName) {
                            errors.hasBabyName = "Required"
                          }
                          if (!values.mothersFirstName) {
                            errors.mothersFirstName = "Required"
                          }
                          if (values.mothersAgeType == "dob") {

                            if (!values.mothersDateOfBirth) {
                              errors.mothersDateOfBirth = "Required"
                            }
                          } else if (values.mothersAgeType == "ageInYMD") {
                            if (!hasValue(values.mothersAgeInYears)) {
                              errors.mothersAgeInYears = "Required"
                            }
                            if (!hasValue(values.mothersAgeInDays)) {
                              errors.mothersAgeInDays = "Required"
                            }
                            if (!hasValue(values.mothersAgeInMonths)) {
                              errors.mothersAgeInMonths = "Required"
                            }
                          }
                          if (values.mothersDateOfBirth) {
                            const diff = moment(moment().format("YYYY-MM-DD")).diff(values.mothersDateOfBirth, "days")
                            // if (diff >= 0) {
                            //   errors.mothersDateOfBirth = "Invalid Date"
                            // }
                            const diff2 = moment(moment().format("YYYY-MM-DD")).diff(values.mothersDateOfBirth, "years")
                            if (diff2 < 18) {
                              errors.mothersDateOfBirth = "Age should be more than 18 Years"
                            }
                          }
                          if (!values.mothersLastName) {
                            errors.mothersLastName = "Required"
                          }


                          if ([null, '', false].includes(values.weight)) {
                            errors.weight = "Required"
                          } else if (values.weight >= 10) {
                            errors.weight = "Weight should be less than 10kg"
                          }
                        }
                        if (!values.firstName) {
                          errors.firstName = "Required";
                        }
                        else if (!/^[a-zA-Z ]+$/.test(values.firstName)) {
                          errors.firstName = "Name should be in alphabets";
                        }
                        // if (!values.lastName) {
                        //   errors.lastName = "Required";
                        // }
                        if (values.lastName) {

                          if (!/^[a-zA-Z ]+$/.test(values.lastName)) {
                            errors.lastName = "Name should be in alphabets";
                          }
                        }
                        if (!values.contact) {

                          errors.contact = "Required";
                        }
                        else if (!/^[0-9\b]+$/.test(values.contact)) {
                          errors.contact = "Should only be Numbers";
                        }
                        else if (!/^[0-9]{10}$/.test(values.contact)) {
                          errors.contact = "Must be exactly 10 digits";
                        }
                        if (!values.ageType) {
                          errors.ageType = "Required"
                        }
                        if (values.ageType == "dob") {
                          if (!values.dateOfBirth) {

                            errors.dateOfBirth = "Required"
                          } else {
                            const diff = moment(values.dateOfBirth).diff(moment().format("YYYY-MM-DD"), "days")
                            if (diff > 0) {
                              errors.dateOfBirth = "Future date is not allowed"
                            }
                          }
                        }
                        if (!hasNbs) {

                          if (!values.husbandsOrFathersName) {

                          }
                          else if (!/^[a-zA-Z ]+$/.test(values.husbandsOrFathersName)) {
                            errors.husbandsOrFathersName = "Name should be in alphabets";
                          }
                        }
                        if (!values.gender) {
                          errors.gender = "Required";
                        } else {
                          if (!gender.includes(values.gender)) {
                            errors.gender = values.gender + " is not a valid gender for this test"
                          }
                        }
                        if (values.email) {

                          if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(values.email)) {
                            errors.email = "Email address should be valid";
                          }
                        }
                        if (values.ageType == "ageInYMD") {
                          if (values.ageInMonths == 0 && values.ageInDays == 0 && values.ageInYears == 0) {
                            errors.ageInYears = "Age cant be 0"
                          }
                          if ([null, '', false].includes(values.ageInDays)) {
                            errors.ageInDays = "Required"
                          } else if (values.ageInDays > 31) {
                            errors.ageInDays = "Day cant be greater than 31"
                          } else if (!(/^[0-9]\d*$/.test(values.ageInDays))) {
                            errors.ageInDays = "Invalid value"
                          }
                          if ([null, '', false].includes(values.ageInMonths)) {
                            errors.ageInMonths = "Required"
                          } else if (values.ageInMonths < 0) {
                            errors.ageInMonths = "Negative values is not allowed"
                          } else if (values.ageInMonths > 12) {
                            errors.ageInMonths = "Month cant be greater than 12"
                          } else if (!(/^[0-9]\d*$/.test(values.ageInMonths))) {
                            errors.ageInMonths = "Invalid value"
                          }
                          if ([null, '', false].includes(values.ageInYears)) {
                            errors.ageInYears = "Required"
                          } else if (!(/^[0-9]\d*$/.test(values.ageInYears))) {
                            errors.ageInYears = "Invalid value"
                          }
                          if (values.ageInDays && values.ageInMonths && values.ageInYears) {
                            if (values.ageInDays) {
                              console.log(values.ageInDays, "age in DAYs")
                            }
                            if (values.ageInDays < 0) {
                              errors.ageInDays = "Days Cannot be negative"
                            }
                            if (values.ageInMonths < 0) {
                              errors.ageInMonths = "Months Cannot be in negative"
                            } else if (values.ageInMonths > 12) {
                              errors.ageInMonths = "Months cant be greater than 12"
                            }
                            if (values.ageInYears < 0) {
                              errors.ageInYears = "Years Cannot be in negative"
                            }
                            if (values.ageType == "ageInYMD" && values.ageInYears && values.ageInMonths && values.ageInDays) {
                              const diff = moment().subtract(values.ageInYears, "years")
                              let formated = moment(diff).format("YYYY-MM-DD")
                              formated = moment(formated).subtract(values.ageInMonths, "months")
                              formated = moment(formated).subtract(values.ageInDays, "days")
                              formated = moment(formated).format("YYYY-MM-DD")
                              console.log(formated, "date of birth")
                              values.dateOfBirth = formated
                            }
                          }
                        }
                        if (values.ageType == "dob") {

                          if (!values.dateOfBirth) {
                            errors.dateOfBirth = "Required";
                          }
                          if (values.ageType == "dob" && values.dateOfBirth) {
                            let ageInYears = moment().diff(values.dateOfBirth, "years")
                            console.log("Age in Years", ageInYears)
                            values.ageInYears = ageInYears
                            // setAgeInYears(ageInYears)
                            let ageInMonth = moment(values.dateOfBirth).add(ageInYears, "years")
                            ageInMonth = moment(ageInMonth).format("YYYY-MM-DD")
                            let ageInDays = moment(values.dateOfBirth).add(ageInYears, "years")

                            console.log("age In", ageInMonth)
                            ageInMonth = moment().diff(ageInMonth, "months")
                            ageInDays = moment(ageInDays).add(ageInMonth, "months")
                            console.log("Age in month", ageInMonth)
                            values.ageInMonths = ageInMonth
                            // setAgeInMonths(ageInMonth)

                            console.log(ageInDays, "age in ADD")
                            ageInDays = moment().diff(ageInDays, "days")
                            ageInMonth = moment().add(ageInMonth, "months")
                            // setAgeInDays(ageInDays)
                            values.ageInDays = ageInDays
                            console.log("AGE IN DAYS", ageInDays)
                          }
                        }


                        if (hasPns || hasNipt) {

                          if ([null, '', false].includes(values.height)) {
                            errors.height = "Required";
                          }
                          else if (!Number(values.height)) {
                            errors.height = "Should be Number";
                          } else if (hasPns && (values.height < 61 || values.height > 198)) {
                            errors.height = "Height should be between 61cm and 198cm"
                          }
                          if ([null, '', false].includes(values.weight)) {
                            errors.weight = "Required";
                          }
                          else if (!Number(values.weight)) {
                            errors.weight = "Should be Number";
                          } else if (hasPns && (values.weight < 20 || values.weight > 200)) {
                            errors.weight = "Weight should be between 20kg and 200 kg "
                          }
                        }
                        // if (!values.state) {
                        //   errors.state = "Required";
                        // }
                        // if (!values.city) {
                        //   errors.city = "Required";
                        // }
                        if (!values.pinCode) {
                          errors.pinCode = "Required";
                        }
                        else if (!Number(values.pinCode)) {
                          errors.pinCode = "Should be Number";
                        }

                        if (hasPns) {

                          if (!values.smoking) {
                            errors.smoking = "Required";
                          }

                          if (values.dateOfBirth) {
                            const diff = moment().diff(values.dateOfBirth, "years")
                            if (diff > 55 || diff < 15) {
                              errors.dateOfBirth = "Age should be between 55 and 15"
                            }
                          }


                        }
                      }
                  }

                  console.log("Errors", errors);
                  setErrors(errors);
                  return errors;
                }}
                onSubmit={async (values, { setSubmitting }, errors) => {
                  console.log("Errors", errors);
                  if (!patientEntryType && props.dtrfFront) {
                    return
                  }
                  if (props.sendBy == "Link") {
                    console.log(router.query);
                    console.log("SElected ", selectedCity, selectedState, values)
                    values.city = selectedCity.value
                    values.state = selectedState.value
                    values.ref_token = router.query.ref_token
                    values.dtrf_token = router.query.dtrf_token
                    values.name = { firstName: values.firstName, lastName: values.lastName }
                    values.consanguinity = "2"
                    console.log(values);
                    console.log("FORM VALUES FROM LINK", values)

                    if (router.query.id) {
                      console.log("Existing patient ")
                      values.confirmation = true
                      values._id = router.query.id


                      console.log("VALUES", values)
                      const url = process.env.NEXT_PUBLIC_PATIENT_UPDATE
                      const res = await reqWithToken(url, "POST", { ...values }, { superDtrf: props.fromSuperDtrf, dtrfFront: props.fromDtrfFront })
                      // const res = await axios.post(process.env.NEXT_PUBLIC_PATIENT_UPDATE, { ...values })
                      if (res.status == 200) {
                        props.setIsSubmitted(true)
                        setModalShow(true)
                      }
                      console.log(res)
                    }
                    else {
                      console.log("Non existing patient")

                      try {
                        const url = process.env.NEXT_PUBLIC_PATIENT_CREATE
                        const res = await reqWithToken(url, "POST", { ...values }, { superDtrf: props.fromSuperDtrf, dtrfFront: props.fromDtrfFront })
                        // const res = await axios.post(process.env.NEXT_PUBLIC_PATIENT_CREATE, { ...values })
                        if (res.status == 200) {
                          props.setIsSubmitted(true)
                          setNewModal(true)
                        }
                        console.log(res)
                      } catch (error) {
                        console.log(error)
                      }
                    }

                  }
                  else {
                    if (patientEntryType == "patient") {

                      handleOnClickNext(values);
                    } else {
                      if (hasNbs) {
                        delete values.folicAcidIntake
                        delete values.smoking
                        delete values.height
                        delete values.husbandsOrFathersName

                      }
                      if (props.dynamicPatient && !hasNbs) {
                        values._id = props.dynamicPatient._id
                      }
                      console.log("Values")
                      // values.salutation = salutation
                      values.city = selectedCity.value
                      values.state = selectedState.value
                      console.log(values);
                      handleOnClickNext(values);
                    }

                  }
                }}
              >
                {

                  ({ values, handleChange, setValues }) => (
                    patient &&

                    <Form className="mb-2">


                      {/*~~~~~~~~~~~~~~~~~~~~~~ Patient Found Modal~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

                      <Modal
                        show={patientFoundModal}
                        onHide={() => setPatientFoundModal(!patientFoundModal)}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        data-backdrop="static"
                      >

                        <Modal.Body>
                        </Modal.Body>
                        <Modal.Header>
                          <Modal.Title>Patient Already exists with Following Information !</Modal.Title>
                          <h4>Do yo want to use it ?</h4>
                        </Modal.Header>
                        {
                          patientFoundDetails &&
                          <div className="row">
                            <div className="col-12 col-md-6">
                              <div className="form-group mb-0">
                                <label className="col-form-label col-sm-6 text-sm-right">
                                  <b>First Name</b>
                                </label>
                                <label className="col-form-label col-sm-6">
                                  {
                                    patientFoundDetails.name.firstName
                                  }
                                </label>
                              </div>
                            </div>
                            <div className="col-12 col-md-6">
                              <div className="form-group mb-0">
                                <label className="col-form-label col-sm-6 text-sm-right">
                                  <b>Last Name</b>
                                </label>
                                <label className="col-form-label col-sm-6">
                                  {
                                    patientFoundDetails.name.lastName
                                  }
                                </label>
                              </div>
                            </div>
                            <div className="col-12 col-md-6">
                              <div className="form-group mb-0">
                                <label className="col-form-label col-sm-6 text-sm-right">
                                  <b>Contact</b>
                                </label>
                                <label className="col-form-label col-sm-6">
                                  {
                                    patientFoundDetails.contact
                                  }
                                </label>
                              </div>
                            </div>
                            <div className="col-12 col-md-6">
                              <div className="form-group mb-0">
                                <label className="col-form-label col-sm-6 text-sm-right">
                                  <b>Date oF Birth</b>
                                </label>
                                <label className="col-form-label col-sm-6">
                                  {
                                    patientFoundDetails.dateOfBirth
                                  }
                                </label>
                              </div>
                            </div>
                          </div>
                        }
                        <Modal.Footer>
                          <div className="text-right">
                            <Button variant="primary" type="submit" onClick={e => {
                              console.log(patientFoundDetails, "PAtientFOUND")
                              setValues({ ...patientFoundDetails, firstName: patientFoundDetails.name.firstName, lastName: patientFoundDetails.name.lastName })
                              setPatientFoundModal(!patientFoundModal)
                              setUsePatientFound(true)
                            }}>
                              Yes
                            </Button>
                          </div>
                          <div className="text-right mr-2">

                            <Button variant="primary" onClick={e => {
                              setUsePatientFound(false)
                              setPatientFoundModal(!patientFoundModal)
                            }}>
                              No
                            </Button>
                          </div>
                        </Modal.Footer>
                      </Modal>

                      {/* ~~~~~~~~~~~~~~~~~~~~~PATIENT FOUND MODAL CLOSE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                      {/* Existing Patient Modal */}
                      <Modal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        data-backdrop="static"
                      >

                        <Modal.Body>
                        </Modal.Body>
                        <Modal.Header>
                          <Modal.Title>Information Updated successfully!</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                          <div className="text-right">
                            <Button variant="primary" type="submit" onClick={e => setModalShow(false)}>
                              Okay
                            </Button>
                          </div>
                        </Modal.Footer>
                      </Modal>
                      {/* !!!~~~~~~~~~~~~~~~~~~~~~~~~~Existing Patient Modal Closed!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~!New Patient!~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                      <Modal
                        show={newModal}
                        onHide={() => setNewModal(false)}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        data-backdrop="static"
                      >

                        <Modal.Body>
                        </Modal.Body>
                        <Modal.Header>
                          <Modal.Title>Patient Created successfully</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                          <div className="text-right">
                            <Button variant="primary" type="submit" onClick={e => setNewModal(false)}>
                              Okay
                            </Button>
                          </div>
                        </Modal.Footer>
                      </Modal>
                      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~NEW PATIENT MODAL~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                      <div>
                        <div>
                          <div className="col-12">
                            <br></br>

                            {props.formValues && props.formValues.collectionLocation.location !=
                              "Home" && (props.sendBy != "Link") && (
                                <>
                                  <label>
                                    <b>To be filled by</b>
                                  </label>
                                  <div className="form-group" value="2">
                                    <div className="pretty p-default p-round">
                                      <input
                                        type="radio"
                                        name="medicalInformationOption"
                                        value="1"
                                        onChange={handlePatientTypeRadioButtonClick}
                                        checked={patientEntryType == "Staff"}
                                      />
                                      <div className="state">
                                        <label>Staff</label>
                                      </div>
                                    </div>

                                    <div className="pretty p-default p-round">
                                      <input
                                        type="radio"
                                        name="medicalInformationOption"
                                        value="2"
                                        onChange={handlePatientTypeRadioButtonClick}
                                        checked={patientEntryType == "patient"}
                                      />
                                      <div className="state">
                                        <label>Patient</label>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                          </div>
                          {(patientEntryType == "Staff" || props.formValues &&
                            props.formValues.collectionLocation.location ==
                            "Home") && (
                              <>
                                <div className="row">
                                  <TextField
                                    name="hospitalId"
                                    title="Hospital ID/Unique ID"
                                  />
                                  {!hasNbs &&

                                    <RadioField
                                      name="salutation"
                                      title={"Title"}
                                      mandatory={false}
                                      options={[{ value: "Mrs", label: "Mrs" }, { value: "Ms", label: "Ms" },
                                      { value: "Mr", label: "Mr" }, { value: "Mx", label: "Mx" }]}
                                    />
                                  }
                                </div>


                                {hasNbs &&
                                  <RadioField
                                    name="hasBabyName"
                                    title={"Has Infant been named?"}
                                    mandatory={true}
                                    options={[{ value: "true", label: "Yes" },
                                    { value: "false", label: "No" }]}
                                  />

                                }
                                <div className="row" >
                                  {(hasNbs && values.hasBabyName) && (<>
                                    <div className="row" style={{ width: "100%" }}>

                                      <DisplayFields
                                        title="Title"
                                        data={values.hasBabyName == "true" ? (values.gender == "female" ? "Baby" : "Master") : "Baby Of"}
                                        className="col-md-2"
                                        clinical_info={true}
                                      />

                                      <TextField
                                        name="firstName"
                                        title="First Name"
                                        mandatory={true}
                                        placeholder="Enter first name"
                                        className={"col-md-5"}
                                      />

                                      <TextField
                                        name="lastName"
                                        title="Last Name"
                                        mandatory={hasNbs ? false : true}
                                        placeholder="Enter last name"
                                        className={"col-md-5"}
                                      />
                                    </div>
                                  </>

                                  )
                                  }
                                  {
                                    !hasNbs && <>

                                      <TextField
                                        name="firstName"
                                        title="First Name"
                                        mandatory={true}
                                        placeholder="Enter first name"
                                        className={"col-sm"}
                                      />

                                      <TextField
                                        name="lastName"
                                        title="Last Name"
                                        mandatory={true}
                                        placeholder="Enter last name"
                                        className={"col-sm"}
                                      />
                                    </>
                                  }
                                </div>

                                <div className="row">
                                  <NumberField
                                    name="contact"
                                    title="Contact Number"
                                    mandatory={true}
                                    placeholder="Enter Contact Number"
                                  />

                                  {
                                    hasNbs &&
                                    <RadioField
                                      toolTip={<div style={{ width: "300px", display: "block" }}>Lilac Insights is an inclusive organization and is sensitive to the fact that an individual may or may not identify with the sex assigned at birth. We therefore use terminologies that are scientific and inclusive. Sex assigned at birth is the sex assigned to an individual at birth, most often based on external anatomy.</div>}
                                      title="Sex assigned at Birth"
                                      name="gender"
                                      mandatory={true}
                                      options={[{ value: "male", label: "Male" },
                                      { value: "female", label: "Female" },
                                      { value: "other", label: "Other" }
                                      ]}
                                      disabled={patientFound && !usePatientFound}
                                    />
                                  }
                                </div>

                                {(( // !props.isNew
                                  props.formValues.collectionLocation.location !=
                                  "Home") || props.sendBy && props.sendBy == "Link") && (
                                    <>

                                      <div className="row">
                                        <RadioField
                                          name="ageType"
                                          title="Age In"
                                          mandatory={true}
                                          options={[{ label: "Date Of birth", value: "dob" },
                                          { label: "Years-Months-Days", value: "ageInYMD" }]}
                                        />

                                        {values.ageType == "ageInYMD" &&

                                          <div className="row" >
                                            <div className="col-sm my-auto" >
                                              <label style={{ paddingLeft: "20px" }}>Age In</label>
                                            </div>
                                            <NumberField
                                              name="ageInYears"
                                              placeholder="Enter age in Year"
                                              title="Years"
                                              mandatory={true}
                                              disabled={patientFound && !usePatientFound}
                                              className="col-sm"
                                            />
                                            <NumberField
                                              name="ageInMonths"
                                              title="Months"
                                              mandatory={true}
                                              disabled={patientFound && !usePatientFound}
                                              className="col-sm"
                                            />
                                            <NumberField
                                              name="ageInDays"
                                              title="Days"
                                              mandatory={true}
                                              disabled={patientFound && !usePatientFound}
                                              className="col-sm"
                                            />


                                          </div>
                                        }


                                      </div>
                                      <div className="row">
                                        {
                                          values.ageType == "dob" &&
                                          <DateFieldComponent
                                            name="dateOfBirth"
                                            title={hasNbs ? "Infant's Date of Birth" : "Date of Birth"}
                                            max={moment().format("YYYY-MM-DD")}
                                            mandatory={true}
                                          />

                                        }
                                        {!hasNbs &&

                                          <RadioField
                                            toolTip={<div style={{ width: "300px", display: "block" }}>Lilac Insights is an inclusive organization and is sensitive to the fact that an individual may or may not identify with the sex assigned at birth. We therefore use terminologies that are scientific and inclusive. Sex assigned at birth is the sex assigned to an individual at birth, most often based on external anatomy.</div>}
                                            title="Sex assigned at Birth"
                                            name="gender"
                                            mandatory={true}
                                            options={[{ value: "male", label: "Male" },
                                            { value: "female", label: "Female" },
                                            { value: "other", label: "Other" }
                                            ]}
                                            disabled={patientFound && !usePatientFound}
                                          />
                                        }
                                      </div>
                                      {
                                        hasNbs &&
                                        <NumberField
                                          name="weight"
                                          placeholder="Enter Weight"
                                          title="Weight (in kg) "
                                          mandatory={true}
                                          disabled={patientFound && !usePatientFound}
                                        />


                                      }
                                      {
                                        hasNbs && <>

                                          <div className="row">

                                            <div className="col-md-2 col-12">

                                              <label style={{ paddingTop: "30px" }}>
                                                Mother's Name
                                              </label>
                                            </div>
                                            <TextField
                                              name="mothersFirstName"
                                              title="First Name"
                                              mandatory={true}
                                              placeholder="Enter first name"
                                              disabled={patientFound && !usePatientFound}
                                              className={"col-md-5 col-12"}
                                            />
                                            <TextField
                                              name="mothersLastName"
                                              title="Last Name"
                                              mandatory={true}
                                              placeholder="Enter Last name"
                                              disabled={patientFound && !usePatientFound}
                                              className={"col-md-5 col-12"}
                                            />

                                          </div>
                                          <div className="row">
                                            <RadioField
                                              name="mothersAgeType"
                                              title="Mothers Age In"
                                              mandatory={true}
                                              options={[{ label: "Date Of birth", value: "dob" },
                                              { label: "Years-Months-Days", value: "ageInYMD" }]}
                                            />
                                            {
                                              values.mothersAgeType == "dob" &&

                                              <DateFieldComponent
                                                name="mothersDateOfBirth"
                                                title="Mothers DOB"
                                                max={moment().format("YYYY-MM-DD")}
                                                mandatory={true}
                                              />
                                            }
                                          </div>
                                          <div className="row">
                                            {
                                              values.mothersAgeType == "ageInYMD" &&
                                              <>
                                                <div className="col-sm my-auto" >
                                                  <label style={{ paddingLeft: "20px" }}>Age In</label>
                                                </div>
                                                <NumberField
                                                  name="mothersAgeInYears"
                                                  placeholder="Enter age in Year"
                                                  title="Years"
                                                  mandatory={true}
                                                  disabled={patientFound && !usePatientFound}
                                                  className="col-sm"
                                                />
                                                <NumberField
                                                  name="mothersAgeInMonths"
                                                  title="Months"
                                                  mandatory={true}
                                                  disabled={patientFound && !usePatientFound}
                                                  className="col-sm"
                                                />
                                                <NumberField
                                                  name="mothersAgeInDays"
                                                  title="Days"
                                                  mandatory={true}
                                                  disabled={patientFound && !usePatientFound}
                                                  className="col-sm"
                                                />

                                              </>
                                            }
                                          </div>

                                          <div className="row">
                                            <div className="col-md-2 col-12">

                                              <label style={{ paddingTop: "30px" }}>
                                                Father's Name
                                              </label>
                                            </div>
                                            <TextField
                                              name="fathersFirstName"
                                              title="First Name"
                                              placeholder="Enter first name"
                                              disabled={patientFound && !usePatientFound}
                                              className={"col-md-5 col-12"}
                                            />

                                            <TextField
                                              name="fathersLastName"
                                              title="Last Name"
                                              placeholder="Enter Last name"
                                              disabled={patientFound && !usePatientFound}
                                              className={"col-md-5 col-12"}
                                            />
                                          </div>

                                        </>

                                      }

                                      <div className="row">
                                        {
                                          !hasNbs && <>
                                            <TextField
                                              name="husbandsOrFathersName"
                                              title="Husband's/Father's Name"
                                              placeholder="Enter Husband's/Father Name"
                                              disabled={patientFound && !usePatientFound}
                                            />
                                          </>
                                        }


                                        <div className="col-md-6 col-12">
                                          <div className="form-group">
                                            <label>
                                              Email
                                            </label>
                                            <Field
                                              type="email"
                                              name="email"
                                              placeholder="Enter Email"
                                              className="form-control"
                                              disabled={patientFound && !usePatientFound}
                                            />
                                            <ErrorMessage
                                              name="email"
                                              component="div"
                                              className="formErr"
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <div className="row">
                                        <TextField
                                          name="address"
                                          title="Address"
                                          component="textarea"
                                          mandatory={true}
                                          disabled={patientFound && !usePatientFound}
                                        />
                                        <TextField
                                          name="pinCode"
                                          title="Pin Code"
                                          mandatory={true}
                                          disabled={patientFound && !usePatientFound}
                                        />

                                      </div>

                                      <div className="row">
                                        <div className="col-md-6 col-12">
                                          <div className="form-group">
                                            <label>
                                              City<span className="marked">*</span>
                                            </label>

                                            <Select
                                              options={cityList}
                                              name="city"
                                              value={selectedCity.hasOwnProperty("label") ? cityList.filter(city => city.value == selectedCity.value) : ""}
                                              onChange={handleCityChange}
                                              isDisabled={patientFound && !usePatientFound}

                                            />
                                            <ErrorMessage
                                              name="city"
                                              component="div"
                                              className="formErr"
                                            />
                                          </div>
                                        </div>

                                        <div className="col-md-6 col-12">
                                          <div className="form-group">
                                            <label>
                                              State<span className="marked">*</span>
                                            </label>
                                            <Select
                                              name="state"
                                              options={stateList}
                                              value={selectedState.hasOwnProperty("label") ? stateList.filter(state => state.value == selectedState.value) : ""}
                                              onChange={handleStateChange}
                                              name="state"
                                              isDisabled={patientFound && !usePatientFound}
                                            />
                                            <ErrorMessage
                                              name="state"
                                              component="div"
                                              className="formErr"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      {
                                        (hasNipt) && <div className="row">
                                          <NumberField
                                            name="weight"
                                            placeholder="Enter Weight"
                                            title="Weight (in kg)"
                                            mandatory={true}
                                            disabled={patientFound && !usePatientFound}
                                          />
                                          <NumberField
                                            name="height"
                                            placeholder="Enter Weight"
                                            title="Height (in cm)"
                                            mandatory={true}
                                            disabled={patientFound && !usePatientFound}
                                          />

                                        </div>
                                      }
                                      {
                                        hasPns &&
                                        <div className="row">
                                          <NumberField
                                            name="weight"
                                            placeholder="Enter Weight"
                                            title="Weight (in kg)"
                                            mandatory={true}
                                            disabled={patientFound && !usePatientFound}
                                          />
                                          <NumberField
                                            name="height"
                                            placeholder="Enter Height"
                                            title="Height (in cm)"
                                            mandatory={true}
                                            disabled={patientFound && !usePatientFound}

                                          />
                                        </div>
                                      }

                                      {((hasPns) && !hasNbs) &&
                                        <div className="row">
                                          <RadioField
                                            name="smoking"
                                            options={[{ value: "true", label: "Yes" },
                                            { value: "false", label: "No" }
                                            ]}
                                            title="Smoking"
                                            mandatory={true}
                                            disabled={patientFound && !usePatientFound}
                                          />


                                          <RadioField
                                            title="Folic Acid Intake"
                                            name="folicAcidIntake"
                                            options={[{ value: "true", label: "Yes" },
                                            { value: "false", label: "No" }]}
                                            mandatory={false}
                                            disabled={patientFound && !usePatientFound}

                                          />

                                        </div>
                                      }
                                    </>
                                  )}
                              </>
                            )}

                          {patientEntryType == "patient" && (
                            <>
                              <div style={{ padding: "5px 0px" }}>
                                <NumberField
                                  name="contact"
                                  title="Contact Number"
                                  mandatory={true}
                                  placeholder="Enter Contact Number"
                                />
                                <button
                                  onClick={handleSendFormLink}
                                  type="button"
                                  className="btn btn-info"
                                >
                                  {isPatientInformationLinkSent && "Resend Link"}
                                  {!isPatientInformationLinkSent && "Send Link"}
                                </button>
                                &nbsp;&nbsp;
                                {isPatientInformationLinkSent &&
                                  "Link has been sent to patient"}
                              </div>
                            </>
                          )}
                        </div>
                        {props.sendBy == "Link" ?
                          <div className="col-md-12 col-12 text-right">
                            <button type="submit" className="btn btn-primary" disabled={props.isSubmitted}>Save</button>
                          </div>
                          :

                          <div className="row" id="action1">
                            {props.fromSuperDtrf &&

                              <div className="col-md-2 col-2 text-left">
                                <button
                                  onClick={e => Router.push("/super-dtrf")}
                                  className="btn btn-primary"
                                >
                                  Exit
                                </button>
                              </div>
                            }
                            <div className={props.fromSuperDtrf ? "col-md-10 col-10 text-right" : "col-md-12 col-12 text-right"}>
                              <div className="formButtonCenter">
                                <button
                                  onClick={handleOnClickPrevious}
                                  className="btn btn-primary mr-2"
                                  type="button"
                                >
                                  Previous
                                </button>
                                {props.fromSuperDtrf && <>

                                  {!props.Token.isComplete &&

                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleOnClickSave(values)
                                      }
                                      className="btn btn-primary mr-2"
                                    >
                                      Save
                                    </button>
                                  }
                                </>
                                }
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                  onClick={handleOnSubmit}
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                          </div>
                        }
                      </div>
                    </Form>
                  )}

              </Formik>}
          </fieldset>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = state => ({
  patient_details: state.formData.formData.patient_details ? state.formData.formData.patient_details : 1,
  Token: state.Token,
  dynamicPatient: state.dynamicPatient.dynamicPatient_details ? state.dynamicPatient.dynamicPatient_details : "",
  formDataRedux: state.formData.formData

})


export default connect(mapStateToProps, { setDtrfToken, setRefToken, setFormData, getPatient_details, setPatientFoundFlag })(withRouter(PatientForm));
