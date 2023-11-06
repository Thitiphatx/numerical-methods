import { evaluate } from "mathjs";

export const CalTrapzoidal = (FX, start, end, n)=> {
    let a = parseFloat(start);
    let b = parseFloat(end);
    let h;
    let x0 = a;
    const arrayF = [];
    h = (b-a)/n;
    let iteration = 0;
    let x = x0+iteration*h;
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
    
    function f(x) {
        return evaluate(FX, {x});
    }

    return I
}