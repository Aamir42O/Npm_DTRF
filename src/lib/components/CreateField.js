import React from "react"
import NumberField from "./Fields/NumberField"
import RadioField from "./Fields/Radio"
import TextField from "./Fields/TextField"
import DateFieldComponent from "./Fields/DateField"
import moment from "moment";
import Checkbox from "./Fields/CheckBox"
import { Formik, Form, Field, ErrorMessage } from "formik";
import MessageField from "./Fields/MessageField"
import MySelect from "./mySelect"


const CreateField = (props) => {
    console.log(props)
    const displayField = () => {
        let { isRequiredIf, isRequiredIfValue, isRequiredIfValueIsNot, nonMandatory, showMessageIf } = props.validationValue
        let { values, testType, testTrimester } = props
        let show = true

        if (isRequiredIf) {
            if (!["", null, undefined, false].includes(values[isRequiredIf.name])) {
                show = true
            } else {
                show = false
            }
        }
        if (isRequiredIfValue) {
            if (values[isRequiredIfValue.name] == isRequiredIfValue.value) {
                show = true
            } else {
                show = false
            }
        }
        if (isRequiredIfValueIsNot) {
            if (!["", null, false, undefined].includes(values[isRequiredIfValueIsNot.name])) {
                if (values[isRequiredIfValueIsNot.name] != isRequiredIfValueIsNot.value) {
                    show = true
                } else {
                    show = false
                }
            }
        }

        if (testType && (props.externalValidation.testType != props.testType)) {
            show = false
        }
        if (testTrimester && (props.externalValidation.testTrimester != props.testTrimester)) {
            show = false
        }
        if (showMessageIf) {
            let names = showMessageIf.name.split(",")
            let conditionalValues = showMessageIf.value.split(",")
            names.map((name, index) => {
                if (values[name] != conditionalValues[index]) {
                    show = false
                }
            })
        }

        console.log(show)
        return show
    }

    const isMandatory = () => {
        let mandatory = false
        if ((props.validation.includes("isRequired") || props.validation.includes("isRequiredIf") || props.validation.includes("isRequiredIfValue") || props.validation.includes("isRequiredIfValueIsNot")) && (!props.validationValue.nonMandatory)) {
            mandatory = true
        } else {
            mandatory = false
        }
        return mandatory
    }
    return <>
        {
            (displayField())
            && <>
                {
                    props.newRow ?
                        <div className="col-12">
                            {
                                props.type == "message" &&
                                <MessageField message={props.message} />
                            }
                            {
                                props.type == "number" &&
                                <NumberField
                                    title={props.title}
                                    name={props.name}
                                    isDisabled={props.validationValue.isDisabled ? (props.values[props.validationValue.isDisabled.name] ? false : true) : false}
                                    mandatory={isMandatory()}
                                />
                            }
                            {
                                props.type == "radio" &&
                                <RadioField
                                    title={props.title}
                                    name={props.name}
                                    mandatory={isMandatory()}
                                    options={props.options}
                                    isDisabled={props.validationValue.isDisabled ? (props.values[props.validationValue.isDisabled.name] ? false : true) : false}

                                />
                            }
                            {
                                props.type == "date" &&
                                <DateFieldComponent
                                    name={props.name}
                                    title={props.title}
                                    mandatory={isMandatory()}
                                    isDisabled={props.validationValue.isDisabled ? (props.values[props.validationValue.isDisabled.name] ? false : true) : false}

                                />
                            }
                            {
                                props.type == "text" &&
                                <TextField
                                    name={props.name}
                                    title={props.title}
                                    mandatory={isMandatory()}
                                    placeholder="Enter first name"
                                    className={"col-md-6 col-12"}
                                    isDisabled={props.validationValue.isDisabled ? (props.values[props.validationValue.isDisabled.name] ? false : true) : false}

                                />
                            }
                            {
                                props.type == "checkBox" &&
                                <Checkbox
                                    values={props.values}
                                    name={props.name}
                                    title={props.title}
                                    mandatory={isMandatory()}
                                    isDisabled={props.validationValue.isDisabled ? (props.values[props.validationValue.isDisabled.name] ? false : true) : false}
                                    options={props.options}
                                />
                            }
                            {
                                props.type == "dropDown" &&
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>
                                            {props.title} <span className="marked">*</span>
                                        </label>
                                        <MySelect
                                            isMulti={false}
                                            optionList={props.options}
                                            name={props.name}
                                            isDisabled={props.validationValue.isDisabled ? (props.values[props.validationValue.isDisabled.name] ? false : true) : false}
                                            mandatory={isMandatory()}
                                        />


                                        <ErrorMessage
                                            name={props.name}
                                            component="div"
                                            className="formErr"
                                        />

                                    </div>

                                </div>

                            }
                        </div>
                        :
                        <>
                            {
                                props.type == "message" &&
                                <MessageField message={props.message} />
                            }
                            {
                                props.type == "number" &&
                                <NumberField
                                    title={props.title}
                                    name={props.name}
                                    isDisabled={props.validationValue.isDisabled ? (props.values[props.validationValue.isDisabled.name] ? false : true) : false}
                                    mandatory={isMandatory()}
                                />
                            }
                            {
                                props.type == "radio" &&
                                <RadioField
                                    title={props.title}
                                    name={props.name}
                                    mandatory={isMandatory()}
                                    options={props.options}
                                    isDisabled={props.validationValue.isDisabled ? (props.values[props.validationValue.isDisabled.name] ? false : true) : false}

                                />
                            }
                            {
                                props.type == "date" &&
                                <DateFieldComponent
                                    name={props.name}
                                    title={props.title}
                                    mandatory={isMandatory()}
                                    isDisabled={props.validationValue.isDisabled ? (props.values[props.validationValue.isDisabled.name] ? false : true) : false}

                                />
                            }
                            {
                                props.type == "text" &&
                                <TextField
                                    name={props.name}
                                    title={props.title}
                                    mandatory={isMandatory()}
                                    placeholder="Enter first name"
                                    className={"col-md-6 col-12"}
                                    isDisabled={props.validationValue.isDisabled ? (props.values[props.validationValue.isDisabled.name] ? false : true) : false}

                                />
                            }
                            {
                                props.type == "checkBox" &&
                                <Checkbox
                                    values={props.values}
                                    name={props.name}
                                    title={props.title}
                                    mandatory={isMandatory()}
                                    isDisabled={props.validationValue.isDisabled ? (props.values[props.validationValue.isDisabled.name] ? false : true) : false}
                                    options={props.options}
                                />
                            }
                            {
                                props.type == "dropDown" &&
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>
                                            {props.title} <span className="marked">*</span>
                                        </label>
                                        <MySelect
                                            isMulti={false}
                                            optionList={props.options}
                                            name={props.name}
                                            isDisabled={props.validationValue.isDisabled ? (props.values[props.validationValue.isDisabled.name] ? false : true) : false}
                                            mandatory={isMandatory()}
                                        />


                                        <ErrorMessage
                                            name={props.name}
                                            component="div"
                                            className="formErr"
                                        />

                                    </div>

                                </div>

                            }

                        </>

                }




            </>
        }
    </>
}

export default CreateField