import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import AsyncSelect from "react-select/async";
import moment from "moment";
import { message } from "antd";
import round from "../../helper/round_off"
import { getSelectedTestsAction } from "../../actions/test";
import { connect } from "react-redux";
import { setFormData } from "../../actions/formData";
import formData from "../../reducers/form";
import reqWithToken from "../../helper/Auth";
import { successMessage, MousePopover, errorMessage, warningMessage, infoMessage } from "../../helper/commonHelper";




let config = {
  headers: {
    token: process.env.NEXT_PUBLIC_TOKEN,
  },
};
const TestDetails = (props) => {

  const [currentDateTime, setCurrentDateTime] = useState(
    moment().format("YYYY-MM-DDThh:mm")
  );
  const [selectedTests, setSelectedTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState("");
  const [
    showNoTestSelectedErrorMessage,
    setShowNoTestSelectedErrorMessage,
  ] = useState(false);

  const [isSelectedTestsEmpty, setIsSelectedTestsEmpty] = useState(true);
  const [showInputRequiredError, setShowInputRequiredError] = useState(false);
  const [
    showSpecimenNotSelectedError,
    setShowSpecimenNotSelectedError,
  ] = useState(false);
  const [doctorCategory, setDoctorCategory] = useState("");
  const [sampleType, setSampleType] = useState("");
  const [sampleSubType, setSampleSubType] = useState("");
  const [, reRender] = useState();

  const [homeCollectionLocation, setHomeCollectionLocation] = useState()

  const [show, setShow] = useState(false);
  const [trimesterAllowed, setTrimesterAllowed] = useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getDoctor = (id) => {
    if (props.formDataRedux.hasOwnProperty()) {
      const formValues = props.formDataRedux;
      setDoctorCategory(formValues.doctor_info.doctorName.testType);
    }
  };
  useEffect(() => {
    getDoctor();
    if (props.formDataRedux.test_info && selectedTests.length == 0) {
      console.log("PREFILLING VALUE")
      getPrefilledSelectTests(props.formDataRedux.test_info.selectedTests)
    }

  }, [getDoctor]);


  // !!!!!!!!!!!!!!~~~~~~~~~~~~~~~~~~~~~~~~~~~ FROM ADMIN PANEL ~~~~~~~~~~~~~~~~~~~~~~~~~~~~!!!!!!!!!!!!!!!

  const handleOnClickSave = async () => {
    if (selectedTests.length <= 0) {
      return errorMessage("Please select a test to save or proceed")
    }
    let data = {}
    let formData = new FormData()


    data.dtrf_id = props.Token.dtrfToken
    formData.append("dtrf_id", JSON.stringify(data.dtrf_id))

    data.dtrf = props.formDataRedux


    data.dtrf.test_info = {
      selectedTests,
      dateOfCollection: currentDateTime
    }

    formData.append("dtrf", JSON.stringify(data.dtrf))

    props.setFormData(data.dtrf)
    const response = await props.handleOnClickSave(data.dtrf)
    if (response.status == 200) {
      successMessage("Form Saved")
    } else {
      errorMessage("Error in saving Form")
    }
  }


  // !!!!!!!!!!!!!!~~~~~~~~~~~~~~~~~~~~~~~~~~~ FROM ADMIN PANEL CLOSE ~~~~~~~~~~~~~~~~~~~~~~!!!!!!!!!!!!!!!!!

  const handleOnTestInputChange = async (test) => {
    if (props.fromDashBoard) {
      console.log("TESTDETAILS DASHBOARD", props.testDetails)
      if (test.length > 2) {
        const url = process.env.NEXT_PUBLIC_TEST_SEARCH

        // const url = "http://65.1.45.74:8187/v1/test/search"
        const search = {
          search_string: test,
          sub_group: props.testDetails.test_info.sub_group,
          sample_type: props.testDetails.test_info.sampleType,
          container_type: props.testDetails.test_info.container_type[0].value,
          trimester_test: props.testDetails.test_info.trimester_test
        }
        const searchedTestList = await reqWithToken(url, "POST", search)
        console.log("SEARCHED TEST LIST RESPONSE", searchedTestList)
        // const searchedTestList = await axios.post(url, search, config)
        return searchedTestList.data.data.testSearchList
      }

    } else {

      if (test.length > 2) {
        const url = process.env.NEXT_PUBLIC_TEST_SEARCH;
        // const url = "http://65.1.45.74:8187/v1/test/search"

        const search = { search_string: test, practice_type: props.formDataRedux.doctor_info.doctorName.practice_type };
        const searchedTestList = await reqWithToken(url, "POST", search)
        console.log("SEARCHED TEST LIST RESPONSE", searchedTestList)
        // const searchedTestList = await axios.post(url, search, config);
        return searchedTestList.data.data.testSearchList;
      }
    }
  };

  const handleTestChange = (test) => {
    console.log(test);
    setSelectedTest(test);
    if (props.formDataRedux.medical_info && props.formDataRedux.medical_info.sample_info) {
      let data = props.formDataRedux
      data.medical_info.sample_info = null
      props.setFormData(data)

    }
  };

  const handleOnClickPrevious = () => {
    console.log("props", props)
    console.log(props.handleOnClickPrevious)
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
      dateOfCollection: currentDateTime,
    });
    props.nextStep();
  };


  const handleRemoveTest = (test) => {
    if (props.fromDashBoard) {
      props.handleNewSelectedTestsForDashboard(null)
    }

    if (selectedTests.length == 1) {
      setIsSelectedTestsEmpty(true);
      setShowInputRequiredError(true);
      setSelectedTest("")
    }
    selectedTests.splice(test.target.value, 1);
    if (selectedTests.length == 1 && selectedTests[0].trimester_test) {
      console.log("INSIDE REMOVE TEST")

      if (selectedTests[0].trimester_test == "Both") {
        setTrimesterAllowed("")
      } else {
        setHplcExist(false)
      }

    }
    console.log("TEST", test.target.value)
    console.log("after remove", selectedTests)
    setSelectedTests(selectedTests);
    props.getSelectedTestsAction(selectedTests)
    console.log("getSelectionTestAction")
    if (props.formDataRedux.medical_info && props.formDataRedux.medical_info.sample_info) {
      let data = props.formDataRedux
      data.medical_info.sample_info = null
      props.setFormData(data)

    }

    reRender({});
  };
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Prefilled Select Test~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const getPrefilledSelectTests = (data) => {
    console.log(data)
    setSelectedTests(data)
    if (data.length > 0) {

      if (data[0].sub_group == "PNS") {
        if (data.length == 1) {
          if (data[0].trimester_test != "Both") {
            setTrimesterAllowed(data[0].trimester_test)
          } else {
            setHplcExist(true)
            setTrimesterAllowed("")
          }
        } else {
          data.map((test) => {
            if (test.trimester_test == "Both") {
              setHplcExist(true)
            }
            if (test.trimester_test == "First") {
              setTrimesterAllowed(test.trimester_test)
            }
            if (test.trimester_test == "Second") {
              setTrimesterAllowed(test.trimester_test)
            }
          })
        }
      }
    }
    setShowNoTestSelectedErrorMessage(false)
    if (data[0]) {
      setHomeCollectionLocation(data[0].home_collection_possible)
    }
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CLOSE prefilled select TEst CLOSE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const [allowedTrimesterTest, setAllowedTerimesterTest] = useState(null)
  const [hplcExist, setHplcExist] = useState(false)

  const handelTestAddClick = () => {
    if (!selectedTest) {
      return
    }

    if (props.fromDashBoard) {
      if (!selectedTest) {
        return
      }
      if (selectedTests.length >= 1) {
        return props.handleNewSelectedTestsForDashboard(selectedTests);
      }
      selectedTests.push({ ...selectedTest, hasExtra: false });
      setSelectedTests(selectedTests);
      setSelectedTest("")
      return handleTestAdd(selectedTests)

    }

    if (selectedTest._id) {
      const gotTest = selectedTests.find((t) => t._id === selectedTest._id);
      if (gotTest) {

        errorMessage("Test already exists")
        return;
      }
      if (selectedTest.sub_group == "CYTO" || selectedTest.sub_group == "CMA") {
        setShow(true);
      } else if (selectedTest.sub_group == "PNS" || selectedTest.sub_group == "NIPT") {
        if (selectedTest.trimester_test == "Both") {
          let first = false
          let second = false
          const testAllowed = selectedTests.map((test) => {
            if (test.trimester_test == "First") {
              setTrimesterAllowed("First")
              return "First"
            }
            if (test.trimester_test == "Second") {
              setTrimesterAllowed("Second")

              return "Second"
            }
            return false
          })
          if (testAllowed.includes("First")) {
            first = true
          }
          if (testAllowed.includes("Second")) {
            second = true
          }
          if (first) {
            setTrimesterAllowed("First")
          }
          if (second) {
            setTrimesterAllowed("Second")
          }
          if (first && second) {
            return errorMessage("FIRST AND SECOND TRIMESTER EXIST TOGETHER")
          }
          setHplcExist(true)
          return setShow(true)
        }
        if (hplcExist) {
          console.log("INSIDE HPLC EXIST")
          let first = false
          let second = false
          let allowedTest
          const testAllowed = selectedTests.map((test) => {
            if (test.trimester_test == "First") {
              setTrimesterAllowed("First")
              return "First"
            }
            if (test.trimester_test == "Second") {
              setTrimesterAllowed("Second")

              return "Second"
            }
            return false
          })
          if (testAllowed.includes("First")) {
            first = true
            allowedTest = "First"
          }
          if (testAllowed.includes("Second")) {
            second = true
            allowedTest = "Second"
          }
          if (first) {
            setTrimesterAllowed("First")
          }
          if (second) {
            setTrimesterAllowed("Second")
          }
          if (first && second) {
            return errorMessage("FIRST AND SECOND TRIMESTER EXIST TOGETHER")
          }
          console.log("TEST ALLOWED", testAllowed)
          if (allowedTest) {
            if (allowedTest == selectedTest.trimester_test) {
              return setShow(true);

            } else {
              errorMessage("Invalid Test")
            }
          }
          if (!allowedTest) {
            return setShow(true)
          }
        }
        setShow(true)
      } else if (selectedTest.sub_group == "NBS") {
        setShow(true)
      }
      else {
        if (props.formDataRedux.medical_info) {
          const fromValuesRedux = props.formDataRedux
          fromValuesRedux.medical_info.sample_info = null
          // props.setFormData(formValues)
        }


        selectedTests.push({ ...selectedTest, hasExtra: false });
        setSelectedTests(selectedTests);
        props.getSelectedTestsAction(selectedTests)


        setSelectedTest("");
        setShowNoTestSelectedErrorMessage(false)

        reRender({});
      }
    }
  };


  const HandleModalSave = (values) => {
    if (selectedTests.length <= 0) {
      setHomeCollectionLocation(selectedTest.home_collection_possible)
      if (selectedTest.sub_group == "PNS") {
        if (selectedTest.trimester_test != "Both") {

          setTrimesterAllowed(selectedTest.trimester_test)
        }
      }
    } else if (selectedTest.home_collection_possible !== homeCollectionLocation) {
      if (homeCollectionLocation) {
        errorMessage("Only Non-Institute Collection Location is allowed");
      } else {
        errorMessage("Only Institute Collection Location is allowed");
      }
      setShow(false);
      return false;
    }
    else if (selectedTest.sub_group == "PNS") {
      console.log("END CONDITION", trimesterAllowed)
      if (selectedTest.trimester_test != "Both") {
        if (trimesterAllowed) {


          if (selectedTest.trimester_test != trimesterAllowed) {

            setShow(false);
            return errorMessage(`Only ${trimesterAllowed} Trimester test allowed`);
          }
        }
      }

    }


    // if (selectedTest.sub_group == "CYTO" || selectedTest.sub_group == "CMA") {
    //   setSampleType(selectedTest.sample_category)
    // }

    if (selectedTest.sub_group == "PNS" || selectedTest.sub_group == "NIPT" || selectedTest.sub_group == "NBS") {
      console.log(true);
      selectedTests.push({ ...selectedTest, ...values });
    } else if (selectedTest.sub_group == "CYTO" || selectedTest.sub_group == "CMA") {
      selectedTests.push({ ...selectedTest, sampleType: values.sampleType, sampleSubType: values.sampleSubType, hasExtra: true });
      console.log(" || selectedTest || ", selectedTests)
    }
    setSelectedTests(selectedTests);
    props.getSelectedTestsAction(selectedTests)

    setShow(false);
    setShowNoTestSelectedErrorMessage(false)
    if (props.fromDashBoard) {
      handleTestAdd(selectedTests)
    }
    setSelectedTest("");
  };

  const handleDateChange = (e) => {
    setCurrentDateTime(e.target.value);
  };

  const handleSampleTypeChange = (e) => {
    setSampleType(e.target.value);
    setSampleSubType("")
  };

  const handleSampleSubTypeChange = (e) => {
    setSampleSubType(e.target.value)
  }

  const handleTestAdd = (tests) => {
    if (tests.length == 0) {
      setShowNoTestSelectedErrorMessage(true);
      return;
    }
    props.handleNewSelectedTestsForDashboard(tests)
  }


  return (
    <>
      <div className={`${props.fromDashBoard ? "" : "customWrap"}`}>
        <div className="row">
          <div className="col-md-12 col-12">
            <fieldset id="valdatinStep1">
              <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>{selectedTest && selectedTest.test_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Formik
                    initialValues={{ sampleType: "", sampleSubType: "" }}
                    validate={(values) => {
                      const errors = {};

                      // if (selectedTest.sub_group == "CYTO" && !values.sampleType ){
                      //   errors.sampleType = "Required";
                      // }
                      if (selectedTest.sub_group == "CYTO" || selectedTest.sub_group == "CMA") {
                        if (!values.sampleType) {
                          errors.sampleType = "Required";
                        } else if (values.sampleType == "Product of Conception (POC)")
                          if (!values.sampleSubType) {
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
                          errors.sampleType = "Required"
                        }
                      }
                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      HandleModalSave(values);
                    }}
                  >
                    {({ values }) => (
                      <Form>
                        {(selectedTest.sub_group == "CYTO" || selectedTest.sub_group == "CMA") && (
                          <>
                            {
                              <>
                                <div className="form-group mt-4">
                                  <div
                                    role="group"
                                    aria-labelledby="my-radio-group1"
                                  >
                                    {values.sampleType == "Product of Conception (POC)" &&
                                      <label className="mb-2">
                                        <b>Sample has to be given only in kits provided by Lilac</b>
                                      </label>
                                    }
                                    <br></br>
                                    <label className="mb-2">
                                      Sample Type <span className="marked">*</span>
                                    </label>
                                    <br />
                                    {selectedTest.sample_type.map((sample_type, id) => (
                                      <div className="pretty p-default p-round">
                                        <Field
                                          type="radio"
                                          name="sampleType"
                                          value={sample_type}
                                          onClick={handleSampleTypeChange}
                                        />
                                        <div className="state">
                                          <label>{sample_type}</label>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <ErrorMessage
                                    name="sampleType"
                                    component="div"
                                    className="formErr"
                                  />
                                </div>

                                {
                                  values.sampleType == "Product of Conception (POC)" && <div className="form-group mt-4">
                                    <div
                                      role="group"
                                      aria-labelledby="my-radio-group1"
                                    >
                                      <label className="mb-2">
                                        Sub Sample Type <span className="marked">*</span>
                                      </label>
                                      <br />
                                      {selectedTest.sub_sample.map((sample_type, id) => (
                                        <div className="pretty p-default p-round">
                                          <Field
                                            type="radio"
                                            name="sampleSubType"
                                            value={sample_type}
                                            onClick={handleSampleSubTypeChange}
                                          />
                                          <div className="state">
                                            <label>{sample_type}</label>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                    <ErrorMessage
                                      name="sampleSubType"
                                      component="div"
                                      className="formErr"
                                    />
                                  </div>
                                }
                              </>
                            }
                          </>
                        )}
                        {
                          selectedTest.sub_group == "NBS" && <>
                            <div className="form-group mt-4">
                              <div
                                role="group"
                                aria-labelledby="my-radio-group1"
                              >
                                <label className="mb-2">
                                  Sample Type <span className="marked">*</span>
                                </label>
                                <br />
                                {selectedTest.sample_type.map((sampleType, id) => (
                                  <div className="pretty p-default p-round">
                                    <Field
                                      type="radio"
                                      name="sampleType"
                                      value={sampleType}
                                      onClick={handleSampleSubTypeChange}
                                    />
                                    <div className="state">
                                      <label>{sampleType}</label>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <ErrorMessage
                                name="sampleType"
                                component="div"
                                className="formErr"
                              />

                            </div>

                          </>
                        }
                        {(selectedTest.sub_group == "PNS" || selectedTest.sub_group == "NIPT") && (
                          <>
                            <div className="form-group mt-4">
                              <div
                                role="group"
                                aria-labelledby="my-radio-group1"
                              >
                                {selectedTest.sub_group == "PNS" &&
                                  <>
                                    <label className="mb-2">
                                      Test Trimester : <b>{selectedTest.trimester_test}</b>
                                    </label>
                                    <br></br>
                                  </>
                                }
                                <label className="mb-2">
                                  Sample Type <span className="marked">*</span>
                                </label>
                                <br />
                                {selectedTest.sample_type.map((sample_type, id) => (
                                  <div className="pretty p-default p-round">
                                    <Field
                                      type="radio"
                                      name="sampleType"
                                      value={sample_type}
                                      onClick={handleSampleTypeChange}
                                    />
                                    <div className="state">
                                      <label>{sample_type}</label>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <ErrorMessage
                                name="sampleType"
                                component="div"
                                className="formErr"
                              />
                            </div>

                          </>
                        )}

                        <div className="text-right">
                          <Button
                            className="mr-2"
                            variant="secondary"
                            onClick={handleClose}
                          >
                            Cancel
                          </Button>
                          <Button variant="primary" type="submit">
                            Save
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Modal.Body>
                {/* <Modal.Footer>
                  
                </Modal.Footer> */}
              </Modal>
              <div className="row">
                {/* <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label htmlFor="dateTime">
                          Date and Time of collection{" "}
                          <span className="marked">*</span>
                        </label>
                        <input
                          defaultValue={currentDateTime}
                          type="datetime-local"
                          max={currentDateTime}
                          name="dateTime"
                          id="dateTime"
                          className="form-control"
                          onChange={handleDateChange}
                        />
                      </div>
                    {currentDateTime=="" && <div className="formErr">Required</div>}
                </div> */}
              </div>
              <div className="row">
                <div className="col-md-12 col-12">
                  <div className="section-title mt-0">Select Test:</div>
                </div>
                <div className="col-md-6 col-12">
                  <AsyncSelect
                    isClearable
                    cacheOptions
                    defaultOptions
                    value={selectedTest}
                    getOptionLabel={(e) => e.test_name}
                    getOptionValue={(e) => e._id}
                    loadOptions={handleOnTestInputChange}
                    onChange={handleTestChange}
                    // placeholder="Enter Test name"
                    noOptionsMessage={() => 'Enter Test name'}
                  />
                  {showNoTestSelectedErrorMessage && (
                    <div className="formErr">Required</div>
                  )}
                </div>
                <div className="col-md-6 col-12text-left">
                  <button type="button" onClick={handelTestAddClick} className="btn btn-primary mt-1">
                    Add Test
                  </button>
                </div>
              </div>

              {/* <div className="row">
                <div className="col-md-6 col-12">
                  {doctorCategory == "molecular_genetics" && (
                    <div className="form-group">
                      <div className="section-title mt-0">
                        Molecular Genetics
                      </div>
                      <Select
                        options={molecularGeneticsTestsList}
                        onChange={handleOnTestChange}
                        name="test"
                      />
                      {isSelectedTestsEmpty && showInputRequiredError && (
                        <div className="formErr">Required</div>
                      )}
                    </div>
                  )}
                </div>
              </div> */}
              <div className="mt-4">
                {selectedTests &&
                  selectedTests.length > 0 &&
                  selectedTests.map((test, id) => (
                    <div className="card p-3">
                      <div className="row">
                        <div className="col-md-8 col-8">
                          <div className="section-title mt-0">
                            {test.test_name}
                          </div>
                        </div>
                        <div className="col-md-4 col-4 text-right">
                          <div className="custom-control custom-checkbox">
                            <button
                              value={id}
                              onClick={handleRemoveTest}
                              type="submit"
                              className="btn btn-xs btn-danger"
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      {test.description &&
                        <>
                          <div className="row">
                            <div className="col-md-8 col-8 mb-1">
                              <div className="section-title mt-0 mb-0">
                                Description
                              </div>
                              {test.description}
                            </div>
                          </div>

                        </>
                      }
                      <div role="group" aria-labelledby="checkbox-group">

                        {(test.sub_group == "NIPT" || test.sub_group == "PNS" || test.sub_group == "NBS") && (
                          <div className="row">
                            <div className="col-lg-12 col-12">
                              <div className="form-group mb-0">
                                <label><b>Sample Type:</b> {test.sampleType}</label>
                              </div>
                            </div>
                            {/* <div className="col-lg-8 col-12 test-left">
                              <div className="custom-control custom-checkbox">
                                <label>
                                Gestational Age : {round((test.gestationalAgeWeeks+(test.gestationalAgeDays/7)), 1)}
                                </label>
                              </div>
                            </div> */}

                            {/* <div className="col-lg-8 col-12 test-left">
                              <div className="custom-control custom-checkbox">
                                <label>
                                  Present pregnancy :{" "}
                                  {test.presentPregnancy}
                                </label>
                              </div>
                            </div> */}
                          </div>
                        )}
                        {test.hasExtra && (test.sub_group == "CYTO" || test.sub_group == "CMA") && (
                          <div className="row">
                            {/* <div className="col-lg-8 col-12">
                              <div className="form-group mb-0">
                                <label><b>Type:</b> {test.sample_category}</label>
                              </div>
                            </div> */}

                            <div className="col-lg-8 col-12 test-left">
                              <div className="form-group mb-0">
                                <label><b>Sample type :</b> {test.sampleType}</label>
                              </div>
                            </div>

                            {
                              test.sampleType == "Product of Conception (POC)" &&
                              <div className="col-lg-8 col-12 test-left">
                                <div className="form-group mb-0">
                                  <label><b>Sub Sample type :</b> {test.sampleSubType}</label>
                                </div>
                              </div>
                            }

                            {/* <div className="col-lg-8 col-12 test-left">
                              <div className="custom-control custom-checkbox">
                                <label>
                                  Gestational Age : {round((test.gestationalAgeWeeks+(test.gestationalAgeDays/7)), 1)}
                                </label>
                              </div>
                            </div> */}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
              {
                props.fromDashBoard ?
                  ""
                  :
                  <div className="row" id="action1">
                    <div className="col-md-12 col-12 text-right">
                      <div style={{ padding: "5px 20px" }}>
                        <button
                          onClick={handleOnClickPrevious}
                          className="btn btn-primary mr-2"
                        >
                          Previous
                        </button>
                        {props.fromSuperDtrf && <>
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
                        </>
                        }
                        <button
                          onClick={handleOnClickNext}
                          type="submit"
                          className="btn btn-primary"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>

              }
            </fieldset>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  formDataRedux: state.formData.formData,
  Token: state.Token

})

export default connect(mapStateToProps, { getSelectedTestsAction, setFormData })(TestDetails);
