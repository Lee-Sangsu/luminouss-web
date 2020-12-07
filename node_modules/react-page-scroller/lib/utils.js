"use strict";

exports.__esModule = true;
exports.isPositiveNumber = exports.isNull = exports.isNil = void 0;

var isNil = function isNil(value) {
  return value === undefined || value === null;
};

exports.isNil = isNil;

var isNull = function isNull(value) {
  return value === null;
};

exports.isNull = isNull;

var isPositiveNumber = function isPositiveNumber(value) {
  return value > 0;
};

exports.isPositiveNumber = isPositiveNumber;