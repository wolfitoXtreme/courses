'use-strict';

// ---------------------
// Movie APP
// ---------------------
// data from: http://omdbapi.com/

// project settigs
var project = require('./package.json'),
    projectName = project.name;

// dependencies
var express =           require('express'),
    request =           require('request'),
    requestPromise =    require('request-promise'),
    bodyParser =        require('body-parser');

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


// request example
// run in console by $node -e 'require("./app").makeRequest()'
module.exports.makeRequest = function() {
    
    // returns google
    // var URL = 'https://www.google.com'; 
    
    // returns unauthorized error
    // var URL = 'https://weather-ydn-yql.media.yahoo.com/forecastrss?w=2502265';
    
    // returns not found error
    // var URL = 'https://weather-ydn-yql.media.yahoo.com/something?w=615702&u=c';

    // returns Yahoo sample data
    // var URL = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%3D"http%3A%2F%2Fdownload.finance.yahoo.com%2Fd%2Fquotes.csv%3Fs%3DYHOO%2CGOOG%2CAAPL%26f%3Dsl1d1t1c1ohgv%26e%3D.csv"%20and%20columns%3D"symbol%2Cprice%2Cdate%2Ctime%2Cchange%2Ccol1%2Chigh%2Clow%2Ccol2"&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';

    // returns Yahoo sample data (forecast) - deprecated
    // var URL = 'https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22maui%2C%20hi%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'; 

    // returns jsonplaceholder sample data (users)
    var URL = 'https://jsonplaceholder.typicode.com/users/1'; 
    
    request(URL, function(error, response, body) {
        console.log('making request...');

        if(error) { // not found
            console.log('There was an error!\n' + error);
        }
        else if (response.statusCode === 200) { // response OK
            var data = JSON.parse(body); // parse output string
            
            console.log('response successful!\nresponse code: ' + response.statusCode + '\n---\n', data, '\n---');

            console.log(
                'The user data is\n',
                'Name => \t' + data.name + '\n',
                'user name => \t' + data.username + '\n',
                'email => \t' + data.username + '\n',
                'city => \t' + data.address.city
            );
        }
        else { // other request errors
            var code = response.statusCode,
                message;

            switch(code) {
                case 401:
                    message = 'Unauthorized';
                    break;
                case 404:
                    message = 'Not found';
                    break;
                default:
                    message = 'default error (not defined message)';
            }
            
            errorOutput(code, message);
        }
    });

    // same as above with ES6 syntax
    requestPromise(URL)
        .then((body) => {
            const data = JSON.parse(body); // parse output string
            console.log(`\n--- ES6 syntax: ${data.name} lives in ${data.address.city}`);
        })
        .catch((err) => {
            console.log('Error!', err);
        });

    function errorOutput(code, message) {
        console.log('Response code was...' + code + ': ' + message);
    } 
};

// 
// Movie API
//

// listen
app.listen(port, ip, function() {
    console.log('<<' + projectName.toUpperCase() + '>> server is started!!');
});


// routes

    // root (search movies form)
    app.get('/', function(req, res){
        // standard send method
        // res.send('root document!');

        res.render('home'); // omit '.ejs' file extension because of app.set('view engine', 'ejs');
    });

    // results
    app.get('/results', function(req, res){
        // standard send method
        // res.send('result page request!!');

        // search sample (API key 'apikey' must be provided 'thewdb')
        // http://omdbapi.com/?s=california&apikey=thewdb
        
        // Static search example
        // var movieTitle = 'anal';
        var movieTitle = req.query.movieToSearch; // req.query is the request search 

        var URL = 'http://omdbapi.com/?s=' + movieTitle + '&apikey=thewdb';
        
        request(URL, function(error, response, body) {
            console.log('making request...');

            if (!error && response.statusCode === 200) { // response OK
                var data = JSON.parse(body); // parse output string
                
                console.log('response successful!\nresponse code: ' + response.statusCode + '\n---\n', data, '\n---');
                console.log('data.search is => ' + typeof data.Search);

                // res.send(data);
                if(typeof data.Search !== 'undefined'){
                    res.render('results', {data: data.Search });
                }
                else {
                    res.render('home');
                }
            }
            else if(error) { // not found
                console.log('There was an error!', error);
                // res.send(error.errno);
                res.render(error.errno);
            }
            else { // other request errors
                var code = response.statusCode,
                    message;

                switch(code) {
                    case 401:
                        message = 'Unauthorized';
                        break;
                    case 404:
                        message = 'Not found';
                        break;
                    default:
                        message = 'default error (not defined message)';
                }
                
                // res.send(message);
                res.render(message);
            }
        });

    });



