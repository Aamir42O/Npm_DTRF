import { hasValue } from "./commonHelper"

export const pnsField = [

    {
        name: "sampleCollectionDate",
        title: "Sample Collection Date",
        type: "date",
        show: true,
        validation: ["isRequired", "isPastDate", "maxValue"],
        validationValue: { maxValue: { type: "days", value: 10 } }

    },
    {
        name: "usgDate",
        title: "USG Date",
        type: "date",
        show: true,
        validation: ["isRequired", "isPastDate"],
        validationValue: { greaterThanEqual: { type: "days", label: "Sample Collection Date", name: "sampleCollectionDate" }, }
    },
    {
        name: "gestationalAgeWeeks",
        title: "Gestational Age Weeks",
        type: "number",
        show: true,
        validation: ["isRequired"],
        validationValue: {}
    },
    {
        name: "gestationalAgeDays",
        title: "Gestational Age Days",
        type: "number",
        show: true,
        validation: ["isRequired"],
        validationValue: {}

    },
    {
        name: "currentGestationalAgeWeeks",
        title: "Current Gestational Age Week",
        type: "number",
        validation: ["isDisabled"],
        validationValue: { isDisabled: { name: "disabledField" } }
    },
    {
        name: "currentGestationalAgeDays",
        title: "Current Gestational Age Days",
        type: "number",
        validation: ["isDisabled"],
        validationValue: { isDisabled: { name: "disabledField" } },

    },
    {
        name: "fmfId",
        title: "FMF ID",
        type: "number",
        validation: [],
        validationValue: {}
    }
    ,
    {
        name: "Gravida",
        title: "Gravida",
        type: "number",
        show: true,
        validation: [],
        validationValue: {}
    }
    ,
    {
        name: "Live",
        title: "Live",
        show: true,
        type: "number",
        validation: ["isDisabled"],
        validationValue: { isDisabled: { name: "Gravida" } },

    },
    {
        name: "Abortion",
        title: "Abortion",
        show: true,
        type: "number",
        validation: ["lessThanEqual", "maxValue", "minValue"],
        validationValue: { lessThanEqual: { name: "Gravida", label: "Gravida" }, maxValue: 21, minValue: 0 }
    },
    {
        name: "Para",
        title: "Para",
        show: true,
        type: "number",
        validation: ["lessThanEqual", "isDisabled"],
        validationValue: { lessThanEqual: { name: "Gravida", label: "Gravida" }, isDisabled: { name: "Gravida" } }
    },
    {
        name: "bleedingOrSpottingTwoWeeks",
        title: "Bleeding/Spotting in last two weeks",
        type: "radio",
        options: [{ value: "Yes", label: "Yes" },
        { value: "No", label: "No" }
        ]
        , validation: [],
        validationValue: {}
    },
    {
        name: "lmpCertainity",
        title: "LMP Certainity",
        type: "radio",
        options: [{ value: "Regular", label: "Regular" }, { value: "Irregular", label: "Irregular" }, { value: "Unknown", label: "Unknown" }]
        , validation: [],
        validationValue: {}
    },




    {
        name: "lmpDate",
        title: "LMP Date",
        show: true,
        type: "date",
        validation: ["isRequired", "isPastDate", "minValue"],
        validationValue: { minValue: { type: "days", value: 35 } }
    },
    {
        name: "usgCorrEddDate",
        title: "USG Corr Date",
        type: "date",
        show: true,
        validation: ["isRequired", "isFutureDate",],
        validationValue: {}
    },

    {
        name: "historyOfDownSyndrome",
        title: "History of Down Syndrome",
        show: true,
        type: "radio",
        options: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }]
        , validation: [],
        validationValue: {}
    },
    {
        name: "confirmatoryTestHDS",
        title: "Confirmatory Test Of History of Down Syndrome",
        type: "radio",
        options: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }],
        validation: ["isRequiredIfValue"],
        validationValue: { isRequiredIfValue: { name: "historyOfDownSyndrome", value: "Yes", showIfTrue: true } }
    },

    {
        name: "message",
        type: "message",
        message: "We will not consider previous history of down syndrome for risk assessment",
        validation: [],
        validationValue: { showMessageIf: { name: "historyOfDownSyndrome,confirmatoryTestHDS", value: "Yes,No" } }
    }
    ,
    {
        name: "historyOfEdwardsSyndrome",
        title: "History of Edward Syndrome",
        show: true,
        type: "radio",
        options: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }]
        , validation: [],
        validationValue: {}
    }
    ,
    {
        name: "confirmatoryTestHES",
        title: "Confirmatory Test Of History of Edward Syndrome",
        type: "radio",
        options: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }],
        validation: ["isRequiredIfValue"],
        validationValue: { isRequiredIfValue: { name: "historyOfEdwardsSyndrome", value: "Yes", showIfTrue: true } }
    },
    {
        name: "message",
        type: "message",
        message: "We will not consider previous history of Edward syndrome for risk assessment",
        validation: [],
        validationValue: { showMessageIf: { name: "historyOfEdwardSyndrome,confirmatoryTestHES", value: "Yes,No" } }
    }
    ,
    {
        name: "historyOfPatauSyndrome",
        title: "History of Patau Syndrome",
        type: "radio",
        show: true,
        options: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }]
        , validation: [],
        validationValue: {}
    },
    {
        name: "confirmatoryTestHPS",
        title: "Confirmatory Test Of History of Patau Syndrome",
        type: "radio",
        options: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }],
        validation: ["isRequiredIfValue"],
        validationValue: { isRequiredIfValue: { name: "historyOfPatauSyndrome", value: "Yes" } }
    },
    {
        name: "message",
        type: "message",
        message: "We will not consider previous history of Patau syndrome for risk assessment",
        validation: [],
        validationValue: { showMessageIf: { name: "historyOfPatauSyndrome,confirmatoryTestHPS", value: "Yes,No" } }
    }
    ,
    {
        name: "diabetesInsulinDependent",
        title: "Diabetes Status (Insulin Dependent)",
        type: "radio",
        options: [{ value: "Yes", label: "Yes" },
        { value: "No", label: "No" }
        ]
        , validation: ["isRequired"],
        validationValue: {},

    },
    {
        name: "diabetesInsulinDependent",
        title: "Diabetes Status (Insulin Dependent)",
        type: "radio",
        options: [{ value: "Pre-Diabetic(Insulin started before pregnancy)", label: "Pre-Diabetic(Insulin started before pregnancy)" },
        { value: "Gestational Diabetes(Insulin started after pregnancy)", label: "Gestational Diabetes(Insulin started after pregnancy)" }
        ]
        , validation: ["isRequiredIfValue"],
        validationValue: { isRequiredIfValue: { name: "diabetesInsulinDependent", value: "Yes" } }
        , alignmentType: "single"
    },
    {
        name: "patientOnHcg",
        title: "Patient On HCG",
        show: true,
        type: "radio",
        options: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }],
        validation: ["isRequired"],
        validationValue: {}
    },
    {
        name: "message",
        type: "message",
        message: "Sample should be collected after 48-72 hours of last hCG injection. If hCG injection is already administered, wait for 48-72 hours before withdrawing blood for test.",
        validation: [],
        validationValue: { showMessageIf: { name: "patientOnHcg", value: "Yes" } }

    },
    {
        name: "typeOfConception",
        title: "Type of Conception",
        show: true,
        type: "radio",
        options: [{ value: "Natural", label: "Natural" }, { value: "Assisted", label: "Assisted" },
        { value: "Ovulation drugs", label: "Ovulation drugs" }, { value: "IUI", label: "IUI" }],
        validation: ["isRequired"],
        validationValue: {}
    },
    {
        name: "typeOfProcedure",
        type: "radio",
        title: "Type Of Procedure",
        validation: ["isRequiredIfValue"],
        validationValue: { isRequiredIfValue: { name: "typeOfConception", value: "Assisted", showIfTrue: true } },
        options: [{ value: "Self IVF", label: "Self IVF" }, { value: "Self ICSI", label: "Self ICSI" },
        { value: "Donor Egg", label: "Donor Egg" }]
    },
    {
        name: "donorDob",
        title: "Donor Date of Birth",
        type: "date",
        validation: ["isRequiredIfValue", "isPastDate", "minValue",],
        validationValue: {
            isRequiredIfValue: { name: "typeOfProcedure", value: "Donor Egg", showIfTrue: true },
            minValue: { type: "years", value: 18, label: "18" }
        }
    },
    {
        name: "extractionDate",
        title: "Extraction Date",
        type: "date",
        validation: ["isRequiredIfValue", "isPastDate"],
        validationValue: { isRequiredIfValue: { name: "typeOfConception", value: "Assisted", showIfTrue: true } },
    },
    {
        name: "transferDate",
        title: "Transfer Date",
        type: "date",
        validation: ["isRequiredIfValue", "lessThanEqual", "isPastDate"],
        validationValue: { isRequiredIfValue: { name: "typeOfConception", value: "Assisted", showIfTrue: true }, lessThanEqual: { name: "extractionDate", value: 0, label: "Extraction Date", type: "days" } },
    },
    {
        name: "presentPregnancy",
        title: "Present Pregnancy",
        type: "radio",
        show: true,
        validation: ["isRequired"],
        options: [
            { value: "Singleton", label: "Singleton" },
            { value: "Twins", label: "Twins" },
            { value: "Vanishing Twin", label: "Vanishing Twin" }
        ],
        validationValue: {},
        newRow: true

    },
    {
        name: "twinType",
        title: "Twin Type",
        type: "radio",
        options: [{ value: "Dichorionic", label: "Dichorionic" },
        { value: "Monochorionic", label: "Monochorionic" },
        ],
        validation: ["isRequiredIfValue"],
        validationValue: { isRequiredIfValue: { name: "presentPregnancy", value: "Twins" } }
    },
    {
        name: "monochorionicType",
        title: "Monochorionic Type",
        type: "radio",
        options: [{ value: "MCDA", label: "MCDA" },
        { value: "MCMA", label: "MCMA" }
        ],
        validation: ["isRequiredIfValue"],
        validationValue: { isRequiredIfValue: { name: "twinType", value: "Monochorionic", showIfTrue: true } }
    },
    {
        name: "crl",
        title: "CRL",
        type: "number",
        validation: ["isRequiredIfValueIsNot", "minValue", "maxValue"],
        validationValue: {
            isRequiredIfValueIsNot: { name: "presentPregnancy", value: "Twins", showIfTrue: true },
            minValue: 0, maxValue: 85
        },
        testTrimester: "First"

    },
    {
        name: "nt",
        title: "NT",
        type: "number",
        validation: ["isRequiredIfValueIsNot", "maxValue", "minValue"],
        validationValue: {
            nonMandatory: true,
            isRequiredIfValueIsNot: { name: "presentPregnancy", value: "Twins", showIfTrue: true },
            minValue: 0, maxValue: 85
        },
        testTrimester: "First"

    },
    {
        name: "twinCrl1",
        title: "Twin-1: CRL (in mm)",
        type: "number",
        validation: ["isRequiredIfValue", "minValue", "maxValue"],
        validationValue: {
            nonMandatory: true,
            isRequiredIfValue: { name: "presentPregnancy", value: "Twins", showIfTrue: true },
            minValue: 0, maxValue: 85
        },

    },
    {
        name: "twinNt1",
        title: "Twin-1: NT (in mm)",
        type: "number",
        validation: ["isRequiredIfValue", "maxValue", "minValue"],
        validationValue: {
            isRequiredIfValue: { name: "presentPregnancy", value: "Twins", showIfTrue: true },
            minValue: 0, maxValue: 85
        },

    },
    {
        name: "twinCrl2",
        title: "Twin-2: CRL (in mm)",
        type: "number",
        validation: ["isRequiredIfValue", "minValue", "maxValue"],
        validationValue: {
            nonMandatory: true,
            isRequiredIfValue: { name: "presentPregnancy", value: "Twins", showIfTrue: true },
            minValue: 0, maxValue: 85
        },

    },
    {
        name: "twinNt2",
        title: "Twin-2: NT (in mm)",
        type: "number",
        validation: ["isRequiredIfValue", "maxValue", "minValue"],
        validationValue: {
            isRequiredIfValue: { name: "presentPregnancy", value: "Twins", showIfTrue: true },
            minValue: 0, maxValue: 85
        },

    },
    {
        name: "nb",
        title: "NB",
        type: "radio",
        options: [{ value: "Present", label: "Present" },
        { value: "Absent", label: "Absent" }
        ]
        , validation: ["isRequiredIfValueIsNot"],
        validationValue: { nonMandatory: true, isRequiredIfValueIsNot: { name: "presentPregnancy", value: "Twins" } }
    },
    {
        name: "twinNb1",
        title: "Twin-1: NB",
        type: "radio",
        options: [{ value: "Present", label: "Present" },
        { value: "Absent", label: "Absent" }
        ]
        , validation: ["isRequiredIfValue"],
        validationValue: { nonMandatory: true, isRequiredIfValue: { name: "presentPregnancy", value: "Twins" } }
    },
    {
        name: "twinNb2",
        title: "Twin-2: NB",
        type: "radio",
        options: [{ value: "Present", label: "Present" },
        { value: "Absent", label: "Absent" }
        ]
        , validation: ["isRequiredIfValue"],
        validationValue: { nonMandatory: true, isRequiredIfValue: { name: "presentPregnancy", value: "Twins" } }
    },
    {
        name: "crl",
        title: "CRL (in mm)",
        type: "number",
        validation: ["atLeastOne", "minValue", "maxValue"],
        validationValue: {
            atLeastOne: { name: ["bpd", "crl", "fl", "hc"], label: ["BPD", "CRL", "FL", "HC"] },
            minValue: 0, maxValue: 85
        },
        testTrimester: "Second"

    },
    {
        name: "bpd",
        title: "BPD (in mm)",
        type: "number",
        validation: ["atLeastOne", "minValue", "maxValue"],
        validationValue: {
            atLeastOne: { name: ["bpd", "crl", "fl", "hc"], label: ["BPD", "CRL", "FL", "HC"] },
        },
        testTrimester: "Second"

    },
    {
        name: "fl",
        title: "FL (in mm)",
        type: "number",
        validation: ["atLeastOne", "minValue", "maxValue"],
        validationValue: {
            atLeastOne: { name: ["bpd", "crl", "fl", "hc"], label: ["BPD", "CRL", "FL", "HC"] },
        },
        testTrimester: "Second"

    },
    {
        name: "hc",
        title: "HC (in mm)",
        type: "number",
        validation: ["atLeastOne", "minValue", "maxValue"],
        validationValue: {
            atLeastOne: { name: ["bpd", "crl", "fl", "hc"], label: ["BPD", "CRL", "FL", "HC"] },
        },
        testTrimester: "Second"

    },
    {
        name: "bpOrMp",
        title: "BP or MAP",
        type: "radio",
        options: [{ value: "MAP", label: "MAP" }, { value: "BP", label: "BP" }],
        validation: ["isRequired"],
        validationValue: {},
        testType: "preEclampsia",
    },
    {
        name: "bpMeasurementDate",
        title: "BP measurement Date",
        type: "date",
        validation: ["isRequiredIfValue", "isPastDate", "maxValue"],
        validationValue: { maxValue: { value: 0, type: "days" }, isRequiredIfValue: { name: "bpOrMp", value: "BP" } }
    }
    ,
    {

        name: "bpLeftSystolic1",
        title: "BP Left Arm - Systolic Reading 1",
        type: "number",
        validation: ["isRequiredIfValue"],
        validationValue: { isRequiredIfValue: { name: "bpOrMp", value: "BP" } }
    }
    ,
    {

        name: "bpLeftDiSystolic1",
        title: "BP Left Arm - Diastolic Reading 1",
        type: "number",
        validation: ["isRequiredIfValue"],
        validationValue: { isRequiredIfValue: { name: "bpOrMp", value: "BP" } }
    }
    ,
    {

        name: "bpLeftSystolic2",
        title: "BP Left Arm - Systolic Reading 2",
        type: "number",
        validation: ["isRequiredIfValue"],
        validationValue: { isRequiredIfValue: { name: "bpOrMp", value: "BP" } }
    }
    ,
    {

        name: "bpLeftDiSystolic2",
        title: "BP Left Arm - Diastolic Reading 2",
        type: "number",
        validation: ["isRequiredIfValue"],
        validationValue: { isRequiredIfValue: { name: "bpOrMp", value: "BP" } }
    }
    ,
    {

        name: "bpRightSystolic1",
        title: "BP Right Arm - Systolic Reading 1",
        type: "number",
        validation: ["isRequiredIfValue"],
        validationValue: { isRequiredIfValue: { name: "bpOrMp", value: "BP" } }
    }
    ,
    {

        name: "bpRightDiSystolic1",
        title: " BP Right Arm - Diastolic Reading 1",
        type: "number",
        validation: ["isRequiredIfValue"],
        validationValue: { isRequiredIfValue: { name: "bpOrMp", value: "BP" } }
    }
    ,
    {

        title: "BP Right Arm - Systolic Reading 2",
        name: "bpRightSystolic2",
        type: "number",
        validation: ["isRequiredIfValue"],
        validationValue: { isRequiredIfValue: { name: "bpOrMp", value: "BP" } }
    }
    ,
    {

        title: " BP Right Arm - Diastolic Reading 2",
        name: "bpRightDiSystolic2",
        type: "number",
        validation: ["isRequiredIfValue"],
        validationValue: { isRequiredIfValue: { name: "bpOrMp", value: "BP" } }
    }
    ,
    {
        name: "mapReading1",
        title: "Map Reading-1",
        type: "number",
        validation: ["isRequiredIfValue"],
        validationValue: { isRequiredIfValue: { name: "bpOrMp", value: "MAP" } }

    },
    {
        name: "mapReading2",
        title: "Map Reading-2",
        type: "number",
        validation: ["isRequiredIfValue"],
        validationValue: { isRequiredIfValue: { name: "bpOrMp", value: "MAP" } }

    },
    {
        name: "familyHistoryPreEclampsia",
        title: "Family History of Pre-eclampsia",
        type: "dropDown",
        validation: ["isRequired"],
        testType: "preEclampsia",
        validationValue: {},
        options: [
            { value: "Not Known", label: "Not Known" },
            { value: "Not Present", label: "Not Present" },
            { value: "Patient", label: "Patient" },
            { value: "Mother", label: "Mother" }]
    },
    {
        name: "chronicHypertension",
        title: "Chronic Hypertension",
        type: "dropDown",
        validation: ["isRequired"],
        testType: "preEclampsia",
        validationValue: {},
        options: [
            { value: "Not Known", label: "Not Known" },
            { value: "Not Present", label: "Not Present" },
            { value: "Medication", label: "Medication" },
            { value: "Untreated", label: "Untreated" }]
    },
    {
        name: "uterineArteryPulsativeIndexRightPI",
        title: "Uterine Artery Pulsative Index - Right PI",
        validation: ["isRequired", "maxValue", "minValue"],
        validationValue: { maxValue: 100, minValue: 1 },
        testType: "preEclampsia",
        type: "number",
    },
    {
        name: "uterineArteryPulsativeIndexLeftPI",
        title: "Uterine Artery Pulsative Index - Left PI",
        validation: ["isRequired", "maxValue", "minValue"],
        validationValue: { maxValue: 100, minValue: 1 },
        testType: "preEclampsia",
        type: "number",
    },


]


