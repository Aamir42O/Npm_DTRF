import { Payment } from '@material-ui/icons'
import React, { useState, useEffect } from 'react'
import { message, Tag, Spin } from "antd";
import DisplayFields from './DisplayFields/DisplayField';
import DisplayFiles from './DisplayFields/DisplayFiles';



const Summary = (props) => {
    const [formValues, setFormValues] = useState(null)
    const [doctor_info, setDoctor_info] = useState({})
    const [test_info, setTest_info] = useState({})
    const [collectionLocation, setCollectionLocation] = useState({})
    const [patient_details, setPatient_details] = useState({})
    const [medical_info, setMedical_info] = useState({})
    const [sample_info, setSample_info] = useState({})
    const [payment, setPayment] = useState({})
    const [from, setFrom] = useState("")

    const [is_thalasseima, setIs_thalasseima] = useState(false)
    const [fileUpload, setFileUpload] = useState({})
    // Test GROUP
    const [hasNbs, setHasNbs] = useState(false)
    const [hasNipt, setHasNipt] = useState(false)
    const [hasPns, setHasPns] = useState(false)
    const [hasCyto, setHasCyto] = useState(false)
    // Test Group Close

    // Test SubGroup 
    const [hasCytoPrenatal, setHasCytoPrenatal] = useState(false)
    const [hasPoc, setHasPoc] = useState(false)
    const [isThalasammia, setIsThalasammia] = useState(false)
    const [hasPreEclampsiaTest, setHasPreEclampsiaTest] = useState(false)
    const [testTrimester, setTestTrimester] = useState(false)
    // Test subgroup close
    const getTestDetails = () => {
        console.log("INSIDE TEST DETAILS")
        if (props.from == "Confirmation") {
            props.test_info.selectedTests.map((test) => {
                if (test.sub_group == "NBS") {
                    setHasNbs(true)
                }
                if (test.sub_group == "NIPT") {
                    setHasNipt(true)
                }
                if (test.sub_group == "PNS") {
                    setHasPns(true)
                    console.log("INSIDE PNS CONDITION")
                    if (test.is_thalasseima) {
                        setIsThalasammia(test.is_thalasseima)
                    }
                    if (test.is_pre_eclampsia) {
                        setHasPreEclampsiaTest(true)
                    }
                    setTestTrimester(test.trimester_test);
                }
                if (test.sub_group == "CYTO" || test.sub_group == "CMA") {
                    if (test.sample_category == "Prenatal") {
                        setHasCytoPrenatal(true);
                    }
                    if (test.sample_category == "Product of conception(POC)") {
                        setHasPoc(true);
                    }

                    setHasCyto(true)
                }
            })
        }
        if (props.from == "Dashboard") {
            if (props.test_info.sub_group == "NBS") {
                setHasNbs(true)
            }
            if (props.test_info.sub_group == "NIPT") {
                setHasNipt(true)
            }
            if (props.test_info.sub_group == "PNS") {

                setHasPns(true)
                console.log("INSIDE PNS CONDITION")
                if (props.test_info.is_thalasseima) {
                    setIsThalasammia(props.test_info.is_thalasseima)
                }
                if (props.test_info.is_pre_eclampsia) {
                    setHasPreEclampsiaTest(true)
                }
                setTestTrimester(props.test_info.trimester_test);
            }
            if (props.test_info.sub_group == "CYTO" || props.test_info.sub_group == "CMA") {
                if (props.test_info.sample_category == "Prenatal") {
                    setHasCytoPrenatal(true);
                }
                if (props.test_info.sample_category == "Product of conception(POC)") {
                    setHasPoc(true);
                }

                setHasCyto(true)
            }
        }

    }
    console.log(props, "SUMMARRY PROPS")
    console.log(hasPns, "HASPNS")
    useEffect(() => {
        console.log(props, "SUMMARRY PROPS")
        if (!formValues) {
            getTestDetails()
            setDoctor_info(props.doctor_info)
            setTest_info(props.test_info)
            setCollectionLocation(props.collectionLocation)
            setPatient_details(props.patient_details)
            setMedical_info(props.medical_info)
            setFrom(props.from)
            setSample_info(props.sample_info)
            setPayment(props.payment)
            setFormValues(true)
            setFileUpload(props.fileUpload)
        }

    }, [])


    return (


        <div className="customWrap">
            {formValues &&

                <div className="row">
                    <div className="col-md-12 col-12">
                        <fieldset id="valdatinStep1">
                            {/* ***********DOCTOR INFORMATION ******************** */}
                            <div className="card p-3" style={{ 'box-shadow': 'none' }}>
                                <div class="section-title mb-4 mt-0">Doctor Information:</div>

                                <div className="form-group row mb-2">
                                    <div className="col-md-6 col-12">
                                        <div className="form-group mb-0">
                                            <label className="col-form-label text-md-right col-sm-6"><b>Doctor:</b></label>
                                            <label className="col-form-label col-sm-6">
                                                {
                                                    doctor_info.doctorName.name
                                                        .firstName
                                                }{" "}
                                                {
                                                    doctor_info.doctorName.name
                                                        .lastName
                                                }
                                            </label>
                                        </div>
                                    </div>



                                </div>
                            </div>
                            {/* **************DOCTOR INFORMATION CLOSE*********************** */}

                            {/* *********Test Information********************* */}
                            {
                                from == "Confirmation" && <>
                                    <div className="card p-3" style={{ 'box-shadow': 'none' }}>
                                        <div class="section-title mb-2 mt-0">Test Information:</div>
                                        <div className="form-group mb-0">
                                            {test_info &&
                                                test_info.selectedTests.map(
                                                    (test, id) => (
                                                        <>
                                                            <label><b>{test.display_test_name}</b></label>
                                                            <br />

                                                            <label>Sample Type:&nbsp; </label>
                                                            <label>{test.sampleType}</label>
                                                            <hr />
                                                        </>
                                                    )
                                                )}

                                        </div>
                                        <div class="section-title mb-0 mt-0">
                                            Collection Location: &nbsp;
                                            {collectionLocation && (
                                                collectionLocation.location == "Home" ? "Non-Institute" : collectionLocation.location
                                            )}
                                        </div>
                                    </div>
                                </>
                            }

                            {
                                from == "Dashboard" && <>
                                    <div className="card p-3" style={{ 'box-shadow': 'none' }}>
                                        <div class="section-title mb-2 mt-0">Test Information:</div>
                                        <div className="form-group mb-0">
                                            <label><b>{test_info.display_test_name}</b></label>
                                            <br />

                                            <label>Sample Type:&nbsp; </label>
                                            <label>{test_info.sampleType}</label>
                                            <hr />
                                        </div>
                                        <div class="section-title mb-0 mt-0">
                                            Collection Location: &nbsp;
                                            {collectionLocation && (
                                                collectionLocation.location == "Home" ? "Non-Institute" : collectionLocation.location
                                            )}
                                        </div>

                                    </div>
                                </>
                            }

                            {/* ************Test information CLOSE************** */}

                            {/* *********PATIENT DETAILS ******************** */}

                            <div className="card p-3" style={{ 'box-shadow': 'none' }}>
                                <div class="section-title mb-2 mt-0">Patient Details:</div>

                                {patient_details && (


                                    <div className="form-group">

                                        {(patient_details.isNew || patient_details.name.firstName) && (
                                            <>
                                                {
                                                    <>
                                                        <div className="row">
                                                            <DisplayFields
                                                                title="Hospital ID/ Unique ID"
                                                                data={patient_details.hospitalId}
                                                            />
                                                            <DisplayFields
                                                                title="Salutation"
                                                                data={patient_details.salutation}
                                                            />
                                                            {hasNbs && <>
                                                                <div className="col-md-2 col-12">
                                                                    <div className="form-group mb-0">
                                                                        {(patient_details.hasBabyName || (typeof patient_details.hasBabyName == "boolean")) &&

                                                                            <label className="col-form-label col-sm text-sm-right"><b>{
                                                                                patient_details.hasBabyName.toString() == "true" ? "Baby's" : "B/O"
                                                                            }</b></label>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </>
                                                            }
                                                            <DisplayFields
                                                                title="First Name"
                                                                data={
                                                                    patient_details.name ?
                                                                        (

                                                                            patient_details.name.firstName ?
                                                                                patient_details.name.firstName :
                                                                                patient_details.firstName
                                                                        ) :
                                                                        patient_details
                                                                            .firstName
                                                                }
                                                                className={hasNbs ? "col-md-5 col-12" : "col-md-6 col-12"}
                                                            />
                                                            <DisplayFields
                                                                title="Last Name"
                                                                data={
                                                                    patient_details.name ?
                                                                        (

                                                                            patient_details.name.lastName ?
                                                                                patient_details.name.lastName :
                                                                                patient_details.lastName
                                                                        ) :
                                                                        patient_details
                                                                            .lastName
                                                                }
                                                                className={hasNbs ? "col-md-5 col-12" : "col-md-6 col-12"}
                                                            />
                                                        </div>

                                                    </>
                                                }

                                                <div className="row">
                                                    <DisplayFields
                                                        title="Contact Number:"
                                                        data={patient_details.contact}
                                                    />
                                                </div>

                                                {(patient_details.isNew ||
                                                    collectionLocation.location !=
                                                    "Home") && (
                                                        <>
                                                            <div className="row">
                                                                {
                                                                    !hasNbs &&
                                                                    <DisplayFields
                                                                        title="Husband's/Father Name"
                                                                        data={patient_details.husbandsOrFathersName}
                                                                    />
                                                                }
                                                                <DisplayFields
                                                                    title="Sex assigned at Birth"
                                                                    data={patient_details
                                                                        .gender == "male"
                                                                        ? "Male"
                                                                        : patient_details
                                                                            .gender == "female"
                                                                            ? "Female"
                                                                            : "Other"}
                                                                />
                                                            </div>

                                                            {
                                                                patient_details.ageType == "ageInYMD" &&

                                                                <div className="row">

                                                                    <div className="col-sm">
                                                                        <div className="form-group mb-0">
                                                                            <label className="col-form-label col-sm-6 text-sm-right"><b>Age:</b></label>

                                                                        </div>
                                                                    </div>
                                                                    <DisplayFields
                                                                        title="Years"
                                                                        data={patient_details.ageInYears}
                                                                        className="col-sm"
                                                                    />
                                                                    <DisplayFields
                                                                        title="Months"
                                                                        data={patient_details.ageInMonths}
                                                                        className="col-sm"
                                                                    />
                                                                    <DisplayFields
                                                                        title="Days"
                                                                        data={patient_details.ageInDays}
                                                                        className="col-sm"
                                                                    />
                                                                </div>
                                                            }

                                                            <div className="row">
                                                                {
                                                                    patient_details.ageType == "dob" &&
                                                                    <DisplayFields
                                                                        title="Date of Birth"
                                                                        data={patient_details.dateOfBirth}
                                                                        className="col-sm"
                                                                        isDate={true}
                                                                    />

                                                                }


                                                                <div className="col-md-6 col-12">
                                                                    <DisplayFields
                                                                        title="Email:"
                                                                        data={patient_details.email}
                                                                        className="col-sm"
                                                                    />
                                                                </div>
                                                            </div>
                                                            {
                                                                hasNbs && <>




                                                                    <div className="row">
                                                                        {patient_details.mothersFirstName &&

                                                                            <div className="col-md-2 col-12">
                                                                                <div className="form-group mb-0">
                                                                                    <label>
                                                                                        Mothers
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        }
                                                                        <DisplayFields
                                                                            title="First Name"
                                                                            data={from == "Confirmation" ?
                                                                                patient_details
                                                                                    .mothersFirstName :
                                                                                patient_details.mothersName.firstName
                                                                            }
                                                                            className="col-md-5 col-12"
                                                                        />
                                                                        <DisplayFields
                                                                            title="Last Name"
                                                                            data={from == "Confirmation" ?
                                                                                patient_details
                                                                                    .mothersLastName :
                                                                                patient_details.mothersName.lastName
                                                                            }
                                                                            className="col-md-5 col-12"
                                                                        />

                                                                    </div>
                                                                    {
                                                                        patient_details.mothersAgeType == "ageInYMD" ?
                                                                            <>
                                                                                <div className="row">
                                                                                    <div className="col-sm">
                                                                                        <div className="form-group mb-0">
                                                                                            <label className="col-form-label col-sm-6 text-sm-right"><b>Mothers Age:</b></label>
                                                                                        </div>
                                                                                    </div>
                                                                                    <DisplayFields
                                                                                        title="Years"
                                                                                        data={patient_details.mothersAgeInYears}
                                                                                        className="col-sm"
                                                                                    />
                                                                                    <DisplayFields
                                                                                        title="Months"
                                                                                        data={patient_details.mothersAgeInMonths}
                                                                                        className="col-sm"
                                                                                    />
                                                                                    <DisplayFields
                                                                                        title="Days"
                                                                                        data={patient_details.mothersAgeInDays}
                                                                                        className="col-sm"
                                                                                    />
                                                                                </div>
                                                                                <DisplayFields
                                                                                    title="Mothers DOB:"
                                                                                    data={patient_details.mothersDateOfBirth}
                                                                                    isDate={true}
                                                                                />

                                                                            </>
                                                                            :
                                                                            <DisplayFields
                                                                                title="Mothers DOB:"
                                                                                data={patient_details.mothersDateOfBirth}
                                                                                isDate={true}
                                                                            />
                                                                    }

                                                                    <div className="row">
                                                                        <div className="col-md-2 col-12">
                                                                            <div className="form-group mb-0">

                                                                                <label className="col-form-label ">
                                                                                    Fathers Name
                                                                                </label>
                                                                            </div>

                                                                        </div>
                                                                        <DisplayFields
                                                                            title="First Name"
                                                                            data={from == "Confirmation" ?
                                                                                patient_details
                                                                                    .fathersFirstName :
                                                                                patient_details.fathersName.firstName
                                                                            }
                                                                            className="col-md-5 col-12"
                                                                        />
                                                                        <DisplayFields
                                                                            title="Last Name"
                                                                            data={from == "Confirmation" ?
                                                                                patient_details
                                                                                    .fathersLastName :
                                                                                patient_details.fathersName.lastName
                                                                            }
                                                                            className="col-md-5 col-12"
                                                                        />
                                                                    </div>

                                                                </>
                                                            }

                                                            <div className="row">
                                                                <DisplayFields
                                                                    title="Residential Address"
                                                                    data={patient_details.address}
                                                                />
                                                                <DisplayFields
                                                                    title="Pin Code"
                                                                    data={patient_details.pinCode}
                                                                />
                                                            </div>

                                                            <div className="row">
                                                                <DisplayFields
                                                                    title="City"
                                                                    data={
                                                                        typeof patient_details.city == "object" ?
                                                                            patient_details.city.label
                                                                            :
                                                                            patient_details.city
                                                                    }
                                                                />
                                                                <DisplayFields
                                                                    title="State"
                                                                    data={
                                                                        typeof patient_details.state == "object" ?
                                                                            patient_details.state.label
                                                                            :
                                                                            patient_details.state
                                                                    }
                                                                />
                                                            </div>
                                                            {(hasNipt || hasPns) &&

                                                                <div className="row">
                                                                    <DisplayFields
                                                                        title="Weight: (in Kg)"
                                                                        data={patient_details.weight}
                                                                    />
                                                                    <DisplayFields
                                                                        title="Height: (in cm)"
                                                                        data={patient_details.height}
                                                                    />
                                                                </div>
                                                            }

                                                            {hasPns &&
                                                                <div className="row">
                                                                    <DisplayFields
                                                                        title="Smoking"
                                                                        data={patient_details
                                                                            .smoking == "true"
                                                                            ? "Yes"
                                                                            : "No"}
                                                                    />
                                                                    <DisplayFields
                                                                        title="Folic Acid Intake:"
                                                                        data={patient_details
                                                                            .folicAcidIntake == "true"
                                                                            ? "Yes"
                                                                            : "No"}
                                                                    />
                                                                </div>
                                                            }
                                                        </>
                                                    )}
                                            </>
                                        )}

                                    </div>
                                )}
                                {patient_details && <>

                                    {((patient_details.filledBy == "patient" && from == "Confirmation") && (!props.sendByLink)) &&
                                        <div className="row" id="action1">
                                            <div className="col-md-12 col-12 text-right">
                                                <div style={{ padding: "5px 20px" }}>
                                                    <button
                                                        type="button"
                                                        onClick={e => props.onResendClick()}
                                                        className="btn btn-primary"
                                                    >
                                                        Resend Link
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </>
                                }

                            </div>
                            {/* **************PATIENT DETAILS CLOSE*************** */}
                            {
                                collectionLocation.location == "Institute" &&
                                <>
                                    {/* *******MEDICAL INFO***************** */}
                                    <div className="card p-3" style={{ 'box-shadow': 'none' }}>
                                        <div class="section-title mb-2 mt-0">Clinical Info:</div>
                                        {
                                            hasNbs && <>
                                                <div className="row">
                                                    <DisplayFields
                                                        title="Sample Collection Date"
                                                        data={medical_info
                                                            .sampleCollectionDate}
                                                        isDate={true}
                                                    />
                                                    <DisplayFields
                                                        title="First Feeding Date"
                                                        data={medical_info
                                                            .firstFeedingDate}
                                                        isDate={true}
                                                    />
                                                    <DisplayFields
                                                        title="Type of Feeding"
                                                        data={
                                                            medical_info.typeOfFeeding
                                                        }
                                                    />

                                                    <DisplayFields
                                                        title="H/O Transfusion"
                                                        data={medical_info.hoTransfusion}
                                                    />

                                                    {
                                                        medical_info
                                                            .hoTransfusion == "Yes" &&
                                                        <DisplayFields
                                                            title="H/O Transfusion Date"
                                                            data={medical_info.dateOfHoTransfusion}
                                                            isDate={true}
                                                        />
                                                    }
                                                    <DisplayFields
                                                        title="Delivery Status"
                                                        data={
                                                            medical_info
                                                                .deliveryStatus
                                                        }
                                                    />
                                                    <DisplayFields
                                                        title="Additional Symptoms / History"
                                                        data={medical_info.additionalSymptoms}
                                                    />
                                                </div>
                                            </>
                                        }

                                        {
                                            !hasNbs && <>
                                                <DisplayFields
                                                    title="USG Date"
                                                    data={medical_info.usgDate}
                                                    isDate={true}
                                                />

                                                <div class="section-title mb-2 mt-0">Gestational Age :</div>



                                            </>
                                        }


                                        <div className="row">
                                            {
                                                !hasNbs && <>
                                                    <DisplayFields
                                                        title="Weeks"
                                                        data={medical_info.gestationalAgeWeeks}
                                                    />
                                                    <DisplayFields
                                                        title="Days"
                                                        data={medical_info.gestationalAgeDays}
                                                    />
                                                    <DisplayFields
                                                        title="Sample Collection Date"
                                                        data={medical_info.sampleCollectionDate}
                                                        isDate={true}
                                                    />

                                                    {from == "Confirmation" &&
                                                        <>

                                                            <div className="col-md-12 col-12">
                                                                <h6 style={{ padding: "5px" }}>Current Gestational Age :</h6>
                                                            </div>

                                                            <DisplayFields
                                                                title="Weeks"
                                                                data={medical_info.currentGestationalAgeWeeks}
                                                            />
                                                            <DisplayFields
                                                                title="Days"
                                                                data={medical_info.currentGestationalAgeDays}
                                                            />

                                                        </>
                                                    }

                                                </>
                                            }
                                        </div>

                                        {
                                            (!hasNbs && from != "Confirmation") && <>
                                                {

                                                    medical_info.currentGestationalAgeWeeks.map((gest, index) => (
                                                        <div className="col-12 form-group">
                                                            <label>
                                                                Current Gestational Age{" "} {index + 1}
                                                                <span className="marked">*</span>
                                                            </label>
                                                            <div className="row">
                                                                <DisplayFields
                                                                    title="Weeks"
                                                                    data={medical_info.currentGestationalAgeWeeks[index]}
                                                                />
                                                                <DisplayFields
                                                                    title="Days"
                                                                    data={medical_info.currentGestationalAgeDays[index]}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </>
                                        }
                                        {

                                        }
                                        <div className="row">
                                            {
                                                medical_info.referrenceDoctorName && <>

                                                    {(medical_info.referrenceDoctorName.name) ?
                                                        <div className="col-md-6 col-12">
                                                            <div className="form-group mb-0">
                                                                <label className="col-form-label text-md-right col-sm-6"><b>Referring Doctor:</b></label>
                                                                <label className="col-form-label col-sm-6">
                                                                    {
                                                                        medical_info.referrenceDoctorName
                                                                            .name.firstName
                                                                    }{" "}
                                                                    {
                                                                        medical_info.referrenceDoctorName
                                                                            .name.lastName
                                                                    }
                                                                </label>
                                                            </div>
                                                        </div> : <div className="col-md-6 col-12">
                                                            <div className="form-group mb-0">
                                                                <label className="col-form-label text-md-right col-sm-6"><b>Referring Doctor:</b></label>
                                                                <label className="col-form-label col-sm-6">
                                                                    Self
                                                                </label>
                                                            </div>
                                                        </div>
                                                    }
                                                </>
                                            }
                                            {medical_info.sonographer && <>

                                                {(medical_info.sonographer && medical_info.sonographer.label != "Self") ?
                                                    <div className="col-md-6 col-12">
                                                        <div className="form-group mb-0">
                                                            <label className="col-form-label text-md-right col-sm-6"><b>Sonographer:</b></label>
                                                            <label className="col-form-label col-sm-6">
                                                                {
                                                                    medical_info.sonographer
                                                                        .name.firstName
                                                                }{" "}
                                                                {
                                                                    medical_info.sonographer
                                                                        .name.lastName
                                                                }
                                                            </label>
                                                        </div>
                                                    </div> :
                                                    <div className="col-md-6 col-12">
                                                        <div className="form-group mb-0">
                                                            <label className="col-form-label text-md-right col-sm-6"><b>Sonographer:</b></label>
                                                            <label className="col-form-label col-sm-6">
                                                                Self
                                                            </label>
                                                        </div>
                                                    </div>
                                                }
                                            </>
                                            }

                                            {hasCyto && (
                                                <>
                                                    {hasCytoPrenatal && (
                                                        <>
                                                            <DisplayFields
                                                                title="Maternal Age"
                                                                data={medical_info.maternalAge}
                                                            />
                                                            <DisplayFields
                                                                title="Genetic Disease in Mother"
                                                                data={medical_info.motherGeneticDisease}
                                                            />
                                                            <DisplayFields
                                                                title="Genetic Disease in Father"
                                                                data={medical_info.fatherGeneticDisease}
                                                            />
                                                            <DisplayFields
                                                                title="Genetic Disease in Sibling"
                                                                data={medical_info.siblingGeneticDisease}
                                                            />

                                                        </>
                                                    )}
                                                    {
                                                        (hasPoc || hasCytoPrenatal) &&
                                                        <>
                                                            <DisplayFields
                                                                title="Consanguinity"
                                                                data={medical_info.consanguinity}
                                                            />
                                                        </>

                                                    }

                                                    <DisplayFields
                                                        title="Family History of any chromosomal abnormality"
                                                        data={medical_info.familyHistory}
                                                    />

                                                </>
                                            )}

                                            {(hasNipt || hasPns) && (
                                                <>
                                                    <DisplayFields
                                                        title="Present pregnancy"
                                                        data={medical_info.presentPregnancy}
                                                    />
                                                    {medical_info
                                                        .presentPregnancy == "Twins" && (
                                                            <>
                                                                <DisplayFields
                                                                    title="Twin type"
                                                                    data={medical_info.twinType}
                                                                />
                                                            </>
                                                        )}

                                                    {(medical_info
                                                        .presentPregnancy == "Twins" && medical_info
                                                            .twinType == "Monochorionic") && (
                                                            <>
                                                                <DisplayFields
                                                                    title="Monochorionic Type"
                                                                    data={medical_info.monochorionicType}
                                                                />
                                                            </>
                                                        )}


                                                    <DisplayFields
                                                        title="Gravida"
                                                        data={medical_info.Gravida}
                                                    />


                                                    <DisplayFields
                                                        title="Para"
                                                        data={medical_info.Para}
                                                    />


                                                    <DisplayFields
                                                        title="Abortion"
                                                        data={medical_info.Abortion}
                                                    />



                                                    <DisplayFields
                                                        title="Live"
                                                        data={medical_info.Live}
                                                    />

                                                </>
                                            )}
                                            {(!hasCyto && medical_info.referralReason) &&
                                                medical_info.referralReason.length > 0 && <>
                                                    {
                                                        medical_info.referralReason.map((reason, index) => {
                                                            return (
                                                                <DisplayFields
                                                                    title={`Referral Reason ${index + 1}`}
                                                                    data={reason.value ? reason.value : reason}
                                                                />

                                                            )
                                                        })
                                                    }
                                                </>
                                            }
                                            {
                                                hasCyto && <>
                                                    {
                                                        medical_info.referralReason.map((reason) => {
                                                            if (reason == "Advance Maternal Age") {
                                                                return <DisplayFields
                                                                    title="Advance Maternal Age"
                                                                    data={medical_info.advanceMaternalAge}
                                                                />
                                                            } else if (reason == "Genetic Disease in Father/Mother/Sibling") {
                                                                return <DisplayFields
                                                                    title="Genetic Disease in Father/Mother/Sibling"
                                                                    data={medical_info.geneticDiseaseInFMS}
                                                                />
                                                            } else if (reason == "Consanguinity") {
                                                                return <DisplayFields
                                                                    title="Consanguinity"
                                                                    data={medical_info.consanguinity}
                                                                />
                                                            } else if (reason == "Others") {
                                                                return <DisplayFields
                                                                    title="Others"
                                                                    data={medical_info.Others}
                                                                />
                                                            }
                                                        })
                                                    }
                                                </>
                                            }

                                            {hasNipt && (
                                                <>
                                                    {medical_info
                                                        .presentPregnancy == "Twins" && (
                                                            <div className="col-12">
                                                                <div className="foem-group mb-0">
                                                                    Sex Chromosome Aneuploidies will not be reported for twin cases
                                                                </div>
                                                            </div>
                                                        )}

                                                    {medical_info.presentPregnancy == "Vanishing Twin" && (
                                                        <DisplayFields
                                                            title="Date on which the other twin had vanished/ reduced"
                                                            data={medical_info.dateOfTwinVanishOrReduced}
                                                            isDate={true}
                                                        />
                                                    )}
                                                    <DisplayFields
                                                        title="IVF Pregnancy"
                                                        data={medical_info.ivfPregnancy}
                                                    />



                                                    {medical_info
                                                        .ivfPregnancy == "Yes" && (
                                                            <>
                                                                <DisplayFields
                                                                    title="Egg used"
                                                                    data={medical_info.eggUsed}
                                                                />
                                                                <DisplayFields
                                                                    title="Age at egg retrieval"
                                                                    data={medical_info.ageAtEggRetrieval}
                                                                />
                                                            </>
                                                        )}
                                                    <DisplayFields
                                                        title="Surrogate"
                                                        data={medical_info.surrogate}
                                                    />
                                                    <DisplayFields
                                                        title="Previous pregnancy"
                                                        data={medical_info.previousPregnancy}
                                                    />

                                                    {
                                                        medical_info.previousPregnancy == "Yes" &&
                                                        <>
                                                            <DisplayFields
                                                                title="Previous pregnancy Date"
                                                                data={medical_info.prevPregDate}
                                                                isDate={true}
                                                            />
                                                            <DisplayFields
                                                                title="Spontaneous Abortion"
                                                                data={medical_info.spontaneousAbortion}
                                                            />
                                                            <DisplayFields
                                                                title="Termination of pregnancies"
                                                                data={medical_info.terminationPregnancy}
                                                            />


                                                        </>
                                                    }

                                                    {medical_info.referralReason.length > 0 &&
                                                        medical_info.referralReason.map((reason) =>
                                                            reason.value == "previous pregnancy affected by genetic disorders" ?
                                                                (<DisplayFields
                                                                    title="Name of condition that affected previous
                                                                    pregnancy"
                                                                    data={medical_info.conditionAffectsPreviousPregnancy}
                                                                />

                                                                ) : reason.value == "patient is a carrier of genetic disorders" ? (
                                                                    <DisplayFields
                                                                        title="Name of condition that the patient is a
                                                                    carrier of"
                                                                        data={medical_info.conditionPatientIsCarrierOf}
                                                                    />

                                                                ) : reason.value == "serum screen risk" ? (
                                                                    <>
                                                                        <DisplayFields
                                                                            title="T21 risk score"
                                                                            data={medical_info.t21RiskScore}
                                                                        />
                                                                        <DisplayFields
                                                                            title="T18 risk score"
                                                                            data={medical_info.t18RiskScore}
                                                                        />
                                                                        <DisplayFields
                                                                            title="T13 risk score"
                                                                            data={medical_info.t13RiskScore}
                                                                        />
                                                                    </>

                                                                ) : reason.value == "family history" ?
                                                                    (
                                                                        <>
                                                                            <DisplayFields
                                                                                title="family history"
                                                                                data={medical_info.familyHistory}
                                                                            />
                                                                        </>
                                                                    ) : reason.value == "others" ?
                                                                        (
                                                                            <>
                                                                                <DisplayFields
                                                                                    title="Other Referral Reason"
                                                                                    data={medical_info.otherReferralReason}
                                                                                />
                                                                            </>
                                                                        ) : ""
                                                        )
                                                    }
                                                </>
                                            )}


                                            {hasPns && (
                                                <>
                                                    <DisplayFields
                                                        title="FMF ID"
                                                        data={medical_info.fmfId}
                                                    />
                                                    <DisplayFields
                                                        title="LMP"
                                                        data={medical_info.lmpDate}
                                                        isDate={true}
                                                    />
                                                    <DisplayFields
                                                        title="USG/Corr EDD"
                                                        data={medical_info.usgCorrEddDate}
                                                        isDate={true}
                                                    />
                                                    <DisplayFields
                                                        title="LMP Certainity"
                                                        data={medical_info.lmpCertainity}
                                                    />
                                                    <DisplayFields
                                                        title="History of Down Syndrome"
                                                        data={medical_info.historyOfDownSyndrome}
                                                    />
                                                    <DisplayFields
                                                        title="Confirmatory Test for Hisotry of Down Syndrome"
                                                        data={medical_info.confirmatoryTestHDS}
                                                    />
                                                    <DisplayFields
                                                        title="History of Edward's Syndrome ONTD"
                                                        data={medical_info.historyOfEdwardsSyndrome}
                                                    />
                                                    <DisplayFields
                                                        title="Confirmatory Test for Hisotry of Edward Syndrome"
                                                        data={medical_info.confirmatoryTestHES}
                                                    />
                                                    <DisplayFields
                                                        title="Confirmatory Test for Hisotry of Patau Syndrome"
                                                        data={medical_info.confirmatoryTestHPS}
                                                    />

                                                    <DisplayFields
                                                        title="History of Patau Syndrome ONTD"
                                                        data={medical_info.historyOfPatauSyndrome}
                                                    />
                                                    <DisplayFields
                                                        title="Diabetes Status (Insulin Dependent)"
                                                        data={medical_info.diabetesInsulinDependent}
                                                    />

                                                    {medical_info
                                                        .diabetesInsulinDependent == "Yes" && (
                                                            <>
                                                                {/* <DisplayFields
                                                                    title="Last date of insulin taken"
                                                                    data={medical_info.insulinDate}
                                                                /> */}
                                                                <DisplayFields
                                                                    title="Time Of diabetes"
                                                                    data={medical_info.timeOfDiabetes}
                                                                />
                                                                <DisplayFields
                                                                    title="Gestational"
                                                                    data={medical_info.gestational}
                                                                />
                                                            </>
                                                        )}
                                                    <DisplayFields
                                                        title="Patient on HCG"
                                                        data={medical_info.patientOnHcg}
                                                    />
                                                    {medical_info
                                                        .patientOnHcg == "Yes" && (
                                                            <DisplayFields
                                                                title="Last date of HCG intake"
                                                                data={medical_info.hcgIntakeDate}
                                                                isDate={true}
                                                            />
                                                        )}
                                                    <DisplayFields
                                                        title="Bleeding/Spotting in last two weeks"
                                                        data={medical_info.bleedingOrSpottingTwoWeeks}
                                                    />
                                                    <DisplayFields
                                                        title="Type of conception"
                                                        data={medical_info.typeOfConception}
                                                    />



                                                    {medical_info
                                                        .typeOfConception == "Assisted" && (
                                                            <>
                                                                <DisplayFields
                                                                    title="Type of procedure"
                                                                    data={medical_info.typeOfProcedure}
                                                                />
                                                                <DisplayFields
                                                                    title="Extraction date"
                                                                    data={medical_info.extractionDate}
                                                                    isDate={true}
                                                                />
                                                                <DisplayFields
                                                                    title="Transfer date"
                                                                    data={medical_info.transferDate}
                                                                    isDate={true}
                                                                />
                                                                {medical_info
                                                                    .typeOfProcedure == "Donor" && (
                                                                        <DisplayFields
                                                                            title="Donor DOB"
                                                                            data={medical_info.donorDob}
                                                                        />
                                                                    )}
                                                            </>
                                                        )}


                                                    {testTrimester == "First" && (
                                                        <>
                                                            {medical_info.presentPregnancy != "Twins" && <>

                                                                <DisplayFields
                                                                    title="CRL (in mm)"
                                                                    data={medical_info.crl}
                                                                />
                                                                <DisplayFields
                                                                    title="NT (in mm)"
                                                                    data={medical_info.nt}
                                                                />
                                                                <DisplayFields
                                                                    title="NB"
                                                                    data={medical_info.nb}
                                                                />
                                                            </>
                                                            }
                                                        </>
                                                    )}

                                                    {
                                                        medical_info.presentPregnancy == "Twins" &&
                                                        <>
                                                            <DisplayFields
                                                                title="Twin-1: CRL (in mm)"
                                                                data={medical_info.twinCrl1}
                                                            />
                                                            <DisplayFields
                                                                title="Twin-2: CRL (in mm)"
                                                                data={medical_info.twinCrl2}
                                                            />
                                                            <DisplayFields
                                                                title="Twin-1: NT (in mm)"
                                                                data={medical_info.twinNt1}
                                                            />
                                                            <DisplayFields
                                                                title="Twin-2: NT (in mm)"
                                                                data={medical_info.twinNt2}
                                                            />
                                                            <DisplayFields
                                                                title="Twin-1: NB"
                                                                data={medical_info.twinNb1}
                                                            />
                                                            <DisplayFields
                                                                title="Twin-2: NB"
                                                                data={medical_info.twinNb2}
                                                            />

                                                        </>
                                                    }

                                                    {hasPreEclampsiaTest &&
                                                        <>
                                                            {
                                                                medical_info.bpOrMap == "BP" &&
                                                                <>
                                                                    <DisplayFields
                                                                        title="BP Measurement Date"
                                                                        data={medical_info.bpMeasurementDate}
                                                                        isDate={true}
                                                                    />
                                                                    <DisplayFields
                                                                        title="BP Left Arm - Systolic Reading 1"
                                                                        data={medical_info.bpLeftSystolic1}
                                                                    />
                                                                    <DisplayFields
                                                                        title="BP Left Arm - Diastolic Reading 1"
                                                                        data={medical_info.bpLeftDiSystolic1}
                                                                    />
                                                                    <DisplayFields
                                                                        title="BP Left Arm - Systolic Reading 2"
                                                                        data={medical_info.bpLeftSystolic2}
                                                                    />
                                                                    <DisplayFields
                                                                        title="BP Left Arm - Diastolic Reading 2"
                                                                        data={medical_info.bpLeftDiSystolic2}
                                                                    />
                                                                    <DisplayFields
                                                                        title="BP Right Arm - Systolic Reading 1"
                                                                        data={medical_info.bpRightSystolic1}
                                                                    />
                                                                    <DisplayFields
                                                                        title="BP Right Arm - Diastolic Reading 1"
                                                                        data={medical_info.bpRightDiSystolic1}
                                                                    />
                                                                    <DisplayFields
                                                                        title="BP Right Arm - Systolic Reading 2"
                                                                        data={medical_info.bpRightSystolic2}
                                                                    />
                                                                    <DisplayFields
                                                                        title="BP Right Arm - Diastolic Reading 2"
                                                                        data={medical_info.bpRightDiSystolic2}
                                                                    />
                                                                </>
                                                            }
                                                            {
                                                                medical_info.bpOrMap == "MAP" &&
                                                                <>
                                                                    <DisplayFields
                                                                        title=" MAP Reading-1"
                                                                        data={medical_info.mapReading1}
                                                                    />
                                                                    <DisplayFields
                                                                        title="MAP Reading-2"
                                                                        data={medical_info.mapReading2}
                                                                    />
                                                                </>
                                                            }


                                                            <DisplayFields
                                                                title="Family History of Pre-eclampsia"
                                                                data={medical_info.familyHistoryPreEclampsia}
                                                            />
                                                            <DisplayFields
                                                                title="Chronic Hypertension"
                                                                data={medical_info.chronicHypertension}
                                                            />
                                                            <DisplayFields
                                                                title="Uterine Artery Pulsative Index - Right PI"
                                                                data={medical_info.uterineArteryPulsativeIndexRightPI}
                                                            />
                                                            <DisplayFields
                                                                title="Uterine Artery Pulsative Index - Left PI"
                                                                data={medical_info.uterineArteryPulsativeIndexLeftPI}
                                                            />
                                                        </>
                                                    }

                                                    {testTrimester == "Second" && (
                                                        <>
                                                            {medical_info.bpd &&
                                                                <DisplayFields
                                                                    title="BPD mm"
                                                                    data={medical_info.bpd}
                                                                />
                                                            }

                                                            {medical_info.fl &&
                                                                <DisplayFields
                                                                    title="FL mm"
                                                                    data={medical_info.fl}
                                                                />
                                                            }
                                                            {medical_info.hc &&
                                                                <DisplayFields
                                                                    title="HC mm"
                                                                    data={medical_info.hc}
                                                                />
                                                            }
                                                            {medical_info.dateOfScan &&
                                                                <DisplayFields
                                                                    title="Date of Scan"
                                                                    data={medical_info.dateOfScan}
                                                                    isDate={true}
                                                                />
                                                            }

                                                            {medical_info.crl &&
                                                                <DisplayFields
                                                                    title="Crl"
                                                                    data={medical_info.crl}
                                                                />
                                                            }

                                                        </>
                                                    )}


                                                </>
                                            )
                                            }
                                            {/* **********************From Confirmation**************** */}
                                            {
                                                from == "Confirmation" &&
                                                <>
                                                    {props.fileUpload &&
                                                        <DisplayFiles
                                                            for="Confirmation"
                                                            files={props.fileUpload.files}

                                                            filesUploaded={props.filesUploaded}
                                                        />
                                                    }
                                                </>
                                            }
                                            {/* ***********|FROM COnfirmation CLOSE*************** */}
                                            {/* ************FROM DASHBOARD********** */}
                                            {
                                                (from == "Dashboard") &&
                                                <>

                                                    <DisplayFiles
                                                        for="Dashboard"
                                                        files={props.files}

                                                        filesUploaded={props.filesUploaded}
                                                    />

                                                    <DisplayFiles
                                                        for="Dashboard"
                                                        files={props.reports}
                                                        filesUploaded={[{ variable: "reports", display: "Reports" }]}
                                                    />
                                                    {/* {medical_info.pcpndtScans &&

                                                        <div className="col-10 col-md-8 form-group">
                                                            {
                                                                medical_info.pcpndtScans &&
                                                                <div className="section-title mb-1   mt-4 col-12">PCPNDT SCAN</div>
                                                            }
                                                            {medical_info.pcpndtScans.map(
                                                                (name, container_id) => (
                                                                    <>
                                                                        <div className="row mb-1">
                                                                            <div className="col-10">
                                                                                <a href={name.location}>
                                                                                    <div className="form-control mb-0">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                                                                                        <label
                                                                                            className="ml-2"
                                                                                            style={{ fontSize: "12px" }}
                                                                                        >
                                                                                            {name.originalname}
                                                                                        </label>
                                                                                    </div>
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )
                                                            )}
                                                        </div>
                                                    } */}


                                                </>

                                            }
                                            {/* **********FROM DASHBOARD CLOSE********** */}
                                        </div>
                                    </div>
                                    {/* ***********MEDICAL INFO CLOSE********** */}

                                    {/* ********SAMPLE INFO********* */}
                                    {
                                        from == "Confirmation" &&
                                        <>
                                            <div className="card p-3" style={{ 'box-shadow': 'none' }}>
                                                <div class="section-title mb-1 mt-0">Sample Info:</div>
                                                {test_info.selectedTests.map((test, id) => (
                                                    <>
                                                        <div className="col-12 col-md-6">
                                                            <div className="form-group mb-0">
                                                                <label className="col-form-label col-sm-6">
                                                                    <b>Test name : {test.test_name}</b>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-2">
                                                            <div className="col-12 col-md-6">
                                                                {sample_info.sampleContainerList[id].containers.map(
                                                                    (test, container_id) => (
                                                                        <>
                                                                            <div className="row mb-1">
                                                                                <div className="col-6">
                                                                                    <div className="form-group mb-0">
                                                                                        <label className="form-control" style={{ height: "auto" }}>
                                                                                            Sample Container ID: {test.id}
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-6">
                                                                                    <div className="form-group mb-0">
                                                                                        <label className="form-control" style={{ height: "auto" }}>
                                                                                            Sample Container ID: {test.id}
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                )}
                                                            </div>

                                                            {test.pcpndt && (
                                                                <>
                                                                    {
                                                                        !sample_info.collectionLocation[id].location.hasOwnProperty("institute") ?
                                                                            <>
                                                                                <div class="section-title mb-1 mt-4 col-12">Location</div>
                                                                                <div className="col-12">
                                                                                    <DisplayFields
                                                                                        title={"Address"}
                                                                                        data={
                                                                                            sample_info
                                                                                                .collectionLocation[id].location.address
                                                                                        }
                                                                                    />
                                                                                    <DisplayFields
                                                                                        title="Pincode"
                                                                                        data={
                                                                                            sample_info
                                                                                                .collectionLocation[id].location.pinCode
                                                                                        }
                                                                                    />
                                                                                    <DisplayFields
                                                                                        title="City"
                                                                                        data={
                                                                                            sample_info.collectionLocation[id].location.city &&
                                                                                            sample_info.collectionLocation[id].location.city.value
                                                                                        }
                                                                                    />
                                                                                    <DisplayFields
                                                                                        title="State"
                                                                                        data={sample_info.collectionLocation[id].location.state &&
                                                                                            sample_info.collectionLocation[id].location.state.value
                                                                                        }
                                                                                    />
                                                                                </div>


                                                                            </> : <>
                                                                                <div className="col-6">
                                                                                    <div className="form-group mb-0">
                                                                                        <label className="col-form-label col-sm-6 text-sm-right">
                                                                                            <b>Location</b>
                                                                                        </label>
                                                                                        <label className="col-form-label col-sm-6">
                                                                                            Institute Location
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            </>
                                                                    }

                                                                    <div className="col-12 col-md-12">
                                                                        {
                                                                            sample_info.pcpndtList &&
                                                                            <div className="section-title mb-1 mt-4 col-12">PCPNDT SCAN</div>
                                                                        }
                                                                        <div className="col-6">
                                                                            {sample_info.pcpndtList[id].scans.map(
                                                                                (name, container_id) => (
                                                                                    <>
                                                                                        <div className="row mb-1">
                                                                                            <div className="col-10">
                                                                                                <a href={name.location}>
                                                                                                    <div className="form-control mb-0">
                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                                                                                                        <label
                                                                                                            className="ml-2"
                                                                                                            style={{ fontSize: "12px" }}
                                                                                                        >
                                                                                                            {name.name ? name.name : name.originalname ? name.originalname : name.displayName}
                                                                                                        </label>
                                                                                                    </div>
                                                                                                </a>
                                                                                            </div>
                                                                                        </div>
                                                                                    </>
                                                                                )
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </>
                                                ))}
                                            </div>


                                        </>
                                    }

                                    {
                                        from == "Dashboard" && <>
                                            <div className="card p-3" style={{ 'box-shadow': 'none' }}>
                                                <div class="section-title mb-2 mt-0">Test Information:</div>
                                                <div className="row mb-2">
                                                    <div className="col-12 col-md-12">
                                                        <div className="form-group mb-0">
                                                            <label className="col-form-label col-sm-6">
                                                                <b>{test_info.test_name}</b>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    {sample_info.samples.map(
                                                        (sample, index) => (
                                                            <>
                                                                <div className="row mt-2 ml-2">
                                                                    <div className="row ml-2">
                                                                        <div class="section-title mb-1 mt-0">Sample {index + 1}</div>

                                                                    </div>
                                                                    <div className="row mb-1 ml-1 mr-1">

                                                                        <div className="col-6">
                                                                            <label className="form-control" style={{ height: "auto" }}>
                                                                                Sample  Type: {sample.sample_type}
                                                                            </label>
                                                                        </div>
                                                                        <div className="col-6">
                                                                            <label className="form-control" style={{ height: "auto" }}>
                                                                                Sample  status: {sample.status}
                                                                            </label>
                                                                        </div>
                                                                        {
                                                                            sample.containers.map((sampleDetail) =>

                                                                                <div className="col-12">
                                                                                    <div className="form-group mb-0">
                                                                                        <label className="form-control" style={{ height: "auto" }}>
                                                                                            Sample Container-Type: {sampleDetail.type}
                                                                                        </label>
                                                                                        <label className="form-control" style={{ height: "auto" }}>
                                                                                            Sample Container Id: {sampleDetail.id}
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </div>
                                                                </div>

                                                            </>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    }
                                    {/* **********SAMPLE INFO CLOSE********** */}
                                </>
                            }

                            {
                                from == "Confirmation" &&
                                <div className="card p-3" style={{ 'box-shadow': 'none' }}>
                                    <div class="section-title mb-2 mt-0">Payment Details:</div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="form-group mb-0">
                                                    <label>
                                                        <b>Selected Tests</b>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group mb-0">
                                                    <label>
                                                        <b>Price</b>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="mb-2 mt-0"></hr>
                                        {
                                            test_info.selectedTests.map((test, id) => (
                                                <>
                                                    <div className="row mb-1">
                                                        <div className="col-6">
                                                            <div className="form-group mb-0">
                                                                <label>{test.display_test_name}</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-group mb-0">
                                                                {/* <label>{test.mrp}</label> */}
                                                                <label>{payment.price_entered[id].mrp}</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            ))}
                                        <hr className="mb-1 mt-1"></hr>
                                        <div className="row">
                                            <div className="col-6">
                                                <div class="section-title mb-4 mt-0"><b>Total</b></div>
                                            </div>
                                            <div className="col-6">
                                                <div class="section-title mb-4 mt-0"><b><i class="fas fa-rupee-sign" style={{ 'font-size': '16px' }}></i> {props.totalMrp}</b></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            }
                            {
                                from == "Dashboard" && <>
                                    <div className="card p-3" style={{ 'box-shadow': 'none' }}>
                                        <div class="section-title mb-2 mt-0">Payment Details:</div>
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="form-group mb-0">
                                                        <label>
                                                            <b>Pays To</b>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group mb-0">
                                                        <label>
                                                            <b>{payment.paysTo}</b>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group mb-0">
                                                        <label>
                                                            <b>Amount</b>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group mb-0">
                                                        <label>
                                                            <b>{payment.mrp}</b>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }

                        </fieldset>
                    </div>
                </div>

            }

        </div>

    )
}

export default Summary