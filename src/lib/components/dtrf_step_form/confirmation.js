import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
const axios = require("axios");
import { Modal, Button } from "react-bootstrap";
import Router from 'next/router'
import { connect } from "react-redux";
import { getFile } from "../../actions/fileupload";
import { useRouter } from 'next/router'
import formData from "../../reducers/form";
import Cookies from "js-cookie"

import {

  getLimitationOfTest,
  getPcpndtFiles,
} from "../../actions/fileupload";
import { message, Tag, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons'
import reqWithToken from "../../helper/Auth";
import Summary from "../Summary";
import { successMessage, MousePopover, errorMessage, warningMessage, infoMessage } from "../../helper/commonHelper";
import { setFormData } from "../../actions/formData";
import { validateField } from "../../helper/customValidator";


const Confirmation = (props) => {
  const [formValues, setFormValues] = useState(null);
  const [, reRender] = useState();
  const [testList, setTestList] = useState([]);
  const [paysTo, setPaysTo] = useState("");
  const [totalMrp, setTotalMrp] = useState(0);
  const [mrpList, setMrpList] = useState([]);
  const [firstLoad, setFirstLoad] = useState(false);
  const [hasCyto, setHasCyto] = useState(false);
  const [hasNipt, setHasNipt] = useState(false);
  const [hasPns, setHasPns] = useState(false);
  const [isThalasammia, setIsThalasammia] = useState(false)
  const [hasCytoPrenatal, setHasCytoPrenatal] = useState(false);
  const [testGroup, setTestGroup] = useState("")
  const [testTrimester, setTestTrimester] = useState("");

  const [containerId, setContainerId] = useState([]);
  const [selectedContainerType, setSelectedContainerType] = useState([]);
  const [sampleContainerList, setSampleContainerList] = useState([]);
  const [containerIdErrors, showContainerIdErrors] = useState(false);
  const [containerTypeErrors, showContainerTypeErrors] = useState(false);
  const [pcpndtList, setPcpndtList] = useState([]);
  const [collectionLocation, setCollectionLocation] = useState([]);
  const [pcpndtReference, setPcpndtReference] = useState([]);
  const [modalShow, setModalShow] = useState(false)
  const [patientLink, setPatientLink] = useState()
  const [hasPoc, setHasPoc] = useState(false)
  const [confirmationByPatient, setConfirmationByPatient] = useState()

  const [hasNbs, setHasNbs] = useState(false)
  const [hasPreEclampsiaTest, setHasPreEclampsiaTest] = useState(false)
  const [isPcpnndt, setIsPcpndt] = useState(false)
  const [linkedSent, setLinkedSent] = useState(false)
  const [dtrfId, setDtrfId] = useState("")
  const [homeLocationModalShow, setHomeLocationModalShow] = useState(false)
  const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;
  const [showPrevious, setShowPrevious] = useState(true)
  const [filesUploaded, setFilesUploaded] = useState([])


  const getTestList = () => {
    console.log("In side getTEstList")
    console.log(props.formValues)
    const list = props.formValues;
    let sampleContainers = [];
    let containerIdErrorsList = [];
    let containerTypeErrorList = [];
    let containerIdList = [];
    let containerTypeList = [];
    let pcpndt_list = [];
    let pcpndtLocation = [];
    let pcpndtInputReference = [];

    console.log(list);

    if (list.payment.confirmationBy == "Patient") {
      setConfirmationByPatient(true)
    } else if (list.payment.paysTo == "Lab" && list.payment.paymentMode == "Digital") {
      setConfirmationByPatient(true)
    }

    else {
      setConfirmationByPatient(false)
    }


    if (list) {
      console.log("list test info", list.test_info)
      if (list.test_info) {
        setTestList(list.test_info.selectedTests);

        console.log("set test list", list.test_info.selectedTests)
        let total = 0;
        let mrpList = [];
        let mandatory_Files = []
        let nonMandatory_Files = []
        let tempMandatoryFiles = []
        let tempNonMandatoryFiles = []

        list.test_info.selectedTests.map((test, id) => {
          if (test.pcpndt) {
            setIsPcpndt(true)
          }
          mrpList.push({ mrp: test.mrp });
          total += test.mrp;
          sampleContainers.push({ containers: [] });
          containerIdErrorsList.push(false);
          containerTypeErrorList.push(false);
          containerIdList.push({ value: "" });
          containerTypeList.push({ value: "" });
          pcpndt_list.push({ scans: [], names: [] });
          pcpndtLocation.push({ location: "" });
          setTestGroup(test.sub_group)
          if (test.mandatory_attachments) {

            test.mandatory_attachments.map((data) => {
              if (id == 0) {
                tempMandatoryFiles.push(data.variable)
                mandatory_Files.push(data)
              } else {
                if (!tempMandatoryFiles.includes(data.variable)) {
                  mandatory_Files.push(data)
                }
              }
            })
          }
          if (test.non_mandatory_attachments) {

            test.non_mandatory_attachments.map((data) => {
              if (id == 0) {
                tempNonMandatoryFiles.push(data.variable)
                nonMandatory_Files.push(data)
              } else {
                if (!tempNonMandatoryFiles.includes(data.variable) && !tempMandatoryFiles.includes(data.variable)) {
                  nonMandatory_Files.push(data)
                }
              }
            })
          }

          if (test.sub_group == "CYTO" || test.sub_group == "CMA") {
            if (test.sample_category == "Prenatal") {
              setHasCytoPrenatal(true);
            }
            if (test.sample_category == "Product of conception(POC)") {
              setHasPoc(true);
            }
            setHasCyto(true);
          } else if (test.sub_group == "NIPT") {
            setHasNipt(true);
          } else if (test.sub_group == "PNS") {
            if (test.is_thalasseima) {
              setIsThalasammia(test.is_thalasseima)
            }
            if (test.is_pre_eclampsia) {
              setHasPreEclampsiaTest(true)
            }
            setTestTrimester(test.trimester_test);
            setHasPns(true);

          } else if (test.sub_group == "NBS") {
            setHasNbs(true)
          }
        });
        setFilesUploaded([...mandatory_Files, ...nonMandatory_Files])
        setCollectionLocation(pcpndtLocation);
        setContainerId(containerIdList);
        setSelectedContainerType(containerTypeList);
        setSampleContainerList(sampleContainers);
        showContainerIdErrors(containerIdErrorsList);
        showContainerTypeErrors(containerTypeErrorList);
        setPcpndtList(pcpndt_list);
        console.log("root mrp", list.payment.price_entered)
        setMrpList(list.payment.price_entered);
        setTotalPrice(list.payment.price_entered);
      }
    }
  };
  // !~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~FILEUPLOA!!!!!!!!!!!!!!!!!!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const [patientConsentFile, setPatientConsentFile] = useState(null)
  const [otherFiles, setOtherFiles] = useState(null)
  const [doctorAttestationFile, setDoctorAttestationFile] = useState(null)
  const [patientDeclarationPNDT, setPatientDeclarationPNDT] = useState(null)
  const [patientInformedConsent, setPatientInformedConsent] = useState(null)
  const [consentAndIndemnity, setConsentAndIndemnity] = useState(null)
  const [limitationOfTest, setLimitationOfTest] = useState(null)
  const [patientPrivacy, setPatientPrivacy] = useState(null)
  const [pnsReport, setPnsReport] = useState(null)
  const [referralLetter, setReferralLetter] = useState(null)
  const [cbcFile, setCbcFile] = useState(null)
  const [cbcDocFile, setCbcDocFile] = useState(null)
  const [bthFile, setBthFile] = useState(null)
  const getFilesToMap = files => {
    console.log("INSIDE GETFILES TO MAPPPP!!!!!!!!!s", files)
    let fileList = []

    Array.from(files).forEach((file => {
      console.log("FIles", file)
      fileList.push(file)

    }))
    console.log("GETFILES TO MAP FINAL FILES", fileList)
    return fileList

  }
  const [ntScan, setNtScan] = useState(null)
  const [usgFile, setUsgFile] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)

  // !!!!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~FILE UPLOAD CLOSE~!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const router = useRouter()
  useEffect(() => {
    const fileuploads = props.fileUpload
    console.log(fileuploads)
    console.log("TESTLIST", testList)
    console.log("props", props)
    if (hasPns && isThalasammia && !bthFile) {
      if (props.bth) {
        console.log("@!#!#!@#@#####################################")
        setBthFile(props.bth)
        setCbcFile(props.cbc)
        setCbcDocFile(props.cbcDoc)
      }
    }

    if (!referralLetter && props.referralLetter) {
      setReferralLetter(props.referralLetter)
    }
    if (!ntScan && props.ntScan) {
      setNtScan(props.ntScan)
    }
    if (!pnsReport && props.pnsReport) {
      setPnsReport(props.pnsReport)
    }
    if (!selectedFile && props.fileUpload) {
      console.log(props.fileUpload)
      setSelectedFile(props.fileUpload)
    }
    if (!usgFile && props.usgFile) {
      setUsgFile(props.usgFile)
    }
    if (!otherFiles && props.otherFiles) {
      setOtherFiles(props.otherFiles)
    }
    if (!consentAndIndemnity && props.consentAndIndemnity) {
      setConsentAndIndemnity(props.consentAndIndemnity)
    }
    if (!limitationOfTest && props.limitationOfTest) {
      setLimitationOfTest(props.limitationOfTest)
    }
    if (!patientPrivacy && props.patientPrivacy) {
      setPatientPrivacy(props.patientPrivacy)
    }
    if (!doctorAttestationFile && props.doctorAttestationFile) {
      setDoctorAttestationFile(props.doctorAttestationFile)
    }
    if (!patientDeclarationPNDT && props.patientDeclarationPNDT) {
      setPatientDeclarationPNDT(props.patientDeclarationPNDT)
    }
    if (!patientInformedConsent && props.patientInformedConsent) {
      setPatientInformedConsent(props.patientInformedConsent)
    }
    if (!patientConsentFile && props.patientConsentFile) {
      setPatientConsentFile(props.patientConsentFile)
    }
    if (!formValues) {
      console.log("INside UseEffect IF ")
      const form = props.formValues;
      setFormValues(form);
      console.log(form);
      console.log(1, form);
      getTestList();
    }


    // setTotalPrice(mrpList);
  }, []);

  const setTotalPrice = (mrpList) => {
    let total = 0;
    mrpList.map((mrp) => {
      console.log(mrp);
      total += mrp.mrp;
      console.log("total", total)
    });
    console.log(total);
    setTotalMrp(total);
    reRender({});
  };

  const handleOnClickPrevious = () => {
    console.log("Current Step", props.currentStep)
    props.handleOnClickPrevious();
    props.previousStep();
  };

  const pageRefresh = () => {
    console.log(props.formValues)
    props.handleOnClickNext("summery_page", "");
  };

  const sendDtrf = async () => {
    console.log("send DTRF")
    const url = "http://localhost:8184/dtrf/check-verification/" + dtrfId
    const response = await reqWithToken(url, "GET", null, { superDtrf: props.fromSuperDtrf, dtrfFront: props.fromDtrfFront })

    console.log(response, "SEND DTRF RESPONSE")
    if (response.data.message == "Success") {
      setSubmitted(true)
      return setModalShow(true)
    }
  }
  const [submitted, setSubmitted] = useState(false)
  const [showLoader, setShowLoader] = useState(false)

  // !!!!!~~~~~~~~~~~~~~~~~~~~~~~~ ADMIN PANEL CODE ~~~~~~~~~~~~~~~~~~~~!!!!!!!!!!!!!!!!!!!
  const verifyPatientForm = (values) => {
    let errors = {}
    if (!values) {
      errors.patient_info = "Required"
    } else {

      if (!values.filledBy) {
        errors.filledBy = "Required"
      } else if (values.filledBy != "patient") {

        if (!values.firstName) {
          errors.firstName = "Required"
        }
        if (!values.lastName) {
          errors.lastsName = "Required"
        }
        if (!values.contact) {
          errors.contact = "Required"
        }
        if (!values.ageType) {
          errors.ageType = "Required"
        }
        if (values.ageType == "dob") {
          if (!values.dateOfBirth) {
            errors.dateOfBirth = "Required"
          }
        } else if (values.ageType == "ageInYMD") {
          if (!values.ageInYears || !values.ageInMonths ||
            !values.ageInDays) {
            errors.ageInDays = "Required"
          }
        }
        if (!values.gender) {
          errors.gender = "Required"
        }
        if (!values.pinCode) {
          errors.pinCode = "Required"
        }
        if (!values.city) {
          errors.city = "Required"
        }
        if (!values.state) {
          errors.state = "Required"
        }
      }
      if (hasNbs) {
        const hasBabyName = values.hasBabyName.toString()
        if (!hasBabyName) {
          errors.hasBabyName = "Required"
        }
        if (!values.mothersFirstName) {
          errors.mothersFirstName = "Required"
        }
        if (!values.mothersDateOfBirth) {
          errors.mothersDateOfBirth = "Required"
        }
        if (!values.mothersLastName) {
          errors.mothersLastName = "Required"
        }
        if (!values.weight) {
          errors.weight = "Required"
        }
      } else {

      }
      if (hasPns || hasNipt) {
        if (!values.height) {
          errors.height = "Required";
        } else if (hasPns && (values.height < 61 || values.height > 198)) {
          errors.height = "Height should be between 61cm and 198cm"
        }
        if (!values.weight) {
          errors.weight = "Required"
        } else if (!Number(values.weight)) {
          errors.weight = "Should be Number";
        } else if (hasPns && (values.weight < 20 || values.weight > 200)) {
          errors.weight = "Weight should be between 20kg and 200 kg "
        }
      }
    }
    console.log("ERRORS IN PATIENT FORM", errors)
    return errors
  }
  const verifyMedicalInfoForm = (values) => {
    let errors = {}
    errors = validateField(values)
    if (hasCyto) {
      if (values.referralReason.length > 0) {
        if (values.referralReason.includes("Family History of any chromosomal abnormality")) {
          if (!values.familyHistory) {
            errors.referralReason = "Please fill the checked Field"
          }
        }
        if (values.referralReason.includes("Advance Maternal Age")) {
          if (!values.advanceMaternalAge) {
            errors.referralReason = "Please fill the checked Field"
          }
        }
        if (values.referralReason.includes("Genetic Disease in Father/Mother/Sibling")) {
          if (!values.geneticDiseaseInFMS) {
            errors.referralReason = "Please fill the checked Field"
          }
        }
        if (values.referralReason.includes("Consanguinity")) {
          if (!values.consanguinity) {
            errors.referralReason = "Please fill the checked Field"
          }
        }
        if (values.referralReason.includes("Others")) {
          if (!values.Others) {
            errors.referralReason = "Please fill the checked Field"
          }
        }
      }
    }

    // if (hasNbs) {
    //   if (!values.sampleCollectionDate) {
    //     errors.sampleCollectionDate = "Required"
    //   }
    //   if (values.sampleCollectionDate && values.firstFeedingDate) {
    //     const diff = moment(values.sampleCollectionDate).diff(values.firstFeedingDate, "days")
    //     console.log(diff, "SAMPLE AND FEEDING DATE DIFF")
    //     if (diff < 1) {
    //       errors.sampleCollectionDate = "Date should be greater than First feeding date by 24hrs"
    //     }
    //     // sample collection date cant be greater than patient Date of birth 
    //     const diff2 = moment(values.sampleCollectionDate).diff(props.formValues.patient_details.dateOfBirth, "days")
    //     if (diff2 < 0) {
    //       errors.sampleCollectionDate = "Date cant be before patients date of birth"
    //     }
    //   }
    //   if (values.firstFeedingDate && props.formDataRedux.patient_details.dateOfBirth) {
    //     const diff = moment(values.firstFeedingDate).diff(moment().format("YYYY-MM-DD"), "days")
    //     if (diff > 0) {
    //       errors.firstFeedingDate = "Invalid Date"
    //     }

    //     const diff2 = moment(values.firstFeedingDate).diff(props.formDataRedux.patient_details.dateOfBirth, "days")
    //     if (diff2 < 0) {
    //       errors.firstFeedingDate = "Date cant be before patients date of birth"
    //     }
    //   }
    //   if (!values.firstFeedingDate) {
    //     errors.firstFeedingDate = "Required"
    //   }
    //   if (!values.typeOfFeeding) {
    //     errors.typeOfFeeding = "Required"
    //   }
    //   if (!values.hoTransfusion) {
    //     errors.hoTransfusion = "Required"
    //   } else if (values.hoTransfusion == "Yes") {
    //     if (!values.dateOfHoTransfusion) {
    //       errors.dateOfHoTransfusion = "Required"
    //     } else {
    //       const diff = moment(values.dateOfHoTransfusion).diff(moment().format("YYYY-MM-DD"), "days")
    //       if (diff > 0) {
    //         errors.dateOfHoTransfusion = "Invalid Date"
    //       }
    //     }


    //     if (values.dateOfHoTransfusion && props.formDataRedux.patient_details.dateOfBirth) {

    //       const diff2 = moment(values.dateOfHoTransfusion).diff(props.formValues.patient_details.dateOfBirth, "days")
    //       console.log({ diff2 })
    //       if (diff2 < 0) {
    //         errors.dateOfHoTransfusion = "Date cant be before patients date of birth"
    //       }
    //     }
    //   }
    //   if (!values.deliveryStatus) {
    //     errors.deliveryStatus = "Required"
    //   }

    // } else {
    //   if (!values.sampleCollectionDate) {
    //     errors.sampleCollectionDate = "Required"
    //   }
    //   if (!hasCyto) {

    //     if (!values.usgDate) {
    //       errors.usgDate = "Required"
    //     }
    //     if (!values.currentGestationalAgeWeeks) {
    //       errors.currentGestationalAgeWeeks = "Required"
    //     }
    //     if (!values.currentGestationalAgeDays) {
    //       errors.currentGestationalAgeDays = "Required"
    //     }
    //   }
    //   if (!values.gestationalAgeWeeks && values.gestationalAgeWeeks != 0) {
    //     errors.gestationalAgeWeeks = "Required";
    //   }
    //   if (!values.gestationalAgeDays && values.gestationalAgeDays != 0) {
    //     errors.gestationalAgeDays = "Required";
    //   }

    // }

    // if (hasPns) {
    //   if (!values.historyOfDownSyndrome) {
    //     errors.historyOfDownSyndrome = "Required";
    //   } else if (values.historyOfDownSyndrome == "Yes") {
    //     if (!values.confirmatoryTestHDS) {
    //       errors.confirmatoryTestHDS = "Required"
    //     }
    //   }
    //   if (!values.historyOfEdwardsSyndrome) {
    //     errors.historyOfEdwardsSyndrome = "Required";
    //   } else if (values.historyOfEdwardsSyndrome == "Yes") {
    //     if (!values.confirmatoryTestHES) {
    //       errors.confirmatoryTestHES = "Required"
    //     }
    //   }
    //   if (!values.historyOfPatauSyndrome) {
    //     errors.historyOfPatauSyndrome = "Required"
    //   } else if (values.historyOfPatauSyndrome == "Yes") {
    //     if (!values.confirmatoryTestHPS) {
    //       errors.confirmatoryTestHPS = "Required"
    //     }
    //   }
    //   if (!values.diabetesInsulinDependent) {
    //     errors.diabetesInsulinDependent = "Required";
    //   } else if (values.diabetesInsulinDependent == "Yes") {

    //   }
    //   if (!values.patientOnHcg) {
    //     errors.patientOnHcg = "Required";
    //   }
    //   if (!values.typeOfConception) {
    //     errors.typeOfConception = "Required";
    //   } else if (values.typeOfConception == "Assisted") {
    //     if (!values.typeOfProcedure) {
    //       errors.typeOfProcedure = "Required";
    //     }
    //     if (!values.extractionDate) {
    //       errors.extractionDate = "Required";
    //     }
    //     if (!values.transferDate) {
    //       errors.transferDate = "Required";
    //     }
    //   } else if (values.typeOfProcedure == "Donor Egg") {
    //     if (!values.donorDob) {
    //       errors.donorDob = "Required";
    //     }
    //   }

    //   if (testTrimester == "First" && values.presentPregnancy != "Twins") {
    //     if (!values.crl) {
    //       errors.crl = "Required";
    //     }

    //   }
    //   if (values.presentPregnancy == "Twins") {
    //     if (!values.twinCrl1) {
    //       errors.twinCrl1 = "Required"
    //     }
    //     if (!values.twinCrl2) {
    //       errors.twinCrl2 = "Required"
    //     }
    //     if (!values.twinNt1) {
    //       errors.twinNt1 = "Required";
    //     }
    //     if (!values.twinNt2) {
    //       errors.twinNt2 = "Required";
    //     }
    //   }
    //   if (testTrimester == "Second") {
    //     if (!(values.bpd || values.fl || values.hc || values.crl)) {
    //       errors.fl = "At least one should be filled";
    //     }
    //   }
    //   if (hasPreEclampsiaTest) {
    //     if (!values.bpOrMap) {
    //       errors.bpOrMap = "Required"
    //     } else {
    //       if (values.bpOrMap == "BP") {
    //         if (!values.bpMeasurementDate) {
    //           errors.bpMeasurementDate = "Required"
    //         }
    //         if (!values.bpLeftSystolic1) {
    //           errors.bpLeftSystolic1 = "Required"
    //         }
    //         if (!values.bpLeftDiSystolic1) {
    //           errors.bpLeftDiSystolic1 = "Required"
    //         }
    //         if (!values.bpLeftSystolic2) {
    //           errors.bpLeftSystolic2 = "Required"
    //         }
    //         if (!values.bpLeftDiSystolic2) {
    //           errors.bpLeftDiSystolic2 = "Required"
    //         }
    //         if (!values.bpRightSystolic1) {
    //           errors.bpRightSystolic1 = "Required"
    //         }
    //         if (!values.bpRightDiSystolic1) {
    //           errors.bpRightDiSystolic1 = "Required"
    //         }
    //         if (!values.bpRightSystolic2) {
    //           errors.bpRightSystolic2 = "Required"
    //         }
    //         if (!values.bpRightDiSystolic2) {
    //           errors.bpRightDiSystolic2 = "Required"
    //         }
    //       } else if (values.bpOrMap == "MAP") {
    //         if (!values.mapReading1) {
    //           errors.mapReading1 = "Required"
    //         }
    //         if (!values.mapReading2) {
    //           errors.mapReading2 = "Required"
    //         }
    //       }
    //     }
    //     if (!values.familyHistoryPreEclampsia) {
    //       errors.familyHistoryPreEclampsia = "Required"
    //     }
    //     if (!values.chronicHypertension) {
    //       errors.chronicHypertension = "Required"
    //     }
    //     if (!values.uterineArteryPulsativeIndexRightPI) {
    //       errors.uterineArteryPulsativeIndexRightPI = "Required"
    //     }
    //     if (!values.uterineArteryPulsativeIndexLeftPI) {
    //       errors.uterineArteryPulsativeIndexLeftPI = "Required"
    //     }
    //     if (!values.familyHistoryPreEclampsia) {
    //       errors.familyHistoryPreEclampsia = "Required"
    //     }
    //     if (!values.chronicHypertension) {
    //       errors.chronicHypertension = "Required"
    //     }
    //     if (!values.uterineArteryPulsativeIndexRightPI) {
    //       errors.uterineArteryPulsativeIndexRightPI = "Required"
    //     }
    //     if (!values.uterineArteryPulsativeIndexLeftPI) {
    //       errors.uterineArteryPulsativeIndexLeftPI = "Required"
    //     }
    //   }

    // }
    // if (hasNipt) {
    //   if (values.presentPregnancy == "Vanishing Twin") {
    //     if (!values.dateOfTwinVanishOrReduced) {
    //       errors.dateOfTwinVanishOrReduced = "Required";
    //     }
    //   }
    //   if (!values.ivfPregnancy) {
    //     errors.ivfPregnancy = "Required";
    //   } else if (values.ivfPregnancy == "Yes") {
    //     if (!values.eggUsed) {
    //       errors.eggUsed = "Required";
    //     }
    //     if (!values.ageAtEggRetrieval) {
    //       errors.ageAtEggRetrieval = "Required";
    //     }
    //   }
    //   if (!values.surrogate) {
    //     errors.surrogate = "Required";
    //   }
    //   if (!values.previousPregnancy) {
    //     errors.previousPregnancy = "Required"
    //   } else if (values.previousPregnancy == "Yes") {
    //     if (!values.prevPregDate) {
    //       errors.prevPregDate = "Required"
    //     }
    //     if (!values.spontaneousAbortion) {
    //       errors.spontaneousAbortion = "Required"
    //     }
    //     if (!values.terminationPregnancy) {
    //       errors.terminationPregnancy = "Required"
    //     }
    //   }
    //   if (values.referralReason.length > 0) {

    //     values.referralReason.map((reason) => {
    //       if (reason.value == "previous pregnancy affected by genetic disorders" && !values.conditionAffectsPreviousPregnancy) {
    //         errors.conditionAffectsPreviousPregnancy = "Required"
    //       }
    //       if (reason.value ==
    //         "patient is a carrier of genetic disorders" &&
    //         !values.conditionPatientIsCarrierOf) {
    //         errors.conditionPatientIsCarrierOf = "Required";
    //       }
    //       if (
    //         reason.value ==
    //         "serum screen risk"
    //       ) {
    //         if (!values.t21RiskScore) {
    //           errors.t21RiskScore = "Required";
    //         }
    //         if (!values.t18RiskScore) {
    //           errors.t18RiskScore = "Required";
    //         }
    //         if (!values.t13RiskScore) {
    //           errors.t13RiskScore = "Required";
    //         }

    //       }
    //       if (
    //         reason.value ==
    //         "family history" &&
    //         !values.familyHistory
    //       ) {
    //         errors.familyHistory = "Required";
    //       }
    //       if (reason.value == "others" && !values.otherReferralReason) {
    //         errors.otherReferralReason = "Required";
    //       }

    //     })
    //   }
    //   else {
    //     errors.referralReason = "Required"
    //   }


    // }
    // if (hasCyto) {
    //   if (values.referralReason.length == 0) {
    //     errors.referralReason = "Atleast One is Required"
    //   }
    //   if (values.referralReason.length > 0) {
    //     if (values.referralReason.includes("Family History of any chromosomal abnormality")) {
    //       if (!values.familyHistory) {
    //         errors.referralReason = "Please fill the checked Field"
    //       }
    //     }
    //     if (values.referralReason.includes("Advance Maternal Age")) {
    //       if (!values.advanceMaternalAge) {
    //         errors.referralReason = "Please fill the checked Field"
    //       }
    //     }
    //     if (values.referralReason.includes("Genetic Disease in Father/Mother/Sibling")) {
    //       if (!values.geneticDiseaseInFMS) {
    //         errors.referralReason = "Please fill the checked Field"
    //       }
    //     }
    //     if (values.referralReason.includes("Consanguinity")) {
    //       if (!values.consanguinity) {
    //         errors.referralReason = "Please fill the checked Field"
    //       }
    //     }
    //     if (values.referralReason.includes("Others")) {
    //       if (!values.Others) {
    //         errors.referralReason = "Please fill the checked Field"
    //       }
    //     }
    //   }
    //   if (hasCytoPrenatal) {

    //     if (!values.maternalAge) {
    //       errors.maternalAge = "Required";
    //     }
    //     if (!values.motherGeneticDisease) {
    //       errors.motherGeneticDisease = "Required";
    //     }
    //     if (!values.fatherGeneticDisease) {
    //       errors.fatherGeneticDisease = "Required";
    //     }
    //     if (!values.siblingGeneticDisease) {
    //       errors.siblingGeneticDisease = "Required";
    //     }
    //   }
    //   if (hasPoc || hasCytoPrenatal) {
    //     if (!values.consanguinity) {
    //       errors.consanguinity = "Required"
    //     }
    //   }
    // }
    // if (hasNipt || hasPns) {
    //   if (!values.presentPregnancy) {
    //     errors.presentPregnancy = "Required";
    //   }
    //   if (values.presentPregnancy == "Twins") {
    //     if (!values.twinType) {
    //       errors.twinType = "Required"
    //     }
    //     if (values.twinType == "Monochorionic") {
    //       if (!values.monochorionicType) {

    //         values.monochorionicType = "Required"
    //       }
    //     }

    //   }

    // }
    console.log("ERRORS IN Clinical FORM", errors)

    return errors
  }
  const fileUploadValidation = (files) => {
    let errors = {}
    let fileErrors = null
    props.fileUpload.mandatoryFiles.map((data) => {
      console.log("mandatoryfiles", data)
      if (!props.fileUpload.files[data.variable] || (props.fileUpload.files[data.variable] && props.fileUpload.files[data.variable].length <= 0)) {
        if (fileErrors) {
          errors[data.variable] = "Required"
          fileErrors = fileErrors + ", " + data.display
        } else {
          errors[data.variable] = "Required"
          fileErrors = data.display
        }
      }
    })
    if (hasNipt) {
      props.fileUpload.pcpndtFiles.map((data) => {
        if (data.scans) {

          if (data.scans.length <= 0) {
            errors.pcpndtFiles = "Required"
          }
        }
      })
    }

    console.log("ERRORS IN FILE", errors)
    if (!(Object.keys(errors).length === 0 && errors.constructor === Object)) {
      console.log("ERRORS", errors)
      warningMessage("Please attach " + fileErrors)
      return true
    } else {
      return false
    }

  }
  const verifySample = (values) => {
    let errors = {}
    if (!values) {
      errors.sampleInfo = "Required"
    } else {
      if (values.sampleContainerList) {

        values.sampleContainerList.map((container) => {

          if (container) {
            if (container.containers.length == 0) {
              console.log("inside sample", container)
              errors.container = "Required"
            }
          }
        })
      }
      props.formDataRedux.test_info.selectedTests.map((test) => {
        if (test.pcpndt) {

        }
      })
    }
    console.log("SAMPLE", values, errors)
    if (!(Object.keys(errors).length === 0 && errors.constructor === Object)) {
      console.log("SAMPLE ERRORS", errors)
      warningMessage("Please Add container")
      return errors
    } else {
      return errors
    }
  }
  const verifyDTRFForm = (formValues) => {
    let errors = {}
    if (formValues.test_info.selectedTests.length == 0) {
      errors.selectedTests = "Required"
    }
    if (!formValues.doctor_info.doctorName) {
      errors.doctorName = "Required"
    }

    if (!formValues.institute_info.instituteName) {
      errors.institute_info = "Required"
    }
    if (!formValues.collectionLocation.location) {
      errors.collectionLocation = "Required"
    }
    errors = { ...errors, ...verifyPatientForm(formValues.patient_details) }
    errors = { ...errors, ...verifyMedicalInfoForm(formValues.medical_info.medical_info) }
    errors = { ...errors, ...verifySample(formValues.medical_info.sample_info) }
    if (formValues.collectionLocation.location != "Home" && (!formValues.payment.paysTo)) {
      errors.paysTo = "Required";
    }
    if (formValues.collectionLocation.location != "Home" && (!formValues.payment.confirmationBy)) {
      errors.confirmationBy = "Required";
    }
    if (formValues.collectionLocation.location == "Home" && (!formValues.payment.paidToInstitute)) {
      errors.paidToInstitute = "Required";
    }
    if (formValues.collectionLocation.location != "Home" && formValues.payment.paysTo == "Lab" && (!formValues.payment.paymentMode)) {

      errors.paymentMode = "Required";
    }
    if (formValues.payment.price_entered.length != formValues.test_info.selectedTests.length) {
      errors.price = "Required"
    }

    if (!(Object.keys(errors).length === 0 && errors.constructor === Object)) {
      console.log("ERRORS", errors)
      warningMessage("Please fill all required fields before submitting")
      return true
    } else {
      successMessage("All Required fields are filled")
      // Submit Incomplete Form
      return false
    }
  }

  const handleOnClickSave = async () => {
    console.log(props.formValues)
    const response = await props.handleOnClickSave(props.formDataRedux)
    if (response) {

      if (response.status == 200) {
        successMessage("Form Data Saved")
      } else {
        errorMessage("Error in Saving Form")
      }
    } else {
      errorMessage("Error in Saving Form")
    }
    console.log("INCOMEPLETE FORMDATA SEND", response)
  }

  const handleOnClickSaveAndExit = async () => {
    await handleOnClickSave();
    Router.push("/super-dtrf")
  }

  const handleOnClickBDM = async () => {
    var formData = new FormData()
    await handleOnClickSave()
    if (!props.formDataRedux.institute_info.instituteName) {
      return warningMessage("Please select Institute before submitting to BDM")
    }
    const url = process.env.NEXT_PUBLIC_SUBMIT_TO_BDM + "/" + props.Token.dtrfToken
    let data = {}
    data.institute_id = props.formDataRedux.institute_info.instituteName.lilac_id

    const response = await reqWithToken(url, "POST", data, { superDtrf: props.fromSuperDtrf, dtrfFront: props.fromDtrfFront })
    if (response.status == 200) {
      successMessage("Submitted to BDM successfully")
      Router.push("/super-dtrf")
    } else {
      return errorMessage("Error in submitting to BDM")
    }
  }

  // !!!!!~~~~~~~~~~~~~~~~~~~~~~~~ADMIN PANEL CODE CLOSE ~~~~~~~~~~~~~~~~!!!!!!!!!!!!!!!!!

  const handleDontClose = () => {

  }
  const postData = async (values, fromButton) => {
    console.log("FROMBUTTON", fromButton)
    console.log("sendData values", values)
    let sendData = JSON.stringify(values);
    console.log("sendData", sendData)
    sendData = JSON.parse(sendData)
    if (hasNbs) {
      const deliveryStatus = values.medical_info.medical_info.deliveryStatus.label
      const typeOfFeeding = values.medical_info.medical_info.typeOfFeeding.label
      sendData.medical_info.medical_info.deliveryStatus = deliveryStatus
      sendData.medical_info.medical_info.typeOfFeeding = typeOfFeeding
    }
    let formatedReferralReason = []
    if (sendData.medical_info.medical_info.referralReason.length > 1) {
      formatedReferralReason = values.medical_info.medical_info.referralReason.map((reason) => {
        return reason.value
      })
      sendData.medical_info.medical_info.referralReason = formatedReferralReason
    }


    console.log("@#!#!@#!@#!@", values)
    setShowLoader(true)
    var formData = new FormData()
    const dtrfFormData = sendData
    if (props.fromSuperDtrf) {
      dtrfFormData.from = "superDtrf"
      dtrfFormData.superDtrfId = props.Token.dtrfToken
    }
    const filesKey = Object.keys(props.fileUpload.files)
    filesKey.map((key, index) => {
      props.fileUpload.files[key].map((file) => {
        if (!file.saved) {
          formData.append([key], file)
        }
      })
    })
    if (isPcpnndt) {
      props.pcpndtFiles.map((test) => {

        test.scans.map((file) => {
          if (!file.saved) {
            formData.append("PCPNDT", file)
          }
        })

      })
    }

    if (router.query.ref1) {
      dtrfFormData.followup = {}
      dtrfFormData.followup.followupForTest = router.query.ref1;
      dtrfFormData.followup.followupForDtrf = router.query.ref2;
    }
    dtrfFormData.ref_token = props.Token.refToken;
    dtrfFormData.dtrf_token = props.Token.dtrfToken;
    dtrfFormData.onlySaveDtrf = true;

    if (fromButton == "submitAfterPatientConfirmation") {
      dtrfFormData.submitAfterPatientConfirmation = true
      dtrfFormData.dtrfId = dtrfId
    } else {
      dtrfFormData.submitAfterPatientConfirmation = false
    }
    const data = JSON.stringify(dtrfFormData)
    formData.append("formValues", data)
    console.log("FORMDATA", dtrfFormData)
    const url = process.env.NEXT_PUBLIC_DTRF_SAVE
    let response
    response = await reqWithToken(url, "POST", formData, { superDtrf: props.fromSuperDtrf, dtrfFront: props.fromDtrfFront })
    console.log(response, "DTRF SAVE RESPONSE")
    if (response) {
      setShowLoader(false)
      if (response.status == 200) {
        console.log(response.message);

        if (fromButton == "sendLink" && response.data.message == "Patient Link Sent") {
          console.log("setLinkedSent")
          setLinkedSent(true)
          setShowPrevious(false)
          setDtrfId(response.data.data)
        }
        if (fromButton == "submitAfterPatientConfirmation") {
          if (response.data.data.message == "Rejected") {
            setShowLoader(false)
            setShowPrevious(true)
            setLinkedSent(false)
            return errorMessage("Patient Rejected")
          }
          if (response.data.data.message == "Pending") {
            setShowLoader(false)
            return infoMessage("Patent Confirmation Pending")
          }

        }
        if (response.data.message == "Success") {
          props.getPcpndtFiles([])

          setSubmitted(true)
          return setModalShow(true)
        } else {
          return infoMessage(response.data.message)
        }
      }
    } else {
      setShowLoader(false)
      errorMessage("Error in Submitting")
    }

    console.log(response);
  }

  console.log(linkedSent, "linkedSent")

  const tempOnSubmit = async (e) => {

    console.log(e.target.name);
    if (formValues.collectionLocation.location == "Home") {
      return setHomeLocationModalShow(true);
    }
    if (props.fromSuperDtrf) {
      const errorInForm = verifyDTRFForm(props.formDataRedux)
      const errorInFiles = fileUploadValidation(props.fileUpload)
      if (!errorInForm && !errorInFiles) {
        const data = JSON.parse(JSON.stringify(props.formDataRedux))
        await postData(data, e.target.name)
      }
    } else {
      const data = JSON.parse(JSON.stringify(props.formDataRedux))
      await postData(data, e.target.name)
    }
  }

  const handleOkayButtonClick = () => {
    Router.push("/")
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~```RESEND LINK~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const onResendClick = async () => {

    let formData = {
      "ref_token": props.Token.refToken,
      "dtrf_token": props.Token.dtrfToken
    }
    const url = process.env.NEXT_PUBLIC_SEND_KYC_LINK
    const res = await reqWithToken(url, "POST", { ...formData }, { superDtrf: props.fromSuperDtrf, dtrfFront: props.fromDtrfFront })
    if (res) {
      successMessage("Link has been sent to patient")
    } else {
      errorMessage("Error in sending link")
    }
    // const res = await axios.post(process.env.NEXT_PUBLIC_SEND_KYC_LINK, { ...formData })
    console.log(res)
  }

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!~~~CLOSE!!!!!!!!!!!!!~!~~~~~~~~~~~~~~~~~~~~~~~~


  console.log("formvalues", formValues)
  return (
    <>
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
          {
            props.formValues.payment.confirmationBy == "Patient" || (props.formValues.payment.paysTo == "Lab" &&
              props.formValues.payment.paymentMode == "Digital" && props.formValues.payment.confirmationBy == "Staff") ?

              <Modal.Title>Patient verification is approved and Dtrf submitted successfully !</Modal.Title> : <Modal.Title>Dtrf Submitted successfully</Modal.Title>
          }
        </Modal.Header>
        <Modal.Footer>
          <div className="text-right">
            <Button variant="primary" type="submit" onClick={handleOkayButtonClick}>
              Okay
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* -------------------------------------home location modal ---------------------------*/}

      <Modal
        show={homeLocationModalShow}
        onHide={handleDontClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        data-backdrop="static"
      >

        <Modal.Body>
        </Modal.Body>
        <Modal.Header>
          <Modal.Title>Thank you! Lilac team will get in touch with the patient</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <div className="text-right">
            <Button variant="primary" type="submit" onClick={handleOkayButtonClick}>
              Okay
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* -------------------- close -----------------home location modal ---------------------------*/}
      {
        (props.fromSuperDtrf && !props.Token.isComplete) &&
        <div className="row">
          <div className="col-md-12 col-12 text-right">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleOnClickSaveAndExit}
              name="save"
            >
              Save and Exit
            </button>

          </div>
        </div>
      }
      {
        formValues &&
        <Summary
          from="Confirmation"
          doctor_info={formValues.doctor_info}
          test_info={formValues.test_info}
          collectionLocation={formValues.collectionLocation}
          patient_details={formValues.patient_details}
          medical_info={formValues.medical_info.medical_info}
          sample_info={formValues.medical_info.sample_info}
          payment={formValues.payment}
          fileUpload={props.fileUpload}
          totalMrp={totalMrp}
          onResendClick={onResendClick}
          test_group={testGroup}
          filesUploaded={filesUploaded}
        />
      }
      <div className="row" id="action1">
        <div className="col-md-12 col-12 text-right">
          <div style={{ padding: "5px 20px" }}>
            {(!showLoader && showPrevious) &&

              <button
                onClick={handleOnClickPrevious}
                className="btn btn-primary mr-2"
                type="button"
              >
                Previous
              </button>
            }
            {
              props.fromSuperDtrf &&
              <>
                {!props.Token.isComplete &&

                  <button
                    onClick={handleOnClickSave}
                    className="btn btn-primary mr-2"
                    type="button"
                  >
                    Save
                  </button>
                }
                {
                  (Cookies.get("roleAL") == "supervisor" && (!props.Token.sentToBdm && !props.Token.isComplete)) &&
                  <button
                    onClick={handleOnClickBDM}
                    className="btn btn-primary mr-2"
                    type="button"
                  >
                    Send to BDM
                  </button>
                }
              </>
            }
            {(confirmationByPatient) ?
              <>
                {
                  linkedSent ?
                    <>
                      <button
                        type="button"
                        className="btn btn-primary mr-2"
                        disabled={submitted}
                        onClick={tempOnSubmit}
                        name="sendLink"
                      >
                        Resend Link
                      </button>
                      <button
                        disabled={submitted}
                        type="button"
                        className="btn btn-primary mr-2"
                        name="submitAfterPatientConfirmation"
                        // onClick={onSubmit}
                        onClick={tempOnSubmit}
                      >
                        Submit Dtrf
                      </button>
                    </>
                    :
                    <button
                      type="button"
                      className="btn btn-primary mr-2"
                      disabled={submitted}
                      onClick={tempOnSubmit}
                      name="sendLink"
                    >
                      Send Link
                    </button>
                }



              </>
              : showLoader ?
                <Spin indicator={antIcon} />
                :
                <>
                  {
                    (props.fromDtrfFront || !props.Token.isComplete) &&
                    <button
                      disabled={submitted}
                      type="button"
                      className="btn btn-primary mr-2"
                      name="submit"
                      // onClick={onSubmit}
                      onClick={tempOnSubmit}
                    >
                      Submit DTRF
                    </button>
                  }
                </>
            }
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  Token: state.Token,
  formDataRedux: state.formData.formData,
  fileUpload: state.fileUpload,
  usgFile: state.fileUpload.usgFile,
  patientConsentFile: state.fileUpload.patientConsentFile ? state.fileUpload.patientConsentFile : null,
  otherFiles: state.fileUpload.otherFiles ? state.fileUpload.otherFiles : null,
  doctorAttestationFile: state.fileUpload.doctorAttestation ? state.fileUpload.doctorAttestation : null,
  patientDeclarationPNDT: state.fileUpload.patientDeclarationPNDT ? state.fileUpload.patientDeclarationPNDT : null,
  patientInformedConsent: state.fileUpload.patientInformedConsent ? state.fileUpload.patientInformedConsent : null,
  consentAndIndemnity: state.fileUpload.consentAndIndemnity ? state.fileUpload.consentAndIndemnity : null,
  limitationOfTest: state.fileUpload.limitationOfTest ? state.fileUpload.limitationOfTest : null,
  patientPrivacy: state.fileUpload.patientPrivacy ? state.fileUpload.patientPrivacy : null,
  pcpndtFiles: state.fileUpload.pcpndtFiles ? state.fileUpload.pcpndtFiles : null,
  pnsReport: state.fileUpload.pnsReport ? state.fileUpload.pnsReport : null,
  referralLetter: state.fileUpload.referralLetter ? state.fileUpload.referralLetter : null,
  ntScan: state.fileUpload.ntScan ? state.fileUpload.ntScan : null,
  cbc: state.fileUpload.cbc ? state.fileUpload.cbc : null,
  cbcDoc: state.fileUpload.cbcDoc ? state.fileUpload.cbcDoc : null,
  bth: state.fileUpload.bth ? state.fileUpload.bth : null
})
export default connect(mapStateToProps, { setFormData, getPcpndtFiles, })(Confirmation);
