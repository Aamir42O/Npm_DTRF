import React, { useEffect, useState } from 'react'
import { useField, FieldProps } from "formik";
import Select, { Option, ReactSelectProps } from "react-select";




const MySelect = (props) => {
    const [field, meta, helpers] = useField(props);

    const { isMulti } = props
    const { optionList } = props;
    const { fieldName } = props
    const { touched, error, value } = meta;
    const { setValue } = helpers;
    console.log(props.isDisabled)
    const [prefilledValue, setPrefilledValue] = useState("")
    useEffect(() => {
        // console.log("ISMULTI", isMulti)
        // if (isMulti) {
        //     setPrefilledValue(value)
        //     console.log("MYSELECT ISMULTI VALUE", value)
        // } else {
        //     console.log("IS NOT MULTI")
        //     setPrefilledValue({ label: value, value: value })
        // }
    }, [])
    return (<>
        {/* <Select
            isDisabled={values.instituteLocation == "yes" ? true : false}
            options={optionList}
            name="city"
            value={{ value: citiesAndStates[id].city, label: citiesAndStates[id].city }}
            onChange={e => handleCityChange(e, id)}
        /> */}
        <Select
            isMulti={isMulti}
            options={optionList}
            name={field.name}
            instanceId={field.name}
            defaultValue={value}
            isDisabled={props.isDisabled}

            // onChange={(Option) => props.handleCityChange(Option)}
            onChange={(Option) => setValue(Option)}
        />

    </>)
}


export default MySelect