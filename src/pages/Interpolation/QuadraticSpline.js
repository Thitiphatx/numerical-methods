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

let arr = [];
let arrSize = x.length*3;

for (let i = 0; i < x.length; i++) {
    let output = `x${i + 1}: `;
    for (let j = 0; j < 3; j++) {
      output += `[${i * 3 + j}][${i * 3 + j}] `;
    }
    console.log(output);
  }
// // f0, f1 x1
// for (let i = 0; i < 2; i++) {
//     arr[i] = [];
//     let col = i*3;
//     for (let j = 0; j < 3; j++) {
//         arr[i][col+j] = Math.pow(x[1], 2-j);
//     }
//     for (let j = 0; j < arrSize; j++) {
//         if (j == col || j == col+1 || j == col+2) {
//             continue;
//         }
//         else {
//             arr[i][j] = 0;
//         }
//     }
// }

// // f1, f2 x2
// for (let i = 2; i < 4; i++) {
//     arr[i] = [];
//     let col = (i-1)*3;
//     for (let j = 0; j < 3; j++) {
//         arr[i][col+j] = Math.pow(x[2], 2-j);
//     }
//     for (let j = 0; j < arrSize; j++) {
//         if (j == col || j == col+1 || j == col+2) {
//             continue;
//         }
//         else {
//             arr[i][j] = 0;
//         }
//     }
// }

// // f2, f3 x3
// for (let i = 4; i < 6; i++) {
//     arr[i] = [];
//     let col = (i-2)*3;
//     for (let j = 0; j < 3; j++) {
//         arr[i][col+j] = Math.pow(x[3], 2-j);
//     }
//     for (let j = 0; j < arrSize; j++) {
//         if (j == col || j == col+1 || j == col+2) {
//             continue;
//         }
//         else {
//             arr[i][j] = 0;
//         }
//     }
// }

// let arr = [
//     [16, 4, 1, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 16, 4, 1, 0, 0, 0],
//     [0, 0, 0, 36, 6, 1, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 36, 6, 1],
//     [4, 2, 1, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 64, 8, 1],
//     [-8, -1, 0, 8, 1, 0, 0, 0, 0],
//     [0, 0, 0, -12, -1, 0, 12, 1, 0],
//     [1, 0, 0, 0, 0, 0, 0, 0, 0]
// ];
// let answer = [y[1], y[1], y[2], y[2], y[0], y[3], 0, 0, 0];
// console.log(answer)
// for (let i = 0; i < size; i++) {
//     for (let j = 0; j < size; j++) {
//         if (arr[i][j] == 0) {
//             arr[i][j] = 1e-9;
//         }
//         if (answer[i] == 0) {
//             answer[i] = 1e-9;
//         }
//     }
// }

// gauss
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

// let y_interpolation = answer[start*3+0]*Math.pow(x_target,2) + answer[start*3+1]*x_target + answer[start*3+2];
// console.log(y_interpolation)