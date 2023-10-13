let x = [10,15,20,30,40,50,60,70,80];
let y = [5,9,15,18,22,30,35,38,43];

let m = 2;
let xTarget = 65;

let arr = generateMatrix(0, m+1);
let answer = [];
for (let i = 0; i < m+1; i++) {
    for (let j = 0; j < m+1; j++) {
        if (i == 0 && j == 0) {
            arr[i][j] = x.length;
        }
        else {
            arr[i][j] = sum(x, i+j);
        }
        
    }
}

for (let i = 0; i < m+1; i++) {
    if (i == 0) {
        answer[i] = sum(y, 1);
    }
    else {
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
        result += Math.pow(matrixA[i], power)*matrixB[i];
    }
    return result;
}

function generateMatrix(num, size) {
    let matrix = [];
    for (let i = 0; i < size; i++) {
        matrix[i] = [];
        for (let j = 0; j < size; j++) {
            matrix[i][j] = num;
        }
    }
    return matrix;
}

function GaussJordan(arr, answer) {
    let size = arr.length;

    for (let i = 0; i < size; i++) {
        let fixed = arr[i][i];

        if (fixed === 0) {
            let swapped = false;
            for (let j = i + 1; j < size; j++) {
                if (arr[j][i] !== 0) {
                    swapRows(arr, i, j);
                    swapRows(answer, i, j);
                    swapped = true;
                    break;
                }
            }
            if (!swapped) {
                return null;
            }
            fixed = arr[i][i];
        }

        for (let j = i; j < size; j++) {
            arr[i][j] /= fixed;
        }
        answer[i] /= fixed;

        for (let j = 0; j < size; j++) {
            if (i === j) continue;
            let factor = arr[j][i];
            for (let k = i; k < size; k++) {
                arr[j][k] -= factor * arr[i][k];
            }
            answer[j] -= factor * answer[i];
        }
    }

    function swapRows(arr, row1, row2) {
        const temp = arr[row1];
        arr[row1] = arr[row2];
        arr[row2] = temp;
    }
    return answer;
}

function f(x) {
    let A = GaussJordan(arr, answer);
    let result = A[0];
    
    for (let i = 1; i < A.length; i++) {
        result += A[i]*Math.pow(x, i);
    }
    return result;
}

console.log(f(65));


