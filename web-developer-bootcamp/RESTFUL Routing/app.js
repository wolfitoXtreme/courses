'use-strict';

// ---------------------
// RESTful APP
// ---------------------

// project settigs
var project =           require('./package.json'),
    projectName =       project.name;

// dependencies
var express =           require('express'),             // web development Framework
    bodyParser =        require('body-parser'),         // parses POST req.body into a JScript object
    mongoose =          require('mongoose'),            // handles interacion with Mongo DB
    methodOverride =    require('method-override'),     // overrides POST request to be PUT or DELETE
    expressSanitizer =  require('express-sanitizer'),   // handless harmful code submitted in forms
    sanitizeHtml =      require('sanitize-html');       // handless unclosed and malformed HTML

// APP/server configuration
var app =               express(),
    port =              3000,
    ip =                '127.0.0.1';

// APP settings
app.use(express.static('public'));  // defines use of static content. ex. style sheets
app.use(bodyParser.urlencoded({
    extended: true
}));                                // defines use of 'body-parser' to parse POST req.body into a JScript object.
app.use(methodOverride('_method')); // defines use of 'method-override' to override POST requests.
app.use(expressSanitizer());        // most be always after 'bodyParser'
app.set('view engine', 'ejs');      // set 'ejs' as expected view rendering templates file type


// 
// Database
//

// Database connection/data base creation (27017 default port used to connect to a DB)
mongoose.connect('mongodb://localhost:27017/restfull_blog_app', { useNewUrlParser: true }); // connects to 

// Database Schema Setup
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: {
        type: String,
        default: 'Empty description'
    },
    created: {
        type: Date,
        default: Date.now
    } // if empty (when creating) will be filled automatically
});

// Binds Schema data pattern with a model
// this adds methods as create, find, always with Capital letter as a convention
var Blog = mongoose.model('Blog', blogSchema);

// create and save to DB
// run in console by $node -e 'require("./app").createAndSaveBlogPost(title, image, body)'
// ex: $node -e 'require("./app").createAndSaveBlogPost("Test Blog", "https://images.pexels.com/photos/164186/pexels-photo-164186.jpeg", "Hello cruel post!!.")'
module.exports.createAndSaveBlogPost = function(title, image, body) {

    // create blog post
    Blog.create({
        title: title,
        image: image,
        body: body
    }, function(err, blogpost){
        if(err){
            console.log('something went wrong!!');
        }
        else {
            console.log('blogpost saved to database, blogpost is => ', blogpost);
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

    // root
    app.get('/', function(req, res){
        // standard send method
        // res.send('root document!');

        // redirect back to INDEX listing page
        res.redirect('/blogs');    
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

    // INDEX ROUTE (listing page)
    app.get('/blogs', function(req, res){
        // standard send method
        // res.send('root document!');

        // get all Blogs from DB
        Blog.find({}, function(err, allBlogs){
            if(err){
                console.log('something went wrong!!');
            }
            else {
                console.log('Blogs retrieved from database, Blogs are => \n', allBlogs);
                
                // fix unclosed tags being sent
                allBlogs.forEach(function(blog){
                    blog.body = sanitizeHtml(blog.body.substring(0, 50));
                    console.log('sanitizeHtml\n', blog.body);
                });

                res.render('index', {blogs: allBlogs}); // omit '.ejs' file extension because of app.set('view engine', 'ejs');
            }
        });

    });

    // NEW ROUTE (Creation form page)
    app.get('/blogs/new', function(req, res){
        res.render('new');
    });

    // CREATE ROUTE (actual data insertion)
    app.post('/blogs', function(req, res){
        console.log('req.body => ', req.body, 'req.body.blog => ', req.body.blog); // renders req.body through 'body-parser' module
        
        // sanitizes POST request data
        req.body.blog.body = req.sanitize(req.body.blog.body);

        // get data from submitted form
        var submittedPost = req.body.blog;

        // creates a New blog post and save it to DB
        Blog.create(submittedPost, function(err, newBlog){
            if(err){
                console.log('something went wrong!!');
                res.render('new');
            }
            else {
                console.log('blog post saved to database, blog is => ', newBlog);
                // redirect back to blogs page
                res.redirect('/blogs');
            }
        });
    });
    
    // SHOW ROUTE
    app.get('/blogs/:id', function(req, res){
        
        var postID =        req.params.id;

        // find the blog post with the corresponding ID
        Blog.findById(postID, function(err, foundBlog){
            if(err){
                console.log('something went wrong!!');

                // redirect back to blogs page
                res.redirect('/blogs');
            }
            else {
                console.log('Blog post found in database, blog post is => ', foundBlog);

                res.render('show', {blog: foundBlog});
            }
        });
    });

    // EDIT ROUTE (Editing form page)
    app.get('/blogs/:id/edit', function(req, res){

        var postID =        req.params.id;

        // find the blog post with the corresponding ID
        Blog.findById(postID, function(err, foundBlog){
            if(err){
                console.log('something went wrong!!');

                // redirect back to blogs page
                res.redirect('/blogs');
            }
            else {
                console.log('Blog post found in database, blog post is => ', foundBlog);

                res.render('edit', {blog: foundBlog});
            }
        });
    });

    // UPDATE ROUTE  (actual data modification)
    app.put('/blogs/:id', function(req, res){
        
        // sanitizes PUT request data
        req.body.blog.body = req.sanitize(req.body.blog.body);

        // get data from submitted form
        var postID =        req.params.id,
            submittedPost = req.body.blog;

        // find and update the blog post with the corresponding ID
        Blog.findByIdAndUpdate(postID, submittedPost,  function(err, updatedBlog){
            if(err){
                console.log('something went wrong!!');

                // redirect back to blogs page
                res.redirect('/blogs');
            }
            else {
                console.log('Blog post found in database, blog post is => ', updatedBlog);
                
                // redirects to the updated post
                res.redirect('/blogs/' + postID);
            }
        });
    });

    // DESTROY ROUTE
    app.delete('/blogs/:id', function(req, res){
        
        var postID =    req.params.id;

        // find and remove the blog post with the corresponding ID
        Blog.findOneAndDelete(postID,  function(err, deletedBlog){
            if(err){
                res.redirect('/blogs');
            }
            else {
                console.log('deleted blog successfully', deletedBlog.title);
                
                res.redirect('/blogs');
            }
        });

    });