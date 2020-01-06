console.log(
    '=========================================',
    '\n  Maps And Sets',
    '\n========================================='
);

console.log(
    '-----------------------------------------',
    '\n  Creation & Adding Items',
    '\n-----------------------------------------'
);

let cardAce = {
    name: 'Ace of Spades'
};

let cardKing = {
    name: ' King of Hearts'
};

// let deck = new Map();
// deck.set('as', cardAce);    // Adds a key, and an Object
// deck.set('king', cardKing); // Adds a key, and an Object
let deck = new Map([['as', cardAce], ['king', cardKing]]); // same as above

console.log(deck);          // -> Map {_c: Map(2)}
console.log(deck.size);     // -> 2 

deck.set('as', cardAce);    // Does not add a new key, overrides the existing one
console.log(deck.size);     // -> 2

// getting a Map key
console.log(deck.get('as')); // -> {name: "Ace of Spades"}

// deleting a Map key
deck.delete('as');
console.log(deck.get('as')); // -> 'undefined'

// deleting all keys within a Map
deck.clear();
console.log(deck.size);     // -> 0


console.log(
    '-----------------------------------------',
    '\n  Looping through Maps',
    '\n-----------------------------------------'
);

// adding keys altogether
deck.set('as', cardAce).set('king', cardKing); // setting map chaining 'set' Method
console.log(deck);          // -> Map {_c: Map(2)}
console.log(deck.size);     // -> 2
console.log(deck.keys());   // -> MapIterator {"as", "king"}

// looping through keys
for(let key of deck.keys()) {
    console.log(key);       // -> as, king
}

// looping through values
for(let value of deck.values()) {
    console.log(value);     // -> {name: "Ace of Spades"}, {name: " King of Hearts"}
}

// looping for whole entries
for(let entry of deck.entries()) {
    console.log(entry);     // -> ["as", {…}], ["king", {…}], gets an array per entry, key/value (object) 
}

for(let entry of deck) {
    console.log(entry);     // -> ["as", {…}], ["king", {…}], works tha same as above
}

console.log(
    '-----------------------------------------',
    '\n  The WeakMap object',
    '\n-----------------------------------------'
);

let key1 = {'keyName': 'one'};
let key2 = {'keyName': 'two'};

let deckWeak = new WeakMap();
deckWeak.set(key1, cardAce);
deckWeak.set(key2, cardKing);

console.log(deckWeak.get(key1));    // -> {name: "Ace of Spades"}
console.log(deckWeak);              // -> WeakMap {_c: WeakMap}

try {
    for(let value of deckWeak) {
        console.log(value); 
    }
    
} catch(err) {
    console.log(err); // -> throws error as WeakMaps are not iterable
}


console.log(
    '-----------------------------------------',
    '\n  Sets - Creation and Adding Items',
    '\n-----------------------------------------'
);

let set = new Set([1, 1, 1]);
for(let element of set) {
    console.log('listing...', element); // -> 1, since values must be unique
}

set.add(1); // won't add anything since values are unique
for(let element of set) {
    console.log('listing again...', element); // -> 1, since values must be unique
}

set.add(2); // will work as 2 is not yet inside the 'set'
for(let element of set) {
    console.log('listing yet again...', element); // -> 1, since values must be unique
}

// deleting 'key'
set.delete(1); 
for(let element of set) {
    console.log('listing after deletion...', element); // -> 1, since values must be unique
}

// deleting the whole set
set.clear();
for(let element of set) {
    console.log(element);   // -> won't loop since 'loop' is already empty
}

set.add(1).add(2).add(3);   // adding chaining 'add' method
console.log(set.has(3));    // -> true, 3 exists within the 'set'


console.log(
    '-----------------------------------------',
    '\n  Looping through sets',
    '\n-----------------------------------------'
);

for(let element of set.entries()) {
    console.log(element);   // -> [1, 1], [2, 2], [3, 3], keys are values, since sets only accept keys
}

for(let element of set.values()) {
    console.log(element);   // -> 1, 2, 3
}


console.log(
    '-----------------------------------------',
    '\n  The WeakMSet object',
    '\n-----------------------------------------'
);

let obj1 = {a:1};
let obj2 = {a:2};
let obj3 = {a:3};
let weakSet = new WeakSet([obj1, obj2]);

weakSet.add(obj3);
weakSet.add(obj1); // -> won't add anything since already exist within the WeakSet 

console.log(weakSet.has(obj1)); // -> true
console.log(weakSet.has(obj3)); // -> true

try {
    for(let element of weakSet) {
        console.log(element);
    }
} catch(err) {
    console.log(err); // -> throws error as WeakSets are not iterable
}