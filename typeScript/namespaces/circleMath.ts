// ---------------------
//  circle Math namespace
// ---------------------

// 
// functions
// 
namespace MyMath { // defining namespace
    export namespace Circle { // nested name space   
        const Pi = 3.1416;

        export function calculateCircumference(diameter: number): number {
            return diameter * Pi;
        };
    }
}
