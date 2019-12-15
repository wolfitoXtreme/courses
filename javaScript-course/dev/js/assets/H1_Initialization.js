// H1_Initialization

// arrays are useful to initialize data that will be coming from a data base 
var people = [
    {
        firstName: 'John',
        lastName: 'Doe',
        address: [
            '111 Main St.',
            '222 Second St.'
        ]
    },
    {
        firstName: 'Jane',
        lastName: 'Doe',
        address: [
            '333 Main St.',
            '444 Second St.'
        ],
        greet: function() {
            return 'Hello!';
        }
    }
];

console.log(people);
console.log(people[1].greet());