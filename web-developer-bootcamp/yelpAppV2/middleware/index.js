//
// Middleware files
//

// dependencies
// --------------

// data base models
var Campground = require('../models/campground'),
    Comment = require('../models/comment');

// Middleware
// --------------
var middlewareObj = {};

// Verify authentication
middlewareObj.isLoggedIn =  function(req, res, next) {
    if(req.isAuthenticated()) { // check through 'passport'
        return next(); // next refers to what is after the Middleware
    }
    req.flash('error', 'Please login first'); // add message to next route
    res.redirect('/login');
};

// Verify authentication and permissions to Edit and Update a Campground
middlewareObj.checkCampgroundOwnership =  function(req, res, next) {
    
    if(req.isAuthenticated()) { // check through 'passport'
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err || !foundCampground){ // error or campground is ('null')
                req.flash('error', 'Campground not found'); // add message to next route
                res.redirect('back'); // sends to previous page
            }
            else {
                // check if the user owner of the campground
                // test to prove  'foundCampground.author.id' and 'req.user._id'
                console.log(
                    '\n////////////////\n' +
                    'campground.author.id is => \t' +  foundCampground.author.id + ' (' + typeof(foundCampground.author.id) + ')' + '\n' +
                    'req.user._id is => \t\t' + req.user._id + ' (' + typeof(req.user._id) + ')\n' + 
                    'are both values equal? => \t' + (foundCampground.author.id === req.user._id) + '\n' +
                    '////////////////\n'
                );

                // using mongoose method to compare 'foundCampground.author.id' and 'req.user._id'
                if(foundCampground.author.id.equals(req.user._id)) {
                    next(); // continue executing the function the middleware is plugged at
                }
                else {
                    req.flash('error', 'You don\'t have permissions to do that.'); // add message to next route
                    res.redirect('back'); // sends to previous page
                }
            } 
        });
    }
    else {
        req.flash('error', 'Please login first'); // add message to next route
        res.redirect('back'); // sends to previous page
    }
};

// Verify authentication and permissions to Edit and Update a Comment
middlewareObj.checkCommentOwnership =  function(req, res, next) {
    
    if(req.isAuthenticated()) { // check through 'passport'
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){ // error or comment is ('null')
                req.flash('error', 'Comment not found'); // add message to next route
                res.redirect('back'); // sends to previous page
            }
            else {
                // check if the user owner of the comment
                // test to prove  'foundComment.author.id' and 'req.user._id'
                console.log(
                    '\n////////////////\n' +
                    'comment.author.id is => \t' +  foundComment.author.id + ' (' + typeof(foundComment.author.id) + ')' + '\n' +
                    'req.user._id is => \t\t' + req.user._id + ' (' + typeof(req.user._id) + ')\n' + 
                    'are both values equal? => \t' + (foundComment.author.id === req.user._id) + '\n' +
                    '////////////////\n'
                );

                // using mongoose method to compare 'foundComment.author.id' and 'req.user._id'
                if(foundComment.author.id.equals(req.user._id)) {
                    next(); // continue executing the function the middleware is plugged at
                }
                else {
                    req.flash('error', 'You don\'t have permissions to do that.'); // add message to next route
                    res.redirect('back'); // sends to previous page
                }
            } 
        });
    }
    else {
        req.flash('error', 'Please login first'); // add message to next route
        res.redirect('back'); // sends to previous page
    }
};

module.exports = middlewareObj;