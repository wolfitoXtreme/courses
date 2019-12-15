// D7_ObjectFunctionsAndThis
console.log(this); // output window object (Global object)

function a() {
    console.log(this);
    this.newVariable = 'hello';
}

var b = function() {
    console.log(this);
}

a(); // output window object (Global object), again since point to the Global Object
b(); // output window object (Global object), again since point to the Global Object

console.log(newVariable);

// object literal, Object literal syntax defines object Properties and Methods at once using "{}"
var c = {
    name: 'The C Object',
    log: function() {
        console.log(this);
        this.name = 'updated C 0bject';
        console.log(this);

        // In this case 'this' points again to the Global Object!
        var setName = function(newName) {
            this.name = newName;
        }
        setName('Updated Again! The C Object');
        console.log(this);

        // to avoid confusion with 'this' better assign it to a variable
        var self = this; // this way 

        self.name = 'self! updated C 0bject';
        console.log(self);

        var setSelfName = function(newName) {
            self.name = newName;
        }
        setSelfName('self! Updated Again! The C Object');
        console.log(self);

    }
}

// invoking the method from c
c.log();