// 'use strict';

console.log(
    '======================================================================',
    '\n  Closures',
    '\n======================================================================'
);

console.log(
    '----------------------------------------------------------------------',
    '\n  Basics',
    '\n----------------------------------------------------------------------'
);

// basic closure example
function foo() {
    var bar = 'bar';

    function baz() {
        console.log(bar); // finds bar in the enclosing scope of foo()
    }

    bam(baz); // fids bam() in the enclosing scope (window), passing baz() as a parameter
}

function bam(baz) {
    // executing baz(), which access its lexical scope in foo()
    baz();  // -> bar
}

foo();


// another example. returning functions
function fooB() {
    var barB = 'barB';

    // returning anonymous function
    return function() {
        console.log(barB);
    };
}

function bamB() {
    fooB()(); // ()() executes with return, finds fooB() in the enclosing scope (window)
}

bamB(); // -> barB

// ...Nikolay's Example
var counter = function() {
    var count = 0;
    
    function increment() {
        return ++count;
    }

    function decrement() {
        return --count;
    }

    // returning an object
    return {
        inc : increment,
        dec: decrement
    };
}

var c = counter();

console.log('count inc', c.inc());                  // -> count 1
console.log('count inc', c.inc());                  // -> count 2
console.log('count inc', c.inc());                  // -> count 3
console.log('count dec', c.inc());                  // -> count 2

// yet another
function fooC() {
    var barC = 'barC';

    /* 
    setTimeout is actually executing outside its lexical scope
    still it remembers where it was pointing to because of closure
    */ 
    setTimeout(function() {
        console.log('fooC() timeOut 100ms = ' + barC);
    }, 10)
}

fooC(); // -> barC

// yet another
let buttonA = document.querySelector('.js-button-01');

function fooD() {
    var barD = 'barD';

    buttonA.addEventListener('click', function(event){
        console.log(event.type, barD); // -> click barD
    });
}

fooD();

// ...with shared scope
function fooE() {
    var barE = 0;

    setTimeout(function(){
        var bazE = 1;
        console.log('fooE() timeOut 20ms = ' +  barE++);

        setTimeout(function(){
            console.log('fooE() timeOut 30ms = ' + (barE + bazE));
        }, 30);

    }, 20);

}

fooE(); // -> 0, 2

// ...with loops
for(var i=1; i<=5; i++) {
    setTimeout(function(){
        console.log('i: ' + i);
    }, i * 100);
} // -> i:6, six times, i is 6 already at the time the timeOuts is executed


for(var j=1; j<=5; j++) {
    (function(j) {
        setTimeout(function(){
            console.log('j: ' + j);
        }, j * 1000);
    })(j); // passing j as a parameter
} // -> j: 1, j: 2..., the IIFE creates its own scope, those its own values for 'j'

// let i, binds i for every i iteration
for(let i=1; i<5; i++) {
    setTimeout(function(){
        console.log('let i: ' + i);
    }, i *  1000);
}

// ...this is not closure, rather is object reference
var fooF = (function() {
    var o = {barF: 'barF'};
    
    return {obj : o};
})();

console.log('fooF.obj.barF = ' + fooF.obj.barF); // fooF.obj.bar = bar


console.log(
    '----------------------------------------------------------------------',
    '\n  The classic module pattern',
    '\n----------------------------------------------------------------------'
);


// simple module patter
/*
module pattern should have
- An outer enclosing function
- Return at least one inner function
*/
var fooG = (function(){
    var myObj = {myObjKey: 'myObjval'};

    return {
        barG: function() {
            console.log('myObj.myObjKey = ' + myObj.myObjKey);
        }
    };
})();


fooG.barG(); // -> 'foo.barG = ' + fooG.barG()


var fooH = (function(){
    var myVar = 'myVar value';

    var publicAPI = {
        bar: function() {
            publicAPI.baz();
        },
        baz: function() {
            console.log(myVar);
        }
    }

    return publicAPI;
})();

fooH.bar(); // -> myVar value

// 
// Exercise
// 
console.log('\n-------------\n', 'Exercise 01', '\n-------------\n');

var notesData = [
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit.  ',
    'Eveniet quisquam cupiditate illum reprehenderit dolorem dolor.',
    'Tenetur corporis sint velit aut quibusdam, tempore excepturi eum!.'
];

var notesOutput = document.querySelector('.js-notes-array');


// notesData Proxy
var notesHandler = {    
    // set trap
    set: function(target, property, value) {
        console.log('set: notes', property);
        

        notesOutput.textContent = notesData;

        return Reflect.set(target, property, value);
    }
}

var notesDataProxy = new Proxy(
    notesData,
    notesHandler
);



// notesDataProxy.push('test');
// notesDataProxy.push('testB');
// notesDataProxy.pop();


console.log('notesData = ', notesData);

// notesProxy.pop();

