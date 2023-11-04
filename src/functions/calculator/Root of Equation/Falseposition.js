import { evaluate } from "mathjs";
export const CalFalseposition = (FX, XL, XR)=> {
    let iteration = 0;
    let maxIteration = 100;
    let xl = parseFloat(XL) || 0.000001;
    let xr = parseFloat(XR) || 0.000001;
    let fx = FX;
    if (fx == "") return;

    let fxl = evaluate(fx, {x: xl})
    let fxr = evaluate(fx, {x: xr})
    let x1 = (xl*fxr - xr*fxl)/(fxr-fxl);
    let x1_old = 0;

    const newArr = [];
    
    while(Math.abs(x1-x1_old)/x1 * 100 >= 0.000001) {
        if (iteration > maxIteration) break;
        iteration++;
        let fx1 = evaluate(fx, {x: x1})
        newArr.push({
            x: x1,
            y: fx1
        })
        if (fx1 * fxr > 0) {
            xr = x1;
            fxr = fx1;
        }
        else {
            xl = x1;
            fxl = fx1;
        }
        x1_old = x1;
        x1 = (xl*fxr - xr*fxl)/(fxr-fxl);
    }

    return {newArr, x1};
}