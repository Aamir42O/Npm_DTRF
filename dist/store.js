"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _form = _interopRequireDefault(require("./reducers/form"));

var _doctor = _interopRequireDefault(require("./reducers/doctor"));

var _test = _interopRequireDefault(require("./reducers/test"));

var _token = _interopRequireDefault(require("./reducers/token"));

var _fileupload = _interopRequireDefault(require("./reducers/fileupload"));

var _dynamicPatient = _interopRequireDefault(require("./reducers/dynamicPatient"));

var _reduxDevtoolsExtension = require("redux-devtools-extension");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initailState = {};
const middleware = [_reduxThunk.default];
const rootReducer = (0, _redux.combineReducers)({
  dynamicPatient: _dynamicPatient.default,
  formData: _form.default,
  Doctors: _doctor.default,
  Tests: _test.default,
  Token: _token.default,
  fileUpload: _fileupload.default
});
const store = (0, _redux.createStore)(rootReducer, initailState, (0, _reduxDevtoolsExtension.composeWithDevTools)((0, _redux.applyMiddleware)(...middleware)));
var _default = store;
exports.default = _default;