import { evaluate } from "mathjs";
export const CalSecant = (fx, x0, x1)=> {
    let local_x0 = parseFloat(x0);
    let local_x1 = parseFloat(x1);
    let x2, xOld, fx0, fx1;

    const newArr = [];
    do {
        fx0 = evaluate(fx, {x:local_x0});
        fx1 = evaluate(fx, {x:local_x1});
        x2 = local_x0 - ( fx0 * (local_x0 - local_x1 ) ) / ( fx0 - fx1)
        xOld = local_x1;
        newArr.push(
            {
                x0: local_x0,
                x1: local_x1,
                x2: x2,
            }
        )
        local_x0 = local_x1;
        local_x1 = x2;
        

    } while((Math.abs(x2-xOld)/x2) * 100 >= 0.000001);

    return {newArr, x2};
}