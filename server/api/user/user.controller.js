'use strict';

var _ = require('lodash');
var User = require('./user.model');

// Add a new user
exports.add = function(req, res) {
  User.add(req.body, function(status) {
    if (status > 0) {
      res.json({
        errCode: 1,
        count: status
      });
    } else {
      res.json({
        errCode: status
      });
    }
  })
};

// Login a user
exports.login = function(req, res) {
  User.login(req.body, function(status) {
    if (status > 0) {
      res.json({
        errCode: 1,
        count: status
      });
    } else {
      res.json({
        errCode: status
      });
    }
  });
}