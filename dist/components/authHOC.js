"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _login = _interopRequireDefault(require("./login"));

var _router = require("next/router");

var _jsCookie = _interopRequireDefault(require("js-cookie"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const withAuth = Component => {
  const Auth = props => {
    const router = (0, _router.useRouter)(); // Login data added to props via redux-store (or use react context for example)

    const {
      isAuthenticated
    } = props;
    console.log(props, Component, "WITHAUTH PROPS"); // If user is not logged in, return login component

    console.log("ROUTER", router.pathname);

    if (!isAuthenticated) {
      return /*#__PURE__*/_react.default.createElement(_login.default, null);
    } // if (router.pathname.startsWith("/dtrf_front") && (Cookies.get("accessToken") != "admin")) {
    //     return (<Home props={props} />)
    // }
    // If user is logged in, return original component


    return /*#__PURE__*/_react.default.createElement(Component, props);
  }; // Copy getInitial props so it will run as well


  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

var _default = withAuth;
exports.default = _default;