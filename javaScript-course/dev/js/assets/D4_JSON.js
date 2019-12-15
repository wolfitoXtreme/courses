// D4_JSON
var objectLiteral = {
    firstName: 'Jane',
    isAProgrammer: true
}

console.log(objectLiteral);

// converts object into JSON FORMAT
console.log(JSON.stringify(objectLiteral));

// converts JSON FORMAT into JS Object format
var jsonValue = JSON.parse('{"firstName" : "Jane", "isAProgrammer" : "false"}');

console.log(jsonValue);