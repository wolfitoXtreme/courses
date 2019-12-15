// 
// post model
// 

// dependencies
var mongoose =          require('mongoose');            // handles interacion with Mongo DB

// posts
var postSchema = new mongoose.Schema({
        title: String,
        content: String
    });

module.exports = mongoose.model('Post', postSchema);