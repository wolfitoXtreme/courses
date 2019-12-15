//
// not model dependent routes (ex. authentication)
//

// dependencies
// --------------
    
// npm modules
var express =   require('express'),     // web development Framework
    passport =  require('passport');    // handles authentication

// router
var router = express.Router(); // to add routes to 'router' instead of 'app'

// data base models
var User = require('../models/user');

// Routes
// --------------

// base routes defined in app ROUTES settings as '/'

// root ROUTE
router.get('/', function(req, res){
    // standard send method
    // res.send('root document!');

    res.render('home', {page: 'home'}); // omit '.ejs' file extension because of app.set('view engine', 'ejs');
});

// register ROUTE (form page)
router.get('/register', function(req, res){
    res.render('register');
});

// create user ROUTE
router.post('/register', function(req, res){
    // res.send('signing up!');
    var newUser = new User({username: req.body.username});

    // create user using 'passport'
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            // console.log('something went wrong!!\n' + err);
            req.flash('error', err.message); // add message to next route
            return res.redirect('/register');
        }

        // authenticate using 'passport' local strategy
        passport.authenticate('local')(req, res, function(){
            req.flash('success', 'Welcome to YelpCamp ' + user.usernme); // add message to next route ('campgrounds')
            res.redirect('/campgrounds');
        });
    });
});

// login user ROUTE
router.get('/login', function(req, res){
    res.render('login');
});


// login logic ROUTE (Using 'passport' built in Middleware before actual callback)
// router.post('/login', passport.authenticate('local', {
//     failureRedirect: '/login',
//     failureFlash: true,             // add message to next route
//     successFlash: 'Welcome back!',   // add message to next route
//     successRedirect: '/campgrounds'
// }), function(req, res){
//     // all handled by passport middleware
// });

router.post('/login', passport.authenticate('local', {
    // passport will handle errors
    // successRedirect: '/campgrounds',
    failureFlash: true,
    failureRedirect: '/login'
    // failureFlash: true,             // add message to next route
    // successFlash: 'Welcome back!'   // add message to next route
}), function(req, res){
    req.flash('success', 'Welcome back ' + req.user.username + '!'); // add message to next route
    res.redirect('/campgrounds');
});

// logout user ROUTE
router.get('/logout', function(req, res){
    // res.send('you logged out!');
    req.logout(); // removing user session data out using 'passport'

    req.flash('success', 'Successfully logged out'); // add message to next route
    res.redirect('/campgrounds');
});

module.exports = router;
