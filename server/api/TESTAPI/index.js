'use strict';

var express = require('express');
var controller = require('./TESTAPI.controller');

var router = express.Router();

router.post('/resetFixture', controller.resetFixture);

module.exports = router;