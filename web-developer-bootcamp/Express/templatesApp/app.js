'use-strict';

// ---------------------
// EXPRESS TEMPLATES APP
// ---------------------

// project settigs
var project = require('./package.json'),
    projectName = project.name;

// dependencies
var express = require('express'),
    bodyParser = require('body-parser');

// app
var app = express(),
    port = 3000,
    ip = '127.0.0.1';

// settings
app.use(express.static('public')); // define use of static content. ex. style sheets
app.use(bodyParser.urlencoded({
    extended: true
})); // define use of 'body-parser' to parse POST req.body into a JScript object.
app.set('view engine', 'ejs'); // set 'ejs' as expected view rendering templates file type

// routes

    // remove favicon from request
    // favicon is requested by default by some browsers
    app.get('/favicon.ico', function(req, res){ 
        res.status(204);
    });

    // root
    app.get('/', function(req, res){
        // standard send method
        // res.send('root document!');

        res.render('home'); // omit '.ejs' file extension because of app.set('view engine', 'ejs');
    });

    // posts
    app.get('/posts', function(req, res){
        var posts = [
            {
                title: 'post number one', 
                author: 'John Doe',
                date: '20/11/1975'
            },
            {
                title: 'post number two', 
                author: 'Jane Doe',
                date: '12/13/1973'
            },
        ];

        res.render('posts', {posts: posts});
    });

    // friends
    var friends = ['John Doe', 'Jane', 'Unnamed', 'No Name'];

    app.get('/friends', function(req, res){
        res.render('friends', {friends: friends});
    });

    // add friends
    app.post('/addfriend', function(req, res){
        console.log('new friend => ' + req.body); // renders req.body through 'body-parser' module
        
        var newFriend = req.body.newFriend;

        friends.push(newFriend);
        
        // redirect to friends page instead of sending the request to:
        // res.send('POST addfriend reached!!');
        res.redirect('friends');
    });

    // root with parameter
    app.get('/:urlVar', function(req, res){
        var urlVar = req.params.urlVar;

        console.log('request => ' + req.params + '\nlength => ' + Object.keys(req.params).length + ' ' + urlVar);

        // 'ejs' stand for 'embedded java script'
        // 'ejs' must be installed via node to be recognized by express
        // 'ejs' templates most be placed on 'views' folder
        res.render('home', {urlVar: urlVar});
        // ex. http://localhost:3000/test
    });

// Server listening
app.listen(port, ip, function(){
    console.log('<<' + projectName.toUpperCase() + '>> server is started!!');
});