// var notesDataProxy = new Proxy(notesData, {
//     apply: function(target, thisArg, argumentsList) {
//       return thisArg[target].apply(this, argumentList);
//     },
//     deleteProperty: function(target, property) {
//       console.log("Deleted %s", property);
//       return true;
//     },
//     set: function(target, property, value, receiver) {      
//       target[property] = value;
//       console.log("Set %s to %o", property, value);
//       return true;
//     }
// });



function addNote(note, notes) {
    var noteItem = document.createElement('li'),
        noteAnchor = document.createElement('a'),
        btnRemoveNote = document.createElement('a');

    var noteAnchorAttrs = {
        'href': '#',
        'class': 'notes-anchor'
    };

    var btnRemoveNoteAttrs = {
        'href': '#',
        'class': 'notes-remove-btn'
    };

    var buildNote = function() {
        
        // adding note anchor attributes
        (function() {
            for(var key in noteAnchorAttrs) {
                console.log(key, noteAnchorAttrs[key]);
                noteAnchor.setAttribute(key, noteAnchorAttrs[key]);
            }

            // anchor click
            noteAnchor.addEventListener('click', event => {
                event.stopPropagation();
                event.preventDefault();

                console.log('anchor clicked', event.type, noteAnchor.text);
            });

        })();

        // adding remove button attributes
        (function() {
            for(var key in btnRemoveNoteAttrs) {
                console.log(key, btnRemoveNoteAttrs[key]);
                btnRemoveNote.setAttribute(key, btnRemoveNoteAttrs[key]);
            }

            // btn remove click
            btnRemoveNote.addEventListener('click', event => {
                event.stopPropagation();
                event.preventDefault();

                removeNote(btnRemoveNote);
            });

        })();

        // noteItem
        noteItem.setAttribute('class', 'notes-item');

        // adding anchor
        noteAnchor.textContent = note;
        noteItem.appendChild(noteAnchor);

        // adding remove button
        btnRemoveNote.textContent = 'x';
        noteItem.appendChild(btnRemoveNote);

        // notesDataProxy.push(note);
    }

    buildNote();
    notes.appendChild(noteItem);

    notesOutput.textContent = notesData;

    // notes.innerHTML += '<li></li>";
}

function currentNote(newNoteField, notes) {
    
    var note = newNoteField.value;
    
    if(note) {
        console.log('note', note);
        notesData.push(note);
        addNote(note, notes);
        
        newNoteField.value = '';
    }
}

function removeNote(item) {
    var delNote = item.parentNode,
        allNotes = delNote.parentNode.children,
        // getting the note index 
        // var index = Array.prototype.indexOf.call(item.parentNode.parentNode.children, item.parentNode); // ES5 way
        index = Array.from(allNotes).indexOf(delNote);

    console.log('removing note...', delNote, index);
}

// function handleOpenHelp(e) {
//     if(!$('#help').is(':visible')) {
//         e.preventDefault();
//         e.stopPropagation();

//         showHelp();
//     }
// }

function handleAddNote(e) {
    currentNote();
}

function handleEnter(e) {
    if(e === 13) {
        currentNote();
    }
}

function handleDocumentClick(e) {
    // $('.js-notes').removeClass('active');
    // $('.js-notes').children('.note').removeClass('highlighted');
}

function handleNoteClick(e) {
    e.preventDefault();
    e.stopPropagation();

    // $('.js-notes').addClass('active');
    // $('.js-notes').children('.note').removeClass('highlighted');
}

function init() {
    var html = '',
        notes = document.querySelector('.js-notes'),
        newNoteField = document.querySelector('.js-current-note'),
        // addNoteBtns = Array.apply(null, document.getElementsByClassName('js-add-note')); // ES5 way
        addNoteBtns = [...document.getElementsByClassName('js-add-note')]; // ES6 way

    console.log('addNoteBtns = ', addNoteBtns, typeof addNoteBtns);
    console.log('newNoteField = ', newNoteField, typeof newNoteField);
    console.log('notes = ', notes, typeof notes);

    // Input Enter key functionality
    newNoteField.addEventListener('keydown', event => {
        if(event.keyCode === 13) {
            currentNote(newNoteField, notes);
        }
    });

    // Adding all existing notes
    (function() {
        for(var i=0; i< notesDataProxy.length; i++) {
            addNote(notesDataProxy[i], notes);
        }
    })();

    // add note button click
    (function() {
        for (var button of addNoteBtns) {
            button.addEventListener('click', () => {
                currentNote(newNoteField, notes);
            });
        }
    })();

    // console.log(button);

    // for(let i in addNoteBtn) {
    //     console.log('TEST');
    // }

 

    // notes.innerHTML += 'testing content...';


    // $('#openHelp').bind('click', handleOpenHelp);
    
    
    // $('#addNote').bind('click', handleAddNote);


    // $('#newNote').bind('keypress', handleEnter);
    // $(document).bind('click', handleDocumentClick);
    // $('.js-notes').on('click', '.note', handleNoteClick);
}

init();


// document.addEventListener("DOMContentLoaded", function() {
//     console.log('Document is ready');

    
//  });





