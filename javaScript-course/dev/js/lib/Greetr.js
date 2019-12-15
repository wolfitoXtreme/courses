'use strict';

// self invoked function
// ;(function(global, $) {
// semicolon just before the IIFE will grant code execution if case
// other code included within the page has it missing 
(function(global, $) {

    // creates a 'new' object when this function is called
    var Greetr = function(firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language);
    }

    // lexical environment variables to be used by Greetr.init created instances
    // hidden within the scope of the IIFE (Immediately Invoked Function), and not accessible outside it. 
    var supportedLangs = ['en', 'es'];

    // informal greetings
    var greetings = {
        en: 'Hello',
        es: 'Hola'
    };

    // formal greetings
    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };

    // logger messages
    var logMessages = {
        en: 'Logged in',
        es: 'Inicio sesión'
    }

    // Methods added to Greetr function
    // will save memory space since every created instance 
    // will point this prototype
    Greetr.prototype = {
        fullName: function() {
            return this.firstName + ' ' + this.lastName;
        },

        validate: function() {
            if(supportedLangs.indexOf(this.language) === -1) {
                throw 'Invalid language!'; // Throwing JS Error
            }
        },

        greeting: function() {
            return greetings[this.language] + ' ' + this.firstName + '!';
        },

        formalGreeting: function() {
            return formalGreetings[this.language] + ', ' + this.fullName() + '!';
        },

        greet: function(formal) {
            var msg;

            // if undefined or null it will coerce to 'false'
            if(formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }

            if(console) {
                console.log(msg);
            }

            // returning 'this' will always refer to the calling object at execution time
            // thus making the methods chainable
            return this;
        },

        log: function() {
            if(console) {
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }

            // make method chainable
            return this;
        },

        setLang: function(lang) {
            this.language = lang; // update object language
            this.validate();

            // make method chainable
            return this;
        },

        // JQuery integration
        HTMLGreeting: function(selector, formal) {
            console.log('HTMLGreeting!!');
            if(!$) {
                throw 'JQuery not available!';
            }

            if(!selector) {
                throw 'Missing jQuery selector!';
            }

            var msg;

            // if undefined or null it will coerce to 'false'
            if(formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }

            // set selector message
            $(selector).html(msg);

            // make method chainable
            return this;
        }

    };

    // actual Greetr object is created here 
    // allowing its creation without using the 'new' keyword
    Greetr.init = function(firstName, lastName, language) {
        var self = this;
        // setting default values
        self.firstName = firstName || 'John';
        self.lastName =  lastName || 'Doe';
        self.language =  language || 'en';

        self.validate(); // validate the language on initialization
    }

    // Any objects created by Greetr.init will point to Greetr.prototype Methods
    Greetr.init.prototype = Greetr.prototype;

    // Expose code globally (window in this case)
    global.Greetr      =  global.G$  = Greetr;
    // - Global name - |  - Alias - | Function to be called

}(window, jQuery)); // pass window and jQuery($)