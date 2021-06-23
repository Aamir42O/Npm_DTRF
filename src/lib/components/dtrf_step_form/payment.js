import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { message } from "antd";
import { setFormData } from "../../actions/formData";
import { successMessage, MousePopover, errorMessage, warningMessage, infoMessage } from "../../helper/commonHelper";
import Router from "next/router";



const Payment = (props) => {
  const [testList, setTestList] = useState([]);
  const [paysTo, setPaysTo] = useState("");
  const [totalMrp, setTotalMrp] = useState(0);
  const [mrpList, setMrpList] = useState([])
  const [paymentMode, setPaymentMode] = useState("Cash")
  const [confirmationBy, setConfirmationBy] = useState("")
  const [, reRender] = useState();
  const [mrpError, setMrpError] = useState(false)
  useEffect(() => {
    console.log("IN use effect", props)
    if (testList.length == 0) {
      getTestList();
    }
    if (props.formDataRedux.payment) {
      setPaysTo(props.formDataRedux.payment.paysTo)
    }
  });

  const getTestList = () => {
    console.log("Inside GetTEstLIst")
    const list = props.formDataRedux;
    if (list) {
      if (list.test_info) {
        console.log("list info", list.test_info)
        setTestList(list.test_info.selectedTests);
        let total = 0;
        let mrpList = []
        if (!props.formDataRedux.payment) {

          list.test_info.selectedTests.map((test) => {
            mrpList.push({ mrp: test.mrp })
            total += test.mrp
            return total;
          });
        } else {
          props.formDataRedux.payment.price_entered.map((test) => {
            mrpList.push({ mrp: test.mrp })
            total += test.mrp
            return total;
          })
        }
        console.log(mrpList);


        setMrpList(mrpList);
        setTotalMrp(total);

      }
    }
  };


  const setTotalPrice = (mrpList) => {
    let total = 0;
    mrpList.map((mrp) => {
      total += mrp.mrp
    })
    console.log(total);
    setTotalMrp(total);
    reRender({});

  }

  const handleOnClickPrevious = () => {
    props.handleOnClickPrevious();
    if (props.formValues.collectionLocation.location == "Home") {
      props.goToStep(3);
    } else {
      props.previousStep();
    }


  };
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ADMIN PANEL CODE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const handleOnClickSave = async (values) => {
    let data = {}
    data.dtrf_id = props.Token.dtrfToken
    data.dtrf = props.formDataRedux
    if (props.formDataRedux.collectionLocation.location == "Home") {
      data.dtrf.payment = { paidToInstitute: values.paidToInstitute, price_entered: mrpList }
    }
    if (values.paysTo == "Lab") {
      data.dtrf.payment = {
        paysTo: values.paysTo,
        paymentMode: values.paymentMode,
        price_entered: mrpList,
        confirmationBy: values.confirmationBy
      }
    } else {
      data.dtrf.payment = {
        paysTo: values.paysTo,
        price_entered: mrpList,
        confirmationBy: values.confirmationBy
      }
    }
    const response = await props.handleOnClickSave({ ...props.formDataRedux, payment: data.dtrf.payment })
    if (response) {
      if (response.status == 200) {
        successMessage("Form saved")
      } else {
        return errorMessage("Error in saving form, please try again")
      }
    }
  }

  const handleOnClickSaveAndExit = async (values) => {
    await handleOnClickSave(values);
    Router.push("/super-dtrf")
  }


  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ADMIN PANEL CoDe clOSE ~~~~~~~~~~~~~~~~~~~~

  const handleOnClickNext = (values) => {
    if (mrpError) {
      return
    }

    if (props.formValues.collectionLocation.location == "Home") {
      console.log("home location");
      props.handleOnClickNext("payment", { paidToInstitute: values.paidToInstitute, price_entered: mrpList });

      return props.nextStep()
    }
    if (values.paysTo == "Lab") {
      console.log("Lab selected")
      props.handleOnClickNext("payment", { paysTo: values.paysTo, paymentMode: values.paymentMode, price_entered: mrpList, confirmationBy: values.confirmationBy });
      props.nextStep()
    }
    else {
      console.log("Institute Selected")
      props.handleOnClickNext("payment", { paysTo: values.paysTo, price_entered: mrpList, confirmationBy: values.confirmationBy });
      props.nextStep()
    }
  };

  const handleOnClickPaysTo = (e) => {
    console.log("pays to ", e.target.value)
    setPaysTo(e.target.value);
  };

  const handleOnClickPaymentMode = (e) => {
    setPaymentMode(e.target.value)
    console.log(e.target.value)
  }

  const handleMrpValidation = (e) => {
    console.log(e.target.value);

    let isnum = /^\d+$/.test(e.target.value);
    if (!isnum) {
      mrpList[e.target.name].mrp = testList[e.target.name].transfer_rate
      setMrpList(mrpList)
      setTotalPrice(mrpList)
    } else {
      setMrpError(false)
    }
    console.log(isnum, "INSUM REG")
    if (isnum) {

      if (testList[e.target.name].transfer_rate <= e.target.value && e.target.value <= testList[e.target.name].mrp) {
        mrpList[e.target.name].mrp = parseInt(e.target.value)
        setMrpList(mrpList)
        setTotalPrice(mrpList)
        reRender({});
      } else {
        if (testList[e.target.name].transfer_rate > e.target.value) {
          mrpList[e.target.name].mrp = testList[e.target.name].transfer_rate
        } else if (e.target.value > testList[e.target.name].mrp) {
          mrpList[e.target.name].mrp = testList[e.target.name].mrp
        }
        setMrpList(mrpList)
        setTotalPrice(mrpList)
        reRender({});
      }
    }
  }

  const handleMrpChange = (e) => {
    console.log(e.target.value, "ISNUM");

    if (testList[e.target.name].transfer_rate <= e.target.value && e.target.value <= testList[e.target.name].mrp) {
      setMrpError(false)
    } else {
      setMrpError(true)
    }
    let isnum = /^\d+$/.test(e.target.value);

    if (isnum || e.target.value == "") {
      mrpList[e.target.name].mrp = e.target.value
      console.log("MRP CHANGING", mrpList)
      setMrpList(mrpList)
      reRender({});
    }

  }

  // const handleConfirmationByChange = (e) => {
  //   console.log();
  //   setConfirmationBy(e.target.value)
  // }

  return (
    <>
      <div className="customWrap">
        <div className="row">
          <div className="col-md-12 col-12">
            <fieldset id="valdatinStep1">
              <Formik
                initialValues={{
                  paysTo: props.payment != 1 ? props.payment.paysTo : "",
                  confirmationBy: props.payment != 1 ? props.payment.confirmationBy : "",
                  paymentMode: props.payment != 1 ? props.payment.paymentMode : ""
                }}
                validate={(values) => {

                  const errors = {};
                  if (props.fromSuperDtrf) {

                  }

                  if (props.fromDtrfFront) {
                    if (props.formValues.collectionLocation.location != "Home" && (!values.paysTo)) {
                      errors.paysTo = "Required";
                    }
                    if (props.formValues.collectionLocation.location != "Home" && (!values.confirmationBy)) {
                      errors.confirmationBy = "Required";
                    }
                    if (props.formValues.collectionLocation.location == "Home" && (!values.paidToInstitute)) {
                      errors.paidToInstitute = "Required";
                    }
                    if (props.formValues.collectionLocation.location != "Home" && values.paysTo == "Lab" && (!values.paymentMode)) {

                      errors.paymentMode = "Required";
                    }
                    console.log(errors)
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  console.log("Values", values)
                  handleOnClickNext(values);
                }}
              >
                {({ values }) => (
                  <Form>
                    <>
                      {props.formValues.collectionLocation && props.formValues.collectionLocation.location != "Home" &&

                        <div className="form-group">
                          {
                            props.fromSuperDtrf && <>
                              <div className="col-md-12 col-12 text-right">
                                <div style={{ padding: "10px 0px" }}>
                                  {!props.Token.isComplete &&

                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleOnClickSaveAndExit(values)
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
                          <div role="group" aria-labelledby="my-radio-group1">
                            <div className="section-title mb-4 mt-0">
                              Pay To <span className="marked">*</span>
                            </div>
                            <div className="pretty p-default p-round">
                              <Field
                                type="radio"

                                name="paysTo"
                                value="Institute"
                              // onClick={handleOnClickPaysTo}
                              />
                              <div className="state">
                                <label>INSTITUTE</label>
                              </div>
                            </div>
                            <div className="pretty p-default p-round">
                              <Field
                                type="radio"
                                name="paysTo"
                                value="Lab"
                              // onClick={handleOnClickPaysTo}
                              />
                              <div className="state">
                                <label>LAB</label>
                              </div>
                            </div>
                          </div>
                          <ErrorMessage
                            id="paysTo"
                            name="paysTo"
                            component="div"
                            className="formErr"
                          />
                        </div>
                      }
                      <div className="card p-3" style={{ 'boxShadow': 'none' }}>
                        <div className="row">
                          <div className="col-6">
                            <div className="form-group mb-0">
                              <label><b>Selected Tests</b></label>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-group mb-0">
                              <label><b>Price</b></label>
                            </div>
                          </div>
                        </div>
                        <hr className="mb-2 mt-0"></hr>
                        {testList.map((test, id) => (
                          <>
                            <div className="row mb-1">
                              <div className="col-6">
                                <div className="form-group mb-0">
                                  <label>{test.test_name}</label>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="form-group mb-0">
                                  <input
                                    type="text"
                                    name={id}
                                    className="form-control"
                                    value={mrpList[id].mrp}
                                    onBlur={handleMrpValidation}
                                    onChange={handleMrpChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </>
                        ))}
                        <hr className="mb-1 mt-1"></hr>
                        <div className="row">
                          <div className="col-6">
                            <div className="section-title mb-0 mt-0">
                              <label><b>Total</b></label>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="section-title mb-0 mt-0">
                              <label><i className="fas fa-rupee-sign" style={{ 'fontSize': '16px' }}></i> <b>{totalMrp}</b></label>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ IF Selected Lab ask for Payment mode~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  */}
                      {
                        values.paysTo == 'Lab' &&
                        <div className="form-group mt-2">
                          <div role="group" aria-labelledby="my-radio-group1">
                            <label className="mb-3">Payment Type</label>
                            <br />
                            <div className="pretty p-default p-round">
                              <Field
                                type="radio"
                                name="paymentMode"
                                value="Cash"
                              // onClick={e => handleOnClickPaymentMode(e)}

                              />
                              <div className="state">
                                <label>Cash</label>
                              </div>
                            </div>
                            <div className="pretty p-default p-round">
                              <Field
                                type="radio"
                                name="paymentMode"
                                value="Digital"
                              // onClick={e => handleOnClickPaymentMode(e)}

                              />
                              <div className="state">
                                <label>Digital</label>
                              </div>
                            </div>
                            <ErrorMessage
                              name="paymentMode"
                              component="div"
                              className="formErr"
                            />
                          </div>
                        </div>
                      }
                      {/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Close~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                      {props.formValues.collectionLocation && props.formValues.collectionLocation.location != "Home" &&
                        <div className="form-group mt-2">

                          <label className="mb-3">Confirmation by: </label>
                          <br />

                          <div className="pretty p-default p-round">
                            <Field
                              type="radio"
                              name="confirmationBy"
                              value="Staff"
                            // checked={confirmationBy == "Staff"}
                            // onChange={handleConfirmationByChange}
                            />
                            <div className="state">
                              <label>Staff</label>
                            </div>
                          </div>

                          <div className="pretty p-default p-round">
                            <Field

                              type="radio"
                              name="confirmationBy"
                              value="Patient"
                            // checked={confirmationBy == "Patient"}
                            // onChange={handleConfirmationByChange}
                            />
                            <div className="state">
                              <label>Patient</label>
                            </div>
                          </div>
                          <ErrorMessage
                            name="confirmationBy"
                            component="div"
                            className="formErr"
                          />
                        </div>
                      }

                      {props.formValues.collectionLocation && props.formValues.collectionLocation.location == "Home" &&
                        <div className="form-group mt-2">
                          <label className="mb-3">Paid to Institute: </label>
                          <br />
                          <div className="pretty p-default p-round">
                            <Field
                              type="radio"
                              name="paidToInstitute"
                              value="Yes"
                            // checked={confirmationBy == "Staff"}
                            // onChange={handleConfirmationByChange}
                            />
                            <div className="state">
                              <label>Yes</label>
                            </div>
                          </div>

                          <div className="pretty p-default p-round">
                            <Field
                              type="radio"
                              name="paidToInstitute"
                              value="No"
                            // checked={confirmationBy == "Patient"}
                            // onChange={handleConfirmationByChange}
                            />
                            <div className="state">
                              <label>No</label>
                            </div>
                          </div>
                          <ErrorMessage
                            name="paidToInstitute"
                            component="div"
                            className="formErr"
                          />
                        </div>
                      }

                      <div className="row" id="action1">
                        {props.fromSuperDtrf &&

                          <div className="col-md-2 col-2 text-left">
                            <div style={{ padding: "5px 20px" }}>
                              <button
                                onClick={e => Router.push("/super-dtrf")}
                                className="btn btn-primary"
                              >
                                Exit
                              </button>
                            </div>
                          </div>
                        }
                        <div className="col-md-10 col-10 text-right ">
                          <div style={{ padding: "5px 20px" }}>
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
                            <button type="submit" className="btn btn-primary">
                              Next
                            </button>
                          </div>
                        </div>
                      </div>

                    </>
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
  formDataRedux: state.formData.formData ? state.formData.formData : null,
  fileUpload: state.fileUpload,
  payment: state.formData.formData.payment ? state.formData.formData.payment : 1,
  Token: state.Token

})

export default connect(mapStateToProps, { setFormData })(Payment);
