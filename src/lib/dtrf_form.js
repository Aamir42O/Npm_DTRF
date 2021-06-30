import React, { useState, useEffect } from "react";
import DtrfType from './components/dtrf_step_form/dtrf_basic'
import Institute from "./components/dtrf_step_form/institute";
import DoctorInfo from './components/dtrf_step_form/doctor_info'
import TestDetails from './components/dtrf_step_form/test_details'
import PatientDetails from './components/dtrf_step_form/patient_details'
import ClinicalHistory from './components/dtrf_step_form/clinical_info'
import ChooseCollectionLocation from './components/dtrf_step_form/ChooseCollectionLocation'
import Payment from './components/dtrf_step_form/payment'
import Confirmation from './components/dtrf_step_form/confirmation'
import Router from 'next/router'
import { useRouter } from 'next/router'
import { Modal, Button } from "react-bootstrap";
import Nav_bar from './components/nav_bar'
import Side_bar from './components/side_bar'
import Footer from './components/footer'
import store from './store'
import { getPatient_details, setFormData } from "./actions/formData";
import { connect } from "react-redux"
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';
import { Provider } from "react-redux"

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';

import Typography from '@material-ui/core/Typography';
import { nanoid } from "nanoid";

// New Stepper Close 

import { message } from "antd";
import { getClearDeleteFiles, getFiles, getPcpndtFiles, setFileUpload } from "./actions/fileupload";
import reqWithToken from "./helper/Auth"
    ;
import { setSentToBdm, setDtrfToken, setIsComplete } from "./actions/token";
import withAuth from "./components/authHOC";

const axios = require("axios");

let config = {
    headers: {
        token:
            process.env.NEXT_PUBLIC_TOKEN,
    },
};



