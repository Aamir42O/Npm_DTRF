import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik";


const TextField = (props) => {
    return (

        <div className={props.className ? props.className : "col-md-6 col-12"}>

            <div className="form-group">
                <label>
                    {props.title}
                    {
                        props.mandatory &&
                        <span className="marked">*</span>
                    }
                </label>
                {
                    props.defaultValue ?
                        <Field
                            type={props.component ? props.component : "text"}
                            name={props.name}
                            placeholder={props.placeholder}
                            className="form-control"
                            disabled={props.isDisabled}
                            component={props.component}
                            value={props.defaultValue}
                        />
                        :
                        <Field
                            type={props.component ? props.component : "text"}
                            name={props.name}
                            placeholder={props.placeholder}
                            className="form-control"
                            disabled={props.isDisabled}
                            component={props.component}
                        />

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

export default TextField