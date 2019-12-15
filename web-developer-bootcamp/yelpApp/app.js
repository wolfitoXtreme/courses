'use-strict';

// ---------------------
// Yelp APP
// ---------------------

// project settings
var project =           require('./package.json'),
    projectName =       project.name;

// dependencies
    
    // npm modules
    var express =           require('express'),                     // web development Framework
        bodyParser =        require('body-parser'),                 // parses POST req.body into a JScript object
        mongoose =          require('mongoose'),                    // handles interaction with Mongo DB
        passport =              require('passport'),                // handles authentication
        LocalStrategy =         require('passport-local'),          // local authentication
        passportLocalMongoose = require('passport-local-mongoose'); // mongoose local authentication

    // data base models
    var Campground = require('./models/campground'),
        Comment = require('./models/comment'),
        User = require('./models/user');

    // others
    var seedDB = require('./seeds'); // to wipe out DB and fill it automatically for testing purposes

// App/server configuration
var app =               express(),
    port =              3000,
    ip =                '127.0.0.1';

// APP settings
app.use(express.static(__dirname + '/public')); // defines use of static content. ex. style sheets
app.use(bodyParser.urlencoded({
    extended: true
}));                                            // defines use of 'body-parser' to parse POST req.body into a JScript object.
app.use(require('express-session')({
    secret: 'Random text to encode decode session info',
    resave: false,
    saveUninitialized: false
}));                                            // set 'express-session' to work with 'passport'
app.use(passport.initialize());                 // initialize 'passport' authentication method
app.use(passport.session());                    // set use of 'passport' module session method
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
}); // middleware to snet user credentials to all requests
app.set('view engine', 'ejs');                  // set 'ejs' as expected view rendering templates file type

// PASSPORT settings
passport.use(new LocalStrategy(User.authenticate()));   // set use of user.authenticate method coming from 'passportLocalMongoose' from the User model
passport.serializeUser(User.serializeUser());           // method for encoding data session, comes from user model 'passportLocalMongoose'
passport.deserializeUser(User.deserializeUser());       // method for decoding data session, comes from user model 'passportLocalMongoose'

// 
// Database
//

// Database "test data"
    // var campgrounds = [
    //     {
    //         name: 'Salmon Creek',
    //         image: 'https://images.pexels.com/photos/629159/pexels-photo-629159.jpeg'
    //     },
    //     {
    //         name: 'Granite Hill',
    //         image: 'https://images.pexels.com/photos/889243/pexels-photo-889243.jpeg'
    //     },
    //     {
    //         name: 'Montain Goat\'s Rest',
    //         image: 'https://images.pexels.com/photos/968396/pexels-photo-968396.jpeg'
    //     },
    //     {
    //         name: 'Et dolore magna aliqua',
    //         image: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg'
    //     },
    //     {
    //         name: 'Culpa qui officia',
    //         image: 'https://images.pexels.com/photos/35178/switzerland-zermatt-mountains-snow.jpg'
    //     },
    //     {
    //         name: 'Excepteur sint occaecat',
    //         image: 'https://images.pexels.com/photos/934964/pexels-photo-934964.jpeg'
    //     },
    //     {
    //         name: 'Aliquip ex ea commodo',
    //         image: 'https://images.pexels.com/photos/897717/pexels-photo-897717.jpeg'
    //     },
    //     {
    //         name: 'Laboris nisi',
    //         image: 'https://images.pexels.com/photos/1183986/pexels-photo-1183986.jpeg'
    //     },
    //     {
    //         name: 'Consectetur adipisicing',
    //         image: 'https://images.pexels.com/photos/915972/pexels-photo-915972.jpeg'
    //     }
    // ];


// Database connection/data base creation (27017 default port used to connect to a DB)
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true }); // connects to existing DB/creates and connects to
// wipe out DB
seedDB(); 

// create and save to DB
// run in console by $node -e 'require("./app").createAndSaveCampground(name, image, description)'
// ex: $node -e 'require("./app").createAndSaveCampground("Salmon Creek", "https://images.pexels.com/photos/629159/pexels-photo-629159.jpeg", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")'
module.exports.createAndSaveCampground = function(name, image, description) {

    // create campground
    Campground.create({
        name: name,
        image: image,
        description: description
    }, function(err, campground){
        if(err){
            console.log('something went wrong!!\n' + err);
        }
        else {
            console.log('campground saved to database, campground is => ', campground);
        }
    });

};


// 
// Server/rendering
//

// Server listening
app.listen(port, ip, function(){
    console.log('<<' + projectName.toUpperCase() + '>> server is started!!');
});

