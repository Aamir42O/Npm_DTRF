"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _formik = require("formik");

var _reactRedux = require("react-redux");

var _antd = require("antd");

var _Help = _interopRequireDefault(require("@material-ui/icons/Help"));

var _formData = require("../../actions/formData");

var _commonHelper = require("../../helper/commonHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ChooseCollectionLocation = props => {
  const [testList, setTestList] = (0, _react.useState)([]);
  const [location, setLocation] = (0, _react.useState)('');
  const [homeCollectionLocation, setHomeCollectionLocation] = (0, _react.useState)();
  const [instituteChecked, setInstituteChecked] = (0, _react.useState)(false);
  const [homeChecked, setHomeChecked] = (0, _react.useState)(false);
  const [, reRender] = (0, _react.useState)();
  const childRef = (0, _react.useRef)();
  (0, _react.useEffect)(() => {
    console.log(props);

    if (testList.length == 0) {
      getTestList();
    } // if (props.formDataRedux.collectionLocation) {
    //   getPrefilledCollectionLocation(props.formDataRedux.collectionLocation.location)
    // }

  }); // !!!!!!!!!!!!!!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ADMIN PANEL CODE ~~~~~~~~~~~~~~~~~~~~!!!!!!!!!!!!!!!!!!!

  const handleOnClickSave = async values => {
    let formData = new FormData();
    let data = {};
    data.dtrf_id = props.Token.dtrfToken;
    data.dtrf = props.formDataRedux;
    data.dtrf.collectionLocation = values;
    formData.append("dtrf_id", JSON.stringify(data.dtrf_id));
    formData.append("dtrf", JSON.stringify(data.dtrf));
    console.log("INCOMEPLETE FORMDATA SEND", response);
    const response = await props.handleOnClickSave(_objectSpread(_objectSpread({}, props.formDataRedux), {}, {
      collectionLocation: values
    }));
    props.setFormData(_objectSpread(_objectSpread({}, props.formDataRedux), {}, {
      collectionLocation: values
    }));

    if (response) {
      if (response.status == 200) {
        (0, _commonHelper.successMessage)("Form saved");
      } else {
        (0, _commonHelper.errorMessage)("Error in Saving Form");
      }
    } else {
      (0, _commonHelper.errorMessage)("Error in Saving Form");
    }
  }; // !!!!!!!!!!!!!!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ADMIN PANEL CODE CLOSE ~~~~~~~~~~~~~~~!!!!!!!!!!!!!!!!!!!


  const getTestList = () => {
    const list = props.formDataRedux;

    if (list) {
      if (list.test_info) {
        setTestList(list.test_info.selectedTests);

        if (list.test_info.selectedTests.length > 0) {
          setHomeCollectionLocation(list.test_info.selectedTests[0].home_collection_possible);
        }
      }
    }
  };

  const handleOnClickPrevious = () => {
    props.handleOnClickPrevious();
    props.previousStep();
  };

  const handleOnClickNext = values => {
    props.handleOnClickNext("collectionLocation", _objectSpread({}, values));
    props.nextStep();
  }; // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Get PRefilled DAta~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // const getPrefilledCollectionLocation = (data) => {
  //   console.log(data, "location")
  //   setLocation(data)
  //   if (data == "Institute") {
  //     setHomeChecked(false)
  //     setInstituteChecked(true)
  //   }
  //   if (data == "Home") {
  //     setInstituteChecked(false)
  //     setHomeChecked(true)
  //   }
  // }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CLOSE GET PREFILLED DATA~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  const handleLocationChange = e => {
    console.log(e.target.value); // getPrefilledCollectionLocation(e.target.value)

    setLocation(e.target.value); // if (e.target.value == "Institute") {
    //   setHomeChecked(false)
    //   setInstituteChecked(true)
    // }
    // if (e.target.value == "Home") {
    //   setInstituteChecked(false)
    //   setHomeChecked(true)
    // }

    reRender({});
  };

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
      location: props.formDataRedux.collectionLocation ? props.formDataRedux.collectionLocation.location : ""
    },
    validate: values => {
      const errors = {};

      if (props.fromSuperDtrf) {} else {
        if (!values.location) {
          errors.location = "Required";
        }

        if (values.location == "Other" && !values.otherLocation) {
          errors.otherLocation = "Required";
        }
      }

      return errors;
    },
    onSubmit: (values, _ref) => {
      let {
        setSubmitting
      } = _ref;
      handleOnClickNext(values);
    }
  }, _ref2 => {
    let {
      values
    } = _ref2;
    return /*#__PURE__*/_react.default.createElement(_formik.Form, null, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/_react.default.createElement("div", {
      role: "group",
      "aria-labelledby": "my-radio-group1"
    }, /*#__PURE__*/_react.default.createElement("label", {
      className: "mb-2"
    }, "Location ", /*#__PURE__*/_react.default.createElement("span", {
      className: "marked"
    }, "*"), /*#__PURE__*/_react.default.createElement(_commonHelper.MousePopover, {
      content: /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h6", null, "Institute"), /*#__PURE__*/_react.default.createElement("p", null, "Sample collection will be taken at Institute Location"), /*#__PURE__*/_react.default.createElement("h6", null, "Non-Institute"), /*#__PURE__*/_react.default.createElement("p", null, "Sample collection will be taken at Non-Institute Location"))
    })), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("div", {
      className: "pretty p-default p-round"
    }, /*#__PURE__*/_react.default.createElement(_formik.Field, {
      type: "radio",
      name: "location",
      value: "Institute" // checked={instituteChecked}
      ,
      onClick: handleLocationChange
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "state"
    }, /*#__PURE__*/_react.default.createElement("label", null, "Institute"))), homeCollectionLocation && /*#__PURE__*/_react.default.createElement("div", {
      className: "pretty p-default p-round"
    }, /*#__PURE__*/_react.default.createElement(_formik.Field, {
      type: "radio",
      name: "location",
      value: "Home" // checked={homeChecked}
      ,
      onClick: handleLocationChange
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "state"
    }, /*#__PURE__*/_react.default.createElement("label", null, "Non-Institute")))), /*#__PURE__*/_react.default.createElement(_formik.ErrorMessage, {
      name: "location",
      component: "div",
      className: "formErr"
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: "row",
      id: "action1"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-md-12 col-12 text-right mr-1"
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        padding: "5px 20px"
      }
    }, /*#__PURE__*/_react.default.createElement("button", {
      onClick: handleOnClickPrevious,
      type: "button",
      className: "btn btn-primary mr-2"
    }, "Previous"), props.fromSuperDtrf && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !props.Token.isComplete && /*#__PURE__*/_react.default.createElement("button", {
      type: "button",
      onClick: () => handleOnClickSave(values),
      className: "btn btn-primary mr-2"
    }, "Save")), /*#__PURE__*/_react.default.createElement("button", {
      type: "submit",
      className: "btn btn-primary"
    }, "Next")))));
  }))))));
};

const mapStateToProps = state => ({
  formDataRedux: state.formData.formData,
  Token: state.Token
});

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  setFormData: _formData.setFormData
})(ChooseCollectionLocation);

exports.default = _default;