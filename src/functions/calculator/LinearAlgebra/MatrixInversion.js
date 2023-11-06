import { GaussJordanReplace } from "./gaussJordan";

export const CalMatrixInversion = (Amatrix, Bmatrix, size)=> {
    const MatrixMultiply = (I, b)=> {
        var results = [];
        for (let i = 0; i < size; i++) {
            results[i] = 0;
            for (let j = 0; j < size; j++) {
                results[i] += parseFloat(I[i][j]) * parseFloat(b[j]);
            }
        }
        return results;
    }

    const generateIdentityMatrix = (n) => {
        const newMatrix = [];
        for (let i = 0; i < n; i++) {
            newMatrix[i] = [];
            for (let j = 0; j < n; j++) {
                if (i === j) newMatrix[i][j] = 1;
                else newMatrix[i][j] = 0;
            }
        }
        return newMatrix;
    };

    const arr = JSON.parse(JSON.stringify(Amatrix));
    const Identity = generateIdentityMatrix(size);
    GaussJordanReplace(arr, Identity);

    return MatrixMultiply(Identity, Bmatrix);
}