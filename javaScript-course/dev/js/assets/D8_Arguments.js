// D8_Arguments

// current arguments approach
function greet(firstName, lastName, language) {

    // setting defaults
    firstName =  firstName || 'YOUR NAME';
    lastName =  lastName || 'YOUR LASTNAME';
    language =  language || 'en-US';

    if(arguments.length === 0) {
        console.log('missing parameters!');
        console.log('----------\n');
        return; // exits function
    }

    console.log(firstName);
    console.log(lastName);
    console.log(language);
    console.log(arguments); // outputs function parameters passed to the function
    console.log('arg 2:' + arguments[2]);
    console.log('----------\n');
}

greet(); // output undefined as variables are hoisted by JS
greet('John');
greet('John', 'Doe');
greet('John', 'Doe', 'en-GB');


// spread approach
function greetB(firstName, lastName, language, ...other) {
    console.log(arguments); // outputs function parameters passed to the function
}
greetB('John', 'Doe', 'en-GB', '111 main St.', 'New York', 'NY');