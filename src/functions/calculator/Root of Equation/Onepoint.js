import { evaluate } from "mathjs";
export const CalOnepoint = (FX, xStart)=> {
    let iteration = 0;
    let maxIteration = 100;
    let xOld;
    let fx = FX;
    let x = parseFloat(xStart);

    const newArr = [];
    do {
        iteration++;
        xOld = x;
        x = evaluate(fx, { x });
        newArr.push({
            x: xOld,
            y: x
        })
    } while ((Math.abs(x - xOld) / x) * 100 >= 0.000001 && iteration < maxIteration && x != 0);

    return {newArr, xOld};
}