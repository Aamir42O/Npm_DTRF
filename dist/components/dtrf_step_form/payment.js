"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _formik = require("formik");

var _reactRedux = require("react-redux");

var _antd = require("antd");

var _formData = require("../../actions/formData");

var _commonHelper = require("../../helper/commonHelper");

var _router = _interopRequireDefault(require("next/router"));

var _jsCookie = _interopRequireDefault(require("js-cookie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Payment = props => {
  const [testList, setTestList] = (0, _react.useState)([]);
  const [paysTo, setPaysTo] = (0, _react.useState)("");
  const [totalMrp, setTotalMrp] = (0, _react.useState)(0);
  const [mrpList, setMrpList] = (0, _react.useState)([]);
  const [paymentMode, setPaymentMode] = (0, _react.useState)("Cash");
  const [confirmationBy, setConfirmationBy] = (0, _react.useState)("");
  const [, reRender] = (0, _react.useState)();
  const [mrpError, setMrpError] = (0, _react.useState)(false);
  const [instituteType, setInstituteType] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    console.log("IN use effect", props);

    if (!instituteType) {
      if (props.fromSuperDtrf) {
        setInstituteType(props.formDataRedux.institute_info.instituteName.institute_type);
      } else if (props.fromDtrfFront) {
        setInstituteType(_jsCookie.default.get("institute_type"));
      }
    }

    if (testList.length == 0) {
      getTestList();
    }

    if (props.formDataRedux.payment) {
      setPaysTo(props.formDataRedux.payment.paysTo);
    }
  });

  const getTestList = () => {
    console.log("Inside GetTEstLIst");
    const list = props.formDataRedux;

    if (list) {
      if (list.test_info) {
        console.log("list info", list.test_info);
        setTestList(list.test_info.selectedTests);
        let total = 0;
        let mrpList = [];

        if (!props.formDataRedux.payment) {
          list.test_info.selectedTests.map(test => {
            mrpList.push({
              mrp: test.mrp
            });
            total += test.mrp;
            return total;
          });
        } else {
          props.formDataRedux.payment.price_entered.map(test => {
            mrpList.push({
              mrp: test.mrp
            });
            total += test.mrp;
            return total;
          });
        }

        console.log(mrpList);
        setMrpList(mrpList);
        setTotalMrp(total);
      }
    }
  };

  const setTotalPrice = mrpList => {
    let total = 0;
    mrpList.map(mrp => {
      total += mrp.mrp;
    });
    console.log(total);
    setTotalMrp(total);
    reRender({});
  };

  const handleOnClickPrevious = () => {
    props.handleOnClickPrevious();

    if (props.formValues.collectionLocation.location == "Home") {
      props.goToStep(3);
    } else {
      props.previousStep();
    }
  }; // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ADMIN PANEL CODE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  const handleOnClickSave = async values => {
    let data = {};
    data.dtrf_id = props.Token.dtrfToken;
    data.dtrf = props.formDataRedux;

    if (props.formDataRedux.collectionLocation.location == "Home") {
      data.dtrf.payment = {
        paidToInstitute: values.paidToInstitute,
        price_entered: mrpList
      };
    }

    if (values.paysTo == "Lab") {
      data.dtrf.payment = {
        paysTo: values.paysTo,
        paymentMode: values.paymentMode,
        price_entered: mrpList,
        confirmationBy: values.confirmationBy
      };
    } else {
      data.dtrf.payment = {
        paysTo: values.paysTo,
        price_entered: mrpList,
        confirmationBy: values.confirmationBy
      };
    }

    const response = await props.handleOnClickSave(_objectSpread(_objectSpread({}, props.formDataRedux), {}, {
      payment: data.dtrf.payment
    }));

    if (response) {
      if (response.status == 200) {
        (0, _commonHelper.successMessage)("Form saved");
      } else {
        return (0, _commonHelper.errorMessage)("Error in saving form, please try again");
      }
    }
  };

  const handleOnClickSaveAndExit = async values => {
    await handleOnClickSave(values);

    _router.default.push("/super-dtrf");
  }; // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ADMIN PANEL CoDe clOSE ~~~~~~~~~~~~~~~~~~~~


  const handleOnClickNext = values => {
    if (mrpError) {
      return;
    }

    if (props.formValues.collectionLocation.location == "Home") {
      console.log("home location");
      props.handleOnClickNext("payment", {
        paidToInstitute: values.paidToInstitute,
        price_entered: mrpList
      });
      return props.nextStep();
    }

    if (values.paysTo == "Lab") {
      console.log("Lab selected");
      props.handleOnClickNext("payment", {
        paysTo: values.paysTo,
        paymentMode: values.paymentMode,
        price_entered: mrpList,
        confirmationBy: values.confirmationBy
      });
      props.nextStep();
    } else {
      console.log("Institute Selected");
      props.handleOnClickNext("payment", {
        paysTo: values.paysTo,
        price_entered: mrpList,
        confirmationBy: values.confirmationBy
      });
      props.nextStep();
    }
  };

  const handleOnClickPaysTo = e => {
    console.log("pays to ", e.target.value);
    setPaysTo(e.target.value);
  };

  const handleOnClickPaymentMode = e => {
    setPaymentMode(e.target.value);
    console.log(e.target.value);
  };

  const handleMrpValidation = e => {
    console.log(e.target.value);
    let isnum = /^\d+$/.test(e.target.value);

    if (!isnum) {
      mrpList[e.target.name].mrp = testList[e.target.name].transfer_rate;
      setMrpList(mrpList);
      setTotalPrice(mrpList);
    } else {
      setMrpError(false);
    }

    console.log(isnum, "INSUM REG");

    if (isnum) {
      if (testList[e.target.name].transfer_rate <= e.target.value && e.target.value <= testList[e.target.name].mrp) {
        mrpList[e.target.name].mrp = parseInt(e.target.value);
        setMrpList(mrpList);
        setTotalPrice(mrpList);
        reRender({});
      } else {
        if (testList[e.target.name].transfer_rate > e.target.value) {
          mrpList[e.target.name].mrp = testList[e.target.name].transfer_rate;
        } else if (e.target.value > testList[e.target.name].mrp) {
          mrpList[e.target.name].mrp = testList[e.target.name].mrp;
        }

        setMrpList(mrpList);
        setTotalPrice(mrpList);
        reRender({});
      }
    }
  };

  const handleMrpChange = e => {
    console.log(e.target.value, "ISNUM");

    if (testList[e.target.name].transfer_rate <= e.target.value && e.target.value <= testList[e.target.name].mrp) {
      setMrpError(false);
    } else {
      setMrpError(true);
    }

    let isnum = /^\d+$/.test(e.target.value);

    if (isnum || e.target.value == "") {
      mrpList[e.target.name].mrp = e.target.value;
      console.log("MRP CHANGING", mrpList);
      setMrpList(mrpList);
      reRender({});
    }
  }; // const handleConfirmationByChange = (e) => {
  //   console.log();
  //   setConfirmationBy(e.target.value)
  // }


  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "customWrap"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-12 col-12"
  }, /*#__PURE__*/_react.default.createElement("fieldset", {
    id: "valdatinStep1"
  }, /*#__PURE__*/_react.default.createElement(_formik.Formik, {
    initialValues: {
      paysTo: instituteType == 1 ? "Institute" : (instituteType == 2 || instituteType == 3 || instituteType == 4) && "Lab",
      confirmationBy: props.payment != 1 ? props.payment.confirmationBy : "",
      paymentMode: instituteType == 2 || instituteType == 3 ? "Cash" : instituteType == 4 && ""
    },
    validate: values => {
      const errors = {};

      if (props.fromSuperDtrf) {}

      if (props.fromDtrfFront) {
        if (props.formValues.collectionLocation.location != "Home" && !values.paysTo) {// errors.paysTo = "Required";
        }

        if (props.formValues.collectionLocation.location != "Home" && !values.confirmationBy) {
          errors.confirmationBy = "Required";
        }

        if (props.formValues.collectionLocation.location == "Home" && !values.paidToInstitute) {
          errors.paidToInstitute = "Required";
        }

        if (props.formValues.collectionLocation.location != "Home" && instituteType == 4 && !values.paymentMode) {
          errors.paymentMode = "Required";
        }

        console.log(errors);
      }

      return errors;
    },
    onSubmit: (values, _ref) => {
      let {
        setSubmitting
      } = _ref;
      console.log("Values", values);
      handleOnClickNext(values);
    }
  }, _ref2 => {
    let {
      values
    } = _ref2;
    return /*#__PURE__*/_react.default.createElement(_formik.Form, null, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, props.formValues.collectionLocation && props.formValues.collectionLocation.location != "Home" && /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group"
    }, props.fromSuperDtrf && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-md-12 col-12 text-right"
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        padding: "10px 0px"
      }
    }, !props.Token.isComplete && /*#__PURE__*/_react.default.createElement("button", {
      type: "button",
      onClick: () => handleOnClickSaveAndExit(values),
      className: "btn btn-primary mr-2"
    }, "Save And Exit"))))), /*#__PURE__*/_react.default.createElement("div", {
      className: "card p-3",
      style: {
        'boxShadow': 'none'
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-6"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group mb-0"
    }, /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("b", null, "Selected Tests")))), /*#__PURE__*/_react.default.createElement("div", {
      className: "col-6"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group mb-0"
    }, /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("b", null, "Price"))))), /*#__PURE__*/_react.default.createElement("hr", {
      className: "mb-2 mt-0"
    }), testList.map((test, id) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "row mb-1"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-6"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group mb-0"
    }, /*#__PURE__*/_react.default.createElement("label", null, test.test_name))), /*#__PURE__*/_react.default.createElement("div", {
      className: "col-6"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group mb-0"
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "text",
      name: id,
      className: "form-control",
      value: mrpList[id].mrp,
      onBlur: handleMrpValidation,
      onChange: handleMrpChange
    })))))), /*#__PURE__*/_react.default.createElement("hr", {
      className: "mb-1 mt-1"
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-6"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "section-title mb-0 mt-0"
    }, /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("b", null, "Total")))), /*#__PURE__*/_react.default.createElement("div", {
      className: "col-6"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "section-title mb-0 mt-0"
    }, /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("i", {
      className: "fas fa-rupee-sign",
      style: {
        'fontSize': '16px'
      }
    }), " ", /*#__PURE__*/_react.default.createElement("b", null, totalMrp)))))), instituteType == 4 && /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group mt-2"
    }, /*#__PURE__*/_react.default.createElement("div", {
      role: "group",
      "aria-labelledby": "my-radio-group1"
    }, /*#__PURE__*/_react.default.createElement("label", {
      className: "mb-3"
    }, "Payment Type"), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("div", {
      className: "pretty p-default p-round"
    }, /*#__PURE__*/_react.default.createElement(_formik.Field, {
      type: "radio",
      name: "paymentMode",
      value: "Cash" // onClick={e => handleOnClickPaymentMode(e)}

    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "state"
    }, /*#__PURE__*/_react.default.createElement("label", null, "Cash"))), /*#__PURE__*/_react.default.createElement("div", {
      className: "pretty p-default p-round"
    }, /*#__PURE__*/_react.default.createElement(_formik.Field, {
      type: "radio",
      name: "paymentMode",
      value: "Digital" // onClick={e => handleOnClickPaymentMode(e)}

    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "state"
    }, /*#__PURE__*/_react.default.createElement("label", null, "Digital"))), /*#__PURE__*/_react.default.createElement(_formik.ErrorMessage, {
      name: "paymentMode",
      component: "div",
      className: "formErr"
    }))), props.formValues.collectionLocation && props.formValues.collectionLocation.location != "Home" && /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group mt-2"
    }, /*#__PURE__*/_react.default.createElement("label", {
      className: "mb-3"
    }, "Confirmation by: "), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("div", {
      className: "pretty p-default p-round"
    }, /*#__PURE__*/_react.default.createElement(_formik.Field, {
      type: "radio",
      name: "confirmationBy",
      value: "Staff" // checked={confirmationBy == "Staff"}
      // onChange={handleConfirmationByChange}

    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "state"
    }, /*#__PURE__*/_react.default.createElement("label", null, "Staff"))), /*#__PURE__*/_react.default.createElement("div", {
      className: "pretty p-default p-round"
    }, /*#__PURE__*/_react.default.createElement(_formik.Field, {
      type: "radio",
      name: "confirmationBy",
      value: "Patient" // checked={confirmationBy == "Patient"}
      // onChange={handleConfirmationByChange}

    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "state"
    }, /*#__PURE__*/_react.default.createElement("label", null, "Patient"))), /*#__PURE__*/_react.default.createElement(_formik.ErrorMessage, {
      name: "confirmationBy",
      component: "div",
      className: "formErr"
    })), props.formValues.collectionLocation && props.formValues.collectionLocation.location == "Home" && /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group mt-2"
    }, /*#__PURE__*/_react.default.createElement("label", {
      className: "mb-3"
    }, "Paid to Institute: "), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("div", {
      className: "pretty p-default p-round"
    }, /*#__PURE__*/_react.default.createElement(_formik.Field, {
      type: "radio",
      name: "paidToInstitute",
      value: "Yes" // checked={confirmationBy == "Staff"}
      // onChange={handleConfirmationByChange}

    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "state"
    }, /*#__PURE__*/_react.default.createElement("label", null, "Yes"))), /*#__PURE__*/_react.default.createElement("div", {
      className: "pretty p-default p-round"
    }, /*#__PURE__*/_react.default.createElement(_formik.Field, {
      type: "radio",
      name: "paidToInstitute",
      value: "No" // checked={confirmationBy == "Patient"}
      // onChange={handleConfirmationByChange}

    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "state"
    }, /*#__PURE__*/_react.default.createElement("label", null, "No"))), /*#__PURE__*/_react.default.createElement(_formik.ErrorMessage, {
      name: "paidToInstitute",
      component: "div",
      className: "formErr"
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "row",
      id: "action1"
    }, props.fromSuperDtrf && /*#__PURE__*/_react.default.createElement("div", {
      className: "col-md-2 col-2 text-left"
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        padding: "5px 20px"
      }
    }, /*#__PURE__*/_react.default.createElement("button", {
      onClick: e => _router.default.push("/super-dtrf"),
      className: "btn btn-primary"
    }, "Exit"))), /*#__PURE__*/_react.default.createElement("div", {
      className: props.fromSuperDtrf ? "col-md-10 col-10 text-right" : "col-md-12 col-12 text-right"
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        padding: "5px 20px"
      }
    }, /*#__PURE__*/_react.default.createElement("button", {
      onClick: handleOnClickPrevious,
      className: "btn btn-primary mr-2",
      type: "button"
    }, "Previous"), props.fromSuperDtrf && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !props.Token.isComplete && /*#__PURE__*/_react.default.createElement("button", {
      type: "button",
      onClick: () => handleOnClickSave(values),
      className: "btn btn-primary mr-2"
    }, "Save")), /*#__PURE__*/_react.default.createElement("button", {
      type: "submit",
      className: "btn btn-primary",
      disabled: props.formDataRedux.collectionLocation ? props.formDataRedux.collectionLocation.location == "Institute" ? false : true : false
    }, "Next"))))));
  }))))));
};

const mapStateToProps = state => ({
  formDataRedux: state.formData.formData ? state.formData.formData : null,
  fileUpload: state.fileUpload,
  payment: state.formData.formData.payment ? state.formData.formData.payment : 1,
  Token: state.Token
});

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  setFormData: _formData.setFormData
})(Payment);

exports.default = _default;