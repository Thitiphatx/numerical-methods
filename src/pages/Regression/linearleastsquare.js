let x = [10,15,20,30,40,50,60,70,80];
let y = [5,9,15,18,22,30,35,38,43];
let xTarget = 65;
let matrix = [[0, 0], [0, 0]];
let answer = [0, 0];
matrix[0][0] = x.length;

for (let i = 0; i < x.length; i++) {
    matrix[0][1] += x[i];
    matrix[1][0] += x[i];
    matrix[1][1] += Math.pow(x[i], 2);

    answer[0] += y[i];
    answer[1] += x[i]*y[i];
}

let matrixA0 = replaceCramer(matrix, answer, 0);
let matrixA1 = replaceCramer(matrix, answer, 1);
let A = [det(matrixA0)/det(matrix), det(matrixA1)/det(matrix)];

function det(matrix) {
    return matrix[0][0]*matrix[1][1]-matrix[1][0]*matrix[0][1];
}

function replaceCramer(x, y, row) {
    let arr = JSON.parse(JSON.stringify(x));
    arr[0][row] = y[0];
    arr[1][row] = y[1];

    return arr;
}

let result = A[0]+xTarget*A[1];