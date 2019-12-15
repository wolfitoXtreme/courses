'use-strict';

// ---------------------
// SIMPLE APP
// ---------------------

// project settigs
var project = require('./package.json'),
    projectName = project.name;

// dependencies
var express = require('express');

// app
var app = express(),
    port = 3000,
    ip = '127.0.0.1';


console.log('Express App!');

/**
    * listen method.
    * @function app/listen!
    * @param {number} port The port to listen for
    * @param {string} host The host
    * @description Sends a get request
*/
// Server listening
app.listen(port, ip, function(){
    console.log('<<' + projectName.toUpperCase() + '>> server is started!!');
});

// 
// Routes
//

// Order of routes is important!

// '/' => "Hello cruel world!"
// '/goodbye' => "GoodBye cruel world!"
// '/meback' > "Me back cruel world!"

/** This is a description of the app.get function. */
/**
    * get method.
    * @function app/get!
    * @param {string} req Request sent
    * @param {string} res Received response
    * @description Sends a get request
*/
app.get('/', function(req, res){
    console.log(req);
    res.send('hello cruel world!!');

    /**
        * myTest function!!.
        * @function myTest!
        * @description Test the function with same name
    */
    var myTest = function() {
       console.log('app get firing!!');
    };

});

// request to '/meback'
app.get('/meback', function(req, res){
    res.send('I\'m back cruel world!!');
});

// request to '/goodbye'
app.get('/goodbye', function(req, res){
    console.log(req);
    res.send('goodbye cruel world!!');
});

// request with parameters
// http://localhost:3000/category/myCatID/subcategory/mySubCatID
app.get('/category/:catID/subcategory/:subcatID', function(req, res){
    console.log(req.params);
    var catID = req.params.catID,
        subcatID = req.params.subcatID;

    res.send('welcome to (' + catID + ') category (' + subcatID + ') subcategory page !!');
});

// request with parameters
// http://localhost:3000/repeat/text/Xtimes
app.get('/repeat/:text/:repeat', function(req, res){
    console.log(req.params);

    var text = req.params.text,
        repeat = parseInt(req.params.repeat),
        output = '';
    console.log(
        'text -> ' + text + '\n' +
        'repeat -> ' + repeat
    );

    for(var i = 0; i < repeat; i++) {
        var period = (i + 1 !== repeat) ? ', ' : '';
        output += text + period;
    }

    res.send(output);
});


// any request
// this will cover any other request that is not defined previously above
app.get('*', function(req, res){
    res.send('asterisk!');
});


/**
    * CLI execution.
    * @function clitest
    * @description Exports function to be used from the CLI ex: $node -e 'require("./app").clitest()'
*/
var myTestString = 'this is a test string';
module.exports.clitest = function(valA) {
    valA = typeof valA !== 'undefined' ? valA : myTestString;

    console.log('myTest here!! -> ' + valA);
};