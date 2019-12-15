// D17_FunctionFactories

function makeGreeting(language) {
    return function(firstName, lastName) {

        if(language === 'en') {
            console.log('Hello ' + firstName + ' ' + lastName);
        }

        if(language === 'es') {
            console.log('Hola ' + firstName + ' ' + lastName);
        }

    }
}

// The value language is set as a closure to use when the functions are called 
var greetEnglish = makeGreeting('en');
var greetSpanish = makeGreeting('es');

greetEnglish('Jonh', 'Doe');
greetSpanish('Jonh', 'Doe');