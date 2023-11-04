export const CalGaussSeidel = (matrixA, matrixB, size)=> {
    let A = JSON.parse(JSON.stringify(matrixA));
    let B = [...matrixB];
    let xOld = [];
    let x = new Array(parseInt(size)).fill(0);
    let error = 0.001;
    let passCounter = 0;
    let maxIteration = 100;
    let iteration = 0;

    while(passCounter < size) {
        if (iteration > maxIteration) {
            break;
        }
        iteration++;
        for (let i = 0; i < size; i++) {
            xOld[i] = x[i];
        }

        for (let i = 0; i < size; i++) {
            let sum = B[i];
            for (let j = 0; j < size; j++) {
                if (i == j) continue;
                sum -= A[i][j]*x[j];
            }
            x[i] = sum/A[i][i];
        }
        passCounter = 0;
        for (let i = 0; i < size; i++) {
            if (Math.abs((x[i] - xOld[i]) / x[i]) * 100 < error) {
                passCounter++;
            }
        }
    }

    return x
}