let createError = require("http-errors");

module.exports.error404 = (req, res, next) => {
  next(createError(404));
};
