// let b = 8;
// let a = 2;

// let I = ((b-a)/2)*(f(a)+f(b));

// function f(x) {
//     return 4*Math.pow(x,5)-3*Math.pow(x,4)+Math.pow(x,3)-6*x+2;
// }


let n = [2, 4, 6];
let a = 2;
let b = 8;
let h;
let x = a;

for (let i = 0; i < n.length; i++) {
    const arrayF = [];
    h = (b-a)/n[i];
    x = a;
    while(x <= b) {
        arrayF.push(f(x));
        x += h;
    }
    let I = 0;
    for (let j = 0; j < arrayF.length; j++) {
        if (j == 0 || j == arrayF.length-1) {
            I += arrayF[j];
        }
        else {
            I += 2*arrayF[j]; 
        }
    }
    I *= h/2;
    console.log(I);
}

function f(x) {
    return 4*Math.pow(x,5)-3*Math.pow(x,4)+Math.pow(x,3)-6*x+2;
}

// 211158
// 170031.9375
// 162222