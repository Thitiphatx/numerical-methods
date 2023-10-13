let x = [
    [1,0,2,3,4,2,1],
    [0,1,4,2,1,3,6],
    [1,3,1,2,5,3,4]
];
let y = [4,-5,-6,0,-1,-7,-20];
let m = x.length;

let arr = generateMatrix(0, m+1);
let answer = [];
arr[0][0] = y.length;

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
