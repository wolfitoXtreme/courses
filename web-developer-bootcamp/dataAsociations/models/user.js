// 
// user model
// 

// dependencies
var mongoose =          require('mongoose');            // handles interacion with Mongo DB

// Users
var userSchema = new mongoose.Schema({
        email: String,
        name: String,
        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }] // one to many db relationship (referencing data)
    });

module.exports = mongoose.model('User', userSchema);