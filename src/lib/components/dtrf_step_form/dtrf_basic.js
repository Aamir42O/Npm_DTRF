import React,{ useState, useEffect } from "react";

import moment from "moment";
const input = React.createRef();
const DtrfType = (props) => {
  const currentDateTime = moment().format("YYYY-MM-DDThh:mm");

  const [name, setName] = useState({});

  useEffect(() => {

  }, []);

  const handleOnClickNext = (values) => {
    // values.preventDefault();

    // console.log("*********** ", values.target.value, name);
    props.handleOnClickNext("dtrf_basic", values);
    props.nextStep()
  };

  const handleNameChange = (e) => {
    name[e.target.name] = e.target.value;
    setName(name);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12 col-12">
          <Formik
            initialValues={{
              type: "2",
              dateTime: currentDateTime,
              bioScreening: "0",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.type) {
                errors.type = "Required";
              } else if (!values.dateTime) {
                errors.dateTime = "Required";
              } else if (!values.bioScreening) {
                errors.bioScreening = "Required";
              }
              return errors;
            }}
            onSubmit={(values) => {
              handleOnClickNext(values);
            }}
          >
            {({ values }) => (
              <Form>
                {
                  /*
                   For Loading: Display block after hit APIs and display none after get response
                  */
                }

                <div className="row pt-5 pb-5" style={{ display: "block;" }}>
                  <div className="col-sm-12 text-center pt-5 pb-5">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                </div>



                <fieldset id="valdatinStep1">

                  <div className="row clearfix">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label className="mb-2">
                          Select Type of DTRF <span className="marked">*</span>
                        </label>
                        <br />
                        <div className="pretty p-default p-round">
                          <Field type="radio" name="type" value="1" />
                          <div className="state">
                            <label>Prenatal</label>
                          </div>
                        </div>
                        <div className="pretty p-default p-round">
                          <Field type="radio" name="type" value="2" />
                          <div className="state">
                            <label>Cytogenetic</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <ErrorMessage
                      name="type"
                      component="div"
                      className="formErr"
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label htmlFor="dateTime">
                          Date and Time of collection{" "}
                          <span className="marked">*</span>
                        </label>
                        <Field
                          type="datetime-local"
                          max={currentDateTime}
                          name="dateTime"
                          id="dateTime"
                          className="form-control"
                        />
                        <label
                          id="timeCollectionErr"
                          className="formErr"
                        ></label>
                        <ErrorMessage
                          name="dateTime"
                          component="div"
                          className="formErr"
                        />
                      </div>
                    </div>

                    <div role="group" className="col-md-6 col-12 mb-4">
                      <div className="form-group">
                        <label>
                          If Biochemistry Screening was done at Lilac Insights{" "}
                          <span className="marked">*</span>
                        </label>
                        <div className="mt-2">
                          <div className="pretty p-default p-round">
                            <Field
                              type="radio"
                              name="bioScreening"
                              className="custom-control-input"
                              value="1"
                            />
                            <div className="state">
                              <label className="custom-control-label">
                                Yes
                              </label>
                            </div>
                          </div>
                          <div className="pretty p-default p-round">
                            <Field
                              type="radio"
                              name="bioScreening"
                              className="custom-control-input"
                              value="0"
                            />
                            <div className="state">
                              <label className="custom-control-label">
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                        <ErrorMessage
                          name="type"
                          component="div"
                          className="formErr"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row" id="action1">
                    <div className="col-md-12 col-12 text-right">
                      <div className="formButttonCenter">
                        <button type="submit" className="btn btn-primary">
                          Next
                        </button>
                      </div>
                    </div>
                  </div>

                </fieldset>
              </Form>
            )}
          </Formik>

          {/* <form onSubmit={handleOnClickNext}>
              <label htmlFor="fname">First name:</label>
              <br />
              <input
                className="abc"
                type="text"
                id="fname"
                name="fname"
                ref={input}
                onChange={handleNameChange}
              />
              <br />
              <label htmlFor="lname">Last name:</label>
              <br />
              <input
                className="abc"
                type="text"
                id="lname"
                name="lname"
                ref={input}
                onChange={handleNameChange}
              />
              <br />
              <br />
              <input type="submit" value="Submit" />
            </form> */}
        </div>
      </div>
    </>
  );
};

export default DtrfType;
