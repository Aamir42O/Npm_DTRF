"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsCookie = _interopRequireDefault(require("js-cookie"));

var _router = _interopRequireDefault(require("next/router"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const axios = require("axios");

const reqWithToken = async (url, method, data, multi) => {
  console.log("URL", url);

  let token = _jsCookie.default.get("accessToken");

  if (!token) {
    token = _jsCookie.default.get("accessTokenAL");
  }

  console.log("Token", token);
  const config = {
    headers: {
      "accessToken": token
    }
  };
  console.log("accessToken", config);
  const options = {
    method: method,
    url: url,
    data,
    headers: {
      "accessToken": token
    }
  };

  if (multi) {
    options.headers['Content-Type'] = 'multipart/form-data';
  }

  let response;

  try {
    response = await axios(options).catch(err => {
      console.log(err.response);

      if (err.response.data.message == "Invalid Token" || err.response.data.message == "Token Expired" || err.response.data.message == "Access Token Missing") {
        _router.default.push("/login");
      }
    });
  } catch (error) {
    console.log(error.message);
  }

  console.log(response, "AUTH RESPONSE");
  return response;
};

var _default = reqWithToken;
exports.default = _default;