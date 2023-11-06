import { GaussJordanSwap } from "../LinearAlgebra/gaussJordan";

export const CalLeastSquare = (arrayPoints, targetX, m) => {
    const x = arrayPoints.map((e)=> (parseFloat(e.x)));
    const y = arrayPoints.map((e)=> (parseFloat(e.y)));
    const xTarget = parseFloat(targetX);
    const ARRAY_SIZE = parseInt(m)+1;
    const arr = Array.from({ length: ARRAY_SIZE }, () => Array.from({ length: ARRAY_SIZE }, () => 0));
    const answer = [];

    for (let i = 0; i < ARRAY_SIZE; i++) {
        for (let j = 0; j < ARRAY_SIZE; j++) {
            if (i == 0 && j == 0) {
                arr[i][j] = x.length;
            } else {
                arr[i][j] = sum(x, i+j);
            }
        }
    }

    for (let i = 0; i < ARRAY_SIZE; i++) {
        if (i == 0) {
            answer[i] = sum(y, 1);
        } else {
            answer[i] = mulSum(x, y, i);
        }
    }

    function sum(matrix, power) {
        let sum = 0;
        for (let i = 0; i < matrix.length; i++) {
            sum += Math.pow(matrix[i], power);
        }
        return sum;
    }
    function mulSum(matrixA, matrixB, power) {
        let result = 0;
        for (let i = 0; i < matrixA.length; i++) {
            result += Math.pow(matrixA[i], power) * matrixB[i];
        }
        return result;
    }

    let A = GaussJordanSwap(arr, answer);
    let result = A[0];

    for (let i = 1; i < A.length; i++) {
        result += A[i]*Math.pow(xTarget, i);
    }

    return result;
}

export const CalMultipleLeast = ()=> {
    
}