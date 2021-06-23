"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Token;

var _react = _interopRequireDefault(require("react"));

var _action = require("../actions/action");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const initialState = {
  refToken: "",
  dtrfToken: "",
  sendBy: "",
  isAuthenticated: false,
  ROLES: [],
  sentToBdm: false,
  isComplete: false
};

function Token() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  const {
    type,
    payload
  } = action;

  switch (type) {
    case _action.IS_COMPLETE:
      return _objectSpread(_objectSpread({}, state), {}, {
        isComplete: payload
      });

    case _action.SENT_TO_BDM:
      return _objectSpread(_objectSpread({}, state), {}, {
        sentToBdm: payload
      });

    case _action.REF_TOKEN:
      return _objectSpread(_objectSpread({}, state), {}, {
        refToken: payload
      });

    case _action.DTRF_TOKEN:
      return _objectSpread(_objectSpread({}, state), {}, {
        dtrfToken: payload
      });

    case _action.SEND_BY:
      return _objectSpread({}, state);

    case _action.AUTHENTICATE:
      return _objectSpread(_objectSpread({}, state), {}, {
        isAuthenticated: payload
      });

    case _action.ROLES:
      return _objectSpread(_objectSpread({}, state), {}, {
        ROLES: payload
      });

    default:
      return _objectSpread(_objectSpread({}, state), {}, {
        sendBy: payload
      });
  }
}