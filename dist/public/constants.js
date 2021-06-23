"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.containerTypes = exports.stateList = exports.cityList = exports.referralReason = exports.patients = exports.molecularGeneticsTestsList = exports.cytogenomicsTestsList = exports.cytogeneticsTestsList = exports.doctorsList = void 0;
const doctorsList = [{
  label: "doctor 1 ( Obs-Gynaecologist )",
  value: 1,
  type: "Obs-Gynaecologist",
  sub_group: "cytogenetics"
}, {
  label: "doctor 2 ( Sonologist/ Fetal Medicine specialist )",
  value: 2,
  type: "Sonologist/ Fetal Medicine specialist",
  sub_group: "molecular_genetics"
}, {
  label: "doctor 3 ( Obs-Gynaecologist )",
  value: 3,
  type: "Obs-Gynaecologist",
  sub_group: "cytogenomics"
}, {
  label: "doctor 4 ( Sonologist/ Fetal Medicine specialist )",
  value: 4,
  type: "Sonologist/ Fetal Medicine specialist",
  sub_group: "cytogenetics"
}, {
  label: "doctor 5 ( Obs-Gynaecologist )",
  value: 5,
  type: "Obs-Gynaecologist",
  sub_group: "molecular_genetics"
}, {
  label: "doctor 6 ( Sonologist/ Fetal Medicine specialist )",
  value: 6,
  type: "Sonologist/ Fetal Medicine specialist",
  sub_group: "cytogenomics"
}, {
  label: "doctor 7 ( Obs-Gynaecologist )",
  value: 7,
  type: "Obs-Gynaecologist",
  sub_group: "cytogenetics"
}, {
  label: "doctor 8 ( Sonologist/ Fetal Medicine specialist )",
  value: 8,
  type: "Sonologist/ Fetal Medicine specialist",
  sub_group: "molecular_genetics"
}, {
  label: "doctor 9 ( Obs-Gynaecologist )",
  value: 9,
  type: "Obs-Gynaecologist",
  sub_group: "cytogenomics"
}, {
  label: "doctor 10 ( Sonologist/ Fetal Medicine specialist )",
  value: 10,
  type: "Sonologist/ Fetal Medicine specialist",
  sub_group: "cytogenetics"
}, {
  label: "doctor 11 ( Obs-Gynaecologist )",
  value: 11,
  type: "Obs-Gynaecologist",
  sub_group: "molecular_genetics"
}, {
  label: "doctor 12 ( Sonologist/ Fetal Medicine specialist )",
  value: 12,
  type: "Sonologist/ Fetal Medicine specialist",
  sub_group: "cytogenomics"
}, {
  label: "doctor 13 ( Obs-Gynaecologist )",
  value: 13,
  type: "Obs-Gynaecologist",
  sub_group: "cytogenetics"
}, {
  label: "doctor 14 ( Sonologist/ Fetal Medicine specialist )",
  value: 14,
  type: "Sonologist/ Fetal Medicine specialist",
  sub_group: "molecular_genetics"
}, {
  label: "doctor 15 ( Obs-Gynaecologist )",
  value: 15,
  type: "Obs-Gynaecologist",
  sub_group: "cytogenomics"
}, {
  label: "doctor 16 ( Sonologist/ Fetal Medicine specialist )",
  value: 16,
  type: "Sonologist/ Fetal Medicine specialist",
  sub_group: "cytogenetics"
}];
exports.doctorsList = doctorsList;
const cytogeneticsTestsList = [{
  value: 1,
  label: "Epitome: Blood Karyotyping"
}, {
  value: 2,
  label: "Prenatal Karyotype (AF/CVS/FCB)"
}, {
  value: 3,
  label: "FISH - 5 Probes (13,18,21,X,Y)"
}, {
  value: 4,
  label: "FISH - 22q 11.2 microdeletion"
}];
exports.cytogeneticsTestsList = cytogeneticsTestsList;
const cytogenomicsTestsList = [{
  value: 1,
  label: "Altum: Chromosomal microarray"
}, {
  value: 2,
  label: "Altum 750K: Chromosomal microarray"
}];
exports.cytogenomicsTestsList = cytogenomicsTestsList;
const molecularGeneticsTestsList = [{
  value: 1,
  label: "QF-PCR (13,18,21,X,Y"
}, {
  value: 2,
  label: "DNA Extration and storage"
}, {
  value: 3,
  label: "DMD Prenatal Diagnosis"
}, {
  value: 4,
  label: "TORCH-PCR"
}, {
  value: 5,
  label: "Maternal Cell contamination testing wth DNA Storage"
}, {
  value: 6,
  label: "Clinical Exome Sequencing"
}, {
  value: 7,
  label: "Beta-Thalassemia mutation analysis"
}, {
  value: 8,
  label: "Maternal Cell contamination testing"
}, {
  value: 9,
  label: "Sanger Sequencing (Variant specific"
}, {
  value: 10,
  label: "Sickle Cell Anemia/HbE/HbD Mutation analysis"
}, {
  value: 11,
  label: "SMA (Individual/PND"
}, {
  value: 12,
  label: "Carrier testing (Couple"
}, {
  value: 13,
  label: "Y-Chromosome microdeletion"
}, {
  value: 14,
  label: "DMD MLPA"
}, {
  value: 15,
  label: "Other Molecular Studies"
}];
exports.molecularGeneticsTestsList = molecularGeneticsTestsList;
const patients = [{
  value: 1,
  label: "Kshitij Duraphe",
  salutation: "mr",
  firstName: "Kshitij",
  lastName: "Duraphe",
  husbandsOrFathersName: "Jagdish",
  gender: "m",
  age: "26",
  consanguinity: "1",
  gestationalAge: "10.5",
  address: "Byculla"
}, {
  value: 2,
  label: "Askari Sayed",
  salutation: "mr",
  firstName: "Askari",
  lastName: "Sayed",
  husbandsOrFathersName: "",
  gender: "m",
  age: "27",
  consanguinity: "0",
  gestationalAge: "12.4",
  address: "Delhi"
}, {
  value: 3,
  label: "Tahasil Chauhan",
  salutation: "mr",
  firstName: "Tahasil",
  lastName: "Chauhan",
  husbandsOrFathersName: "",
  gender: "m",
  age: "27",
  consanguinity: "1",
  gestationalAge: "11.7",
  address: "Wadala"
}, {
  value: 4,
  label: "Amin Sayed",
  salutation: "mr",
  firstName: "Amin",
  lastName: "Sayed",
  husbandsOrFathersName: "",
  gender: "m",
  age: "27",
  consanguinity: "0",
  gestationalAge: "14.8",
  address: "Andheri"
}];
exports.patients = patients;
const referralReason = [{
  value: "prior pregnancy risk",
  label: "prior pregnancy risk"
}, {
  value: "abnormal ultrasound",
  label: "abnormal ultrasound"
}, {
  value: "advanced maternal age",
  label: "advanced maternal age"
}, {
  value: "serum screen risk",
  label: "serum screen risk"
}, {
  value: "family history",
  label: "family history"
}, {
  value: "previous pregnancy affected by genetic disorders",
  label: "previous pregnancy affected by genetic disorders"
}, {
  value: "patient is a carrier of genetic disorders",
  label: "patient is a carrier of genetic disorders"
}, {
  value: "others",
  label: "others"
}];
exports.referralReason = referralReason;
const cityList = [{
  label: "Mumbai",
  value: "Mumbai"
}, {
  label: "Pune",
  value: "Pune"
}, {
  label: "Delhi",
  value: "Delhi"
}];
exports.cityList = cityList;
const stateList = [{
  label: "Maharashtra",
  value: "Maharashtra"
}, {
  label: "Delhi",
  value: "Delhi"
}];
exports.stateList = stateList;
const containerTypes = [{
  label: "Test Tube",
  value: "Test Tube"
}, {
  label: "Culture",
  value: "Culture"
}, {
  label: "Paediatric tube",
  value: "Paediatric tube"
}, {
  label: "ACD Tube",
  value: "ACD Tube"
}];
exports.containerTypes = containerTypes;