"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _formik = require("formik");

var _reactSelect = _interopRequireWildcard(require("react-select"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const MySelect = props => {
  const [field, meta, helpers] = (0, _formik.useField)(props);
  const {
    isMulti
  } = props;
  const {
    optionList
  } = props;
  const {
    fieldName
  } = props;
  const {
    touched,
    error,
    value
  } = meta;
  const {
    setValue
  } = helpers;
  console.log(props.isDisabled);
  const [prefilledValue, setPrefilledValue] = (0, _react.useState)("");
  (0, _react.useEffect)(() => {// console.log("ISMULTI", isMulti)
    // if (isMulti) {
    //     setPrefilledValue(value)
    //     console.log("MYSELECT ISMULTI VALUE", value)
    // } else {
    //     console.log("IS NOT MULTI")
    //     setPrefilledValue({ label: value, value: value })
    // }
  }, []);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactSelect.default, {
    isMulti: isMulti,
    options: optionList,
    name: field.name,
    instanceId: field.name,
    defaultValue: value,
    isDisabled: props.isDisabled // onChange={(Option) => props.handleCityChange(Option)}
    ,
    onChange: Option => setValue(Option)
  }));
};

var _default = MySelect;
exports.default = _default;