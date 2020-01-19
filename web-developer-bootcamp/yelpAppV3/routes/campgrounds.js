//
// Campgrounds routes
//

// dependencies
// --------------

// npm modules
var express = require('express'); // web development Framework

// router
var router = express.Router(); // to add routes to 'router' instead of 'app'

// data base models
var Campground = require('../models/campground'),
    Comment = require('../models/comment');

// Middleware files
var middleware = require('../middleware'); // will require 'index.js' inside that folder

// Routes
// --------------

// base routes defined in app ROUTES settings as '/campgrounds'

// INDEX ROUTE (listing page)
router.get('/', function(req, res){

    console.log('current user is -> ' + req.user);

    // get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log('something went wrong!!\n' + err);
        }
        else {
            console.log('Campgrounds retrieved from database, campgrounds are => \n', allCampgrounds);
            
            // sending req.user as a variable example, handled now with middleware, see 'app.js' app.use confs 
            // res.render('campgrounds/index', {campgrounds: allCampgrounds, currentUser: req.user});

            res.render('campgrounds/index', {campgrounds: allCampgrounds});
        }
    });

});

// NEW ROUTE (form page, Using custom 'isLoggedIn' Middleware before actual callback)
router.get('/new', middleware.isLoggedIn, function(req, res){
    res.render('campgrounds/new');
});

// CREATE ROUTE, Using custom 'isLoggedIn' Middleware before actual callback
router.post('/', middleware.isLoggedIn, function(req, res){
    console.log('new campground => ' + req.body); // renders req.body through 'body-parser' module

    // get data from submitted form
    var name = req.body.name,
        price = req.body.price,
        image = req.body.image,
        description = req.body.description,
        author = {
            id: req.user._id,
            username: req.user.username
        };
        
    var newCampground = {
            name: name,
            price: price,
            image: image, 
            description: description, 
            author: author
        };
    
    // add a campground entry using Database "test data", see above
    // campgrounds.push(newCampground);

    // creates a New campground and save it to DB
    Campground.create(newCampground, function(err, newCampground){
        if(err){
            console.log('something went wrong!!\n' + err);
        }
        else {
            console.log('campground saved to database, campground is => ' + newCampground);
            
            // redirect back to campgrounds page
            res.redirect('/campgrounds');
        }
    });
});

// SHOW ROUTE
router.get('/:id', function(req, res){

    // find the campground with the corresponding ID
    Campground.findById(req.params.id) // find campground
    .populate('comments') // populate comments with corresponding texts
    .exec(function(err, foundCampground){ // execute the query
        if(err || !foundCampground){ // error or campground is ('null')
            console.log('something went wrong!!\n' + err);

            req.flash('error', 'Campground not found');
            res.redirect('/campgrounds');
        }
        else {
            console.log('campground found in database, campground is => ', foundCampground);
            res.render('campgrounds/show', {campground:foundCampground});
        }
    });
    
});

// EDIT ROUTE, Using custom 'checkCampgroundOwnership' Middleware before actual callback
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res){
    // res.send('Editing campground!!');

    Campground.findById(req.params.id, function(err, foundCampground){
        res.render('campgrounds/edit', {campground: foundCampground});
    });

});

// UPDATE ROUTE, Using custom 'checkCampgroundOwnership' Middleware before actual callback
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res){
    // finds URL id, and uses sent input data stored in req.body.campground (found id, data to update, callback)
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        req.flash('success', 'Campground edited successfully!');
        res.redirect('/campgrounds/' + updatedCampground.id);
    });
});

// DESTROY ROUTE (Deletes campground), Using custom 'checkCampgroundOwnership' Middleware before actual callback
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res){
    
    // res.send('deleting!!');
    
    // just deleting the campground
    // Campground.findByIdAndRemove(req.params.id, function(err){
    //      res.redirect('/campgrounds');
    // });

    // deleting the campground and comments using native Mongo commands
    Campground.findById(req.params.id, function(err, foundCampground, next){
        
        // first removes comments and pass those found within foundCampground
        Comment.remove({
            '_id': {
                $in: foundCampground.comments
            }
        }, function(err){
            if(err) return next(err);

            foundCampground.remove();

            req.flash('success', 'Campground removed successfully!');
            res.redirect('/campgrounds');
        });
    });

});

module.exports = router;