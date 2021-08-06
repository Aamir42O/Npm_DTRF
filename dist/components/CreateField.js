"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _NumberField = _interopRequireDefault(require("./Fields/NumberField"));

var _Radio = _interopRequireDefault(require("./Fields/Radio"));

var _TextField = _interopRequireDefault(require("./Fields/TextField"));

var _DateField = _interopRequireDefault(require("./Fields/DateField"));

var _moment = _interopRequireDefault(require("moment"));

var _CheckBox = _interopRequireDefault(require("./Fields/CheckBox"));

var _formik = require("formik");

var _MessageField = _interopRequireDefault(require("./Fields/MessageField"));

var _mySelect = _interopRequireDefault(require("./mySelect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CreateField = props => {
  console.log(props);

  const displayField = () => {
    let {
      isRequiredIf,
      isRequiredIfValue,
      isRequiredIfValueIsNot,
      nonMandatory,
      showMessageIf
    } = props.validationValue;
    let {
      values,
      testType,
      testTrimester
    } = props;
    let show = true;

    if (isRequiredIf) {
      if (!["", null, undefined, false].includes(values[isRequiredIf.name])) {
        show = true;
      } else {
        show = false;
      }
    }

    if (isRequiredIfValue) {
      if (values[isRequiredIfValue.name] == isRequiredIfValue.value) {
        show = true;
      } else {
        show = false;
      }
    }

    if (isRequiredIfValueIsNot) {
      if (!["", null, false, undefined].includes(values[isRequiredIfValueIsNot.name])) {
        if (values[isRequiredIfValueIsNot.name] != isRequiredIfValueIsNot.value) {
          show = true;
        } else {
          show = false;
        }
      }
    }

    if (testType && props.externalValidation.testType != props.testType) {
      show = false;
    }

    if (testTrimester && props.externalValidation.testTrimester != props.testTrimester) {
      show = false;
    }

    if (showMessageIf) {
      let names = showMessageIf.name.split(",");
      let conditionalValues = showMessageIf.value.split(",");
      names.map((name, index) => {
        if (values[name] != conditionalValues[index]) {
          show = false;
        }
      });
    }

    console.log(show);
    return show;
  };

  const isMandatory = () => {
    let mandatory = false;

    if ((props.validation.includes("isRequired") || props.validation.includes("isRequiredIf") || props.validation.includes("isRequiredIfValue") || props.validation.includes("isRequiredIfValueIsNot")) && !props.validationValue.nonMandatory) {
      mandatory = true;
    } else {
      mandatory = false;
    }

    return mandatory;
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, displayField() && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, props.newRow ? /*#__PURE__*/_react.default.createElement("div", {
    className: "col-12"
  }, props.type == "message" && /*#__PURE__*/_react.default.createElement(_MessageField.default, {
    message: props.message
  }), props.type == "number" && /*#__PURE__*/_react.default.createElement(_NumberField.default, {
    title: props.title,
    name: props.name,
    isDisabled: props.validationValue.isDisabled ? props.values[props.validationValue.isDisabled.name] ? false : true : false,
    mandatory: isMandatory()
  }), props.type == "radio" && /*#__PURE__*/_react.default.createElement(_Radio.default, {
    title: props.title,
    name: props.name,
    mandatory: isMandatory(),
    options: props.options,
    isDisabled: props.validationValue.isDisabled ? props.values[props.validationValue.isDisabled.name] ? false : true : false
  }), props.type == "date" && /*#__PURE__*/_react.default.createElement(_DateField.default, {
    name: props.name,
    title: props.title,
    mandatory: isMandatory(),
    isDisabled: props.validationValue.isDisabled ? props.values[props.validationValue.isDisabled.name] ? false : true : false
  }), props.type == "text" && /*#__PURE__*/_react.default.createElement(_TextField.default, {
    name: props.name,
    title: props.title,
    mandatory: isMandatory(),
    placeholder: "Enter first name",
    className: "col-md-6 col-12",
    isDisabled: props.validationValue.isDisabled ? props.values[props.validationValue.isDisabled.name] ? false : true : false
  }), props.type == "checkBox" && /*#__PURE__*/_react.default.createElement(_CheckBox.default, {
    values: props.values,
    name: props.name,
    title: props.title,
    mandatory: isMandatory(),
    isDisabled: props.validationValue.isDisabled ? props.values[props.validationValue.isDisabled.name] ? false : true : false,
    options: props.options
  }), props.type == "dropDown" && /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-6"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement("label", null, props.title, " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "marked"
  }, "*")), /*#__PURE__*/_react.default.createElement(_mySelect.default, {
    isMulti: false,
    optionList: props.options,
    name: props.name,
    isDisabled: props.validationValue.isDisabled ? props.values[props.validationValue.isDisabled.name] ? false : true : false,
    mandatory: isMandatory()
  }), /*#__PURE__*/_react.default.createElement(_formik.ErrorMessage, {
    name: props.name,
    component: "div",
    className: "formErr"
  })))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, props.type == "message" && /*#__PURE__*/_react.default.createElement(_MessageField.default, {
    message: props.message
  }), props.type == "number" && /*#__PURE__*/_react.default.createElement(_NumberField.default, {
    title: props.title,
    name: props.name,
    isDisabled: props.validationValue.isDisabled ? props.values[props.validationValue.isDisabled.name] ? false : true : false,
    mandatory: isMandatory()
  }), props.type == "radio" && /*#__PURE__*/_react.default.createElement(_Radio.default, {
    title: props.title,
    name: props.name,
    mandatory: isMandatory(),
    options: props.options,
    isDisabled: props.validationValue.isDisabled ? props.values[props.validationValue.isDisabled.name] ? false : true : false
  }), props.type == "date" && /*#__PURE__*/_react.default.createElement(_DateField.default, {
    name: props.name,
    title: props.title,
    mandatory: isMandatory(),
    isDisabled: props.validationValue.isDisabled ? props.values[props.validationValue.isDisabled.name] ? false : true : false
  }), props.type == "text" && /*#__PURE__*/_react.default.createElement(_TextField.default, {
    name: props.name,
    title: props.title,
    mandatory: isMandatory(),
    placeholder: "Enter first name",
    className: "col-md-6 col-12",
    isDisabled: props.validationValue.isDisabled ? props.values[props.validationValue.isDisabled.name] ? false : true : false
  }), props.type == "checkBox" && /*#__PURE__*/_react.default.createElement(_CheckBox.default, {
    values: props.values,
    name: props.name,
    title: props.title,
    mandatory: isMandatory(),
    isDisabled: props.validationValue.isDisabled ? props.values[props.validationValue.isDisabled.name] ? false : true : false,
    options: props.options
  }), props.type == "dropDown" && /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-6"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement("label", null, props.title, " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "marked"
  }, "*")), /*#__PURE__*/_react.default.createElement(_mySelect.default, {
    isMulti: false,
    optionList: props.options,
    name: props.name,
    isDisabled: props.validationValue.isDisabled ? props.values[props.validationValue.isDisabled.name] ? false : true : false,
    mandatory: isMandatory()
  }), /*#__PURE__*/_react.default.createElement(_formik.ErrorMessage, {
    name: props.name,
    component: "div",
    className: "formErr"
  }))))));
};

var _default = CreateField;
exports.default = _default;