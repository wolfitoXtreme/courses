//
// User model
//

// dependencies
var mongoose = require('mongoose'),                             // handles interaction with Mongo DB
    pasportLocalMongoose = require('passport-local-mongoose');  // mongoose local authentication

// User
var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

userSchema.plugin(pasportLocalMongoose); // adds 'passport' methods to User model

module.exports = mongoose.model('User', userSchema);