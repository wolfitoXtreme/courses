// D9_FunctionOverloading

function greet(firstName, lastName, lang) {
    lang = lang || 'en-US';

    if(lang === 'en-US') {
        console.log('Hello ' + firstName + ' ' +  lastName);
    }

    if(lang === 'es-ES') {
        console.log('Hola ' + firstName + ' ' +  lastName);
    }
}

function greetEnglish(firstName, lastName) {
    greet(firstName, lastName, 'en-US');
}

function greetSpanish(firstName, lastName) {
    greet(firstName, lastName, 'es-ES');
}

greetEnglish('John', 'Doe');
greetSpanish('John', 'Doe');