export const nbsFlow = [
    {
        name: "sampleCollectionDate",
        title: "Sample Collection Date",
        type: "date",
        show: true,
        validation: ["isRequired", "isPastDate", "greaterThanEqual"],
        validationValue: { greaterThanEqual: { label: "Patient's date of birth,First Feeding date", name: "dateOfBirth,firstFeedingDate", type: "days,days" } }

    },
    {
        name: "firstFeedingDate",
        title: "First Feeding Date",
        type: "date",
        show: true,
        validation: ["isRequired", "isPastDate", "greaterThanEqual"],
        validationValue: { greaterThanEqual: { type: "days", name: "dateOfBirth", label: "Patient's Date of birth" } }

    },
    {
        name: "hoTransfusion",
        title: "History of HO Transfusion",
        type: "radio",
        options: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }]
        , validation: ["isRequired"],
        validationValue: {}
    },
    {
        name: "dateOfHoTransfusion",
        title: "Date of HO Transfusion",
        type: "date",
        validation: ["isRequiredIfValue", "isPastDate"],
        validationValue: { isRequiredIfValue: { name: "hoTransfusion", value: "Yes" } }
    },
    {
        name: "additionalSymptoms",
        title: "Additional Symptom/History",
        type: "text",
        validation: [],
        validationValue: {}
    },
    {
        name: "typeOfFeeding",
        title: "Type of Feeding",
        type: "dropDown",
        validation: ["isRequired"],
        validationValue: {},
        options: [
            { value: "Breast", label: "Breast" },
            { value: "TPN", label: "TPN" },
            { value: "Formula", label: "Formula" },
            { value: "Formula Trade Name", label: "Formula Trade Name" }]
    },
    {
        name: "deliveryStatus",
        title: "Delivery Status",
        type: "dropDown",
        validation: ["isRequired"],
        validationValue: {},
        options: [{ value: "Normal", label: "Normal" },
        { value: "Premature", label: "Premature" },
        { value: "Sick", label: "Sick" },
        { value: "On antibiotics", label: "On antibiotics" }
        ]
    }
]

