import React, { useEffect, useState, useRef, createRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { containerTypes, referralReason as referralReasonList } from "../../public/constants";
import Select from "react-select";
import moment from "moment";
import { connect } from "react-redux";
import formData from "../../reducers/form";
import {
  getPcpndtFiles, getFiles, getFilesToUpload, getFilesReference, getClearDeleteFiles, getDeletedFiles, getMandatoryFilesInRedux
} from "../../actions/fileupload";
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
const axios = require("axios");
import { message } from "antd";
import { cityList, stateList } from "../../public/constants";
import { data } from "jquery";
import MySelect from "../mySelect";
import DateFieldComponent from "../Fields/DateField";
import NumberField from "../Fields/NumberField";
import RadioField from "../Fields/Radio";
import TextField from "../Fields/TextField";
import FileUploadDisplay from "../Fields/FileUploadDisplay";
import AsyncSelect from "react-select/async";
import reqWithToken from "../../helper/Auth";
import { successMessage, MousePopover, errorMessage, warningMessage, infoMessage } from "../../helper/commonHelper";
import { setFormData } from "../../actions/formData";
import Router from 'next/router'
import { cytoFlow, nbsFlow, niptFlow, pnsField, validateField } from "../../helper/customValidator";
import CreateField from "../CreateField";


const ClinicalHistory = (props) => {
  const [testList, setTestList] = useState([]);
  const [instituteLocationRef, setInstituteLocationRef] = useState([])
  const [hasCyto, setHasCyto] = useState(false);
  const [hasNipt, setHasNipt] = useState(false);
  const [hasPns, setHasPns] = useState(false);
  const [hasNbs, setHasNbs] = useState(false)
  const [flowFields, setFlowFields] = useState([])
  const [, reRender] = useState();

  const [hasCytoPrenatal, setHasCytoPrenatal] = useState(false);

  const [testTrimester, setTestTrimester] = useState("")
  const [isTwin, setIsTwin] = useState(false)
  const [containerId, setContainerId] = useState([]);
  const [containerIdValidationList, setContainerIdValidationList] = useState([])
  const [selectedContainerType, setSelectedContainerType] = useState([]);
  const [sampleContainerList, setSampleContainerList] = useState([]);
  const [containerIdErrors, showContainerIdErrors] = useState(false)
  const [containerTypeErrors, showContainerTypeErrors] = useState(false)
  const [pcpndtList, setPcpndtList] = useState([])
  const [collectionLocation, setCollectionLocation] = useState([])
  const [citiesAndStates, setCitiesAndStates] = useState([])
  const [pcpndtReference, setPcpndtReference] = useState([])
  const [hasPoc, setHasPoc] = useState(false)
  const [hasPreEclampsiaTest, setHasPreEclampsiaTest] = useState(false)
  const [prefilleReferrenceDoctor, setPrefilledReferrenceDoctor] = useState("")
  const [prefilleReferrenceDoctorError, setPrefilledReferrenceDoctorError] = useState("")
  const [sonoGrapherError, setSonographerError] = useState("")
  const cytoRef = useRef();
  const niptRef = useRef();
  const pnsRef = useRef();
  const inputFile = useRef(null)

  const [gestationAgeStart, setGestationAgeStart] = useState(0)
  const [gestationAgeEnd, setGestationAgeEnd] = useState(0)
  const [currentGestDays, setCurrentGestDays] = useState("")
  const [currentGestWeeks, setCurrentGestWeeks] = useState("")

  const [selectedCity, setSelectedCity] = useState({});
  const [selectedState, setSelectedState] = useState({});
  const [tempData, setTempData] = useState({})
  const [isDonor, setIsDonor] = useState(false)
  const [sonographerName, setSonoGrapherName] = useState("")
  const [isGyno, setIsGyno] = useState(false)

  const [mandatoryFiles, setMandatoryFiles] = useState([])
  const [nonMandatoryFiles, setNonMandatoryFiles] = useState([])
  const [mandatoryFileReference, setMandatoryFileReference] = useState([])
  const [nonMandatoryFileReference, setNonMandatoryFileReference] = useState([])
  const [filesToUpload, setFilesToUpload] = useState([])
  const [fileUploadReference, setFileUploadReference] = useState([])


  const [containers, setContainers] = useState(null)

  const handleReferrenceDoctorChange = async (doctor, from) => {
    console.log("DOCOTOR ", doctor.length > 2)
    console.log("INSIDE", process.env.NEXT_PUBLIC_ALL_REFERRAL_DOCTORS)

    if (doctor.length > 2) {
      console.log("INSIDE", process.env.NEXT_PUBLIC_ALL_REFERRAL_DOCTORS)
      let url = `${process.env.NEXT_PUBLIC_ALL_DOCTORS}?searchquery=${doctor}&${from == "referringDoctor" ? "referring_doctor=1" : "sonographer=1"}`
      console.log("INSIDE condition", url)
      const resp = await reqWithToken(url, "GET", null, { superDtrf: props.fromSuperDtrf, dtrfFront: props.fromDtrfFront })
      console.log(resp)
      return resp.data.data.doctorSearchList
    }
  }
  const getPrefilledReferenceDoctor = (data) => {
    console.log("data", data)
    const asd = { label: data.name.firstName + " " + data.name.lastName, value: data._id }
    console.log("prefilled Reference Doctor Name", asd)
    setPrefilledReferrenceDoctor(data)

  }

  const handleReferenceDoctorNameChange = (e) => {

    console.log(e)
    if (e) {

      e.value = e._id
      e.label = e.name.firstName + " " + e.name.lastName
      setPrefilledReferrenceDoctor(e)
      setPrefilledReferrenceDoctorError("")

    } else {
      setPrefilledReferrenceDoctor(null)


    }
  };
  const handleSonographerNameChange = (e) => {
    if (e) {

      e.value = e._id
      e.label = e.name.firstName + " " + e.name.lastName
      setSonoGrapherName(e)
      setSonographerError("")
    } else {
      setSonoGrapherName(null)
    }

  }
  const getMandatoryFiles = () => {
    let tempMandatoryFiles = []
    let mandatory_Files = []

    props.formDataRedux.test_info.selectedTests.map((test, id) => {


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
    })
    console.log("mandatoryfiles", mandatory_Files)
    setMandatoryFiles(mandatory_Files)
    props.getMandatoryFilesInRedux(mandatory_Files)
  }
  const getFlowFields = async () => {
    const url = process.env.NEXT_PUBLIC_GET_FLOW_FIELDS
    let formData = new FormData()
    formData.append("name", hasPns ? "1" : hasNipt ? "2" : hasCyto ? "3" : "4")
    const response = await reqWithToken(url, "POST", { name: hasPns ? "1" : hasNipt ? "2" : hasCyto ? "3" : "4" }, { dtrfFront: props.fromDtrfFront })
    if (response) {
      console.log("Response", response)
      setFlowFields([...response.data.data.flow])
      reRender({})
    } else {
      errorMessage("Error in getting Flow feilds")
    }
  }
  useEffect(async () => {
    console.log("Props", props)


    if ((props.formValues.doctor_info.doctorName.practice_type == "Gynaecologist-Obstetrician")) {
      setIsGyno(true)
    }
    if (props.fileUpload.mandatoryFiles.length <= 0) {
      getMandatoryFiles()
    }
    if (props.formDataRedux.medical_info) {
      if (props.formDataRedux.medical_info.medical_info.referrenceDoctorName) {
        getPrefilledReferenceDoctor(props.formDataRedux.medical_info.medical_info.referrenceDoctorName)
      }
      if (props.formDataRedux.medical_info.medical_info.sonographer) {
        setSonoGrapherName(props.formDataRedux.medical_info.medical_info.sonographer)
      }
      if (props.formDataRedux.medical_info.sample_info) {
        if (props.formDataRedux.medical_info.sample_info && (props.formDataRedux.medical_info.sample_info.collectionLocation.length == props.formDataRedux.test_info.selectedTests.length)) {
          let asd = []
          props.formDataRedux.medical_info.sample_info.collectionLocation.map((qwe, id) => {
            asd.push({ city: qwe.location.city, state: qwe.location.state })
          })
          console.log(props.formValues.medical_info.sample_info.collectionLocation)
          setCollectionLocation(props.formValues.medical_info.sample_info.collectionLocation)
          console.log("!)(#*()!@*#)(!@*#)", asd)
          setCitiesAndStates(asd)
          reRender({})
        }
      }
    }

    if (testList.length == 0) {
      getTestList();
    }

    if (props.formDataRedux.medical_info) {
      setCurrentGestWeeks(props.formDataRedux.medical_info.medical_info.currentGestationalAgeWeeks)
      setCurrentGestDays(props.formDataRedux.medical_info.medical_info.currentGestationalAgeDays)
      console.log(props.formDataRedux.medical_info.currentGestationalAgeWeeks)
      console.log("Medical info exists", props.formDataRedux)

      if (props.formDataRedux.medical_info && props.formDataRedux.medical_info.sample_info) {
        setSampleContainerList(props.formDataRedux.medical_info.sample_info.sampleContainerList)
        setPcpndtList(props.pcpndtFiles)
        setPcpndtFiles(props.pcpndtFiles)
      }

    }
  }, [flowFields]);

  const handleCityChange = (option) => {
    console.log(option)

    citiesAndStates[id].city = option
    console.log(citiesAndStates)
    setCitiesAndStates(citiesAndStates)
    reRender({});
  };

  const handleStateChange = (value, id) => {
    cityStateErrors[id].state = ""
    setCityStateErrors(cityStateErrors)
    citiesAndStates[id].state = value.label
    setCitiesAndStates(citiesAndStates)
    console.log(value);
    reRender({});
  };

  // ~~~~~~~~~~~~~~~~~~~~PREFILED VALUE~!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const [prefilledData, setPrefilledData] = useState(null)

  const getPrefilledValue = (data) => {
    if (data) {
      console.log("data", data)
      setPrefilledData(data)
      console.log(hasPns);

    }
  }





  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~PREFILED VALUE CLOSE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const [isThalasammia, setIsThalasammia] = useState(false)
  const getTestList = async () => {
    console.log("Insite GetTEstList")
    console.log("formValues", props.formValues)
    // const list = props.formDataRedux;
    const list = props.formValues
    console.log("List", list)
    let name = ""
    let sampleContainers = [];
    let containerIdErrorsList = [];
    let containerIdValidation = []
    let containerTypeErrorList = [];
    let containerIdList = [];
    let containerTypeList = [];
    let pcpndt_list = []
    let pcpndtLocation = []
    let pcpndtInputReference = []
    let formsRef = []
    let citysAndStates = []
    let instituteRef = []
    let cityStateError = []
    let gestAgeStart = null
    let gestAgeEnd = null
    let twin = true
    let mandatory_Files = []
    let nonMandatory_Files = []
    let tempMandatoryFiles = []
    let tempNonMandatoryFiles = []
    let mandatory_FileReference = []
    let nonMandatory_FileReference = []
    if (list) {

      if (list.test_info) {
        console.log("LIst", list.test_info)
        setTestList(list.test_info.selectedTests);

        list.test_info.selectedTests.map((test, id) => {
          sampleContainers.push({ containers: [] })
          containerIdErrorsList.push(false)
          containerIdValidation.push(false)
          containerTypeErrorList.push(false)
          containerIdList.push({ value: "" })
          containerTypeList.push({ value: "" })
          pcpndt_list.push({ scans: [], names: [] })
          pcpndtLocation.push({ location: "" })
          pcpndtInputReference.push(createRef())
          formsRef.push(createRef())
          instituteRef.push(createRef())
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
          console.log("MANDATORRY FILES", mandatory_Files, tempMandatoryFiles)
          console.log("NON MANDATORY FILES", nonMandatory_Files, tempNonMandatoryFiles)
          if (props.formDataRedux.medical_info && (test.sub_group != "CYTO" && test.sub_group != "CMA")) {
            setReferralReason(props.formDataRedux.medical_info.medical_info.referralReason)
            console.log("INSIDE USE EFFECT", props.formDataRedux.medical_info.referralReason)
            getPrefilledValue(props.formDataRedux.medical_info.medical_info)
          }
          if (test.sub_group == "CYTO" || test.sub_group == "CMA") {
            console.log("SAmple Type", test.sampleType)
            name = "3"
            if (test.sample_category == "Prenatal") {
              setHasCytoPrenatal(true);
            }
            if (test.sample_category == "Product of conception(POC)") {
              setHasPoc(true);
            }
            setHasCyto(true);
          } else if (test.sub_group == "NIPT") {
            name = "2"
            if (test.twin_with_donor_egg) {
              setIsDonor(true)
            }
            else {
              setIsDonor(false)
            }
            cityStateError.push({ state: "", city: "", location: "" })
            setCityStateErrors(cityStateError)
            setHasNipt(true);
            citysAndStates.push({ city: "", state: "" })
          } else if (test.sub_group == "PNS") {
            name = "1"
            nonMandatory_Files.push({ display: "XML File", variable: "xmlLicenseFile" })
            if (!test.twin) {
              setIsTwin(false)
              twin = false
            } else {
              if (!twin) {
                setIsTwin(false)
              } else {
                setIsTwin(true)
              }
            }
            if (test.is_thalasseima) {
              setIsThalasammia(test.is_thalasseima)
            }
            if (!gestAgeStart && !gestAgeEnd) {
              gestAgeStart = test.gestation_age_start
              gestAgeEnd = test.gestation_age_end
            } else {
              if (gestAgeStart <= test.gestation_age_start) {
                gestAgeStart = test.gestation_age_start

              }
              if (gestAgeEnd >= test.gestation_age_end) {
                gestAgeEnd = test.gestation_age_end
              }
            }

            if (test.is_pre_eclampsia) {
              setHasPreEclampsiaTest(true)
            }
            setTestTrimester(test.trimester_test)
            setHasPns(true);
            if (props.formDataRedux.doctor_info.doctorName.category == "Gynecologist" && props.formDataRedux.medical_info) {
              setSonographer(props.formDataRedux.medical_info.medical_info.sonographer)
            }

          } else if (test.sub_group == "NBS") {
            name = "4"
            setHasNbs(true)
          }

        });
        mandatory_Files.map(() => mandatory_FileReference.push(createRef()))
        nonMandatory_Files.map(() => nonMandatory_FileReference.push(createRef()))
        setMandatoryFileReference(mandatory_FileReference)
        setMandatoryFiles(mandatory_Files)
        props.getMandatoryFilesInRedux(mandatory_Files)
        setNonMandatoryFiles(nonMandatory_Files)
        setNonMandatoryFileReference(nonMandatory_FileReference)
        setFilesToUpload([...mandatory_Files, ...nonMandatory_Files])
        setFileUploadReference([...mandatory_FileReference, ...nonMandatory_FileReference])
        props.getFilesToUpload([...mandatory_Files, ...nonMandatory_Files])
        props.getFilesReference([...mandatory_FileReference, ...nonMandatory_FileReference])

        console.log(" GEST START ", gestAgeStart)
        console.log("GEST END", gestAgeEnd)
        setGestationAgeStart(gestAgeStart)
        setGestationAgeEnd(gestAgeEnd)
        if (!props.formDataRedux.medical_info || (props.formDataRedux.medical_info && !props.formDataRedux.medical_info.sample_info)) {
          setPcpndtList(pcpndtList)
          props.getPcpndtFiles(pcpndt_list)
          setCitiesAndStates(citysAndStates)
          setCollectionLocation(pcpndtLocation)
          setPcpndtList(pcpndt_list)
        }
        setInstituteLocationRef(instituteRef)
        setMultipleFormRef(formsRef)
        setPcpndtReference(pcpndtInputReference)
        setContainerIdValidationList(containerIdValidation)
        setContainerId(containerIdList)
        setSelectedContainerType(containerTypeList)
        setSampleContainerList(sampleContainers)
        showContainerIdErrors(containerIdErrorsList)
        showContainerTypeErrors(containerTypeErrorList)
        if (!props.formDataRedux.medical_info || (props.formDataRedux.medical_info && !props.formDataRedux.medical_info.sample_info)) {

          setPcpndtList(pcpndt_list)
        } else {
          setPcpndtList(props.pcpndtFiles)
        }
        let sampleList = []
        for (let i = 0; i < list.test_info.selectedTests.length; i++) {
          const test = list.test_info.selectedTests[i];
          sampleList.push({ sampleType: test.sampleType, test_group: test.test_group })
        }
        let url = process.env.NEXT_PUBLIC_GET_CONTAINERS
        const response = await reqWithToken(url, "POST", { samples: sampleList }, { dtrfFront: props.fromDtrfFront, superDtrf: props.fromSuperDtrf })
        const containers = response.data.data.samples.map((e, i) => {
          return e.containers && e.containers.display_container_name.map((container, id) => {
            containerTypeList[i] = { id, value: container, label: container }
            setSelectedContainerType(containerTypeList)
            return { id, value: container, label: container }
          })
        })
        setContainers(containers)

        const url2 = process.env.NEXT_PUBLIC_GET_FLOW_FIELDS
        let formData = new FormData()
        formData.append("name", hasPns ? "1" : hasNipt ? "2" : hasCyto ? "3" : "4")
        const resp = await reqWithToken(url2, "POST", { name }, { dtrfFront: props.fromDtrfFront })
        if (resp) {
          console.log("resp", resp)
          setFlowFields([...resp.data.data.flow])
          reRender({})
        } else {
          errorMessage("Error in getting Flow feilds")
        }

        console.log("$$$$$$$$$$$$$$$$\n", containers);

        // const getContainers = axios.post(process.env.NEXT_PUBLIC_GET_CONTAINERS, { samples: sampleList })
        //   .then((response) => {
        //     const containers = response.data.data.samples.map((e, i) => {
        //       return e.containers && e.containers.display_container_name.map((container, id) => {
        //         containerTypeList[i] = { id, value: container, label: container }
        //         setSelectedContainerType(containerTypeList)
        //         return { id, value: container, label: container }
        //       })
        //     })
        //     setContainers(containers)

        //     console.log("$$$$$$$$$$$$$$$$\n", containers);
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });

      }
    }
  }

  const handleCytoContainerIdChange = (e, id) => {
    containerId[id].value = e.target.value
    if (containerIdErrors[id]) {
      containerIdValidationList[id] = false
      setContainerIdValidationList[containerIdValidationList]
    }
    if (e.target.value.length < 5 && e.target.value.length > 0) {
      containerIdValidationList[id] = true
      setContainerIdValidationList(containerIdValidationList)
    } else {
      containerIdValidationList[id] = false
      setContainerIdValidationList(containerIdValidationList)
    }
    setContainerId(containerId);
    if (e.target.value.length > 0) {
      containerIdErrors[id] = false
    } else {
      containerIdErrors[id] = true
    }
    showContainerIdErrors(containerIdErrors)
    reRender({});
  };

  const handleContainerTypeChange = (value, id) => {
    console.log("***********\n", value, id);
    if (value) {
      selectedContainerType[id] = value
      setSelectedContainerType(selectedContainerType);
      containerTypeErrors[id] = false
    } else {
      containerTypeErrors[id] = true
    }
    showContainerTypeErrors(containerTypeErrors)
    reRender({});
    console.log(selectedContainerType);
  };

  const handleCytoAddContainerID = (id) => {
    console.log(id);
    if (!containerId[id].value) {
      let containerIdError = containerIdErrors
      containerIdError[id] = true
      showContainerIdErrors(containerIdError);
      reRender({});
      return false;
    }
    if (!selectedContainerType[id].value) {
      let containerTypeError = containerTypeErrors
      containerTypeError[id] = true
      showContainerTypeErrors(containerTypeError);
      reRender({});
      return false;
    }
    if (containerId[id].value.length > 4) {
      if (!sampleContainerList[id].containers.find(container => container.id === containerId[id].value)) {

        sampleContainerList[id].containers.push({ id: containerId[id].value, type: selectedContainerType[id].value })
        // sampleContainerList.push({id:containerId,type:selectedContainerType.value});
        setSampleContainerList(sampleContainerList);
        console.log(sampleContainerList);
      }
      reRender({});
    }
  };

  const handleCytoRemoveContainerId = (id, container_id) => {
    sampleContainerList[id].containers.splice(container_id, 1);
    setSampleContainerList(sampleContainerList);
    reRender({});
  };

  const handleOnClickPrevious = () => {

    props.previousStep();
    props.handleOnClickPrevious();
  };

  const handleOnClickNext = (values) => {
    console.log("firstFormikRef", firstFormikRef.current, firstFormikRef.current.errors)
    console.log("Values", values)
    if (props.fromDtrfFront) {
      handleErrorSubmit()
      for (let container of sampleContainerList) {
        if (container.containers.length <= 0) {
          errorMessage("Container is empty!")
          return false;
        }
      }

      let count = 0;
      for (let pcpndt of pcpndtList) {
        if (testList[count].pcpndt) {
          if (pcpndt.scans.length <= 0) {
            errorMessage("PCPNDT Scan is empty!")
            return false;
          }
        }
        count++;
      }
      if (hasCyto && !prefilleReferrenceDoctor) {
        setPrefilledReferrenceDoctorError("Required")
        return
      }
    }


    console.log(values)
    let medical_info = { ...values, hasUSGScans: true }

    if (props.formDataRedux.medical_info && props.fromSuperDtrf) {
      if (props.formDataRedux.medical_info.medical_info.files) {
        medical_info.files = props.formDataRedux.medical_info.medical_info.files
      }
    }

    if (!hasCyto) {
      medical_info = { ...medical_info, referralReason: referralReason }
    }
    if (hasPns && props.formDataRedux.doctor_info.doctorName.category == "Gynecologist") {
      medical_info.sonographer = sonographer;
    }
    console.log("values", values, "MEDICAL INFPPOOOO", medical_info, "sampleContainerList", sampleContainerList, "collectionLocation", collectionLocation, "pcpndtListpcpndtList", pcpndtList, "Referral Reason", referralReason);

    props.handleOnClickNext("medical_info", { medical_info: medical_info, sample_info: { sampleContainerList, collectionLocation, pcpndtList: props.fileUpload.pcpndtFiles, } });
    props.nextStep();
  };

  const handleCollectioLocationChange = (e, id) => {
    collectionLocation[id].location = e.target.value
    setCollectionLocation(collectionLocation);
    // if (e.target.value.length>0) {
    //   containerIdErrors[id] = false
    // }else{
    //   containerIdErrors[id] = true
    // }
    // showContainerIdErrors(containerIdErrors)
    reRender({});
  };

  const uploadPcpndtScans = (e, id) => {
    let files = [...e.target.files]


    let allowedFiles = new RegExp("application/pdf|image");


    files.map((file, id) => {
      if (file.size > 3000000) {
        const afterRemove = [...files.slice(0, id), ...files.slice(id + 1)]
        files = afterRemove
        errorMessage(file.name + " size is greater than 3mb")

      }
      if (!allowedFiles.exec(file.type)) {
        const afterRemove = [...files.slice(0, id), ...files.slice(id + 1)]
        files = afterRemove
        errorMessage(file.name + "  file type not supported")
      }

    })

    if ([...e.target.files].length > 5) {
      return errorMessage("No. of Files should be less than 5")
    }


    if ([...e.target.files].length > 0) {
      if ([...pcpndtList[id].scans, ...files].length > 5) {
        errorMessage("No. of Files should be less than 5 ")
        return
      }
      console.log(e.target.files)

      pcpndtList[id].scans = [...pcpndtList[id].scans, ...files]
      pcpndtList[id].noOfFiles = pcpndtList[id].scans.length
      pcpndtList[id].names = [...pcpndtList[id].names, e.target.files[e.target.files.length - 1].name]
      // Array.from(e.target.files).forEach((test, container_id) => {
      //   pcpndtList[id].names.push(e.target.files.item(container_id).name)

      //   console.log("pcpndt scan", e.target.files.item(container_id));
      // })
      files.map((file) => {
        pcpndtList[id].names.push(file.name)
      })
      console.log(id)
      console.log("PCPNDTLIST", pcpndtList)
      setPcpndtFiles(pcpndtList)
      setPcpndtList(pcpndtList)
      props.getPcpndtFiles(pcpndtList)
      console.log(pcpndtList);
      reRender({});
      // reRender({});
    }
  }


  const handleUploadScansClick = async (id) => {
    console.log("PCPDNTREFERENCE", pcpndtReference, "ID", id)
    pcpndtReference[id].current.click();
  }

  const handleRemovePcpndtScan = (test_id, id) => {
    pcpndtList[test_id].scans.splice(id, 1);
    setPcpndtList(pcpndtList)
    reRender({});
  }

  // !!!!!!!!!!!~~~~~~~~~~~~~~~~~~~ADMIN PANEL CODE ~~~~~~~~~~~~~~~~~~~~~~~~~~!!!!!!!!!!!
  const handleOnClickSave = async () => {
    let sampleContainerLocation = []
    testList.map((test, id) => {
      if (test.pcpndt) {
        const sampleValues = multipleFormRef[id].current.values

        if (sampleValues.instituteLocation != "yes") {
          const location = {
            city: sampleValues.city ? sampleValues.city : {},
            state: sampleValues.state ? sampleValues.state : {},
            address: sampleValues.address,
            pinCode: sampleValues.pinCode,
            id: props.formDataRedux.test_info.selectedTests[id]._id
          }
          sampleContainerLocation.push({ location })
        } else {
          if (sampleValues.instituteLocation == "yes") {
            const location = { institute: "Institute" }
            sampleContainerLocation.push({ location })
          }
        }
      } else {
        sampleContainerLocation.push({ location: "" })
      }
    })
    multipleFormRef.map((ref) => {
      ref.current.handleSubmit()
    })
    var formData = new FormData()
    let data = {}
    data.dtrf_id = props.Token.dtrfToken
    let deletedFiles = props.fileUpload.deletedFiles
    console.log("DELETED FILES", deletedFiles)
    if (deletedFiles.length > 0) {

      formData.append("deletedFiles", JSON.stringify(deletedFiles))
    }

    data.dtrf = JSON.parse(JSON.stringify(props.formDataRedux))
    data.dtrf.medical_info = { medical_info: firstFormikRef.current.values }
    if (referralReason && referralReason.length > 0) {
      data.dtrf.medical_info.medical_info.referralReason = referralReason
    }
    if (props.formDataRedux.medical_info) {
      if (props.formDataRedux.medical_info.medical_info.files) {
        data.dtrf.medical_info.medical_info.files = props.formDataRedux.medical_info.medical_info.files
      }
    }
    console.log(data, "DATA")

    data.dtrf.medical_info.sample_info = {
      sampleContainerList, collectionLocation: sampleContainerLocation, pcpndtList: props.fileUpload.pcpndtFiles
    }
    console.log("SAMPLE INFO WHILE SAVING", data.dtrf.medical_info.sample_info)
    if (prefilleReferrenceDoctor) {
      data.dtrf.medical_info.medical_info.referrenceDoctorName = prefilleReferrenceDoctor
    }
    if (sonographerName) {
      data.dtrf.medical_info.medical_info.sonographer = sonographerName
    }
    if (!hasNbs) {
      data.dtrf.medical_info.medical_info.currentGestationalAgeWeeks = currentGestWeeks
      data.dtrf.medical_info.medical_info.currentGestationalAgeDays = currentGestDays
    }
    if (hasNbs) {
      const deliveryStatus = data.dtrf.medical_info.medical_info.deliveryStatus.label
      const typeOfFeeding = data.dtrf.medical_info.medical_info.typeOfFeeding.label
      data.dtrf.medical_info.medical_info.deliveryStatus = deliveryStatus
      data.dtrf.medical_info.medical_info.typeOfFeeding = typeOfFeeding
    }

    if (checkFileLength(pcpndtFiles)) {
      pcpndtFiles.map((scan) => {
        scan.scans.map((file) => {

          if (!file.saved) {
            formData.append("PCPNDT", file)
          }
          file.saved = true
        })
      })
    }

    formData.append("dtrf_id", JSON.stringify(data.dtrf_id))
    formData.append("dtrf", JSON.stringify(data.dtrf))
    console.log("DATA BEFORE SAVING", data.dtrf.medical_info)
    // props.setFormData({ ...props.formDataRedux, medical_info: data.dtrf.medical_info })
    // const url = process.env.NEXT_PUBLIC_SAVE_INCOMPLETE_DTRF
    // const response = await reqWithToken(url, "POST", formData)
    const response = await props.handleOnClickSave(data.dtrf)
    console.log("INCOMEPLETE FORMDATA SEND", response)
    if (response) {
      if (response.status == 200) {
        return successMessage("Form Data Saved Successfully")
      } else {
        return errorMessage("Error in Saving Form")
      }
    } else {
      return errorMessage("Error in Saving Form")
    }
  }

  const handleOnClickSaveAndExit = async () => {
    await handleOnClickSave();
    Router.push("/super-dtrf")
  }


  // !!!!!!!!!!!~~~~~~~~~~~~~~~~~~~~ADMIN PANEL CODE CLOSE~~~~~~~~~~~~~~~~~!!!!!!!!!!!!!!!!!


  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~FILE UPLOAD~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`

  const [selectedFile, setSelectedFile] = useState([])

  const [selectedFileError, setSelectedFileError] = useState("")
  const [isFileSelected, setIsFileSelected] = useState(false)

  const [usgFile, setUsgFile] = useState([])
  const [usgFileError, setUsgFileError] = useState("")

  const [xmlLicenseFile, setXmlLicenseFile] = useState([])
  const xmlLicenseFileRef = useRef()


  const [pcpndtFiles, setPcpndtFiles] = useState([])
  const [pcpndtFilesError, setPcpndtFilesError] = useState("")



  const referralLetterRef = useRef()
  const fileInputRef = useRef()
  const patientConsentFileRef = useRef()
  const removeFileRef = useRef()
  const pnsReportRef = useRef()

  const otherFileRef = useRef()

  const doctorAttestationRef = useRef()


  const patientDeclarationPNDTRef = useRef()


  const patientInformedConsentRef = useRef()

  const [consentAndIndemnity, setConsentAndIndemnity] = useState([])
  const [isConsentAndIndemnity, setIsConsentAndIndemnity] = useState(false)
  const [consentAndIndemnityError, setConsentAndIndemnityError] = useState("")
  const consentAndIndemnityRef = useRef()

  const [limitationOfTest, setLimitationOfTest] = useState([])
  const [isLimitationOfTest, setIsLimitationOfTest] = useState(false)
  const [limitationOfTestError, setLimitationOfTestError] = useState("")
  const limitationOfTestRef = useRef()

  const [patientPrivacy, setPatientPrivacy] = useState([])
  const [isPatientPrivacy, setIsPatientPrivacy] = useState(false)
  const [patientPrivacyError, setPatientPrivacyError] = useState("")
  const patientPrivacyRef = useRef()

  const [referralLetter, setReferralLetter] = useState([])
  const [referralLetterError, setReferralLetterError] = useState("")

  const [pnsReport, setPnsReport] = useState([])
  const [pnsReportError, setPnsReportError] = useState("")
  const ntScanRef = useRef()
  const [ntScan, setNtScan] = useState([])
  const [ntScanError, setNtScanError] = useState("")

  const cbcFileRef = useRef()
  const [cbcFile, setCbcFile] = useState([])
  const [cbcFileError, setCbcFileError] = useState("")

  const cbcDocFileRef = useRef()
  const [cbcDocFile, setCbcDocFile] = useState([])
  const [cbcDocFileError, setCbcDocFileError] = useState("")

  const bthFileRef = useRef()
  const [bthFile, setBthFile] = useState([])
  const [bthFileError, setBthFileError] = useState("")

  const confirmatoryTestHDSRef = useRef()
  const [confirmatoryTestFileHDS, setConfirmatoryTestFileHDS] = useState('')
  const [confirmatoryTestHDSFileErr, setConfirmatoryTestHDSFileErr] = useState("")

  const confirmatoryTestHESRef = useRef()
  const [confirmatoryTestFileHES, setConfirmatoryTestFileHES] = useState("")
  const [confirmatoryTestFileHESFileErr, setConfirmatoryTestFileHESFileErr] = useState("")

  const confirmatoryTestHPSRef = useRef()
  const [confirmatoryTestFileHPS, setConfirmatoryTestFileHPS] = useState("")
  const [confirmatoryTestFileHPSFileErr, setConfirmatoryTestFileHPSFileErr] = useState("")





  const checkFileLength = (files) => {
    if (files.length > 5) {
      errorMessage("No. of files should be less than 5")
      return false
    } else {
      return true
    }
  }

  const handleFileUploads = (e, fileKey, displayName) => {
    console.log([...e.target.files])
    let files = [...e.target.files]
    console.log(e.target.files)


    let allowedFiles = new RegExp("application/pdf|image|image/jpeg");
    let xmlFormat = new RegExp("text/xml")

    files.map((file, id) => {
      if (file.size > 15000000) {
        const afterRemove = [...files.slice(0, id), ...files.slice(id + 1)]
        files = afterRemove
        errorMessage(file.name + " size is greater than 15 mb")

      }
      if ((!allowedFiles.exec(file.type)) && e.target.name != "xmlLicenseFile") {
        const afterRemove = [...files.slice(0, id), ...files.slice(id + 1)]
        files = afterRemove
        errorMessage(file.name + "  file type not supported")
      }
      if (fileKey == "xmlLicenseFile") {
        if (!xmlFormat.exec(file.type)) {
          const afterRemove = [...files.slice(0, id), ...files.slice(id + 1)]
          files = afterRemove
          errorMessage("File should be in XML format")
        }
      }

    })
    if (files.length > 0) {
      files.map((file) => {
        file.displayName = displayName
      })



      const temp = props.fileUpload.files[fileKey] ? props.fileUpload.files[fileKey] : []
      if ([...temp, ...files].length > 5) {
        errorMessage("No. of files should be less than 5")
      } else {
        props.getFiles({ [fileKey]: [...temp, ...files] })
      }
      return
    } else {
      return
    }
  }
  console.log("mandatory files state", mandatoryFiles)
  console.log("non mandatory files state", nonMandatoryFiles)


  const onRemoveFile = (id, name) => {
    console.log("E,ID", name, id)

    if (props.fromSuperDtrf) {
      if (props.fileUpload.files[name][id].saved) {

        props.getDeletedFiles(name, props.fileUpload.files[name][id])
      }
    }
    const afterRemove = [...props.fileUpload.files[name].slice(0, id), ...props.fileUpload.files[name].slice(id + 1)]
    props.getFiles({ [name]: [...afterRemove] })
  }

  const removeFile = (variable) => {
    let fileId
    props.fileUpload.filesToUpload.map((data, index) => {
      if (data.variable == variable) {
        fileId = index
      }
    })
    let afterRemove = []
    if (fileId) {
      const afterRemoveFilesToUpload = [...props.fileUpload.filesToUpload.slice(0, fileId), ...props.fileUpload.filesToUpload.slice(fileId + 1)]
      const afterRemoveFilesReference = [...props.fileUpload.filesReference.slice(0, fileId), ...props.fileUpload.filesReference.slice(fileId + 1)]
      props.getFilesToUpload(afterRemoveFilesToUpload)
      props.getFilesReference(afterRemoveFilesReference)
    }
  }

  const addFile = (display, variable) => {
    props.getFilesToUpload([...props.fileUpload.filesToUpload, { display, variable }])
    props.getFilesReference([...props.fileUpload.filesReference, createRef()])
  }



  const onRemovePcpndt = (id, container_id) => {
    console.log(pcpndtList[id])
    if (props.fromSuperDtrf) {

      if (pcpndtList[id].scans[container_id].saved) {
        props.getDeletedFiles("PCPNDT", pcpndtList[id].scans[container_id])
      }
    }
    const afterRemove = [...pcpndtList[id].scans.slice(0, container_id), ...pcpndtList[id].scans.slice(container_id + 1)]
    const afterRemoveName = [...pcpndtList[id].names.slice(0, container_id), ...pcpndtList[id].names.slice(container_id + 1)]
    pcpndtList[id].scans = afterRemove
    pcpndtList[id].noOfFiles = afterRemove.length
    pcpndtList[id].names = afterRemoveName
    setPcpndtList([...pcpndtList.slice(0, id), pcpndtList[id], ...pcpndtList.slice(id + 1)])
    props.getPcpndtFiles([...pcpndtList.slice(0, id), pcpndtList[id], ...pcpndtList.slice(id + 1)])
  }








  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~FILE UPLOAD CLOSE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`

  // !!!!!!!!!!!!!!!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Referral reason !!!!!!!!!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const [referralReason, setReferralReason] = useState([]);
  const [isOtherReferralReasonSelected, setIsOtherReferralReasonSelected] = useState(false)
  const [prefilledReferalReason, setPrefilledReferalReason] = useState("")
  const handleReferralDoctorReasonChange = (e) => {
    console.log("REFERAL REASON", e)
    if (e) {

      getPrefilledReferalReason(e)
      // setPrefilledReferalReason(e.value)


      if (e.value == "others") {
        setIsOtherReferralReasonSelected(true);
      } else {
        setIsOtherReferralReasonSelected(false);
        setReferralReason(e);
      }
    }
  }
  const handleOtherReferralReasonChange = (e) => {
    setReferralReason(e);
  }
  const getPrefilledReferalReason = (data) => {



    setPrefilledReferalReason({ label: data, value: data })

  }
  // @!!!!!!!!!!!!!!!!!!!!!!!!!!~~~~~~~~~~~~~~~~~~~~~~~REFEREAL REASON CLOSEEEEE!!!!!!!!!!!!!!!!!~~~~~~~~~~~~~~~~~~~~

  // ---------------------------------- Sonographer -----------------------------------
  console.log("ISTWIN", isTwin)
  const [sonographer, setSonographer] = useState("")
  const handleSonographerChange = (e) => {
    if (e) {
      setSonographer(e)
    } else {
      setSonographer("")
    }
  }

  // -----------------------------close-Sonographer ----------------------------
  const [isDisabled, setIsDisabled] = useState(false)
  console.log("SELECTED CITY", selectedCity)
  console.log("SELECTED STATE", selectedState)
  const [cityStateErrors, setCityStateErrors] = useState([])
  const firstFormikRef = useRef()
  const [multipleFormRef, setMultipleFormRef] = useState()
  const handleErrorSubmit = () => {
    console.log("FIRSTFORMIKREFF", firstFormikRef)
    firstFormikRef.current.validateForm()
    if (!(Object.keys(firstFormikRef.current.errors).length === 0 && firstFormikRef.current.errors.constructor === Object)) {
      errorMessage("Please fill in the required fields to proceed")
    }
    let error = false
    if (multipleFormRef) {
      multipleFormRef.map((ref) => {
        if (!(Object.keys(ref.current.errors).length === 0 && ref.current.errors.constructor === Object)) {
          error = true
        }
      })
    }
    if (error) {
      errorMessage("Please fill in the required fields to proceed")
    }
  }
  const finalSubmit = () => {
    handleErrorSubmit()
    let errors = {}
    if (props.fromDtrfFront) {
      if (hasNbs && !prefilleReferrenceDoctor) {
        setPrefilledReferrenceDoctorError("Required")
        errors.error = "Reference doctor"
      }
      if (!hasNbs) {
        if ((isGyno && !sonographerName) && !hasCyto) {
          setSonographerError("Required")
          errors.error = "Sonographer Required"
        }
      }
      let fileErrors = null
      console.log("mandatoryfiles", mandatoryFiles, filesToUpload)
      mandatoryFiles.map((data) => {
        console.log("mandatoryfiles", data)
        if (!props.fileUpload.files[data.variable] || (props.fileUpload.files[data.variable] && props.fileUpload.files[data.variable].length <= 0)) {
          if (fileErrors) {

            fileErrors = fileErrors + ", " + data.display
          } else {
            fileErrors = data.display
          }
        }
      })
      if (fileErrors) {
        return errorMessage("Please upload following files " + fileErrors)
      }
    }
    firstFormikRef.current.handleSubmit()
    multipleFormRef.map((ref) => {
      ref.current.handleSubmit()
    })
    if (!errors.hasOwnProperty("error")) {



      console.log("ERRORS FROM FORMIKREF", firstFormikRef.current.errors)
      if (Object.keys(firstFormikRef.current.errors).length === 0 && firstFormikRef.current.errors.constructor === Object) {
        let childErrors = {}

        multipleFormRef.map((ref) => {
          childErrors = { ...ref.current.errors }
        })

        console.log("CHILD ERRORS", childErrors)
        if (Object.keys(childErrors).length === 0 && childErrors.constructor === Object) {
          const formValues = firstFormikRef.current.values
          if (prefilleReferrenceDoctor) {
            formValues.referrenceDoctorName = prefilleReferrenceDoctor
          }
          if (sonographerName) {
            formValues.sonographer = sonographerName
          }
          if (!hasNbs) {

            formValues.currentGestationalAgeWeeks = currentGestWeeks
            formValues.currentGestationalAgeDays = currentGestDays
          }
          if (hasNbs) {
            const deliveryStatus = formValues.deliveryStatus.label
            const typeOfFeeding = formValues.typeOfFeeding.label
            formValues.deliveryStatus = deliveryStatus
            formValues.typeOfFeeding = typeOfFeeding
          }
          handleOnClickNext(formValues)
        }



      }
    }
  }
  const typeOfFeeding = [
    { value: "Breast", label: "Breast" },
    { value: "TPN", label: "TPN" },
    { value: "Formula", label: "Formula" },
    { value: "Formula Trade Name", label: "Formula Trade Name" }]

  const deliveryStatus = [{ value: "Normal", label: "Normal" },
  { value: "Premature", label: "Premature" },
  { value: "Sick", label: "Sick" },
  { value: "On antibiotics", label: "On antibiotics" }
  ]

  console.log("FLOW FIELDS", flowFields)
  return (
    <>
      <div>
        <div>
          <fieldset>
            <Formik
              isInitialValid={false}
              validateOnBlur
              validateOnMount={true}
              innerRef={firstFormikRef}
              enableReinitialize
              initialValues={{
                gestationalAgeWeeks: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.gestationalAgeWeeks : "",
                gestationalAgeDays: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.gestationalAgeDays : "",
                maternalAge: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.maternalAge : "",
                motherGeneticDisease: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.motherGeneticDisease : "",
                fatherGeneticDisease: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.fatherGeneticDisease : "",
                siblingGeneticDisease: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.siblingGeneticDisease : "",
                familyHistory: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.familyHistory : "",
                presentPregnancy: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.presentPregnancy : "",
                ivfPregnancy: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.ivfPregnancy : "",
                eggUsed: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.eggUsed : "",
                ageAtEggRetrieval: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.ageAtEggRetrieval : "",
                surrogate: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.surrogate : "",
                conditionAffectsPreviousPregnancy: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.conditionAffectsPreviousPregnancy : "",
                conditionPatientIsCarrierOf: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.conditionPatientIsCarrierOf : "",
                t21RiskScore: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.t21RiskScore : "",
                t18RiskScore: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.t18RiskScore : "",
                t13RiskScore: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.t13RiskScore : "",
                familyHistory: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.familyHistory : "",
                dateOfTwinVanishOrReduced: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.dateOfTwinVanishOrReduced : "",
                otherReferralReason: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.otherReferralReason : "",
                lmpDate: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.lmpDate : "",
                usgCorrEddDate: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.usgCorrEddDate : "",
                lmpCertainity: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.lmpCertainity : "",
                Gravida: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.Gravida : "",
                Para: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.Para : "",
                Abortion: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.Abortion : "",
                Live: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.Live : "",
                historyOfDownSyndrome: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.historyOfDownSyndrome : "",
                historyOfEdwardsSyndrome: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.historyOfEdwardsSyndrome : "",
                diabetesInsulinDependent: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.diabetesInsulinDependent : "",
                insulinDate: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.insulinDate : "",
                gestational: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.gestational : "",
                patientOnHcg: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.patientOnHcg : "",
                bleedingOrSpottingTwoWeeks: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.bleedingOrSpottingTwoWeeks : "",
                typeOfConception: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.typeOfConception : "",
                typeOfProcedure: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.typeOfProcedure : "",
                extractionDate: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.extractionDate : "",
                transferDate: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.transferDate : "",
                donorDob: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.donorDob : "",
                crl: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.crl : "",
                nb: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.nb : "",
                twinType: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.twinType : "",
                twinCrl1: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.twinCrl1 : "",
                twinCrl2: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.twinCrl2 : "",
                twinNt1: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.twinNt1 : "",
                twinNt2: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.twinNt2 : "",
                twinNb1: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.twinNb1 : "",
                twinNb2: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.twinNb2 : "",
                bpd: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.bpd : "",
                dateOfScan: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.dateOfScan : '',
                fl: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.fl : "",
                hc: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.hc : "",
                nt: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.nt : "",
                crl: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.crl : "",
                bpOrMap: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.bpOrMap : "",
                bpMeasurementDate: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.bpMeasurementDate : "",
                bpLeftSystolic1: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.bpLeftSystolic1 : "",
                bpLeftDiSystolic1: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.bpLeftDiSystolic1 : "",
                bpLeftSystolic2: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.bpLeftSystolic2 : "",
                bpLeftDiSystolic2: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.bpLeftDiSystolic2 : "",
                bpRightSystolic1: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.bpRightSystolic1 : "",
                bpRightDiSystolic1: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.bpRightDiSystolic1 : "",
                bpRightSystolic2: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.bpRightSystolic2 : "",
                bpRightDiSystolic2: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.bpRightDiSystolic2 : "",
                mapReading1: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.mapReading1 : "",
                mapReading2: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.mapReading2 : "",
                familyHistoryPreEclampsia: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.familyHistoryPreEclampsia : "",
                chronicHypertension: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.chronicHypertension : "",
                uterineArteryPulsativeIndexRightPI: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.uterineArteryPulsativeIndexRightPI : "",
                uterineArteryPulsativeIndexLeftPI: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.uterineArteryPulsativeIndexLeftPI : "",
                previousPregnancy: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.previousPregnancy : "",
                spontaneousAbortion: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.spontaneousAbortion : "",
                prevPregDate: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.prevPregDate : "",
                terminationPregnancy: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.terminationPregnancy : "",
                referralReason: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.referralReason : [],
                consanguinity: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.consanguinity : "",
                instituteLocation: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.instituteLocation : "",
                usgDate: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.usgDate : "",
                sampleCollectionDate: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.sampleCollectionDate : "",
                currentGestationalAgeWeeks: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.currentGestationalAgeWeeks : "",
                currentGestationalAgeDays: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.currentGestationalAgeDays : "",
                additionalSymptoms: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.additionalSymptoms : "",
                deliveryStatus: props.formDataRedux.medical_info ? { value: props.formDataRedux.medical_info.medical_info.deliveryStatus, label: props.formDataRedux.medical_info.medical_info.deliveryStatus } : "",
                typeOfFeeding: props.formDataRedux.medical_info ? { value: props.formDataRedux.medical_info.medical_info.typeOfFeeding, label: props.formDataRedux.medical_info.medical_info.typeOfFeeding } : "",
                hoTransfusion: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.hoTransfusion : "",
                dateOfHoTransfusion: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.dateOfHoTransfusion : "",
                firstFeedingDate: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.firstFeedingDate : "",
                monochorionicType: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.monochorionicType : "",
                historyOfPatauSyndrome: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.historyOfPatauSyndrome : "",
                confirmatoryTestHDS: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.confirmatoryTestHDS : "",
                confirmatoryTestHES: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.confirmatoryTestHES : "",
                confirmatoryTestHPS: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.confirmatoryTestHPS : "",
                timeOfDiabetes: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.timeOfDiabetes : "",
                advanceMaternalAge: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.advanceMaternalAge : "",
                geneticDiseaseInFMS: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.geneticDiseaseInFMS : "",
                Others: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.Others : "",
                fmfId: props.formDataRedux.medical_info ? props.formDataRedux.medical_info.medical_info.fmfId : ""

              }}
              validate={(values) => {
                let errors = {};
                errors = validateField(hasPns ? pnsField : hasCyto ? cytoFlow : hasNbs ? nbsFlow : niptFlow, props.formDataRedux.patient_details ? { ...values, ...props.formDataRedux.patient_details } : { ...values }, { calculateCurrentGestational: true, validateGestation: hasPns ? true : false, gestationalAgeStart: gestationAgeStart, gestationalAgeEnd: gestationAgeEnd, testType: hasPreEclampsiaTest ? "hasPreEclampsia" : hasCytoPrenatal ? "cytoPrenatal" : "", testTrimester, isRequired: props.fromDtrfFront ? true : false }, values)
                if (!values.Gravida) {
                  values.Live = ""
                  values.Abortion = ""
                  values.Para = ""
                }
                if (hasCyto && props.fromDtrfFront) {
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

                console.log("ERRORRRS", errors)
                return errors;
              }}
              onSubmit={(values,) => {
                console.log("INside Submitting", values)
                setTempData({ ...tempData, ...values })
                if (values.instituteLocation != "yes") {
                  const location = {
                    city: selectedCity.value,
                    state: selectedState.value,
                    address: values.address,
                    pinCode: values.pinCode
                  }
                  values.location = { ...location }
                  // handleOnClickNext(values);
                } else {
                  values.location = "Institute"
                  // handleOnClickNext(values);
                }

                console.log(values)
              }}
            >



              {({ values }) => (

                <Form className="mb-2">
                  {
                    props.fromSuperDtrf && <>
                      <div className="col-md-12 col-12 text-right">
                        <div style={{ padding: "10px 0px" }}>
                          {!props.Token.isComplete &&

                            <button
                              type="button"
                              onClick={() =>
                                handleOnClickSaveAndExit()
                              }
                              className="btn btn-primary mr-2"
                            >
                              Save And Exit
                            </button>
                          }
                        </div>
                      </div>
                    </>
                  }
                  <div className="customWrap">
                    <div className="row">

                      {
                        (hasNipt) && <>
                          <div className="form-group col-6">
                            <label>
                              Referral reason :
                              <span className="marked">*</span>
                            </label>
                            <Select
                              isMulti={true}
                              options={referralReasonList}
                              onChange={handleReferralDoctorReasonChange}
                              value={referralReason}
                              name="referralReason"
                            />
                            <ErrorMessage
                              name="referralReason"
                              component="div"
                              className="formErr"
                            />
                          </div>
                        </>
                      }
                    </div>
                    <div className="row">

                      <div className="form-group col-6" >
                        <label>
                          Referring Doctor: {(hasCyto || hasNbs) && <span className="marked">*</span>}
                        </label>
                        <AsyncSelect
                          isClearable
                          cacheOptions
                          defaultOptions
                          value={prefilleReferrenceDoctor}
                          getOptionLabel={(e) => e.name.firstName + " " + e.name.lastName}
                          getOptionValue={(e) => e._id}
                          loadOptions={e => handleReferrenceDoctorChange(e, 'referringDoctor')}
                          onChange={handleReferenceDoctorNameChange}
                          // placeholder="Enter Test name"
                          noOptionsMessage={() => 'Enter Doctor name'}
                        />
                        {
                          <div className="formErr">
                            {prefilleReferrenceDoctorError}
                          </div>
                        }

                      </div>
                    </div>
                    <div className="row">
                      {
                        isGyno &&
                        <div className="form-group col-6">
                          <label>
                            Sonographer: {!hasCyto && <span className="marked">*</span>}
                          </label>
                          <AsyncSelect
                            isClearable
                            cacheOptions
                            defaultOptions
                            value={sonographerName}
                            getOptionLabel={(e) => e.name.firstName + " " + e.name.lastName}
                            getOptionValue={(e) => e._id}
                            loadOptions={e => handleReferrenceDoctorChange(e, 'sonographer')}
                            onChange={handleSonographerNameChange}
                            noOptionsMessage={() => 'Enter Test name'}

                          />
                          <div className="formErr">
                            {sonoGrapherError}
                          </div>
                        </div>
                      }

                    </div>
                    <div className="row">


                      {(flowFields.length > 0) &&
                        <>


                          {

                            flowFields.map((field, id) => <CreateField {...field} values={props.formDataRedux.patient_details
                              ? { ...values, ...props.formDataRedux.patient_details }
                              : { ...values, }} externalValidation={{ testType: hasPreEclampsiaTest ? "preEclampsia" : hasCytoPrenatal ? "cytoPrenatal" : "", testTrimester }} />)
                          }
                        </>

                      }
                      {
                        hasNipt && <>
                          {
                            referralReason &&
                            referralReason.map((reason) =>
                              reason.value == "previous pregnancy affected by genetic disorders" ?
                                (
                                  <TextField
                                    title="Additional,Symptoms/History"
                                    name="conditionAffectsPreviousPregnancy"
                                    placeholder="Enter condition that affected previous pregnancy"
                                    mandatory={true}
                                  />

                                ) :
                                reason.value == "patient is a carrier of genetic disorders" ?

                                  (
                                    <TextField
                                      title="Name of condition that the patient is a
                              carrier of"
                                      name="conditionPatientIsCarrierOf"
                                      placeholder="Enter condition that the patient is a carrier of"
                                      mandatory={true}
                                    />
                                  ) :

                                  reason.value == "serum screen risk" ?

                                    (
                                      <>
                                        <NumberField
                                          title=" T21 risk score"
                                          name="t21RiskScore"
                                          placeholder="Enter T21 risk score"
                                          mandatory={true}
                                          min="1"
                                          max="100"
                                        />

                                        <NumberField
                                          title="T18 risk score"
                                          name="t18RiskScore"
                                          placeholder="Enter T18 risk score"
                                          mandatory={true}
                                          min="1"
                                          max="100"
                                        />
                                        <NumberField
                                          title="T13 risk score"
                                          name="t13RiskScore"
                                          placeholder="Enter T13 risk score"
                                          mandatory={true}
                                          min="1"
                                          max="100"
                                        />

                                      </>
                                    ) :

                                    reason.value == "family history" ?
                                      (<>
                                        <TextField
                                          title="Family history"
                                          name="familyHistory"
                                          placeholder="Enter family history"
                                          mandatory={true}
                                        />
                                      </>) : reason.value == "others" ?
                                        <>
                                          <TextField
                                            title="Other Referral Reason "
                                            name="otherReferralReason"
                                            mandatory={true}
                                          />

                                        </> : ""


                            )}
                        </>
                      }
                      {
                        hasCyto && <>
                          <div className="col-12">


                            <div className="row ml-2">

                              <div id="checkbox-group">Referral Reason</div>
                            </div>

                            <div role="group" aria-labelledby="checkbox-group">
                              <div className="row">
                                <div className="col-6">
                                  <label style={{ paddingTop: "30px", display: "flex" }}>
                                    <Field type="checkbox" name="referralReason" value="Advance Maternal Age" />
                                    <label className="pl-2"> Advance Maternal Age </label>
                                  </label>

                                </div>
                                {
                                  values.referralReason.includes("Advance Maternal Age") &&

                                  <TextField
                                    title=""
                                    name="advanceMaternalAge"

                                  />

                                }

                              </div>
                              <div className="row">
                                <div className="col-6">
                                  <label style={{ paddingTop: "30px", display: "flex" }}>
                                    <Field type="checkbox" name="referralReason" value="Genetic Disease in Father/Mother/Sibling" />
                                    <label className="pl-2"> Genetic Disease in Father/Mother/Sibling </label>
                                  </label>
                                </div>
                                {
                                  values.referralReason.includes("Genetic Disease in Father/Mother/Sibling") &&
                                  <TextField
                                    title=""
                                    name="geneticDiseaseInFMS"
                                  />
                                }
                              </div>
                              <div className="row">
                                <div className="col-6">
                                  <label style={{ paddingTop: "30px", display: "flex" }}>

                                    <Field type="checkbox" name="referralReason" value="Consanguinity" />
                                    <label className="pl-2"> Consanguinity </label>
                                  </label>

                                </div>
                                {
                                  values.referralReason.includes("Consanguinity") &&
                                  <RadioField
                                    name="consanguinity"

                                    options={[{ value: "Yes", label: "Yes" },
                                    { value: "No", label: "No" }
                                    ]}
                                  />
                                }
                              </div>
                              <div className="row">
                                <div className="col-6">
                                  <label style={{ paddingTop: "30px", display: "flex" }}>
                                    <Field type="checkbox" name="referralReason" value="Family History of any chromosomal abnormality" />
                                    <label className="pl-2">
                                      Family History of any chromosomal abnormality
                                    </label>
                                  </label>

                                </div>
                                {
                                  values.referralReason.includes("Family History of any chromosomal abnormality") &&

                                  <TextField
                                    title=""
                                    name="familyHistory"

                                  />

                                }

                              </div>
                              <div className="row">
                                <div className="col-6">
                                  <label style={{ paddingTop: "30px", display: "flex" }}>

                                    <Field type="checkbox" name="referralReason" value="Others" />
                                    <label className="pl-2">
                                      Others
                                    </label>
                                  </label>

                                </div>
                                {
                                  values.referralReason.includes("Others") &&
                                  <TextField
                                    title=""
                                    name="Others"
                                  />
                                }
                              </div>
                              <ErrorMessage
                                name="referralReason"
                                component="div"
                                className="formErr"
                              />

                            </div>
                          </div>
                        </>
                      }

                      <>
                        <div className="col-12 col-md-12">
                          <label className="section-title">
                            File Upload   <MousePopover content={(
                              <div>
                                <h6>Format</h6>
                                <p>Image,Jpeg,png,pdf,XML</p>
                                <h6>File size</h6>
                                <p>maximum 3mb</p>
                              </div>
                            )} />
                          </label>
                        </div>

                        {
                          props.fileUpload.filesToUpload.map((data, id) =>
                            <input
                              ref={fileUploadReference[id]}
                              style={{ display: "none" }}
                              type='file'
                              name={data.variable}
                              // onChange={handleDoctorAttestationFile}
                              onChange={e => handleFileUploads(e, data.variable, data.display)}
                              multiple
                            />
                          )
                        }
                        {
                          props.fileUpload.filesToUpload.map((data, id) =>
                            <FileUploadDisplay
                              name={data.variable}
                              ref={props.fileUpload.filesReference[id]}
                              files={props.fileUpload.files[data.variable] ?
                                props.fileUpload.files[data.variable] : []
                              }
                              mandatory={props.fileUpload.mandatoryFiles[id] ? true : false}
                              fileButtonName={data.display}
                              removeFile={onRemoveFile}
                            />
                          )
                        }

                        {
                          values.historyOfDownSyndrome == "Yes" && values.confirmatoryTestHDS == "Yes" &&
                          <FileUploadDisplay
                            name="HDS"
                            ref={confirmatoryTestHDSRef}
                            files={props.fileUpload.files.HDS ?
                              props.fileUpload.files.HDS : []
                            }
                            fileButtonName="Confirmatory Test File for History of Down Syndrome"
                            removeFile={onRemoveFile}
                          />
                        }
                        {
                          values.historyOfDownSyndrome == "Yes" && values.confirmatoryTestHDS == "Yes" &&
                          (!props.fileUpload.files.HDS || (props.fileUpload.files.HDS && props.fileUpload.files.HDS.length <= 0)) &&
                          <label>Report will be needed for final Risk assessment</label>
                        }
                        {
                          values.historyOfEdwardsSyndrome == "Yes" && values.confirmatoryTestHES == "Yes" &&
                          <FileUploadDisplay
                            name="HES"
                            ref={confirmatoryTestHESRef}
                            files={props.fileUpload.files.HES ?
                              props.fileUpload.files.HES : []
                            }
                            fileButtonName="Confirmatory Test File for History of Edward Syndrome"
                            removeFile={onRemoveFile}
                          />
                        }
                        {
                          values.historyOfEdwardsSyndrome == "Yes" && values.confirmatoryTestHES == "Yes" &&
                          (!props.fileUpload.files.HES || (props.fileUpload.files.HES && props.fileUpload.files.HES.length <= 0)) &&
                          <label>Report will be needed for final Risk assessment</label>
                        }
                        {
                          values.historyOfPatauSyndrome == "Yes" && values.confirmatoryTestHPS == "Yes" &&
                          <FileUploadDisplay
                            name="HPS"
                            ref={confirmatoryTestHPSRef}
                            files={props.fileUpload.files.HPS ?
                              props.fileUpload.files.HPS : []
                            }
                            fileButtonName="Confirmatory Test File for History of Patau Syndrome"
                            removeFile={onRemoveFile}
                          />
                        }
                        {
                          values.historyOfPatauSyndrome == "Yes" && values.confirmatoryTestHPS == "Yes" &&
                          (!props.fileUpload.files.HPS || (props.fileUpload.files.HPS && props.fileUpload.files.HPS.length <= 0)) &&
                          <label>Report will be needed for final Risk assessment</label>
                        }
                      </>
                    </div>
                  </div>




                  <div >

                    <button
                      ref={removeFileRef}
                      type="button"
                      name="removeButton"
                      onClick={e => onRemoveFile(e)}
                      style={{ display: "none" }}></button>
                    <input
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      type="file"
                      name="files"
                      // onChange={handleUsgFile}
                      onChange={handleFileUploads}
                      multiple
                    />
                    <input
                      ref={patientConsentFileRef}
                      style={{ display: "none" }}
                      type='file'
                      name="patientConsentFiles"
                      // onChange={handlePatientConsentFile}
                      onChange={handleFileUploads}
                      multiple
                    />
                    <input
                      ref={otherFileRef}
                      style={{ display: "none" }}
                      type='file'
                      name="otherFiles"
                      // onChange={handleOtherFiles}
                      onChange={handleFileUploads}
                      multiple
                    />
                    <input
                      ref={doctorAttestationRef}
                      style={{ display: "none" }}
                      type='file'
                      name="doctorAttestationFile"
                      // onChange={handleDoctorAttestationFile}
                      onChange={handleFileUploads}
                      multiple
                    />
                    <input
                      ref={patientDeclarationPNDTRef}
                      style={{ display: "none" }}
                      type='file'
                      name="patientDeclarationPNDT"
                      // onChange={handlePatientDeclarationPNDT}
                      onChange={handleFileUploads}
                      multiple
                    />
                    <input
                      ref={patientInformedConsentRef}
                      style={{ display: "none" }}
                      type='file'
                      name="patientInformedConsent"
                      // onChange={handlePatientInformedConsent}
                      onChange={handleFileUploads}
                      multiple
                    />
                    <input
                      ref={consentAndIndemnityRef}
                      style={{ display: "none" }}
                      type='file'
                      name="consentAndIndemnity"
                      // onChange={handleConsentAndIndemnity}
                      onChange={handleFileUploads}
                      multiple
                    />
                    <input
                      ref={limitationOfTestRef}
                      style={{ display: "none" }}
                      type='file'
                      name="limitationOfTest"
                      // onChange={handleLimitationOfTest}
                      onChange={handleFileUploads}
                      multiple
                    />
                    <input
                      ref={patientPrivacyRef}
                      style={{ display: "none" }}
                      type='file'
                      name="patientPrivacy"
                      // onChange={handlePatientPrivacy}
                      onChange={handleFileUploads}
                      multiple
                    />
                    <input
                      ref={referralLetterRef}
                      style={{ display: "none" }}
                      type='file'
                      name="referralLetter"
                      // onChange={handleReferralLetter}
                      onChange={handleFileUploads}
                      multiple
                    />
                    <input
                      ref={pnsReportRef}
                      style={{ display: "none" }}
                      type='file'
                      name="pnsReport"
                      // onChange={handlePnsReport}
                      onChange={handleFileUploads}
                      multiple
                    />
                    <input
                      ref={ntScanRef}
                      style={{ display: "none" }}
                      type='file'
                      name="ntScan"
                      // onChange={handleNtScan}
                      onChange={handleFileUploads}
                      multiple
                    />
                    <input
                      ref={cbcFileRef}
                      style={{ display: "none" }}
                      type='file'
                      name="cbcFile"
                      // onChange={handleCbcFile}
                      onChange={handleFileUploads}
                      multiple
                    />

                    <input
                      ref={confirmatoryTestHDSRef}
                      style={{ display: "none" }}
                      type='file'
                      name="confirmatoryTestFileHDS"
                      onChange={e => handleFileUploads(e, "HDS", "Confirmatory Test File for History of Down Syndrome")}
                      multiple
                    />
                    <input
                      ref={confirmatoryTestHESRef}
                      style={{ display: "none" }}
                      type='file'
                      name="confirmatoryTestFileHES"
                      onChange={e => handleFileUploads(e, "HES", "Confirmatory Test File for History of Edward Syndrome")}

                      multiple
                    />
                    <input
                      ref={confirmatoryTestHPSRef}
                      style={{ display: "none" }}
                      type='file'
                      name="confirmatoryTestFileHPS"
                      onChange={e => handleFileUploads(e, "HPS", "Confirmatory Test File for History of Patau Syndrome")}
                      multiple
                    />
                    <input
                      ref={xmlLicenseFileRef}
                      style={{ display: "none" }}
                      type='file'
                      name="xmlLicenseFile"
                      onChange={handleFileUploads}
                      multiple
                    />

                  </div>


                </Form>
              )}


            </Formik>

          </fieldset>
        </div>
      </div>
      <hr></hr>
      <h4>Sample Info</h4>
      <hr></hr>
      {
        containers && testList.map((test, id) => (
          // testList.map((test, id) => (
          <div className="customWrap mb-2">
            <div>
              <h6>{test.test_name}</h6>
            </div>
            <Formik
              innerRef={multipleFormRef[id]}
              initialValues={{
                address: collectionLocation ? collectionLocation[id].location.address : "",
                pinCode: collectionLocation ? collectionLocation[id].location.pinCode : "",
                instituteLocation: collectionLocation && collectionLocation[id].location.hasOwnProperty("institute") ? ["yes"] : "",
                city: collectionLocation ? collectionLocation[id].location.city : "",
                state: collectionLocation ? collectionLocation[id].location.state : ""
                ,
              }}
              validate={(values) => {
                const errors = {};
                if (props.fromDtrfFront) {
                  if (test.pcpndt) {
                    if (values.instituteLocation != 'yes') {
                      if (!values.address) {
                        errors.address = "Required"
                      }
                      if (!values.pinCode) {
                        errors.pinCode = "Required";
                      }
                      else if (!Number(values.pinCode)) {
                        errors.pinCode = "Should be Number";
                      }
                      if (!values.city) {
                        errors.city = "Reqruied"
                      }
                      if (!values.state) {
                        errors.state = "Required"
                      }

                    }
                  }
                }

                return errors
              }}
              onSubmit={(values, { setSubmitting }) => {
                if (test.pcpndt) {
                  if (values.instituteLocation != "yes") {
                    const location = {
                      city: values.city,
                      state: values.state,
                      address: values.address,
                      pinCode: values.pinCode,
                      id: props.formValues.test_info.selectedTests[id]._id
                    }
                    collectionLocation[id].location = location
                    setCollectionLocation(collectionLocation)
                  }
                  else {
                    const location = { institute: "Institute" }
                    collectionLocation[id].location = location
                  }
                }
              }}>
              {

                ({ values }) => (
                  <Form >

                    <>
                      <div className="row">
                        <div className="col-12 col-md-6 form-group">
                          <label>
                            Sample Container Id<span className="marked">*</span>
                          </label>
                          <input
                            type="text"
                            name={id}
                            value={containerId[id].value}
                            placeholder="Enter Sample Container id (minimum 5 characters)"
                            className="form-control"
                            onChange={(value) => handleCytoContainerIdChange(value, id)}
                          />
                          {(containerIdErrors[id]) && (
                            <div className="formErr">Required</div>
                          )}
                          {
                            containerIdValidationList[id] && (
                              <div className="formErr">Id should have more than 4 characters </div>
                            )
                          }
                        </div>

                        <div className="col-8 col-md-4 form-group">
                          <label>
                            Sample Container Type<span className="marked">*</span>
                          </label>
                          {/* <Select

                            name={id}
                            getOptionLabel={(e) => e.label}
                            getOptionValue={(e) => e.value}
                            options={test.container_type}
                            value={selectedContainerType[id]}
                            onChange={(value) => handleContainerTypeChange(value, id)}
                            name="referenceDoctorState"
                          /> */}
                          {containers[id] ?
                            <Select
                              name={id}
                              getOptionLabel={(e) => `${e.label}`}
                              getOptionValue={(e) => `${e.value}`}
                              options={containers[id]}
                              value={selectedContainerType[id]}
                              onChange={(value) => handleContainerTypeChange(value, id)}
                              name="referenceDoctorState"
                            />
                            :
                            <label>
                              Containers Not Found
                            </label>
                          }


                          <ErrorMessage
                            name="sampleContainerType"
                            component="div"
                            className="formErr"
                          />
                          {containerTypeErrors[id] && (
                            <div className="formErr">Required</div>
                          )}
                        </div>
                        <div className="col-4 col-md-2 form-group">
                          <div className="row mt-1">
                            <div className="col-md-12 col-12 text-left mt-4">
                              <button
                                name={id}
                                type="button"
                                className="btn btn-primary"
                                onClick={() => handleCytoAddContainerID(id)}
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="col-10 col-md-8 form-group">
                          {sampleContainerList[id].containers.map((test, container_id) => (
                            <>
                              <div className="row mb-1">
                                <div className="col-10">
                                  <div className="form-group mb-0">
                                    <label className="form-control" style={{ height: "auto" }}>{test.type}: {test.id}</label>
                                  </div>
                                </div>
                                <div className="col-2  text-left">
                                  <div style={{ padding: "5px 20px" }}>
                                    <button
                                      name={id}
                                      type="button"
                                      className="btn btn-primary"
                                      onClick={() =>
                                        handleCytoRemoveContainerId(id, container_id)
                                      }
                                    >
                                      remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </>
                          ))}
                        </div>
                      </div>

                      {test.pcpndt &&
                        <>
                          <h6>PCPNDT Info</h6>
                          <hr></hr>
                          <div className="mb-3">
                            <input type="file"
                              ref={pcpndtReference[id]}
                              accept="image/*,application/pdf"
                              style={{ display: 'none' }}
                              className="form-control"
                              onChange={(files) => uploadPcpndtScans(files, id)}
                              multiple />
                          </div>
                          <div className="row">
                            <div className="col-md-6 col-12">
                              <div className="form-group" style={{ display: "flex" }}>
                                <Field ref={instituteLocationRef[id]} type="checkbox" name="instituteLocation" value="yes" />
                                <label className="mb-3 ml-3">
                                  Sample pickup location is same as institute location <span className="marked">*</span>
                                </label>
                                <br />
                                <ErrorMessage
                                  name="instituteLocation"
                                  component="div"
                                  className="formErr"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <label>
                              Location <span className="marked">*</span>
                            </label>
                          </div>
                          <div className="row">
                            <TextField
                              title="Address"
                              name="address"
                              mandatory={true}
                              component="textarea"
                              isDisabled={values.instituteLocation == "yes" ? true : false}
                            />
                            <TextField
                              title="Pin Code"
                              name="pinCode"
                              mandatory={true}
                              isDisabled={values.instituteLocation == "yes" ? true : false}
                            />

                            <div className="col-md-6 col-12">
                              <div className="form-group">
                                <label>
                                  City <span className="marked">*</span>
                                </label>


                                <MySelect
                                  isMulti={false}
                                  optionList={cityList}
                                  name="city"
                                  isDisabled={values.instituteLocation == 'yes' ? true : false}

                                />
                                <ErrorMessage
                                  name="city"
                                  component="div"
                                  className="formErr"
                                />

                              </div>

                            </div>
                            <div className="col-md-6 col-12">
                              <div className="form-group">
                                <label>
                                  State <span className="marked">*</span>
                                </label>

                                <MySelect
                                  isMulti={false}
                                  optionList={stateList}
                                  name="state"
                                  isDisabled={values.instituteLocation == 'yes' ? true : false}
                                />
                                <ErrorMessage
                                  name="state"
                                  component="div"
                                  className="formErr"
                                />

                              </div>
                            </div>
                            <div className="col-4 col-md-4 form-group">
                              <div className="row mt-1">
                                <div className="text-right mt-4">
                                  <button
                                    htmlFor="files"
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => handleUploadScansClick(id)}
                                  >
                                    Upload Scans
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-10 col-md-8 form-group">
                            {props.fileUpload.pcpndtFiles[id].scans.map((name, container_id) => (
                              <>
                                <div className="row mb-1">
                                  <div className="col-10">
                                    <div className="form-control mb-0">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                                      <label className="ml-2" style={{ fontSize: "12px" }}>{name.name ? name.name : name.displayName ? name.displayName : name.originalname}</label>
                                    </div>
                                  </div>
                                  <CancelOutlinedIcon size="medium" onClick={e => onRemovePcpndt(id, container_id)} />
                                </div>
                              </>
                            ))}
                          </div>
                        </>}
                    </>
                  </Form>)}
            </Formik>
          </div>
        ))
      }
      <div className="row" id="action1">
        {props.fromSuperDtrf &&

          <div className="col-md-2 col-2 text-left">
            <div style={{ padding: "5px 20px" }}>
              <button
                onClick={e => Router.push("/super-dtrf")}
                className="btn btn-primary"
              >
                Exit
              </button>
            </div>
          </div>
        }
        <div className={props.fromSuperDtrf ? "col-md-10 col-10 text-right" : "col-md-12 col-12 text-right"}>
          <div style={{ padding: "5px 20px" }}>
            <button
              onClick={handleOnClickPrevious}
              className="btn btn-primary mr-2"
            >
              Previous
            </button>
            {props.fromSuperDtrf && <>

              {!props.Token.isComplete &&

                <button
                  type="button"
                  onClick={() =>
                    handleOnClickSave()
                  }
                  className="btn btn-primary mr-2"
                >
                  Save
                </button>
              }
            </>
            }
            <button
              type="submit"
              className="btn btn-primary"
              onClick={e => {
                firstFormikRef.current.validateForm()
                finalSubmit()
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  formDataRedux: state.formData.formData,
  Token: state.Token,
  usgFile: state.fileUpload.usgFile ? state.fileUpload.usgFile : null,
  patientConsentFile: state.fileUpload.patientConsentFile ? state.fileUpload.patientConsentFile : null,
  otherFiles: state.fileUpload.otherFiles ? state.fileUpload.otherFiles : null,
  doctorAttestationFile: state.fileUpload.doctorAttestation ? state.fileUpload.doctorAttestation : null,
  patientDeclarationPNDT: state.fileUpload.patientDeclarationPNDT ? state.fileUpload.patientDeclarationPNDT : null,
  patientInformedConsent: state.fileUpload.patientInformedConsent ? state.fileUpload.patientInformedConsent : null,
  consentAndIndemnity: state.fileUpload.consentAndIndemnity ? state.fileUpload.consentAndIndemnity : null,
  limitationOfTest: state.fileUpload.limitationOfTest ? state.fileUpload.limitationOfTest : null,
  patientPrivacy: state.fileUpload.patientPrivacy ? state.fileUpload.patientPrivacy : null,
  doctors: state.Doctors.doctorList,
  pcpndtFiles: state.fileUpload.pcpndtFiles ? state.fileUpload.pcpndtFiles : null,
  referralLetter: state.fileUpload.referralLetter ? state.fileUpload.referralLetter : null,
  pnsReport: state.fileUpload.pnsReport ? state.fileUpload.pnsReport : null,
  ntScan: state.fileUpload.ntScan ? state.fileUpload.ntScan : null,
  cbc: state.fileUpload.cbc ? state.fileUpload.cbc : null,
  cbcDoc: state.fileUpload.cbcDoc ? state.fileUpload.cbcDoc : null,
  bth: state.fileUpload.bth ? state.fileUpload.bth : null,
  fileUpload: state.fileUpload


})
export default connect(mapStateToProps, {
  getMandatoryFilesInRedux, getDeletedFiles,
  getFiles, getFilesReference, getFilesToUpload, getClearDeleteFiles, setFormData,
  getPcpndtFiles,
})(ClinicalHistory)
