//
// Comments model
//

// dependencies
var mongoose = require('mongoose'); // handles interaction with Mongo DB

// 
// Database Schema Setup
// 

// campgrounds
var commentSchema = new mongoose.Schema({
    text: String,
    author: String
});

// Binds Schema data pattern with a model
// this adds methods as create, find, always with Capital letter as a convention
// var Campground = mongoose.model('Campground', campgroundSchema);

module.exports = mongoose.model('Comment', commentSchema);