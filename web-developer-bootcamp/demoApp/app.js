var cats = require('cat-me'),
    faker = require('faker');

// generates random cat
// console.log(cats());

// generates 'dummy data'
var amount = 10,
    products = '';

for(var i=0; i<amount; i++) {
    var product = faker.commerce.productName() + '\t\t\t- price: $' + faker.commerce.price() + '\n';
    products += product;
}

console.log(
    '=================\n' + 
    'WELCOME TO MY SHOP\n' + 
    '=================\n' + 
    products
);