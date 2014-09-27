'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var User = require('./user.model');

var SUCCESS = 1,
    ERR_BAD_CREDENTIALS = -1,
    ERR_USER_EXISTS = -2,
    ERR_BAD_USERNAME = -3,
    ERR_BAD_PASSWORD = -4;

describe('User', function () {
    describe('add()', function () {
        it('should return the count when user and password are valid', function (done) {
            User.add({ user: 'user', password: 'password' }, function (status) {
                if (status > 0) {
                    return done();
                }
                return done(new Error('Failed adding valid user'));
            });
        });
    });
});

describe('User', function () {
    describe('add()', function () {
        it('should return -3 when user is longer than 128 characters', function (done) {
            User.add({ user: 'rpiegjfrek;nwfrjgnrdjkbgrlkjgbsljrgbnelsigueiughruglhdriughslrguhwerlgdughregleriughdshlgiurhesiguhwgslgiurehlsiurghdlsigruhsierughguhrlsglrdgsliuh', password: 'password' }, function (status) {
                if (status == ERR_BAD_USERNAME) {
                    return done();
                }
                return done(new Error('Failed adding with long user'));
            });
        });
    });
});

describe('User', function () {
    describe('add()', function () {
        it('should return -3 when user is an empty string', function (done) {
            User.add({ user: '', password: 'password' }, function (status) {
                if (status == ERR_BAD_USERNAME) {
                    return done();
                }
                return done(new Error('Failed adding with empty user'));
            });
        });
    });
});

describe('User', function () {
    describe('add()', function () {
        it('should return -4 when password is longer than 128 characters', function (done) {
            User.add({ user: 'user', password: 'rpiegjfrek;nwfrjgnrdjkferwflbnewkfuebfuewgfiuwegfiuwefgweiffreflrfelrgberifewfefwewfihfruieofgheirughguhrpgiuerhligjbjwefeisiurghdlsigruhsierughguhrlsglrdgsliuh' }, function (status) {
                if (status == ERR_BAD_PASSWORD) {
                    return done();
                }
                return done(new Error('Failed adding with long password'));
            });
        });
    });
});

describe('User', function () {
    describe('add()', function () {
        it('should return -2 when the user already exists', function (done) {
            User.add({ user: 'user', password: 'password' }, function (status) {
                if (status == ERR_USER_EXISTS) {
                    return done();
                }
                return done(new Error('Failed adding with already-exiting user'));
            });
        });
    });
});

describe('User', function () {
    describe('add()', function () {
        it('should return the count when a second valid user is added', function (done) {
            User.add({ user: 'second-user', password: 'second-password' }, function (status){
                if (status > 0) {
                    return done();
                }
                return done(new Error('Failed adding second valid user'));
            });
        });
    });
});

describe('User', function () {
    describe('login()', function () {
        it('should return -1 when the user does not exist', function (done) {
            User.login({ user: 'wrong-user', password: 'wrong-password' }, function (status) {
                if (status == ERR_BAD_CREDENTIALS) {
                    return done();
                }
                return done(new Error('Failed logging in with non-existant user'));
            });
        });
    });
});

describe('User', function () {
    describe('login()', function () {
        it('should return -1 when the user exists but password is incorrect', function (done) {
            User.login({ user: 'user', password: 'wrong-password' }, function (status){
                if (status == ERR_BAD_CREDENTIALS) {
                    return done();
                }
                return done(new Error('Failed logging in with wrong password'));
            });
        });
    });
});

describe('User', function () {
    describe('login()', function () {
        it('should return the count when the user and password are correct', function (done) {
            User.login({ user: 'user', password: 'password' }, function (status) {
                if (status > 0) {
                    return done();
                }
                return done(new Error('Failed logging in with correct user and password'));
            });
        });
    });
});

describe('User', function () {
    describe('TESTAPI_resetFixture()', function () {
        it('should return 1', function (done) {
            User.TESTAPI_resetFixture(function (status) {
                if (status == SUCCESS) {
                    return done();
                }
                return done(new Error('Failed resetting the database'));
            });
        });
    });
});