export const niptFlow = [

    {
        name: "sampleCollectionDate",
        title: "Sample Collection Date",
        type: "date",
        show: true,
        validation: ["isRequired", "isPastDate", "maxValue"],
        validationValue: { maxValue: { type: "days", value: 10 } }

    },
    {
        name: "usgDate",
        title: "USG Date",
        type: "date",
        show: true,
        validation: ["isRequired", "isPastDate"],
        validationValue: { greaterThanEqual: { type: "days", label: "Sample Collection Date", name: "sampleCollectionDate" }, }
    },
    {
        name: "gestationalAgeWeeks",
        title: "Gestational Age Weeks",
        type: "number",
        show: true,
        validation: ["isRequired"],
        validationValue: {}
    },
    {
        name: "gestationalAgeDays",
        title: "Gestational Age Days",
        type: "number",
        show: true,
        validation: ["isRequired"],
        validationValue: {}

    },
    {
        name: "currentGestationalAgeWeeks",
        title: "Current Gestational Age Week",
        type: "number",
        validation: ["isDisabled"],
        validationValue: { isDisabled: { name: "disabledField" } }
    },
    {
        name: "currentGestationalAgeDays",
        title: "Current Gestational Age Days",
        type: "number",
        validation: ["isDisabled"],
        validationValue: { isDisabled: { name: "disabledField" } },

    },
    {
        name: "fmfId",
        title: "FMF ID",
        type: "number",
        validation: [],
        validationValue: {}
    }
    ,
    {
        name: "ivfPregnancy",
        title: "IVF Pregnancy",
        type: "radio",
        show: true,
        validation: ["isRequired"],
        options: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
        ],
        validationValue: {}
    },
    {
        name: "eggUsed",
        title: "Egg Used",
        type: "radio",
        validation: ["isRequiredIfValue"],
        options: [
            { value: "Self", label: "Self" },
            { value: "Donor", label: "Donor" },
        ],
        validationValue: { isRequiredIfValue: { name: "ivfPregnancy", value: "Yes" } }
    },
    {
        name: "ageAtEggRetrieval",
        title: "Age at egg retrieval",
        type: "number",
        validation: ["isRequiredIfValue"],
        validationValue: { isRequiredIfValue: { name: "ivfPregnancy", value: "Yes" } }
    },
    {
        name: "presentPregnancy",
        title: "Present Pregnancy",
        type: "radio",
        show: true,
        validation: ["isRequired"],
        options: [
            { value: "Singleton", label: "Singleton" },
            { value: "Twins", label: "Twins" },
            { value: "Vanishing Twin", label: "Vanishing Twin" }
        ],
        validationValue: {},
        newRow: true
    },
    {
        name: "twinType",
        title: "Twin Type",
        type: "radio",
        options: [{ value: "Dichorionic", label: "Dichorionic" },
        { value: "Monochorionic", label: "Monochorionic" },
        ],
        validation: ["isRequiredIfValue"],
        validationValue: { isRequiredIfValue: { name: "presentPregnancy", value: "Twins" } }
    },
    {
        name: "monochorionicType",
        title: "Monochorionic Type",
        type: "radio",
        options: [{ value: "MCDA", label: "MCDA" },
        { value: "MCMA", label: "MCMA" }
        ],
        validation: ["isRequiredIfValue"],
        validationValue: { isRequiredIfValue: { name: "twinType", value: "Monochorionic" } },
    },
    {
        name: "dateOfTwinVanishOrReduced",
        type: "date",
        title: "Date on which the other twin had vanished/reduced",
        validation: ["isRequiredIfValue", "isPastDate"],
        validationValue: { isRequiredIfValue: { name: "presentPregnancy", value: "Vanishing Twin" } }
    },
    {
        name: "Gravida",
        title: "Gravida",
        type: "number",
        show: true,
        validation: [],
        validationValue: {}
    }
    ,
    {
        name: "Live",
        title: "Live",
        show: true,
        type: "number",
        validation: ["isDisabled"],
        validationValue: { isDisabled: { name: "Gravida" } },

    },
    {
        name: "Abortion",
        title: "Abortion",
        show: true,
        type: "number",
        validation: ["lessThanEqual", "maxValue", "minValue"],
        validationValue: { lessThanEqual: { name: "Gravida", label: "Gravida" }, maxValue: 21, minValue: 0 }
    },
    {
        name: "Para",
        title: "Para",
        show: true,
        type: "number",
        validation: ["lessThanEqual", "isDisabled"],
        validationValue: { lessThanEqual: { name: "Gravida", label: "Gravida" }, isDisabled: { name: "Gravida" } }
    },
    {
        name: "previousPregnancy",
        title: "Previous pregnancy",
        type: "radio",
        options: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
        ],
        validation: ["isRequired"],
        validationValue: {}
    },
    {
        name: "prevPregDate",
        title: "Previous pregnancy date",
        type: "date",
        validation: ["isRequiredIfValue", "isPastDate",],
        validationValue: { isRequiredIfValue: { name: "previousPregnancy", value: "Yes" } }
    },
    {
        name: "spontaneousAbortion",
        title: "Spontaneous Abortion ?",
        type: "radio",
        options: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
        ],
        validation: ["isRequiredIfValue"],
        validationValue: { isRequiredIfValue: { name: "previousPregnancy", value: "Yes" } }
    },
    {
        name: "terminationPregnancy",
        title: "Termination of pregnancies ? ",
        type: "radio",
        options: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
        ],
        validation: ["isRequiredIfValue"],
        validationValue: { isRequiredIfValue: { name: "previousPregnancy", value: "Yes" } }
    },
    {
        name: "surrogate",
        title: "Surrogate",
        type: "radio",
        options: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
        ],
        validation: ["isRequired"],
        validationValue: {}
    },

]

