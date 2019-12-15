'use-strict';

// -------------------------------------
// DATA ASOCIATION (EMBEDDING DATA)
// -------------------------------------

// dependencies
var mongoose =          require('mongoose');            // handles interacion with Mongo DB

// 
// Database
//

// Database connection/data base creation (27017 default port used to connect to a DB)
mongoose.connect('mongodb://localhost:27017/blog_demo', { useNewUrlParser: true }); // connects to 

// Schemes
var postSchema = new mongoose.Schema({
        title: String,
        content: String
    }),
    userSchema = new mongoose.Schema({
        email: String,
        name: String,
        posts: [postSchema] // one to many db relationship (Embedding data)
    });

// Model Bindings 
var User = mongoose.model('User', userSchema),
    Post = mongoose.model('Post', postSchema);

// create USER
    // var newUser = new User({
    //     email: 'test-user@yahoo.com',
    //     name: 'Jonh Doe'
    // });
    // newUser.save(function(err, user){
    //     if(err){
    //         console.log('something went wrong!!' + err);
    //     }
    //     else {
    //         console.log('user saved to database, user is => ', user);
    //     }
    // });

// add POST
    // var newPost = new Post({
    //     title: 'First post',
    //     content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.'
    // });

    // newPost.save(function(err, post){
    //     if(err){
    //         console.log('something went wrong!!' + err);
    //     }
    //     else {
    //         console.log('post saved to database, user is => ', post);
    //     }
    // });

// add USER and POST
    // var newUser = new User({
    //     email: 'test-user@gmail.com',
    //     name: 'Jane Doe'
    // });

    // newUser.posts.push({
    //     title: 'test adding post to ' + newUser.name,
    //     content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    // });

    // newUser.save(function(err, user){
    //     if(err){
    //         console.log('something went wrong!!' + err);
    //     }
    //     else {
    //         console.log('user saved to database, user is => ', user);
    //     }
    // });

// Add new POST to USER
User.findOne({name: 'Jane Doe'}, function(err, user){
    if(err){
        console.log('something went wrong!!' + err);
    }
    else {

        user.posts.push({
            title: 'second post from' + user.name, 
            content: 'Second post content is...'
        });

        user.save(function(err, user){
            if(err){
                console.log('something went wrong!!' + err);
            }
            else {
                console.log('post saved, user is => ', user);
            }
        });
    }
});