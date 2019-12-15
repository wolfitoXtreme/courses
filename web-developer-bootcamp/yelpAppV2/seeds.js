//
// Seeds, wipe out DB and fill it automatically
//

// dependencies
    // npm modules
    var mongoose =          require('mongoose');

    // data base models
    var Campground = require('./models/campground'),
        Comment = require('./models/comment');

// Database "test data"
// users must exist and match ID's here in order to interact with these 'campgrounds' and 'comments' via the app
var data = [
    {
        name: 'Salmon Creek',
        price: '15.80',
        image: 'https://images.pexels.com/photos/629159/pexels-photo-629159.jpeg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.',
        author:{
            id : '5c8950960bb3342eb81f1287',
            username: 'John Doe'
        }
    },
    {
        name: 'Granite Hill',
        price: '15.80',
        image: 'https://images.pexels.com/photos/889243/pexels-photo-889243.jpeg',
        description: 'Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        author:{
            id : '5c895113b0e01906a49e279e',
            username: 'Jane Doe'
        }
    },
    {
        name: 'Montain Goat\'s Rest',
        price: '15.80',
        image: 'https://images.pexels.com/photos/968396/pexels-photo-968396.jpeg',
        description: 'Cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non. Cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non. Cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non. Cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non.',
        author:{
            id : '5c89709e6723262cd8882bb1',
            username: 'Richard Doe'
        }
    },
    {
        name: 'Et dolore magna aliqua',
        price: '15.80',
        image: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg',
        description: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo. Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo. Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo. Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
        author:{
            id : '5c8950960bb3342eb81f1287',
            username: 'John Doe'
        }
    },
    {
        name: 'Culpa qui officia',
        price: '15.80',
        image: 'https://images.pexels.com/photos/35178/switzerland-zermatt-mountains-snow.jpg',
        description: 'Maecenas bibendum tempor urna, vitae aliquet lectus ullamcorper in. Cras in lacus et elit vestibulum tempus a at ipsum. Nulla ac odio consequat, hendrerit urna nec, bibendum risus.',
        author:{
            id : '5c8950960bb3342eb81f1287',
            username: 'John Doe'
        }
    },
    {
        name: 'Excepteur sint occaecat',
        price: '15.80',
        image: 'https://images.pexels.com/photos/934964/pexels-photo-934964.jpeg',
        description: 'Suspendisse feugiat ipsum quis laoreet auctor. Cras commodo leo quis venenatis cursus. Fusce porta nibh at tortor dignissim interdum. Quisque in facilisis risus, eu tempor magna.',
        author:{
            id : '5c895113b0e01906a49e279e',
            username: 'Jane Doe'
        }
    },
    {
        name: 'Aliquip ex ea commodo',
        price: '15.80',
        image: 'https://images.pexels.com/photos/897717/pexels-photo-897717.jpeg',
        description: 'Proin nulla lectus, porta ac pellentesque in, sagittis vitae massa. Mauris quis arcu odio. Pellentesque sed neque non ex congue semper nec et ex. Nullam vel interdum massa, ut suscipit enim. Praesent pulvinar volutpat venenatis.',
        author:{
            id : '5c89709e6723262cd8882bb1',
            username: 'Richard Doe'
        }
    },
    {
        name: 'Laboris nisi',
        price: '15.80',
        image: 'https://images.pexels.com/photos/1183986/pexels-photo-1183986.jpeg',
        description: 'Morbi ut lacus non nunc pharetra aliquet. Vestibulum et ultricies lorem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut venenatis at nunc vitae semper. Pellentesque eleifend quam sed lorem consectetur, sed porttitor urna ultrices. Duis laoreet nisi nec risus euismod, quis placerat arcu suscipit.',
        author:{
            id : '5c8950960bb3342eb81f1287',
            username: 'John Doe'
        }
    },
    {
        name: 'Laboris nisi',
        price: '15.80',
        image: 'https://images.pexels.com/photos/915972/pexels-photo-915972.jpeg',
        description: 'Cras tortor ex, dignissim nec eros sit amet, porta vehicula leo. Donec luctus diam dolor, et hendrerit enim imperdiet eu. Maecenas volutpat non nisi id tempor.',
        author:{
            id : '5c895113b0e01906a49e279e',
            username: 'Jane Doe'
        }
    }];


function seedDB() {
    // remove all Campgrounds
    Campground.deleteMany({}, function(err){
        if(err) {
            console.log('something went wrong!!\n' + err);
        }
        console.log('removed campgrounds!');

        // delete all comments
        Comment.deleteMany({}, function(err){
            if(err) {
                console.log('something went wrong!!\n' + err);
            }
            console.log('removed comments!');
        });

        // add some Campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err) {
                    console.log(err);
                }
                else {
                    console.log('added Campground -> ' + seed.name);

                    // create a Comment
                    Comment.create(
                        {
                            text: 'Test comment, Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                            author: {
                                id: '5c8950960bb3342eb81f1287',
                                username: 'John Doe'
                            } 
                        }, function(err, comment) {
                            if(err) {
                                console.log(err);
                            }
                            else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log('created new comment, author is -> ' + comment.author.username);
                            }
                        }
                    );
                }
            });
        });
        
    });
}


module.exports = seedDB;