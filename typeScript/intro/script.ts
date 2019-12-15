// ---------------------
// TypeScript Intro
// ---------------------

console.log(
    '\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n', 
    'TypeScript Intro',
    '\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n'
);

console.log('\n-------------\n', 'basic use', '\n-------------\n');

function Greeter(this: any, greeting: string) {
    this.greeting = greeting;
}

Greeter.prototype.greet = function () {
    return 'hello, ' + this.greeting;
}

let greeter = new Greeter('world');
let button = document.createElement('button');
button.textContent = 'Say Hello!';
button.onclick = function () {
    alert(greeter.greet());
}
document.body.appendChild(button);

console.log(greeter.greet());