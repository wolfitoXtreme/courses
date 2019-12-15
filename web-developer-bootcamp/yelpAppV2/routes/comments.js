//
// Comments routes
//

// dependencies
// --------------

// npm modules
var express = require('express'); // web development Framework

// router
var router = express.Router({mergeParams: true}); // to add routes to 'router' instead of 'app', meregeParams true to send URL variables

// data base models
var Campground = require('../models/campground'),
    Comment = require('../models/comment');

// Middleware files
var middleware = require('../middleware'); // will require 'index.js' inside that folder

// Routes
// --------------

// base routes defined in app ROUTES settings as '/campgrounds/:id/comments'

// NEW ROUTE (form page, Using custom 'isLoggedIn' Middleware before actual callback)
router.get('/new', middleware.isLoggedIn, function(req, res){
    // find the campground with the corresponding ID
    Campground.findById(req.params.id, function(err, foundCampground){ // find campground
        if(err) {
            console.log('something went wrong!!\n' + err);
        }
        else {
            console.log('campground found, -> ' + foundCampground.name);
            res.render('comments/new', {campground: foundCampground});
        }
    });
});

// CREATE ROUTE, Using custom 'isLoggedIn' Middleware before actual callback
router.post('/', middleware.isLoggedIn, function(req, res){
   
    Campground.findById(req.params.id, function(err, campground){ // find the campground
        if(err) {
            console.log('something went wrong!!\n' + err);
            res.redirect('/campgrounds'); // redirect in case of error
        }
        else {
            // test request sent paramaters
            // res.send(req.body.comment);

            // create a new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    console.log('something went wrong!!\n' + err);
                }
                else {
                    // add username and id to a comment
                    // req.user available in all routes through APP settings, res.locals.currentUser
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    console.log('comment added was ->' + comment);

                    // add new comment to the campground
                    campground.comments.push(comment);
                    campground.save();
                    
                    // redirect to campground show page
                    req.flash('error', 'Comment added successfully!'); // add message to next route
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

// EDIT ROUTE, Using custom 'checkCommentOwnership' Middleware before actual callback
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res){

    // find the campground with the corresponding ID
    // campground id already coming from '/campgrounds/:id/comments' base route defined in app ROUTES settings
    Campground.findById(req.params.id, function(err, foundCampground){ // find campground
        if(err || !foundCampground) { // error or campground is ('null')
            req.flash('error', 'Campground not found'); // add message to next route
            res.redirect('back');
        }
        else {
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err) {
                    res.redirect('back');
                }
                else {
                    res.render('comments/edit', { campground: foundCampground, comment: foundComment });
                }
            });
        }
    });
});

// UPDATE ROUTE, Using custom 'checkCommentOwnership' Middleware before actual callback
router.put('/:comment_id/', middleware.checkCommentOwnership, function(req, res){
    // res.send('updating comment...');

    // finds URL id, and uses sent input data stored in req.body.comment (found id, data to update, callback)
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err) {
            res.redirect('back');
        }
        else {
            // res.send(updatedComment.text);
            // res.send(req.body.comment + req.params.comment_id + '<br><br>'+  updatedComment);

            // campground id already coming from '/campgrounds/:id/comments' base route defined in app ROUTES settings
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// DESTROY ROUTE (Deletes comment), Using custom 'checkCommentOwnership' Middleware before actual callback
router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res){
    
    // res.send('deleting comment!!');

    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err) {
            res.redirect('back');
        }
        else {
            req.flash('success', 'Comment deletyed succesfully.'); // add message to next route
            res.redirect('/campgrounds/' + req.params.id);
        }
    });

});

module.exports = router;