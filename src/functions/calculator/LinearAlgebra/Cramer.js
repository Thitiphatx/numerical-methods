export function determinant(matrix, size) {
    let row = 0;
    let col = 0;
    let top = 0;
    let down = 0;
    for (let i = 0; i < size; i++) {
        col = i;
        let temp_multiply = 1;
        while (true) {
            temp_multiply *= matrix[row][col];
            row++;
            col++;
            if (row >= size) {
                row = 0;
                break;
            }
            if (col >= size) {
                col = 0;
            }
        }
        top += temp_multiply;
    }

    row = size - 1;
    col = 0;

    for (let i = size - 1; i >= 0; i--) {
        col = Math.abs(i - (size - 1));
        let temp_multiply = 1;
        while (true) {
            temp_multiply *= matrix[row][col];
            row--;
            col++;
            if (row < 0) {
                row = size - 1;
                break;
            }
            if (col >= size) {
                col = 0;
            }
        }
        down += temp_multiply;
    }
    return top - down;
}

export function CalCramer(matrix, b, size) {
    let mainMatrix = JSON.parse(JSON.stringify(matrix));
    let answer = [...b];
    let cramerResult = [];
    for (let col = 0; col < size; col++) {
        // re clone matrix
        let arr = JSON.parse(JSON.stringify(matrix));

        // replace a[i] with b
        for (let row = 0; row < size; row++) {
            arr[row][col] = answer[row];
        }
        let det = determinant(mainMatrix, size);
        let detI = determinant(arr, size);
        cramerResult.push(detI / det);
    }
    return cramerResult;
}