export const cytoFlow = [
    {
        name: "sampleCollectionDate",
        title: "Sample Collection Date",
        type: "date",
        show: true,
        validation: ["isRequired", "isPastDate", "maxValue"],
        validationValue: { maxValue: { type: "days", value: 10 } }

    },
    {
        name: "gestationalAgeWeeks",
        title: "Gestational Age Weeks",
        type: "number",
        show: true,
        validation: ["isRequired"],
        validationValue: {}
    },
    {
        name: "gestationalAgeDays",
        title: "Gestational Age Days",
        type: "number",
        show: true,
        validation: ["isRequired"],
        validationValue: {}

    },
    {
        name: "maternalAge",
        title: "Maternal Age",
        type: "number",
        validation: ["isRequired"],
        validationValue: {},
        testType: "cytoPrenatal"

    },
    {
        name: "motherGeneticDisease",
        title: "Genetic Diseases in Mother",
        type: "text",
        validation: ["isRequired"],
        validationValue: {},
        testType: "cytoPrenatal"


    },
    {
        name: "fatherGeneticDisease",
        title: "Genetic Diseases in Father",
        type: "text",
        validation: ["isRequired"],
        validationValue: {},
        testType: "cytoPrenatal"


    },
    {
        name: "siblingGeneticDisease",
        title: "Genetic Diseases in siblings",
        type: "text",
        validation: ["isRequired"],
        validationValue: {},
        testType: "cytoPrenatal"


    },
    {
        name: "maternalAge",
        title: "Maternal Age",
        type: "number",
        validation: ["isRequired"],
        validationValue: {},
        testType: "cytoPrenatal"

    },
    {
        name: "consanguinity",
        title: "Consanguinity",
        type: "number",
        validation: ["isRequired"],
        validationValue: {},
        testType: "cytoPrenatal"

    },
]


