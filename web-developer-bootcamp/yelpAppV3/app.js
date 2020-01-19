'use-strict';

// ---------------------
// Yelp APP
// ---------------------

// project settings
// --------------
var project =           require('./package.json'),
    projectName =       project.name;

// dependencies
// --------------

// npm modules
var express =           require('express'),         // web development Framework
    bodyParser =        require('body-parser'),     // parses POST req.body into a JScript object
    mongoose =          require('mongoose'),        // handles interaction with Mongo DB
    methodOverride =    require('method-override'), // overrides http methods for use of PUT and DELETE
    passport =          require('passport'),        // handles authentication
    LocalStrategy =     require('passport-local'),  // local authentication
    flash =             require('connect-flash');   // flash request messages

    // NOTE: '' is expected to be installed by 'passport' no need to require it

// data base models
var User = require('./models/user'); // used by 'passport'

// others
var seedDB = require('./seeds'); // to wipe out DB and fill it automatically for testing purposes

// routs (using express)
var indexRoutes = require('./routes/index'),
    campgroundRoutes = require('./routes/campgrounds'),
    commentRoutes = require('./routes/comments'); 

// App/server configuration
// --------------
var app =               express(),
    port =              process.env.PORT || 3000,                                           // heroku or 3000
    ip =                '0.0.0.0' || '127.0.0.1',                                           // heroku or 127.0.0.1
    dataBase =          process.env.DATABASEURL|| 'mongodb://localhost:27017/yelp_camp_v3'; // database pointing to ENV or 

    console.log('DATABASEURL' + dataBase);

    // mongoURI =          process.env.mongoURI || require('./config/keys').mongoURI   // local or Heroku (mongoDB Atlas server with credentials)
    
    // servicesKeys =          require('./config/keys'); // credentials to connect to external services (mongoDB Atlas server)

// APP settings
// --------------
app.use(express.static(__dirname + '/public')); // defines use of static content. ex. style sheets
app.use(bodyParser.urlencoded({
    extended: true
}));                                            // defines use of 'body-parser' to parse POST req.body into a JScript object.
app.use(flash());                               // set use of flash request messages
app.use(require('express-session')({
    secret: 'Random text to encode decode session info',
    resave: false,
    saveUninitialized: false
}));                                            // set 'express-session' to work with 'passport'
app.use(methodOverride('_method'));             // set use of overriding http methods
app.use(passport.initialize());                 // initialize 'passport' authentication method
app.use(passport.session());                    // set use of 'passport' module session method
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});                                             // middleware to set common data to all requests
app.set('view engine', 'ejs');                  // set 'ejs' as expected view rendering templates file type


// PASSPORT settings
// --------------
passport.use(new LocalStrategy(User.authenticate()));   // set use of user.authenticate method coming from 'passportLocalMongoose' from the User model
passport.serializeUser(User.serializeUser());           // method for encoding data session, comes from user model 'passportLocalMongoose'
passport.deserializeUser(User.deserializeUser());       // method for decoding data session, comes from user model 'passportLocalMongoose'


// ROUTES settings
// --------------
app.use('/', indexRoutes);                              // define '/' as root path
app.use('/campgrounds', campgroundRoutes);              // define '/campgrounds' as root path
app.use('/campgrounds/:id/comments', commentRoutes);    // define '/campgrounds/:id/comments/' as root path

// 
// Database
//

// Database connection/data base creation (27017 default port used to connect to a DB)
// mongoose.connect('mongodb://localhost:27017/yelp_camp_v3', { useNewUrlParser: true }); // connects to existing DB/creates and connects to
mongoose.connect(dataBase, { useNewUrlParser: true });

// wipe out and seed DB with initial data
// run in console $node -e 'require("./app").seed()'
module.exports.seed = function() {
    seedDB();
};

// 
// Server/rendering
//

// Server listening
app.listen(port, ip, function(){
    console.log('<<' + projectName.toUpperCase() + '>> server is started!!');
});

// Server routes

// routes defined now as modules to be use with 'express.Router'

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





