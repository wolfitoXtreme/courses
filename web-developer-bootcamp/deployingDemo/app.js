'use-strict';

// ---------------------
// DEPLOY DEMO APP
// ---------------------

// project settings
// --------------
var project = require('./package.json'),
    projectName = project.name;

// dependencies
// --------------
    
// npm modules
var express =   require('express');

// App/server configuration
// --------------
var app =               express(),
    port =              process.env.PORT || 3000,
    ip =                '0.0.0.0' || '127.0.0.1';

// APP settings
// --------------
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('home');
});

app.get('/about', function(req, res){
    res.render('about');
});


// 
// Server/rendering
//

// Server listening
app.listen(port, ip, function(){
    console.log('<<' + projectName.toUpperCase() + '>> server is started!!', 'port -> ' + port, 'ip ->' + ip);
});