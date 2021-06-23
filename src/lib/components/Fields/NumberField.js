import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik";


const NumberField = (props) => {



    return (

        <div className={props.className ? props.className : "col-md-6 col-12"}>
            <div className="form-group">
                <label>
                    {
                        props.title
                    }
                    {
                        props.mandatory && <span className="marked">*</span>
                    }
                </label>
                <Field
                    type="number"
                    name={props.name}
                    onKeyDown={(e) => ["e", "`", "#", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                    placeholder={props.placeholder}
                    className="form-control"
                    disabled={props.disabled}
                    min={props.min}
                    max={props.max}
                    step={props.step}

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

export default NumberField