let x = [2, 4, 6, 8, 10];
let y = [9.5, 8, 10.5, 39.5, 72.5];

let arr = [
    [64, 16, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 64, 16, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 216, 36, 6, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 216, 36, 6, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 512, 64, 8, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 512, 64, 8, 1],
    [8, 4, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1000, 100, 10, 1],
    [-48, -8, -1, 0, 48, 8, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, -108, -12, -1, 0, 108, 12, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, -192, -16, -1, 0, 192, 16, 1, 0],
    [-24, -2, 0, 0, 24, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, -36, -2, 0, 0, 36, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, -48, -2, 0, 0, 48, 2, 0, 0],
    [12, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 2, 0, 0],
]
var x_target = 4.5;
let start;
let size = 16;

for (let i = 1; i < size; i++) {
    if(x_target > x[i-1] && x_target < x[i]) {
        start = i-1;
        break;
    }
}

let answer = [8, 8, 10.5, 10.5, 39.5, 39.5, 9.5, 72.5, 0, 0, 0, 0, 0, 0, 0, 0];

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

function swapRows(matrix, row1, row2) {
    const temp = matrix[row1];
    matrix[row1] = matrix[row2];
    matrix[row2] = temp;
}

let y_interpolation = answer[start*4+0]*Math.pow(x_target,3) + answer[start*4+1]*Math.pow(x_target, 2) + answer[start*4+2]*x_target + answer[start*4+3];
console.log(y_interpolation)