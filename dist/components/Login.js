"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Login = void 0;

var _react = _interopRequireWildcard(require("react"));

var _formik = require("formik");

var _reactCookie = require("react-cookie");

var Yup = _interopRequireWildcard(require("yup"));

var _router = _interopRequireDefault(require("next/router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const axios = require("axios");

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(4, 'Too Short!').max(20, 'Too Long!').required('Required')
});

const Login = () => {
  const [cookies, setCookie, removeCookie] = (0, _reactCookie.useCookies)(['accessToken']);
  const [loginErrorResponse, setLoginErrorResponse] = (0, _react.useState)("");
  const [reload, reRender] = (0, _react.useState)();
  (0, _react.useEffect)(() => {});

  const handleLogin = async values => {
    console.log(values);

    try {
      console.log("VALUES", values);
      const response = await axios.post(process.env.NEXT_PUBLIC_USER_LOGIN, _objectSpread({}, values));
      console.log(response);

      if (response.status === 200) {
        console.log("LOGGED IN ");
        setCookie("accessTokenAL", response.data.data.token, "/");
        setCookie("userNameAL", response.data.data.userName);
        setCookie("instituteNameAL", response.data.data.instituteName);
        setCookie("roleAL", response.data.data.role);
        reRender({});

        if (response.data.data.role != "bdm") {
          _router.default.push("/");
        } else {
          _router.default.push("/super-dtrf");
        }

        console.log(cookies.accessToken);
      }
    } catch (e) {// console.log(e.response.data.data);
    }
  };

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    id: "app"
  }, /*#__PURE__*/_react.default.createElement("section", {
    className: "section"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "container mt-5"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "card card-primary"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/_react.default.createElement("h4", null, "Login")), /*#__PURE__*/_react.default.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/_react.default.createElement(_formik.Formik, {
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: loginSchema,
    onSubmit: (values, _ref) => {
      let {
        setSubmitting
      } = _ref;
      handleLogin(values);
    }
  }, _ref2 => {
    let {
      values,
      errors,
      touched
    } = _ref2;
    return /*#__PURE__*/_react.default.createElement(_formik.Form, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/_react.default.createElement("label", {
      for: "email"
    }, "Email"), /*#__PURE__*/_react.default.createElement(_formik.Field, {
      id: "email",
      type: "email",
      className: "form-control",
      name: "email",
      autofocus: true
    }), errors.email && touched.email ? /*#__PURE__*/_react.default.createElement("div", {
      className: "formErr"
    }, errors.email) : null), /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "d-block"
    }, /*#__PURE__*/_react.default.createElement("label", {
      for: "password",
      className: "control-label"
    }, "Password"), /*#__PURE__*/_react.default.createElement("div", {
      className: "float-right"
    }, /*#__PURE__*/_react.default.createElement("a", {
      href: "auth-forgot-password.html",
      className: "text-small"
    }))), /*#__PURE__*/_react.default.createElement(_formik.Field, {
      id: "password",
      type: "password",
      className: "form-control",
      name: "password"
    }), errors.password && touched.password ? /*#__PURE__*/_react.default.createElement("div", {
      className: "formErr"
    }, errors.password) : null), /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "custom-control custom-checkbox"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "formErr"
    }, loginErrorResponse))), /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/_react.default.createElement("button", {
      type: "submit",
      className: "btn btn-primary btn-lg btn-block"
    }, "Login"))));
  })))))))));
};

exports.Login = Login;
var _default = Login;
exports.default = _default;