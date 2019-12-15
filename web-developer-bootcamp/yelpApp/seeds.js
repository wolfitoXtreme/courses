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
var data = [
    {
        name: 'Salmon Creek',
        image: 'https://images.pexels.com/photos/629159/pexels-photo-629159.jpeg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.'
    },
    {
        name: 'Granite Hill',
        image: 'https://images.pexels.com/photos/889243/pexels-photo-889243.jpeg',
        description: 'Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
    },
    {
        name: 'Montain Goat\'s Rest',
        image: 'https://images.pexels.com/photos/968396/pexels-photo-968396.jpeg',
        description: 'Cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non. Cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non. Cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non. Cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non.'
    },
    {
        name: 'Et dolore magna aliqua',
        image: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg',
        description: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo. Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo. Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo. Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.'
    }
];


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
                            author: 'John Doe'
                        }, function(err, comment) {
                            if(err) {
                                console.log(err);
                            }
                            else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log('created new comment, author is -> ' + comment.author);
                            }
                        }
                    );
                }
            });
        });
        
    });
}


module.exports = seedDB;