// Server routes

    // root ROUTE
    app.get('/', function(req, res){
        // standard send method
        // res.send('root document!');

        res.render('home'); // omit '.ejs' file extension because of app.set('view engine', 'ejs');
    });
    
    // 
    // -----------------------------------------------------------------------------------------------------------------------------
    //  RESTful ROUTES
    // -----------------------------------------------------------------------------------------------------------------------------
    //  (REST: Representation of State Transfer) 
    //  Mapping between HTTP routes and CRUD(Create/Read/Update/Destroy)
    // -----------------------------------------------------------------------------------------------------------------------------
    //  NAME            URL                     HTTP VERB.(Method)  DESCRIPTION                         MONGOOSE METHOD
    //  ============================================================================================================================
    //  INDEX           /collection/            GET                 Display all collection entries      model.find()
    //  NEW             /collection/new/        GET                 Form to create a New entry          N/A
    //  CREATE          /collection             POST                Add a new entry to DB               model.create()
    //  SHOW            /collection/:id/        GET                 Show entry info page                model.findById()
    //  EDIT            /collection/:id/edit/   GET                 Form to edit a New entry            model.findById()
    //  UPDATE          /collection/:id/        PUT                 Updates a particular entry          model.findByIdAndUpdate()
    //  DESTROY         /collection/:id/        DELETE              Deletes a particular entry          model.findOneAndDelete()
    // 
    // =============================================================================================================================
    // 

    // Campgrounds ROUTES

        // INDEX ROUTE (listing page)
        app.get('/campgrounds', function(req, res){
            // render using Database "test data", see above
            // res.render('index', {campgrounds: campgrounds});

            console.log('current user is -> ' + req.user);

            // get all campgrounds from DB
            Campground.find({}, function(err, allCampgrounds){
                if(err){
                    console.log('something went wrong!!\n' + err);
                }
                else {
                    console.log('Campgrounds retrieved from database, campgrounds are => \n', allCampgrounds);
                    
                    // sending req.user as a variable example, handled now with middleware, see above app.use confs 
                    // res.render('campgrounds/index', {campgrounds: allCampgrounds, currentUser: req.user});

                    res.render('campgrounds/index', {campgrounds: allCampgrounds});
                }
            });

        });

        // NEW ROUTE (form page)
        app.get('/campgrounds/new', function(req, res){
            res.render('campgrounds/new');
        });

        // CREATE ROUTE
        app.post('/campgrounds', function(req, res){
            console.log('new campground => ' + req.body); // renders req.body through 'body-parser' module

            // get data from submitted form
            var name = req.body.name,
                image = req.body.image,
                description = req.body.description,
                newCampground = {name: name, image: image, description: description};
            
            // add a campground entry using Database "test data", see above
            // campgrounds.push(newCampground);

            // creates a New campground and save it to DB
            Campground.create(newCampground, function(err, newCampground){
                if(err){
                    console.log('something went wrong!!\n' + err);
                }
                else {
                    console.log('campground saved to database, campground is => ', newCampground);
                }
            });

            // redirect back to campgrounds page
            res.redirect('/campgrounds');
        });

        // SHOW ROUTE
        app.get('/campgrounds/:id', function(req, res){

            // find the campground with the corresponding ID
            Campground.findById(req.params.id) // find campground
            .populate('comments') // populate comments with corresponding texts
            .exec(function(err, foundCampground){ // execute the query
                if(err){
                    console.log('something went wrong!!\n' + err);
                }
                else {
                    console.log('campground found in database, campground is => ', foundCampground);
                    res.render('campgrounds/show', {campground:foundCampground});
                }
            });
            
        });

    // Comments ROUTES

        // NEW ROUTE (form page, Using custom 'isLoggedIn' Middleware before actual callback)
        app.get('/campgrounds/:id/comments/new', isLoggedIn, function(req, res){
            // find the campground with the corresponding ID
            Campground.findById(req.params.id, function(err, campground){ // find campground
                if(err) {
                    console.log('something went wrong!!\n' + err);
                }
                else {
                    console.log('campground found, -> ' + campground.name);
                    res.render('comments/new', {campground: campground});
                }
            });
        });

        // CREATE ROUTE, Using custom 'isLoggedIn' Middleware before actual callback
        app.post('/campgrounds/:id/comments', isLoggedIn, function(req, res){
           
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
                            // add new comment to the campground
                            campground.comments.push(comment);
                            campground.save();
                            
                            // redirect to campground show page
                            res.redirect('/campgrounds/' + campground._id);
                        }
                    });
                }
            });
        });

    // User ROUTES

        // register ROUTE (form page)
        app.get('/register', function(req, res){
            res.render('register');
        });

        // create user ROUTE
        app.post('/register', function(req, res){
            // res.send('signing up!');
            var newUser = new User({username: req.body.username});

            // create user using 'passport'
            User.register(newUser, req.body.password, function(err, user){
                if(err){
                    console.log('something went wrong!!\n' + err);
                    return res.render('register');
                }

                // authenticate using 'passport' local strategy
                passport.authenticate('local')(req, res, function(){
                    res.redirect('/campgrounds');
                });
            });
        });

        // login user ROUTE
        app.get('/login', function(req, res){
            res.render('login');
        });

        // login logic ROUTE (Using 'passport' Middleware before actual callback)
        app.post('/login', passport.authenticate('local', {
            successRedirect: '/campgrounds',
            failureRedirect: '/login'
        }),function(req, res){
            // nothing here as middleware handles authentication
        });

        // logout user ROUTE
        app.get('/logout', function(req, res){
            // res.send('you logged out!');
            req.logout(); // removing user session data out using 'passport'
            res.redirect('/campgrounds');
        });

        // Function to use as a Middleware to verify authentication
        function isLoggedIn(req, res, next){
            if(req.isAuthenticated()) { // check through 'passport'
                return next(); // next refers to what is after the Middleware
            }
            res.redirect('/login');
        }