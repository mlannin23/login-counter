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
};

exports.unitTests = function(req, res) {
  var child = exec("npm test", function(error, stdout, stderr) {
    var passed, nrPassed, nrFailed, output, totalTests = 10;

    output = stdout;
    passed = output.match(/√|✓/g);
    if (passed) {
      nrPassed = passed.length;
    }
    nrFailed = totalTests - nrPassed

    res.json({
      nrFailed: nrFailed,
      output: output,
      totalTests: totalTests
    });
  });
};