export const CalLagrange = (arrayPoints, targetX)=> {
    const x = arrayPoints.map((e)=> (parseFloat(e.x)));
    const y = arrayPoints.map((e)=> (parseFloat(e.y)));
    let resultX = 0;
    let X = parseFloat(targetX);

    for (let i = 0; i < x.length; i++) {
        let L = 1;
        for (let j = 0; j < x.length; j++) {
            if (i === j) continue;
            L *= (x[j] - X) / (x[j] - x[i]);
        }
        resultX += y[i]*L;
    }
    console.log(resultX);
    return resultX;
}