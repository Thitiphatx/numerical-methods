let x = [2, 4, 6, 8, 10];
let y = [9.5, 8, 10.5, 39.5, 72.5];

var x_target = 4.5;
let start;
let size = 9;

for (let i = 1; i < size; i++) {
    if(x_target > x[i-1] && x_target < x[i]) {
        start = i-1;
        break;
    }
}

let arr = [
    [x[1]*x[1], x[1], 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, x[1]*x[1], x[1], 1, 0, 0, 0],
    [0, 0, 0, x[2]*x[2], x[2], 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, x[2]*x[2], x[2], 1,],
    [x[0]*x[0], x[0], 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, x[3]*x[3], x[3], 1,],
    [-2*x[1], -1, 0, 2*x[1], 1, 0, 0, 0, 0],
    [0, 0, 0, -2*x[2], -1, 0, 2*x[2], 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0]
];
let answer = [y[1], y[1], y[2], y[2], y[0], y[3], 0, 0, 0];

for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
        if (arr[i][j] == 0) {
            arr[i][j] = 1e-9;
        }
        if (answer[i] == 0) {
            answer[i] = 1e-9;
        }
    }
}

for (let i = 0; i < size; i++) {
    let fixed = arr[i][i];

    if (fixed === 0) {
        fixed = 1e-9;
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

let y_interpolation = answer[start*3+0]*Math.pow(x_target,2) + answer[start*3+1]*x_target + answer[start*3+2];
console.log(y_interpolation)