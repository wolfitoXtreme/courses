'use-strict';

// ------------------------------------
// DATA ASOCIATION (REFERENCING DATA)
// ------------------------------------

// dependencies
var mongoose =          require('mongoose');            // handles interacion with Mongo DB

// 
// Database
//

// Database connection/data base creation (27017 default port used to connect to a DB)
mongoose.connect('mongodb://localhost:27017/blog_demo_2', { useNewUrlParser: true }); // connects to 

// Schemes
var postSchema = new mongoose.Schema({
        title: String,
        content: String
    }),
    userSchema = new mongoose.Schema({
        email: String,
        name: String,
        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }] // one to many db relationship (referencing data)
    });

// Model Bindings
var User = mongoose.model('User', userSchema),
    Post = mongoose.model('Post', postSchema);


// create USER
    // User.create({
    //     email: 'test@yahoo.com',
    //     name: 'John Doe'
    // });

// create POST
    // Post.create({
    //     title: 'First Post title here',
    //     content: 'First Post content here'
    // }, function(err, post) {
    //     // find the user to store data into
    //     User.findOne({email: 'test@yahoo.com'}, function(err, foundUser) {
    //         if(err) {
    //             console.log('err');
    //         }
    //         else {
    //             // push the post
    //             foundUser.posts.push(post);

    //             // save the user
    //             foundUser.save(function(err, data){
    //                 if(err) {
    //                     console.log('err');
    //                 }
    //                 else {
    //                     console.log(data);
    //                 }
    //             });
    //         }   
    //     });
    // });

// find user posts
    User.findOne({email: 'test@yahoo.com'}).populate('posts').exec(function(err, data){
        if(err) {
            console.log(err);
        }
        else {
            console.log(data);
        }
    });
