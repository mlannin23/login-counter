'use strict';

var _ = require('lodash');
var Testapi = require('./TESTAPI.model');
var User = require('../user/user.model');
var exec = require('child_process').exec;

exports.resetFixture = function(req, res) {
  User.TESTAPI_resetFixture(function(status) {
    res.json({
      errCode: status
    });
  });
}