export const validateField = (field, formValues, externalValidation, setValues) => {
    const errors = {}
    console.log(externalValidation)
    if (externalValidation.calculateCurrentGestational) {
        console.log("condition", formValues.usgDate && formValues.sampleCollectionDate &&
            (hasValue(formValues.gestationalAgeDays)) && (hasValue(formValues.gestationalAgeWeeks)))

        if (formValues.usgDate && formValues.sampleCollectionDate &&
            (hasValue(formValues.gestationalAgeDays)) && (hasValue(formValues.gestationalAgeWeeks))) {
            const diff = moment(formValues.sampleCollectionDate).diff(moment(formValues.usgDate), "days")
            let days = diff + formValues.gestationalAgeDays
            let weeks = formValues.gestationalAgeWeeks
            while (days > 6) {
                weeks = weeks + 1
                days = days - 7
            }
            while (days < 0) {
                days = days + 7
                weeks = weeks - 1
            }
            setValues.currentGestationalAgeDays = days
            setValues.currentGestationalAgeWeeks = weeks
        }
        if (hasValue(formValues.currentGestationalAgeDays) && (hasValue(formValues.currentGestationalAgeWeeks)) && externalValidation.validateGestation) {
            if (formValues.currentGestationalAgeWeeks > externalValidation.gestationalAgeEnd || formValues.currentGestationalAgeWeeks < externalValidation.gestationalAgeStart) {
                errors.currentGestationalAgeWeeks = "Weeks should be between " + parseInt(externalValidation.gestationalAgeStart) + " - " + parseInt(externalValidation.gestationalAgeEnd);
            }
            else if (!/^[0-9\b]+$/.test(formValues.currentGestationalAgeWeeks)) {
                errors.currentGestationalAgeWeeks = "Should only be numbers";
            }

            if (formValues.currentGestationalAgeWeeks == parseInt(externalValidation.gestationalAgeEnd)) {
                let endDay;
                try {
                    endDay = parseInt((externalValidation.gestationalAgeEnd + "").split(".")[1])
                } catch (e) {
                    endDay = 0
                }
                if (formValues.currentGestationalAgeDays > endDay || formValues.currentGestationalAgeDays < 0) {
                    errors.currentGestationalAgeDays = endDay == 0 ? "Days should be 0 only" + endDay : "Days should be between 0 - " + endDay;
                }
            }
        }

    }
    for (let i = 0; i < field.length; i++) {
        const validation = field[i].validation
        const value = formValues[field[i].name]
        const type = field[i].type
        const testType = field[i].testType
        const testTrimester = field[i].testTrimester

        const { minValue, maxValue, minLength, greaterThan, lessThan, greaterThanEqual, lessThanEqual, isRequiredIf, isRequiredIfValue, isRequired, isRequiredIfValueIsNot, nonMandatory, atLeastOne } = field[i].validationValue
        let shouldRun = true
        if (testType && !(externalValidation.testType == testType)) {
            shouldRun = false
        }
        if (testTrimester && !(externalValidation.testTrimester == testTrimester)) {
            shouldRun = false
        }
        if (validation.includes("isRequired")) {
            if (["", null, undefined, false].includes(value) && (shouldRun && !nonMandatory)) {
                if (externalValidation.isRequired) {
                    errors[field[i].name] = "Required"
                    continue
                }
            }
        }
        if (validation.includes("isRequiredIfValueIsNot")) {
            if ((formValues[isRequiredIfValueIsNot.name] != isRequiredIfValueIsNot.value) && (shouldRun && !nonMandatory)) {
                if (["", null, undefined, false].includes(value)) {
                    if (externalValidation.isRequired) {
                        errors[field[i].name] = "Required"
                        continue
                    }
                }
            }

        }

        if (validation.includes("isRequiredIfValue")) {

            if (formValues[isRequiredIfValue.name] == isRequiredIfValue.value && (shouldRun && !nonMandatory)) {
                if (["", null, undefined, false].includes(value)) {
                    if (externalValidation.isRequired) {
                        errors[field[i].name] = "Required"
                        continue
                    }
                }
            }
        }
        if (validation.includes("isRequiredIf")) {
            let shouldRun = true
            if (testType && !(externalValidation.testType == testType)) {
                shouldRun = false
            }
            if (testTrimester && !(externalValidation.testTrimester == testTrimester)) {
                shouldRun = false
            }
            if (!value && shouldRun && !nonMandatory) {
                if (externalValidation.isRequired) {
                    errors[field[i].name] = "Required"
                }
            }

        }
        if (validation.includes("atLeastOne") && hasValue(value)) {
            let isErr = true
            atLeastOne.name.map((single) => {
                if (!["", null, undefined, false].includes(formValues[single])) {
                    isErr = false
                }
            })
            if (isErr && shouldRun) {
                if (externalValidation.isRequired) {
                    errors[field[i].name] = "At Least one should be filled among " + atLeastOne.label.toString()
                }
            }
        }
        if (validation.includes("minLength")) {
            if (value.length < value && hasValue(value)) {
                errors[field[i].name] = "Length should be greater than " + minLength
                continue
            }
        }

        if (validation.includes("isFutureDate")) {
            let days = 0
            if (field[i].validationValue.futureDate) {
                days = 1
            }
            const diff = moment(moment().format("YYYY-MM-DD")).diff(formValues[field[i].name], "days")
            if (diff >= days && hasValue(value)) {
                errors[field[i].name] = `Date should be future ${days > 0 ? "or current" : ""} date`
                continue
            }
        }
        if (validation.includes("isPastDate")) {
            let days = 0
            if (field[i].validationValue.pastDate) {
                days = 1
            }
            const diff = moment(moment().format("YYYY-MM-DD")).diff(formValues[field[i].name], "days")
            if (diff < days && hasValue(value)) {
                errors[field[i].name] = `Date cant be future ${days > 0 ? "or current" : ""} date`
                continue
            }
        }
        if (validation.includes("minValue")) {

            if (type == "date" && hasValue(value)) {
                const diff = moment(moment().format("YYYY-MM-DD")).diff(formValues[field[i].name], minValue.type)
                if (Math.abs(diff) < minValue.value) {
                    errors[field[i].name] = `Date should be ${minValue.value < 0 ? "after" : "before"} or equal to   ${Math.abs(minValue.value)}  ${minValue.type} from   current date`
                    continue
                }
            } else if (value < field[i].validationValue.minValue && hasValue(value)) {
                errors[field[i].name] = "Value should be more than " + minValue
                continue
            }
        }
        if (validation.includes("maxValue")) {
            if (type == "date" && hasValue(value)) {
                const diff = moment(moment().format("YYYY-MM-DD")).diff(formValues[field[i].name], maxValue.type)
                if (Math.abs(diff) > maxValue.value) {
                    errors[field[i].name] = `Date should be ${maxValue.value < 0 ? "after" : "before"} or equal to   ${Math.abs(maxValue.value)}  ${maxValue.type} from   current date`
                    continue
                }
            } else if ((value > field[i].validationValue.maxValue) && hasValue(value)) {
                errors[field[i].name] = "Value should be less than " + maxValue
                continue
            }
        }
        if (validation.includes("greaterThanEqual")) {
            if (type == "date" && hasValue(value)) {
                let names = greaterThanEqual.name.split(",")
                let types = greaterThanEqual.type.split(",")
                let labels = greaterThanEqual.label.split(",")
                let err = null
                for (let j = 0; j < names.length; j++) {
                    if (formValues[names[j]]) {
                        const diff = moment(moment(formValues[field[i].name]).format("YYYY-MM-DD")).diff(formValues[names[j]], types[j])
                        if (diff < 0) {
                            err = true
                            errors[field[i].name] = field[i].title + "  should be greater than " + (labels[j])
                            break
                        }
                    }
                }
                if (err) {
                    continue
                }

            } else {
                let data = greaterThanEqual.name ? formValues[greaterThanEqual.name] : greaterThanEqual.value
                if (data && (value < data) && hasValue(value)) {
                    errors[field[i].name] = "Value should be less than or equal to " + (greaterThanEqual.label ? greaterThanEqual.label : greaterThanEqual)
                    continue
                }
            }
        }
        if (validation.includes("lessThanEqual")) {
            let data = lessThanEqual.name ? formValues[lessThanEqual.name] : lessThanEqual.value
            if (type == "date" && hasValue(value)) {
                const diff = moment(moment(formValues[field[i].name]).format("YYYY-MM-DD")).diff(moment(formValues[lessThanEqual.name]).format("YYYY-MM-DD"), lessThanEqual.type)
                if (diff < lessThanEqual.value) {
                    errors[field[i].name] = "Date should be after  " + (lessThanEqual.label ? lessThanEqual.label : lessThanEqual.value)
                    continue
                }
            } else if (data && (value > data) && hasValue(value)) {
                errors[field[i].name] = "Value should be less than or equal to " + (lessThanEqual.name ? lessThanEqual.name : lessThanEqual.value)
                continue
            }
        }
    }
    return { ...errors }

}


