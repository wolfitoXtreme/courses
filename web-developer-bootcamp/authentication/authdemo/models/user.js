// 
// user model
// 

// dependencies
var mongoose =              require('mongoose'),                // handles interaction with Mongo DB
    passportLocalMongoose = require('passport-local-mongoose'); // mongoose local authentication

// User
var userSchema = new mongoose.Schema({
        username: String,
        password: String
    });

userSchema.plugin(passportLocalMongoose); // adds 'passport' methods to User model

module.exports = mongoose.model('User', userSchema);