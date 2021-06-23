import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik";

const RadioField = (props) => {






    return (

        <div className="col-md-6 col-12">

            <div className="form-group">
                <label className="mb-3">
                    {props.title}
                    {props.mandatory &&
                        <span className="marked">*</span>
                    }

                </label>
                <br />
                {
                    props.options.map((option, index) => {
                        return (

                            <div className="pretty p-default p-round">
                                <Field
                                    type="radio"
                                    name={props.name}
                                    value={option.value}
                                    disabled={props.disabled}

                                />
                                <div className="state">
                                    <label>{option.label}</label>
                                </div>
                            </div>
                        )
                    })
                }
                <ErrorMessage
                    name={props.name}
                    component="div"
                    className="formErr"
                />
            </div>
        </div>
    )
}

export default RadioField