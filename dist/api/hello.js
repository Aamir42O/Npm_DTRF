"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var _default = (req, res) => {
  res.status(200).json({
    name: 'John Doe'
  });
};

exports.default = _default;