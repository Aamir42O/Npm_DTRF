import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik";


const DateFieldComponent = (props) => {

    return (

        <div className={props.className ? props.className : "col-md-6 col-12"}>
            <div className="form-group">
                <label>
                    {
                        props.title
                    }
                    {
                        props.mandatory &&
                        <span className="marked">*</span>
                    }
                </label>
                <Field
                    type="date"
                    name={props.name}
                    className="form-control"
                    min={props.min}
                    max={props.max}
                    disabled={props.disabled}
                />
                <ErrorMessage
                    name={props.name}
                    component="div"
                    className="formErr"
                />
            </div>
        </div>
    )
}

export default DateFieldComponent