export function GaussJordanSwap(arr, answer) {
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

export function GaussJordanReplace(arr, answer) {
    let size = arr.length;

    for (let i = 0; i < size; i++) {
        if (arr[i][i] == 0) {
            arr[i][i] = 1e-9;
        }
        let fixed = arr[i][i];
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
    return answer;
}

