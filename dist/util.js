"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.splice = void 0;
const splice = (str, index, count, add) => {
  let i = index;
  if (i < 0) {
    i = str.length + i;
    if (i < 0) {
      i = 0;
    }
  }
  return str.slice(0, i) + (add || '') + str.slice(i + count);
};
exports.splice = splice;