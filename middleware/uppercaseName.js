const express = require("express");

module.exports = function capitalName(req, res, next) {
  req.body.name = req.body.name.toUpperCase();
  next();
};