const Dtrf_form = (props) => {
    console.log("MAIN DTRF PROPS", props)
    const [, reRender] = useState()
    const [cookies, setCookie] = useCookies();
    const [loadData, setLoadData] = useState(true)
    const [formValues, setFormValues] = useState('');
    let [currentPage, setCurrentPage] = useState(0);
    const [stepTitle, setStepTitle] = useState("DTRF Basic Info");
    const [modalShow, setModalShow] = useState(false)
    const [numberOfPageToggle, setNumberOfPageToggle] = useState(7);
    const router = useRouter()
    const getSavedDtrf = async () => {
        const url = process.env.NEXT_PUBLIC_GET_SUPER_DTRF + "/" + router.query.id
        const res = await reqWithToken(url, "GET")
        console.log("router", router.query)
        console.log("response", res)
        if (res.data.data.dtrf.dtrf) {
            if (res.data.data.dtrf.bdm_id) {
                props.setSentToBdm(true)
            }
            if (res.data.data.dtrf.admin_status == "COMPLETE") {
                props.setIsComplete(true)
            }
            let pcpndtFiles = res.data.data.dtrf.dtrf.test_info.selectedTests.map(() => {
                return { scans: [], names: [] }
            })
            props.getPcpndtFiles(pcpndtFiles)
            console.log("pcpndtFiles from getSavedDtrf", pcpndtFiles)
            if (res.data.data.dtrf.dtrf.medical_info && res.data.data.dtrf.dtrf.medical_info.medical_info.files) {

                if (res.data.data.dtrf.dtrf.medical_info.sample_info) {
                    pcpndtFiles = res.data.data.dtrf.dtrf.medical_info.sample_info.pcpndtList
                }
                console.log("pcpndtFiles from getSavedDtrf", pcpndtFiles)
                getFilesOnRedux(res.data.data.dtrf.dtrf.medical_info.medical_info.files, pcpndtFiles)
            }

            props.setFormData(res.data.data.dtrf.dtrf)
            setFormValues(res.data.data.dtrf.dtrf)
            if (res.data.data.dtrf.dtrf.patient_details) {
                props.getPatient_details(res.data.data.dtrf.dtrf.patient_details)
            }
            props.setDtrfToken(res.data.data.dtrf.dtrf_id)
        }
    }
    const getDtrfToken = () => {
        const dtrfToken = nanoid(10)
        props.setDtrfToken(dtrfToken)
    }

    useEffect(() => {
        if (props.fromSuperDtrf) {
            if (router.query && router.query.id && !formValues) {
                getSavedDtrf()
            } else {
                setFormValues({})
                getDtrfToken();
            }
        }
        else {
            getDtrfToken();
            if (!formValues) {
                setFormValues({})
            }
        }
    }, [])

    const handleFormSubmit = (form) => {
        console.log(form);
    }



    const handleDontClose = () => {

    }

    const handleOkayButtonClick = () => {
        Router.push("/")
    }
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~` New Stepper Open~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const [activeStep, setActiveStep] = React.useState(0);
    const handleOnClickPrevious = (e) => {
        window.scrollTo(0, 0)
        setCurrentPage(--currentPage)
        console.log("Root clickPrevious", currentPage)
        setStepTitleText(currentPage)
    }
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        reRender({})
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const goToStep = (step) => {
        setCurrentPage(step)
        setStepTitleText(step)
        setActiveStep(step)
    }

    const errorMessage = (msg) => {
        message.error(msg);
    };

    const savePcpndtFilesOnRedux = () => {

    }

    const getFilesOnRedux = (files, pcpndtFiles) => {

        console.log("FILES", files)
        console.log("PCPNDTFILES", pcpndtFiles)
        const filesKey = Object.keys(files)
        filesKey.map((key, index) => {
            if (key == "PCPNDT") {
                let loop = 0
                let pcpndt_list = []
                pcpndtFiles.map((asd) => {

                    pcpndt_list.push({ scans: [], names: [], noOfFiles: asd.noOfFiles })
                })

                pcpndtFiles.map((list, index) => {
                    for (let i = loop; i < list.noOfFiles; i++) {
                        let file = files.PCPNDT[i]
                        file.saved = true
                        let name = files.PCPNDT[i].originalname
                        pcpndt_list[index].scans.push(file)
                        pcpndt_list[index].names.push(name)
                    }
                    loop = list.noOfFiles
                })
                console.log("PCPNDTFILES FROM DASHBOARD", pcpndt_list)
                props.getPcpndtFiles(pcpndt_list)
            } else {

                filesKey.map((file) => {
                    const savedFiles = files[key].map((data) => {
                        data.saved = true
                        return data
                    })
                    props.getFiles({ [key]: savedFiles })
                })
            }
        })

    }
    const handleOnClickSave = async (formValues, values) => {
        console.log(props.fileUpload)
        console.log("FORM VALUES BEFORE SAVING", formValues)
        const formData = new FormData()
        let deletedFiles = props.fileUpload.deletedFiles
        if (deletedFiles.length > 0) {
            formData.append("deletedFiles", JSON.stringify(deletedFiles))
        }

        props.fileUpload.pcpndtFiles.map((test) => {

            test.scans.map((file) => {
                if (!test.saved) {

                    formData.append("PCPNDT", file)
                }
                file.saved = true
            })

        })
        const filesKey = Object.keys(props.fileUpload.files)
        filesKey.map((key, index) => {
            props.fileUpload.files[key].map((file) => {
                if (!file.saved) {
                    formData.append([key], file)
                }
            })
        })
        console.log(formData)

        formData.append("dtrf", JSON.stringify(formValues))
        formData.append("dtrf_id", JSON.stringify(props.Token.dtrfToken))
        const url = process.env.NEXT_PUBLIC_SAVE_INCOMPLETE_DTRF
        const response = await reqWithToken(url, "POST", formData)
        if (response) {
            console.log("RESPONSE", response)
            let newFormData = formValues
            if (response.data.data.files) {
                props.getClearDeleteFiles()
                if (formValues.medical_info) {
                    if (formValues.medical_info.medical_info) {
                        if (newFormData.medical_info) {
                            newFormData.medical_info.medical_info.files = response.data.data.files
                        }
                    }
                }
                getFilesOnRedux(response.data.data.files, props.fileUpload.pcpndtFiles)
            }

            console.log("NEW FORM DATA AFTER SAVING", newFormData)
            props.setFormData(newFormData)
        }
        return response

    }


    const handleOnClickNext = async (page, values) => {
        window.scrollTo(0, 0)

        const dtrfFormData = props.formValues
        if (page == "summery_page") {
            try {
                let formData = values
                if (router.query.ref1) {
                    dtrfFormData.followup = {}
                    dtrfFormData.followup.followupForTest = router.query.ref1;
                    dtrfFormData.followup.followupForDtrf = router.query.ref2;
                }
                dtrfFormData.ref_token = props.Token.refToken;
                dtrfFormData.dtrf_token = props.Token.dtrfToken;
                dtrfFormData.onlySaveDtrf = true;
                dtrfFormData.status = "Requested";

                const data = JSON.stringify(dtrfFormData)
                formData.append("formValues", data)

                // const response = await axios.post(process.env.NEXT_PUBLIC_DTRF_SAVE, { ...formValues, onlySaveDtrf: true, status: "Requested" }, config)

                const response = await axios.post(process.env.NEXT_PUBLIC_DTRF_SAVE, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

                console.log(response);
                if (response.data.message == "Success") {
                    setModalShow(true)
                } else {
                    errorMessage(response.data.message)
                }
            } catch (e) {
                console.log(e);
            }
        } else
            if (page == "patient_details" && formValues.collectionLocation.location == "Home") {

                console.log("HOME");
                goToStep(5)
                setCurrentPage(++currentPage)
                setStepTitleText(currentPage)

            } else if (true) {
                console.log("true");
                setCurrentPage(++currentPage)
                setStepTitleText(currentPage)
            }

        setFormValues({ ...props.formValues, [page]: values })
        props.setFormData({ ...props.formValues, [page]: values })

    }
    let Titles = ["Select Institute", "Select Doctor", "Select Test", "Collection Location",
        "Patient Information", "Clinical Information", "Payment", "Summary"]
    const setStepTitleText = (pageNumber) => {
        console.log("Set steptitle text", pageNumber)
        if (props.fromSuperDtrf) {
            setStepTitle(Titles[pageNumber])
        } else {
            setStepTitle(Titles[pageNumber + 1])
        }
    }


    const useQontoStepIconStyles = makeStyles({
        root: {
            color: '#eaeaf0',
            display: 'flex',
            height: 22,
            alignItems: 'center',
            padding: "0px"
        },
        active: {
            color: '#784af4',
        },
        circle: {
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
        },
        completed: {
            color: '#784af4',
            zIndex: 1,
            fontSize: 18,
        },
    });

    function QontoStepIcon(props) {
        const classes = useQontoStepIconStyles();
        const { active, completed } = props;

        return (
            <div
                className={clsx(classes.root, {
                    [classes.active]: active,
                })}
            >
                {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
            </div>
        );
    }


    QontoStepIcon.propTypes = {
        /**
         * Whether this step is active.
         */
        active: PropTypes.bool,
        /**
         * Mark the step as completed. Is passed to child components.
         */
        completed: PropTypes.bool,
    };

    const useStyles = makeStyles((theme) => ({
        root1: {
            width: '100%',
            padding: "0px"
        },
        button: {
            marginRight: theme.spacing(1),
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    }));
    function getSteps() {
        if (props.fromSuperDtrf) {
            return ["Institute Info", 'Doctor Info', 'Test Details', 'Choose collection', "patient Details", "Clinical History", "Payment", "Confirmation"];
        } else if (props.fromDtrfFront) {

            return ['Doctor Info', 'Test Details', 'Choose collection', "patient Details", "Clinical History", "Payment", "Confirmation"];
        }
    }
    const steps = getSteps();
    function getStepContent(step) {
        console.log("Step", step)
        if (props.fromSuperDtrf) {
            switch (step) {
                case 0:
                    return <Institute fromSuperDtrf={props.fromSuperDtrf} nextStep={handleNext} previousStep={handleBack} handleOnClickPrevious={handleOnClickPrevious} handleOnClickNext={handleOnClickNext} />
                case 1:
                    return <DoctorInfo fromSuperDtrf={props.fromSuperDtrf} nextStep={handleNext} previousStep={handleBack} handleOnClickPrevious={handleOnClickPrevious} handleOnClickNext={handleOnClickNext} />;
                case 2:
                    return <TestDetails fromSuperDtrf={props.fromSuperDtrf} handleOnClickSave={handleOnClickSave} nextStep={handleNext} previousStep={handleBack} formValues={formValues} handleOnClickPrevious={handleOnClickPrevious} handleOnClickNext={handleOnClickNext} />;;
                case 3:
                    return <ChooseCollectionLocation fromSuperDtrf={props.fromSuperDtrf} handleOnClickSave={handleOnClickSave} nextStep={handleNext} previousStep={handleBack} handleOnClickPrevious={handleOnClickPrevious} handleOnClickNext={handleOnClickNext} />;
                case 4:
                    return <PatientDetails fromSuperDtrf={props.fromSuperDtrf} handleOnClickSave={handleOnClickSave} goToStep={goToStep} nextStep={handleNext} previousStep={handleBack} formValues={formValues} handleOnClickPrevious={handleOnClickPrevious} handleOnClickNext={handleOnClickNext} />;
                case 5:
                    return <ClinicalHistory fromSuperDtrf={props.fromSuperDtrf} handleOnClickSave={handleOnClickSave} nextStep={handleNext} previousStep={handleBack} formValues={formValues} handleOnClickPrevious={handleOnClickPrevious} handleOnClickNext={handleOnClickNext} />
                case 6:
                    return <Payment fromSuperDtrf={props.fromSuperDtrf} handleOnClickSave={handleOnClickSave} goToStep={goToStep} nextStep={handleNext} previousStep={handleBack} formValues={formValues} handleOnClickPrevious={handleOnClickPrevious} handleOnClickNext={handleOnClickNext} />
                case 7:
                    return <Confirmation fromSuperDtrf={props.fromSuperDtrf} handleOnClickSave={handleOnClickSave} nextStep={handleNext} previousStep={handleBack} formValues={formValues} handleOnClickPrevious={handleOnClickPrevious} handleOnClickNext={handleOnClickNext} />
                default:
                    return 'Unknown step';
            }


        } else if (props.fromDtrfFront) {

            switch (step) {
                case 0:
                    return <DoctorInfo fromDtrfFront={props.fromDtrfFront} nextStep={handleNext} previousStep={handleBack} handleOnClickPrevious={handleOnClickPrevious} handleOnClickNext={handleOnClickNext} />;
                case 1:
                    return <TestDetails fromDtrfFront={props.fromDtrfFront} nextStep={handleNext} previousStep={handleBack} formValues={formValues} handleOnClickPrevious={handleOnClickPrevious} handleOnClickNext={handleOnClickNext} />;;
                case 2:
                    return <ChooseCollectionLocation fromDtrfFront={props.fromDtrfFront} nextStep={handleNext} previousStep={handleBack} handleOnClickPrevious={handleOnClickPrevious} handleOnClickNext={handleOnClickNext} />;
                case 3:
                    return <PatientDetails fromDtrfFront={props.fromDtrfFront} goToStep={goToStep} nextStep={handleNext} previousStep={handleBack} formValues={formValues} handleOnClickPrevious={handleOnClickPrevious} handleOnClickNext={handleOnClickNext} />;
                case 4:
                    return <ClinicalHistory fromDtrfFront={props.fromDtrfFront} nextStep={handleNext} previousStep={handleBack} formValues={formValues} handleOnClickPrevious={handleOnClickPrevious} handleOnClickNext={handleOnClickNext} />
                case 5:
                    return <Payment fromDtrfFront={props.fromDtrfFront} goToStep={goToStep} nextStep={handleNext} previousStep={handleBack} formValues={formValues} handleOnClickPrevious={handleOnClickPrevious} handleOnClickNext={handleOnClickNext} />
                case 6:
                    return <Confirmation fromDtrfFront={props.fromDtrfFront} nextStep={handleNext} previousStep={handleBack} formValues={formValues} handleOnClickPrevious={handleOnClickPrevious} handleOnClickNext={handleOnClickNext} />
                default:
                    return 'Unknown step';
            }
        }

    }
    const classes = useStyles();
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ New Stepper Close~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~




    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    return (
        <div>
            <Modal
                show={modalShow}
                onHide={handleDontClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                data-backdrop="static"
            >

                <Modal.Body>
                </Modal.Body>
                <Modal.Header>
                    <Modal.Title>Your DTRF has been successfully submitted !</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <div className="text-right">
                        <Button variant="primary" type="submit" onClick={handleOkayButtonClick}>
                            Okay
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
            {/* <div className="loader"></div> */}
            {
                formValues &&
                <div className="main-content">

                    <section className="section">
                        <div className="section-body">
                            <div className="row clearfix">
                                <div className="offset-md-2 col-md-8">
                                    <div className="card card-primary">
                                        <div className="card-header">
                                            <h4>{stepTitle}</h4>
                                        </div>
                                        <div className="row clearfix">
                                        </div>
                                        <div className="customBloodWrap">
                                            <div className={classes.root}>
                                                <Stepper alternativeLabel activeStep={activeStep}>
                                                    {console.log("Active Step", activeStep)}
                                                    {steps.map((label) => (
                                                        <Step key={label}>
                                                            <StepLabel></StepLabel>
                                                        </Step>
                                                    ))}
                                                </Stepper>
                                            </div>
                                            {getStepContent(activeStep)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            }


        </div>
    );
};

const mapStateToProps = state => ({
    Token: state.Token,
    formValues: state.formData.formData,
    fileUpload: state.fileUpload,

})



export default connect(mapStateToProps, { setFormData, setDtrfToken, getClearDeleteFiles, getFiles, getPcpndtFiles, setSentToBdm, setIsComplete, setFileUpload, getPatient_details })(Dtrf_form);

// export default Dtrf_formsesetIsComplete