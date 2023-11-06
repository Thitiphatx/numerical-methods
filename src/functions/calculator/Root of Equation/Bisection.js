import { evaluate } from "mathjs";
export const CalBisection = (XL, XR, FX)=> {
    const newResultArr = [];
    let Xl = parseFloat(XL);
    let Xr = parseFloat(XR);
    let Xm = (Xl+Xr)/2;
    let fXm = evaluate(FX, {x: Xm});
    let Xm_old = 0;
    let e = 0.000001;

    while(Math.abs(((Xm-Xm_old)/Xm )* 100) >= e) {
        let fXr = evaluate(FX, {x: Xr});
        if (fXr * fXm > 0) {
            Xr = Xm;
        }
        else {
            Xl = Xm;
        }
        Xm_old = Xm;
        Xm = (Xl + Xr)/2;
        fXm = evaluate(FX, {x: Xm});
        newResultArr.push({
            x: Xm.toPrecision(7),
            y: fXm.toPrecision(7),
        })
    }

    return {newResultArr, Xm};
}