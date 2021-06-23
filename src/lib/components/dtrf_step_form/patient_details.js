import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState, useEffect } from "react";
import { patients } from "../../public/constants";
import AsyncSelect from "react-select/async";
import axios from "axios";
import Select from "react-select";
import PatientForm from "./patient-form";
import AsyncCreatableSelect from 'react-select/async-creatable';
import { connect } from "react-redux";
import { data } from "jquery";
import { getPatient_details, setFormData } from "../../actions/formData";
import reqWithToken from "../../helper/Auth";
import { successMessage, MousePopover, errorMessage, warningMessage, infoMessage } from "../../helper/commonHelper";
import Router from "next/router";


let config = {
  headers: {
    token: process.env.NEXT_PUBLIC_TOKEN,
  },
};

const PatientDetails = (props) => {
  const [patientEntryType, setPatientEntryType] = useState();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [
    selectedOptionForNewPatient,
    setSelectedOptionForNewPatient,
  ] = useState();
  const [
    isPatientInformationLinkSent,
    setIsPatientInformationLinkSent,
  ] = useState();
  const [, reRender] = useState();
  const [isNewPatient, setIsNewPatient] = useState(false)
  const [formValues, setFormValues] = useState(null)


  const [isNbs, setIsNbs] = useState(false)
  useEffect(() => {
    console.log("PATIENT DETAILS", props)
    props.formValues.test_info.selectedTests.map((test) => {
      if (test.sub_group == "NBS") {
        setIsNbs(true)
      }
    })
    if (props.patient_details && selectedPatient == null) {


      console.log("Iside if use effect")
      const patient = props.patient_details
      setSelectedPatient(patient)
      props.getPatient_details(patient)

    } else {

      setFormValues(props.formValues)
      console.log("RE RENDERING !@!@!@!@!@@@@@@@@@@@@@~~~~~~")
      const patient = selectedPatient
      setSelectedPatient(patient)
      props.getPatient_details(patient)
    }
  }, [selectedPatient]);

  const handleOnClickPrevious = () => {

    props.previousStep();
    props.handleOnClickPrevious();
  };

  const handleOnClickNext = (values) => {

    props.handleOnClickNext("patient_details", values);
    console.log("values", values)
    console.log(123123, props.formValues.collectionLocation.location);
    if (props.formValues.collectionLocation.location != "Home") {
      props.nextStep();
      console.log(props);
    } else {
      props.goToStep(5);
      console.log(props);
    }
  };

  const handlePatientTypeRadioButtonClick = (value) => {
    setPatientEntryType(value.target.value);
  };

  const handlePatientSearch = async (searchString) => {


    if (searchString.length > 2) {
      // const url = process.env.NEXT_PUBLIC_PATIENT_SEARCH;
      const url = `${process.env.NEXT_PUBLIC_PATIENT_SEARCH}?searchquery=${searchString}`
      // const url = `http://dtrf.aiolos.solutions:8187/v1/patient/search?searchquery=${searchString}`
      const search = { str: searchString };
      const searchedTestList = await reqWithToken(url, "GET")
      // const searchedTestList = await axios.post(url, search, config);
      // console.log(searchString);

      return searchedTestList.data.data.patientSearchList;
    }


  };


  const [contactNumber, setContactNumber] = useState(null)
  const handleOnchangePatientSearch = (patient) => {
    setResetFields(false)
    console.log("Onchange patient search", patient)
    if (props.formValues.patient_details) {
      const data = props.formValues
      data.patient_details = null
      props.setFormData(data)
    }
    if (!patient.__isNew__) {
      if (selectedPatient && patient._id != selectedPatient._id) {
        console.log("Condition Working123123123123123123 ")
        const diffPatient = patient
        getPrefilledPatientDetails({ ...patient })
        console.log("HANDLE ON CHANGE", patient)
        setSelectedPatient(diffPatient);
        setSelectedOptionForNewPatient(null)
        setIsNewPatient(false)
        setFormValues(patient)

        reRender({})
      } else {
        getPrefilledPatientDetails(patient)
        console.log("ITS SAMEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEeee")
        setSelectedPatient(patient);
        setSelectedOptionForNewPatient(null)
        setIsNewPatient(false)

        reRender({})
      }


    } else {

      console.log("new ", selectedOptionForNewPatient);
      setSelectedPatient("new");
      // setSelectedPatient(null) 
      setSelectedOptionForNewPatient(1)
      setIsNewPatient(true)
      reRender({})
      const RegExpression = /^\d*$/
      if (RegExpression.test(patient.label)) {

        setContactNumber(patient.label)
      }
    }
  };

  // ~~~~~~~~~~~~~~~~~~~~~!!!!!!!!!!!!!!!! ADMIN PANEL ~~~~~~~~~~~~~~~~~~!!!!!!!!!!!!!!!!!!!!!!
  const handleOnClickSave = async () => {
    let data = {}
    let formData = new FormData()
    data.dtrf_id = props.Token.dtrfToken
    data.dtrf = props.formDataRedux
    if (data.dtrf.patient_details) {
      delete data.dtrf.patient_details
    }
    const response = await props.handleOnClickSave({ ...data.dtrf })
    props.setFormData({ ...data.dtrf })
    if (response) {

      if (response.status == 200) {
        successMessage("Form saved")
      }
    } else {
      return errorMessage("Error in Saving Form")
    }

  }

  const handleOnClickSaveAndExit = async () => {
    await handleOnClickSave();
    Router.push("/super-dtrf")
  }

  const handleOnClickTest = () => {
    props.nextStep();
  }
  // ~~~~~~~~~~~~~~~~~~~~~~!!!!!!!!!!!!!!!! ADMIN PANEL CLOSE~~~~~~~~~~~~~~~!!!!!!!!!!!!!!!!!!!
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~PRefilled Patient ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  const [selectedCity, setSelectedCity] = useState("")
  const [selectedState, setSelectedState] = useState("")


  const getPrefilledPatientDetails = (data) => {
    console.log("Insite getPRefilledPatientDetails")
    if (data) {

      if (!data.isNew) {
        setPrefilledPatient(data)
        setSelectedPatient(data);
        setSelectedOptionForNewPatient(null)
        setIsNewPatient(false)
        reRender({})
      }
      else {
        setPrefilledPatient(data)

        setSelectedOptionForNewPatient(1)
        setIsNewPatient(true)
      }

    }
  }
  const [resetFields, setResetFields] = useState(true)
  const [prefilledPatient, setPrefilledPatient] = useState({})
  const [prefilledPatientLabel, setPrefilledPatientLabel] = useState()
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CLOSE Prefilled Patient CLOSE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const handleOnChangeOptionForNewPatient = (option) => {
    setSelectedOptionForNewPatient(option.target.value);
  };

  const handleSendLinkMedicalForm = () => {
    setIsPatientInformationLinkSent(true);
  };

  const handleCreateNewPatient = (e) => {
    console.log("create new");
  }

  const promiseOptions = async inputValue =>
    new Promise(resolve => {
      resolve(handlePatientSearch(inputValue));
    });
  console.log(selectedPatient, "Selected patient")
  return (
    <>
      <div className="customWrap">
        <div className="row">
          {
            props.fromSuperDtrf && <>
              <div className="col-md-12 col-12 text-right">
                <div style={{ padding: "10px 0px" }}>
                  {!props.Token.isComplete &&

                    <button
                      type="button"
                      onClick={() =>
                        handleOnClickSaveAndExit()
                      }
                      className="btn btn-primary mr-2"
                    >
                      Save And Exit
                    </button>
                  }
                </div>
              </div>
            </>
          }
          <div className="col-md-12 col-12">
            <fieldset id="valdatinStep1">

              {/* {patientEntryType == 2 && ( */}
              <div>
                <label>Enter Phone No. / Name</label>

                <div className="form-group">
                  <AsyncCreatableSelect
                    defaultOptions

                    loadOptions={promiseOptions}
                    onChange={handleOnchangePatientSearch}
                    getOptionLabel={(e) => {
                      if (e.name) {
                        if (e.mothersName) {
                          if (e.hasBabyName) {
                            return e.name.firstName + " " + e.name.lastName + " | " + e.contact
                          } else {
                            return "Baby of " + e.name.firstName + " " + e.name.lastName + " | " + e.contact
                          }
                        } else {
                          return e.name.firstName + " " + e.name.lastName + " | " + e.contact
                        }
                      } else {
                        return "Create New"
                      }
                    }

                    }
                  />
                </div>
                {selectedPatient && selectedPatient != "new" && (
                  <PatientForm
                    fromSuperDtrf={props.fromSuperDtrf}
                    fromDtrfFront={props.fromDtrfFront}
                    resetFields={resetFields}
                    setResetFields={setResetFields}
                    handleOnClickPrevious={handleOnClickPrevious}
                    handleOnClickNext={handleOnClickNext}
                    patient={prefilledPatient}
                    editable={true}
                    new={selectedPatient.isNew ? true : false}
                    formValues={props.formValues}
                    contactNumber={contactNumber}
                    handleOnClickSave={props.handleOnClickSave}

                  />
                )}
                {selectedOptionForNewPatient == 1 && (
                  <>
                    <PatientForm
                      handleOnClickSave={props.handleOnClickSave}
                      fromSuperDtrf={props.fromSuperDtrf}
                      fromDtrfFront={props.fromDtrfFront}
                      resetFields={resetFields}
                      setResetFields={setResetFields}
                      patient={selectedPatient}
                      handleOnClickPrevious={handleOnClickPrevious}
                      previousStep={props.previousStep}
                      handleOnClickNext={handleOnClickNext}
                      new={true}
                      formValues={props.formValues}
                      contactNumber={contactNumber}

                    />
                  </>
                )}
              </div>
              {/* )} */}

            </fieldset>
          </div>
        </div>
        {
          props.fromSuperDtrf && <>
            {(!selectedPatient && selectedOptionForNewPatient != 1) &&
              <div className="row">
                <div className="col-md-2 col-2 text-left">
                  <div style={{ padding: "5px 20px" }}>
                    <button
                      onClick={e => Router.push("/super-dtrf")}
                      className="btn btn-primary mr-2"
                    >
                      Exit
                    </button>
                  </div>
                </div>
                <div className="col-md-10 col-6 text-reft ">
                  <div className="formButttonCenter">
                    <button
                      onClick={handleOnClickPrevious}
                      className="btn btn-primary mr-2"
                    >
                      Previous
                    </button>
                    {!props.Token.isComplete &&

                      <button
                        type="button"
                        onClick={() =>
                          handleOnClickSave()
                        }
                        className="btn btn-primary mr-2"
                      >
                        Save
                      </button>
                    }
                    <button
                      onClick={handleOnClickTest}
                      className="btn btn-primary mr-2"
                    >
                      Next
                    </button>
                  </div>
                </div>

              </div>
            }
          </>
        }
        {props.fromDtrfFront && <>

          {(!selectedPatient && selectedOptionForNewPatient != 1) &&
            <div className="row">
              <div className="col-md-12 col-12 text-right">
                <div className="formButttonCenter">
                  <button
                    onClick={handleOnClickPrevious}
                    className="btn btn-primary mr-2"
                  >
                    Previous
                  </button>
                </div>
              </div>
            </div>
          }
        </>
        }

      </div>
    </>
  );
};
const mapStateToProps = state => ({
  patient_details: state.formData.formData.patient_details ? state.formData.formData.patient_details : null,
  formDataRedux: state.formData.formData,
  Token: state.Token,
})

export default connect(mapStateToProps, { getPatient_details, setFormData })(PatientDetails);
