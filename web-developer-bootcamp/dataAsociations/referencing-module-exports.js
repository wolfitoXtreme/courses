'use-strict';

// ------------------------------------
// MODULE EXPORTS
// ------------------------------------

// dependencies
var mongoose =          require('mongoose');

// custom modules
var Post = require('./models/post'),
    User = require('./models/user');

// 
// Database
//

// Database connection/data base creation (27017 default port used to connect to a DB)
mongoose.connect('mongodb://localhost:27017/blog_demo_2', { useNewUrlParser: true }); // connects to 

// create POST
    Post.create({
        title: 'Third Post title here',
        content: 'Third Post content here'
    }, function(err, post) {
        // find the user to store data into
        User.findOne({email: 'test@yahoo.com'}, function(err, foundUser) {
            if(err) {
                console.log('err');
            }
            else {
                // push the post
                foundUser.posts.push(post);

                // save the user
                foundUser.save(function(err, data){
                    if(err) {
                        console.log('err');
                    }
                    else {
                        console.log(data);
                    }
                });
            }   
        });
    });