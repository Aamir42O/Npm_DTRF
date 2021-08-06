import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { referralReason as referralReasonList, cityList, stateList } from "../../public/constants";
import { connect } from "react-redux";
import { getDoctors, getReferralDoctors } from "../../actions/doctors"
import formData from "../../reducers/form";
import MySelect from "../mySelect";
import reqWithToken from "../../helper/Auth";
import AsyncSelect from "react-select/async";
import { setFormData } from "../../actions/formData";
import { clearFiles } from "../../actions/fileupload";
import Cookies from "js-cookie"

const axios = require("axios");

let config = {
  headers: {
    token:
      process.env.NEXT_PUBLIC_TOKEN,
  },
};

const DoctorInfo = (props) => {
  const [createNewReferenceDoctor, setCreateNewReferenceDoctor] = useState(
    false
  );

  const [doctorName, setDoctorName] = useState("");
  const [referenceDoctorName, setReferenceDoctorName] = useState("");
  const [
    isReferenceDoctorCompulsory,
    setIsReferenceDoctorCompulsory,
  ] = useState(false);
  const [isDoctorNameValid, setIsDoctorNameValid] = useState(false);
  const [showDoctorErrorMessage, setShowDoctorErrorMessage] = useState(false);

  const [isReferenceDoctorNameValid, setIsReferenceDoctorNameValid] = useState(false);
  const [showReferenceDoctorErrorMessage, setShowReferenceDoctorErrorMessage] = useState(false);

  const [, set] = useState("");
  const [isReferenceDoctorReasonValid, setIsReferenceDoctorReasonValid] = useState(false);
  const [showReferenceDoctorReasonErrorMessage, setShowReferenceDoctorReasonErrorMessage] = useState(false);

  const [referenceDoctorCity, setReferenceDoctorCity] = useState("");
  const [referenceDoctorState, setReferenceDoctorState] = useState("");

  const [formData, setFormData] = useState({})

  const [doctorsList, setDoctorsList] = useState([]);
  const [referralDoctorsList, setReferralDoctorsList] = useState([]);
  const [formattedDoctorsList, setFormattedDoctorsList] = useState([]);
  const [
    formattedReferralDoctorsList,
    setFormattedReferralDoctorsList,
  ] = useState([]);

  const [isOtherSelected, setIsOtherSelected] = useState(false)

  const [isGyno, setIsGyno] = useState(false)


  const formRef = useRef();
  const FirstFormRef = useRef();

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Prefilled Values!~
  const [prefilledDoctorName, setPrefilledDoctorName] = useState("")
  const [sonographerName, setSonoGrapherName] = useState("")

  const getPrefilledDoctorName = (data) => {
    const asd = data
    asd.label = data.name.firstName + " " + data.name.lastName
    asd.value = data._id
    console.log("prefilledValue", asd)
    setPrefilledDoctorName(asd)
    setIsDoctorNameValid(true)
  }
  const [prefilleReferrenceDoctor, setPrefilledReferrenceDoctor] = useState("")
  const getPrefilledReferenceDoctor = (data) => {
    console.log("data", data)
    const asd = { label: data.name.firstName + " " + data.name.lastName, value: data._id }
    console.log("prefilled Reference Doctor Name", asd)
    setIsReferenceDoctorNameValid(true)
    setPrefilledReferrenceDoctor(data)
    setReferenceDoctorName(data)

  }
  const [prefilledReferalReason, setPrefilledReferalReason] = useState("")
  const getPrefilledReferalReason = (data) => {
    console.log("prefilled referal reason", data)
    setIsReferenceDoctorReasonValid(true);
    setShowReferenceDoctorReasonErrorMessage(false)
    setPrefilledReferalReason({ label: data, value: data })

  }



  useEffect(() => {
    // console.log("List", List)
    console.log("Props", props)
    if (props.doctorName != 1) {
      console.log("In useeffect referenceDoctorname")
      getPrefilledDoctorName(props.doctorName)


      // getPrefilledReferenceDoctor(props.referenceDoctorName)
      // getPrefilledReferenceDoctor({value:props.referenceDoctorName.name.firstName +" " +props.referenceDoctorName.name.lastName ,value:props.referenceDoctor._id})
    }
    // if ((props.doctorName.practice_type == "Gynaecologist-Obstetrician")) {
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

  const handleDoctorNameChange = (e) => {

    if (e == null) {
      console.log(e);
      setPrefilledDoctorName(null)
    }
    if (e) {
      setShowDoctorErrorMessage(false)
      if (props.formDataRedux.test_info) {
        const data = props.formDataRedux.test_info
        delete data.test_info
        props.setFormData(data)
        props.clearFiles()
      }

      if (e.practice_type == 'Gynaecologist-Obstetrician') {
        setIsGyno(true)
      } else {
        setIsGyno(false)
      }
      setIsDoctorNameValid(true);
      setDoctorName(e);
      getPrefilledDoctorName(e)
    } else {
      setIsDoctorNameValid(false);

    }


  };
  console.log("IS  GYNO", isGyno)
  const handleSonographerNameChange = (e) => {
    if (e) {

      e.value = e._id
      e.label = e.name.firstName + " " + e.name.lastName
      setSonoGrapherName(e)
    } else {
      setSonoGrapherName(null)
    }

  }
  const handleReferenceDoctorNameChange = (e) => {

    console.log(e)
    if (e) {

      e.value = e._id
      e.label = e.name.firstName + " " + e.name.lastName
      setPrefilledReferrenceDoctor(e)

      setIsReferenceDoctorNameValid(true);
      setReferenceDoctorName(e);
    } else {
      setPrefilledReferrenceDoctor(null)

    }
  };

  const handleReferralDoctorReasonChange = (e) => {
    console.log(e)
    if (e) {
      console.log("e", e)
      console.log(e.value, e.value == "others");
      getPrefilledReferalReason(e)
      // setPrefilledReferalReason(e.value)
      setIsReferenceDoctorReasonValid(true);
      setShowReferenceDoctorReasonErrorMessage(false)
      if (e.value == "others") {
        setIsOtherSelected(true);
      } else {
        setIsOtherSelected(false);
        set(e.value);
      }
    }
  }
  const handleDoctorLoadOption = async (doctor) => {
    if (doctor.length > 2) {
      console.log("INSIDE", process.env.NEXT_PUBLIC_ALL_DOCTORS)
      let url = `${process.env.NEXT_PUBLIC_ALL_DOCTORS}?searchquery=${doctor}`
      if (props.fromSuperDtrf) {
        url = `${process.env.NEXT_PUBLIC_ALL_DOCTORS}?searchquery=${doctor}&institute=${props.formDataRedux.institute_info.instituteName.lilac_id}`
      }
      console.log("INSIDE condition", url)
      const resp = await reqWithToken(url, "GET", null, { superDtrf: props.fromSuperDtrf, dtrfFront: props.fromDtrfFront })
      console.log(resp)
      return resp.data.data.doctorSearchList
    }
  }
  const handleReferrenceDoctorChange = async (doctor) => {
    console.log("DOCOTOR ", doctor.length > 2)
    console.log("INSIDE", process.env.NEXT_PUBLIC_ALL_REFERRAL_DOCTORS)

    if (doctor.length > 2) {
      console.log("INSIDE", process.env.NEXT_PUBLIC_ALL_REFERRAL_DOCTORS)
      let url = `${process.env.NEXT_PUBLIC_ALL_REFERRAL_DOCTORS}?searchquery=${doctor}`
      console.log("INSIDE condition", url)
      const resp = await reqWithToken(url, "GET", null, { superDtrf: props.fromSuperDtrf, dtrfFront: props.fromDtrfFront })
      console.log(resp)
      return resp.data.data.doctorSearchList
    }
  }
  const handleOnClickNext = (isNewReferralDoctor) => {
    FirstFormRef.current.handleSubmit()
    FirstFormRef.current.validateForm()

    console.log("FIRST FROM ERRORS", FirstFormRef.current.errors)

    if (!isDoctorNameValid) {
      console.log("1")
      setShowDoctorErrorMessage(true);
      return;
    } else {
      setShowDoctorErrorMessage(false);
      console.log("2")
    }



    if (isNewReferralDoctor) {
      console.log("10")
      const values = formRef.current.values;


      props.handleOnClickNext("doctor_info", { doctorName, referenceDoctorName, ...values, referenceDoctorCity, referenceDoctorState });
    } else {
      console.log("11")
      if (props.doctorName != 1) {
        const doctorName = formattedDoctorsList.filter((doctor) => doctor.value == prefilledDoctorName.value)
        const referenceDoctor = formattedReferralDoctorsList.filter((doctor) => doctor.value == prefilleReferrenceDoctor._id)

        props.handleOnClickNext("doctor_info", { doctorName: prefilledDoctorName, });

        // props.handleOnClickNext("doctor_info", { doctorName: doctorName[0], referenceDoctorName: referenceDoctor[0], });
        // props.handleOnClickNext("doctor_info", { doctorName: doctorName[0], referenceDoctorName: referenceDoctor[0], referralReason: prefilledReferalReason.value });
      }
      else {

        props.handleOnClickNext("doctor_info", { doctorName: prefilledDoctorName });

      }
    }
    props.nextStep()
  };

  const handleCreateNewReference = (inputValue) => {
    setCreateNewReferenceDoctor(true);
    setReferenceDoctorName(inputValue);
    setIsReferenceDoctorNameValid(true);
    setShowReferenceDoctorErrorMessage(false);
  };

  const handleCityChange = (e) => {
    setReferenceDoctorCity(e.value);
  };

  const handleStateChange = (e) => {
    setReferenceDoctorState(e.value);
  };

  const handleOnClickCancel = () => {
    setCreateNewReferenceDoctor(false);
    setIsReferenceDoctorNameValid(false)
  };

  console.log("createnewreference", createNewReferenceDoctor)
  return (
    <div className="customWrap">
      <div className="row">
        <div className="col-md-12 col-12">
          <fieldset id="valdatinStep1">
            <Formik
              enableReinitialize
              initialValues={{
                doctorName: prefilledDoctorName,
                sonographer: props.sonographer ? props.sonographer : ""
              }}
              innerRef={FirstFormRef}
              validate={(values) => {
                const errors = {}

                console.log("ERRORS", errors)
                return errors
              }}
              onSubmit={(values, { setSubmitting }) => {
                // handleOnClickNext(values);
                console.log(values)
                console.log("HANDLE SUBMIT CALLED")
              }}
            >
              {({ values, handleChange, errors, touched }) => (
                <Form className="row">

                  <div className="form-group col-sm-12 col-md-6 col-xs-12">
                    <label>
                      Doctor: <span className="marked">*</span>
                    </label>
                    <AsyncSelect
                      isDisabled={props.fromSuperDtrf ? (Cookies.get("roleAL") == "bdm" ? true : false) : false}
                      isClearable
                      cacheOptions
                      defaultOptions
                      value={prefilledDoctorName}
                      getOptionLabel={(e) => e.name.firstName + " " + e.name.lastName + " | " + e.practice_type}
                      getOptionValue={(e) => e._id}
                      loadOptions={handleDoctorLoadOption}
                      onChange={handleDoctorNameChange}
                      // placeholder="Enter Test name"
                      noOptionsMessage={() => 'Enter Doctor name'}
                    />
                    {
                      showDoctorErrorMessage && <div className="formErr">Required</div>
                    }
                  </div>
                </Form>
              )}
            </Formik>

            {createNewReferenceDoctor && (
              <Formik
                initialValues={{ referenceDoctorName: referenceDoctorName, }}
                innerRef={formRef}
                validate={(values) => {
                  const errors = {};
                  if (!values.referenceDoctorName) {
                    errors.referenceDoctorName = "Required";
                  }
                  // else if (!values.referenceDoctorContact) {
                  //     errors.referenceDoctorContact = "Required";
                  // }
                  return errors;
                }}

                onSubmit={(values, { setSubmitting }) => {
                  // handleOnClickNextFromReferringDoctor(values)
                  console.log(values)
                }}
              >
                {({ values }) => (
                  <Form>
                    <div className="row">
                      <div className="col-md-12 col-12">
                        <div className="section-title mb-4 mt-0">
                          Reference Doctor information
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 col-12">
                        <div className="form-group">
                          <label>Name of Doctor</label>
                          <Field
                            type="text"
                            name="referenceDoctorName"
                            placeholder="Enter doctor name"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="referenceDoctorName"
                            component="div"
                            className="formErr"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="form-group">
                          <label>Contact No</label>
                          <Field
                            type="text"
                            name="referenceDoctorContact"
                            placeholder="Enter contact number"
                            className="form-control"
                          />
                          {/* <ErrorMessage
                            name="referenceDoctorContact"
                            component="div"
                            className="formErr"
                          /> */}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 col-12">
                        <div className="form-group">
                          <label>Address</label>

                          <Field name="referenceDoctorAddress">
                            {({ field }) => (
                              <textarea
                                {...field}
                                className="form-control"
                                type="text"
                                placeholder="Enter Address"
                              />
                            )}
                          </Field>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="form-group">
                          <label>Pin code</label>
                          <Field
                            type="text"
                            name="referenceDoctorPinCode"
                            placeholder="Enter Pin Code"
                            className="form-control"
                          ></Field>
                          <ErrorMessage
                            name="referenceDoctorPinCode"
                            component="div"
                            className="formErr"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 col-12">
                        <div className="form-group">
                          <label>City</label>

                          <Select
                            options={cityList}
                            onChange={handleCityChange}
                            name="referenceDoctorCity"
                          />
                          <ErrorMessage
                            name="referenceDoctorCity"
                            component="div"
                            className="formErr"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="form-group">
                          <label>State</label>
                          <Select
                            options={stateList}
                            onChange={handleStateChange}
                            name="referenceDoctorState"
                          />
                          <ErrorMessage
                            name="referenceDoctorState"
                            component="div"
                            className="formErr"
                          />
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            )}
            {/* {isReferenceDoctorNameValid &&  (
              <div className="row">

                <div className="form-group col-sm-12 col-md-6 col-xs-12">
                  <label>
                    Referral reason :
                    
                      <span className="marked">*</span>
                  </label>
                  <Select 
                  isMulti
                    
                    options={referralReasonList}
                    onChange={handleReferralDoctorReasonChange}
                    // value={prefilledReferalReason}
                    name="referralReason"
                  />
                  {isReferenceDoctorNameValid &&
                        showReferenceDoctorReasonErrorMessage && (
                          <div className="formErr">Required</div>
                        )}
                </div>

                {isOtherReferralReasonSelected && 
                <div className="form-group col-sm-12 col-md-6 col-xs-12">
                  <label>
                    Other reason :
                      <span className="marked">*</span>
                  </label>
                  <input
                    className="form-control"
                    onChange={handleOtherReferralReasonChange}
                    name="referralReason"
                  />
                  {isReferenceDoctorNameValid &&
                        showReferenceDoctorReasonErrorMessage && (
                          <div className="formErr">Required</div>
                        )}
                </div>
                }

              </div>
            )} */}

            <div className="row" id="action1">
              <div className="col-md-12 col-12 text-right">
                <div style={{ padding: "5px 20px" }}>
                  {createNewReferenceDoctor && (
                    <button
                      onClick={handleOnClickCancel}
                      className="btn btn-primary mr-2"
                    >
                      Cancel
                    </button>
                  )}
                  {props.fromSuperDtrf &&

                    <button
                      style={{ marginRight: "4px", marginLeft: "4px" }}
                      type="submit"
                      onClick={() => {
                        props.previousStep();
                        props.handleOnClickPrevious();
                      }
                      }
                      className="btn btn-primary"
                    >
                      Previous
                    </button>
                  }
                  <button
                    type="submit"
                    onClick={() =>
                      createNewReferenceDoctor
                        ? handleOnClickNext(true)
                        : handleOnClickNext(false)
                    }
                    className="btn btn-primary"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  formDataRedux: state.formData.formData,
  doctorName: state.formData.formData.doctor_info ? state.formData.formData.doctor_info.doctorName
    : 1,

  referenceDoctorName: state.formData.formData.doctor_info ?
    state.formData.formData.doctor_info.referenceDoctorName : 1,

  referralReason: state.formData.formData.doctor_info ?
    state.formData.formData.doctor_info.referralReason : 1,

  sonographer: state.formData.formData.doctor_info ? state.formData.formData.doctor_info.sonographer : null
})

export default connect(mapStateToProps, { getDoctors, getReferralDoctors, setFormData, clearFiles })(DoctorInfo);
