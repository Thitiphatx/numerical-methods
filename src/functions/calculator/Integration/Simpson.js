import { evaluate } from "mathjs";

export const CalSimpson = (FX, start, end, n)=> {
    let a = parseFloat(start);
    let b = parseFloat(end);
    let h;
    let x = a;

    const arrayF = [];
    h = (b-a)/n*2;
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
            if (j % 2 == 0) {
                I += 2*arrayF[j]; 
            }
            else {
                I += 4*arrayF[j]; 
            }
        }
    }
    I *= h/3;
    function f(x) {
        return evaluate(FX, {x});
    }
    return I;
}