import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { message, Tag, Spin, Popover, Button } from "antd";
import HelpIcon from '@material-ui/icons/Help';
import { setFormData } from "../../actions/formData";
import { errorMessage, successMessage, MousePopover } from "../../helper/commonHelper";


const ChooseCollectionLocation = (props) => {
  const [testList, setTestList] = useState([]);
  const [location, setLocation] = useState('');
  const [homeCollectionLocation, setHomeCollectionLocation] = useState()
  const [instituteChecked, setInstituteChecked] = useState(false)
  const [homeChecked, setHomeChecked] = useState(false)
  const [, reRender] = useState()
  const childRef = useRef();

  useEffect(() => {
    console.log(props)
    if (testList.length == 0) {
      getTestList();
    }
    // if (props.formDataRedux.collectionLocation) {
    //   getPrefilledCollectionLocation(props.formDataRedux.collectionLocation.location)
    // }
  });

  // !!!!!!!!!!!!!!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ADMIN PANEL CODE ~~~~~~~~~~~~~~~~~~~~!!!!!!!!!!!!!!!!!!!

  const handleOnClickSave = async (values) => {
    let formData = new FormData()

    let data = {}
    data.dtrf_id = props.Token.dtrfToken
    data.dtrf = props.formDataRedux
    data.dtrf.collectionLocation = values
    formData.append("dtrf_id", JSON.stringify(data.dtrf_id))
    formData.append("dtrf", JSON.stringify(data.dtrf))
    console.log("INCOMEPLETE FORMDATA SEND", response)
    const response = await props.handleOnClickSave({ ...props.formDataRedux, collectionLocation: values })
    props.setFormData({ ...props.formDataRedux, collectionLocation: values })

    if (response) {

      if (response.status == 200) {
        successMessage("Form saved")
      } else {
        errorMessage("Error in Saving Form")
      }
    } else {
      errorMessage("Error in Saving Form")
    }
  }
  // !!!!!!!!!!!!!!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ADMIN PANEL CODE CLOSE ~~~~~~~~~~~~~~~!!!!!!!!!!!!!!!!!!!

  const getTestList = () => {
    const list = props.formDataRedux;
    if (list) {
      if (list.test_info) {
        setTestList(list.test_info.selectedTests);
        if (list.test_info.selectedTests.length > 0) {
          setHomeCollectionLocation(list.test_info.selectedTests[0].home_collection_possible);
        }
      }
    }
  };

  const handleOnClickPrevious = () => {
    props.handleOnClickPrevious();
    props.previousStep();
  };

  const handleOnClickNext = (values) => {
    props.handleOnClickNext("collectionLocation", { ...values });
    props.nextStep()
  };

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Get PRefilled DAta~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // const getPrefilledCollectionLocation = (data) => {
  //   console.log(data, "location")
  //   setLocation(data)
  //   if (data == "Institute") {
  //     setHomeChecked(false)
  //     setInstituteChecked(true)
  //   }
  //   if (data == "Home") {
  //     setInstituteChecked(false)
  //     setHomeChecked(true)
  //   }
  // }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CLOSE GET PREFILLED DATA~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const handleLocationChange = (e) => {
    console.log(e.target.value);
    // getPrefilledCollectionLocation(e.target.value)
    setLocation(e.target.value);

    // if (e.target.value == "Institute") {
    //   setHomeChecked(false)
    //   setInstituteChecked(true)
    // }
    // if (e.target.value == "Home") {
    //   setInstituteChecked(false)
    //   setHomeChecked(true)
    // }
    reRender({})

  };

  return (
    <>
      <div className="customWrap">
        <div className="row">
          <div className="col-md-12 col-12">
            <fieldset id="valdatinStep1">
              <Formik
                initialValues={{ location: props.formDataRedux.collectionLocation ? props.formDataRedux.collectionLocation.location : "" }}
                validate={(values) => {
                  const errors = {};
                  if (props.fromSuperDtrf) {

                  } else {

                    if (!values.location) {
                      errors.location = "Required";
                    }
                    if (values.location == "Other" && !values.otherLocation) {
                      errors.otherLocation = "Required";
                    }
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  handleOnClickNext(values);
                }}
              >
                {({ values }) => (
                  <Form>
                    <>
                      <div className="form-group">
                        <div
                          role="group"
                          aria-labelledby="my-radio-group1"
                        >
                          {/* <MousePopover popoverText="test" /> */}

                          <label className="mb-2">
                            Location <span className="marked">*</span>
                            <MousePopover content={(<div>
                              <h6>Institute</h6>
                              <p>Sample collection will be taken at Institute Location</p>
                              <h6>Non-Institute</h6>
                              <p>Sample collection will be taken at Non-Institute Location</p>
                            </div>)} />
                          </label>
                          <br />
                          <div className="pretty p-default p-round" >
                            <Field
                              type="radio"
                              name="location"
                              value="Institute"
                              // checked={instituteChecked}
                              onClick={handleLocationChange}
                            />
                            <div className="state">
                              <label>Institute

                              </label>
                            </div>

                          </div>
                          {homeCollectionLocation &&
                            <div className="pretty p-default p-round">
                              <Field
                                type="radio"
                                name="location"
                                value="Home"
                                // checked={homeChecked}
                                onClick={handleLocationChange}
                              />
                              <div className="state">
                                <label>Non-Institute</label>
                              </div>
                            </div>
                          }
                          {/* <div className="pretty p-default p-round">
                                  <Field
                                    type="radio"
                                    name="location"
                                    value="Other"
                                    onClick={handleLocationChange}
                                  />
                                  <div className="state">
                                    <label>OTHER</label>
                                  </div>
                                </div> */}
                        </div>
                        <ErrorMessage
                          name="location"
                          component="div"
                          className="formErr"
                        />
                      </div>
                      {/* {location == "Other" &&
                        <>
                          <div className="form-group">
                            <label>
                              Other Location{" "}
                              <span className="marked">*</span>
                            </label>
                            <Field
                              type="text"
                              name="otherLocation"
                              placeholder="Enter the Other location Address"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="otherLocation"
                              component="div"
                              className="formErr"
                            />
                          </div>
                        </>
                      } */}
                    </>
                    <div className="row" id="action1">
                      <div className="col-md-12 col-12 text-right mr-1">
                        <div style={{ padding: "5px 20px" }}>
                          <button
                            onClick={handleOnClickPrevious}
                            type="button"
                            className="btn btn-primary mr-2"
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
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
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

export default connect(mapStateToProps, { setFormData })(ChooseCollectionLocation);
