import { Form, Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import AsyncSelect from "react-select/async";
import reqWithToken from '../../helper/Auth';
import { connect } from "react-redux";
import { message, Tag, Spin } from "antd";
import { setFormData } from '../../actions/formData';
import withAuth from '../authHOC';




export const Institute = (props) => {
    console.log(props, "PROPS")

    const [instituteName, setInstituteName] = useState("")
    const [showInstituteError, setShowInstituteError] = useState(false)
    const handleInstituteLoadOption = async (institute) => {
        if (institute.length > 2) {
            console.log("INSIDE", process.env.NEXT_PUBLIC_ALL_DOCTORS)
            // let url = `${process.env.NEXT_PUBLIC_ALL_DOCTORS}?searchquery=${institute}`
            let url = `http://65.1.45.74:8187/v1/institute/search?searchquery=${institute}`
            console.log("INSIDE condition", url)
            const resp = await reqWithToken(url, "GET")
            console.log(resp)
            return resp.data.data.instituteSearchList

        }
    }

    const formikRef = useRef()
    // const handleOnClickSave = async () => {
    //     var formData = new FormData()
    //     let data = {}
    //     data.dtrf_id = props.Token.dtrfToken
    //     formData.append("dtrf_id", JSON.stringify(data.dtrf_id))
    //     data.dtrf = props.formDataRedux
    //     data.dtrf.institute_info = { instituteName: instituteName }
    //     formData.append("dtrf", JSON.stringify(data.dtrf))

    //     // const url = "http://65.1.45.74:8187/v1/dtrf/save-dtrf"
    //     const url = process.env.NEXT_PUBLIC_SAVE_INCOMPLETE_DTRF
    //     const response = await reqWithToken(url, "POST", formData)
    //     console.log("INCOMEPLETE FORMDATA SEND", response)
    //     props.setFormData({ ...props.formDataRedux, institute_info: instituteName })
    //     if (response.status == 200) {
    //         successMessage("Form saved")
    //     } else {
    //         return errorMessage("Error in saving form, please try again")
    //     }
    // }
    const handleInstituteChange = (e) => {
        if (e == null) {
            console.log(e);
            setInstituteName(null)
        }
        if (e) {

            setShowInstituteError(false)
            setInstituteName(e)
            if (props.formDataRedux.institute_info) {
                let newFormData = JSON.parse(JSON.stringify(props.formDataRedux))
                delete newFormData.doctor_info
                delete newFormData.test_info
                delete newFormData.medical_info
                props.setFormData(newFormData)
            }
        } else {
        }
    }

    const handleOnClickNext = () => {
        if (!instituteName) {
            return setShowInstituteError(true)
        }
        props.handleOnClickNext("institute_info", { instituteName });
        props.nextStep()
    }


    useEffect(() => {
        if (props.formDataRedux.institute_info) {
            setInstituteName(props.formDataRedux.institute_info.instituteName)
        }
    }, [])

    return (
        <>
            <div className="customWrap">
                <div className="row">
                    <div className="col-md-12 col-12">
                        <fieldset id="valdatinStep1">
                            <Formik
                                enableReinitialize
                                innerRef={formikRef}
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
                                                Institute: <span className="marked">*</span>
                                            </label>
                                            <AsyncSelect
                                                isClearable
                                                cacheOptions
                                                defaultOptions
                                                value={instituteName}
                                                getOptionLabel={(e) => e.name}
                                                getOptionValue={(e) => e._id}
                                                loadOptions={handleInstituteLoadOption}
                                                onChange={handleInstituteChange}
                                                // placeholder="Enter Test name"
                                                noOptionsMessage={() => 'Enter Institute name'}
                                            />
                                            {
                                                showInstituteError && <div className="formErr">
                                                    Required
                                                </div>
                                            }

                                        </div>

                                    </Form>
                                )}
                            </Formik>
                            <div className="row" id="action1">
                                <div className="col-md-12 col-12 text-right">
                                    <div style={{ padding: "5px 20px" }}>
                                        {/* <button

                                            type="button"
                                            onClick={() =>
                                                handleOnClickSave()
                                            }
                                            className="btn btn-primary mr-1"
                                        >
                                            Save
                                        </button> */}
                                        <button
                                            type="submit"
                                            onClick={() =>
                                                handleOnClickNext()
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
        </>
    )
}

const mapStateToProps = state => ({
    formDataRedux: { ...state.formData.formData },
    Token: state.Token
})


export default connect(mapStateToProps, { setFormData })(Institute)