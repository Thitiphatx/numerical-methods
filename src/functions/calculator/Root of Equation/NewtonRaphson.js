import { evaluate, derivative } from "mathjs";
export const CalNewtonRaph = (FX, xStart)=> {
    let iteration = 0;
    let maxIteration = 100;
    let xOld;
    let x = parseFloat(xStart);
    const newArr = [];
    do {
        iteration++;
        xOld = x;
        x = xOld - evaluate(FX, {x: xOld}) / derivative(FX, 'x').evaluate({x: xOld});
        newArr.push({
            x: xOld,
            y: x
        })
    } while((Math.abs(x-xOld)/x) * 100 >= 0.000001 && iteration < maxIteration);

    return {newArr, x};
}