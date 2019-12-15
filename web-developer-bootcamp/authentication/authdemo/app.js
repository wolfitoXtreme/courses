'use-strict';

// ---------------------
// AUTHENTICATION DEMO
// ---------------------

// 
// project settings
// 
var project =           require('./package.json'),
    projectName =       project.name;

// dependencies
    
    // npm modules
    var express =               require('express'),                 // web development Framework
        bodyParser =            require('body-parser'),             // parses POST req.body into a JScript object
        mongoose =              require('mongoose'),                // handles interaction with Mongo DB
        passport =              require('passport'),                // handles authentication
        LocalStrategy =         require('passport-local'),          // local authentication
        passportLocalMongoose = require('passport-local-mongoose'); // mongoose local authentication

    // data base models
    var User = require('./models/user');

// App/server configuration
var app =               express(),
    port =              3000,
    ip =                '127.0.0.1';

// APP settings
app.set('view engine', 'ejs');      // set 'ejs' as expected view rendering templates file type
app.use(bodyParser.urlencoded({
    extended: true
}));                                // defines use of 'body-parser' to parse POST req.body into a JScript object.
app.use(require('express-session')({
    secret: 'Random text to encode decode session info',
    resave: false,
    saveUninitialized: false
}));                                // set 'express-session' to work with 'passport'
app.use(passport.initialize());     // initialize 'passport' authentication method
app.use(passport.session());        // set use of 'passport' module session method

// PASSPORT settings
passport.use(new LocalStrategy(User.authenticate()));   // set use of user.authenticate method coming from 'passportLocalMongoose' from the User model
passport.serializeUser(User.serializeUser());           // method for encoding data session, comes from user model 'passportLocalMongoose'
passport.deserializeUser(User.deserializeUser());       // method for decoding data session, comes from user model 'passportLocalMongoose'

// 
// Database
//

// Database connection/data base creation (27017 default port used to connect to a DB)
mongoose.connect('mongodb://localhost/auth_demo_app', { useNewUrlParser: true }); // connects to existing DB/creates and connects to


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

    // secret ROUTE (Using custom 'isLoggedIn' Middleware before actual callback)
    app.get('/secret', isLoggedIn, function(req, res){
        res.render('secret');
    });

    // Auth register ROUTE (form page)
    app.get('/register', function(req, res){
        res.render('register');
    });

    // create user ROUTE
    app.post('/register', function(req, res){
        // res.send('register POST route');
        User.register(new User({username: req.body.username}), req.body.password, function(err, user){
            if(err){
                console.log('something went wrong!!\n' + err);
                return res.render('register');
            }

            // authenticate using 'passport' local strategy
            passport.authenticate('local')(req, res, function(){
                res.redirect('/secret');
            });
        });
    });

    // login user ROUTE
    app.get('/login', function(req, res){
        res.render('login');
    });

    // login logic ROUTE (Using 'passport' Middleware before actual callback)
    app.post('/login', passport.authenticate('local', {
        successRedirect: '/secret',
        failureRedirect: '/login'
    }),function(req, res){
        res.render('login');
    });

    // logout user ROUTE
    app.get('/logout', function(req, res){
        // res.send('you logged out!');
        req.logout(); // removing user session data out using 'passport'
        res.redirect('/');
    });

    // Function to use as a Middleware to verify authentication
    function isLoggedIn(req, res, next){
        if(req.isAuthenticated()) { // check through 'passport'
            return next(); // next refers to what is after the Middleware
        }
        res.redirect('/login');
    }