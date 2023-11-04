import { evaluate } from "mathjs";

export const CalGraphical = (FX, xStart)=> {
    let y1, y2, x, error;
    x = parseFloat(xStart);
    y1 = evaluate(FX, {x: x});
    y2 = 0;
    error = 0.000001;
    const newArr = [];
    let step = 1;
    while(Math.abs(y1) > error && y1 != 0) {
        x += step;
        y2 = evaluate(FX, {x: x});
        if (y1 * y2 > 0) {
            y1 = y2;
            newArr.push({
                x: x,
                y: y1,
            })
        }
        else {
            x -= step;
            step /= 10;
        }
    }

    return {newArr, x};
}