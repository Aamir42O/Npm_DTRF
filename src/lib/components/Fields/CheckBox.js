import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextField from "./TextField";


const CheckBox = (props) => {
    console.log(props.values.referralReason)
    return (<>
        <>
            <div className="row">

                <div id="checkbox-group">{props.title}</div>
            </div>

            <div role="group" aria-labelledby="checkbox-group">
                {
                    props.options.map((option) => <div className="row">
                        <div className="col-sm">
                            <label style={{ paddingTop: "30px" }}>
                                <Field type="checkbox" name={props.name} value={option.value} />
                                {option.label}
                            </label>

                        </div>
                        {
                            console.log(props.values[props.name].includes(option.value))
                        }
                        {
                            props.values[props.name].includes(option.value) &&

                            <TextField
                                title=""
                                name={option.value}
                                placeHolder={"Enter " + option.label}

                            />

                        }

                    </div>)
                }

                <ErrorMessage
                    name={props.name}
                    component="div"
                    className="formErr"
                />

            </div>

        </>

    </>)
}
export default CheckBox