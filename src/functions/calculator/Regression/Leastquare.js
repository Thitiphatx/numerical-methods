import { GaussJordanSwap, GaussJordanReplace } from "../LinearAlgebra/gaussJordan";

export const CalLeastSquare = (arrayPoints, xTarget, m) => {
    const x = arrayPoints.map((e)=> (parseFloat(e.x)));
    const y = arrayPoints.map((e)=> (parseFloat(e.y)));
    xTarget = parseFloat(xTarget);
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

export const CalMultipleLeast = (arrayX, arrayY, xTarget)=> {
    let x = arrayX.map((set)=> set.map((data)=> parseFloat(data)));
    let y = arrayY.map((data)=> parseFloat(data));
    let m = x.length;
    xTarget = parseFloat(xTarget);
    const arr = Array.from({ length: m+1 }, () => Array(m+1).fill(0));
    let answer = []
    arr[0][0] = arrayX[0].length;

    for (let i = 1; i < m+1; i++) {
        let sumX = 0;
        for (let j = 0; j < y.length; j++) {
            sumX += x[i - 1][j];
        }
        arr[0][i] = sumX;
    }


    for (let i = 1; i < m+1; i++) {
        for (let j = 0; j < m+1; j++) {
            let sumX = 0;
            for (let k = 0; k < y.length; k++) {
                if (j === 0) {
                    sumX += x[i-1][k];
                } else {
                    sumX += x[j - 1][k] * x[i - 1][k];
                }
            }
            arr[i][j] = sumX;
        }
    }

    for (let i = 0; i < m+1; i++) {
        let sumXY = 0;
        for (let j = 0; j < y.length; j++) {
            if (i === 0) {
                sumXY += y[j];
            } else {
                sumXY += y[j] * x[i - 1][j];
            }
        }
        answer[i] = sumXY;
    }
    let A = GaussJordanReplace(arr, answer);
    let resultX = A[0];

    for (let i = 1; i < A.length; i++) {
        resultX += A[i]*Math.pow(xTarget,i);
    }
    return resultX;
}