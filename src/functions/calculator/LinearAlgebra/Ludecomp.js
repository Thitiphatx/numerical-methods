export const CalLUDecomp = (Amatrix, Bmatrix, size)=> {
    let LMatrix = [];
    let UMatrix = [];
    let YMatrix = new Array(size).fill(0);
    let XMatrix = new Array(size).fill(0);

    for (let i = 0; i < size; i++) {
        LMatrix[i] = new Array(size).fill(0);
        UMatrix[i] = new Array(size).fill(0);
    }

    for (let i = 0; i < size; i++) {
        // finding U
        for (let j = 0; j < size; j++) {
            let sum = 0;
            for (let k = 0; k < size; k++) {
                sum += LMatrix[i][k] * UMatrix[k][j];
            }
            UMatrix[i][j] = Amatrix[i][j] - sum;
        }

        // finding L
        for (let j = 0; j < size; j++) {
            let sum = 0;
            for (let k = 0; k < size; k++) {
                sum += LMatrix[j][k] * UMatrix[k][i];
            }
            LMatrix[j][i] = (Amatrix[j][i] - sum) / UMatrix[i][i];
        }
    }

    // find Y from LY = B
    for (let i = 0; i < size; i++) {
        let sum = 0;
        for (let j = 0; j < size; j++) {
            sum += LMatrix[i][j] * YMatrix[j];
        }
        YMatrix[i] = (Bmatrix[i] - sum) / LMatrix[i][i];
    }

    // find X from UX = Y
    for (let i = size - 1; i >= 0; i--) {
        let sum = 0;
        for (let j = i + 1; j < size; j++) {
            sum += UMatrix[i][j] * XMatrix[j];
        }
        XMatrix[i] = (YMatrix[i] - sum) / UMatrix[i][i];
    }
    return XMatrix;
}