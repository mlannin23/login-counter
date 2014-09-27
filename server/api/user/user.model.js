'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SUCCESS = 1,
    ERR_BAD_CREDENTIALS = -1,
    ERR_USER_EXISTS = -2,
    ERR_BAD_USERNAME = -3,
    ERR_BAD_PASSWORD = -4,
    MAX_USERNAME_LENGTH = 128,
    MAX_PASSWORD_LENGTH = 128;

var UserSchema = new Schema({
  user: { type: String, default: "" },
  password: { type: String, default: "" },
  count: { type: Number, default: 1 }
});

UserSchema.statics.add = function(body, callback) {

    var User = mongoose.model('User', UserSchema);

    User.find({ user: body.user }, 'user', function(err, users) {
        if (err) throw err;

        // Check for bad username
        if (body.user.length > MAX_USERNAME_LENGTH || body.user.length == 0) {
            return callback(ERR_BAD_USERNAME);
        }

        // Check for bad password
        if (body.password.length > MAX_PASSWORD_LENGTH) {
            return callback(ERR_BAD_PASSWORD);
        }

        // Check if user exists
        if (users.length > 0) {
            return callback(ERR_USER_EXISTS);
        }

        // Create the user
        User.create(body, function(err, user) {
            if(err) throw err;
            return callback(user.count);
        });
    });
};

UserSchema.statics.login = function(body, callback) {

    var User = mongoose.model('User', UserSchema);

    User.find({ user: body.user, password: body.password }, 'count', function(err, users) {
        if (err) throw err;

        // Check for bad credentials
        if (users.length == 0) {
            return callback(ERR_BAD_CREDENTIALS);
        }

        var user = users[0];

        // Increment the count
        user.count += 1;
        user.save(function(err, user, numberAffected) {
            if(err) throw err;
            return callback(user.count);
        });
    });
};

UserSchema.statics.TESTAPI_resetFixture = function(callback) {

    var User = mongoose.model('User', UserSchema);

    User.find({}).remove(function(err) {
        if (err) throw err;
        return callback(SUCCESS);
    });
};

module.exports = mongoose.model('User', UserSchema);