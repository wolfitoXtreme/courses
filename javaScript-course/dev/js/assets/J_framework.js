'use strict';

// J2_StructuringSafeCode
// ..

// J3_OurObjectAndPrototype

// G$ is defined as par of 'Greetr.js', explanation there

var g = G$('MyName', 'MySurname');
console.log(g);

var gB = G$('YourName', 'YourSurname');

g.greet().greet(true);
gB.greet().greet(true);

g.greet().setLang('es').greet(true);
// gB.greet().setLang('de').greet(true); --> will throw custom error 'Greetr.validate()'

$(document).ready(function(){
    // check for jQuery loading not needed since is dependency of 'Greetr.js'
    // using 'Greetr.js' to output messages on the chosen selector
    var $trigger = $('.js-login-btn');

    $trigger.on({
        'click': function(event) {
            
            var loginGrtr = G$('HerName', 'HerSurname'),
                $selector = $('.js-login-div'),
                $loginInput = $('.js-input', $selector),
                $output = $('.js-greet-output');

            $selector.hide();

            loginGrtr.setLang($loginInput.val()).HTMLGreeting($output, true).log();
        }
    });
});

