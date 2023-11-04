export const CalGaussElimination = (matrix, b, size)=> {
    let arr = JSON.parse(JSON.stringify(matrix));
    let answer = [...b];
    
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (arr[i][j] == 0) {
                arr[i][j] = 1e-14;
            }
        }
        if (answer[i] == 0) {
            answer[i] = 1e-14;
        }
    }

    for (let i= 0; i < size; i++) {
        for (let j = i+1; j < size; j++) {
            let ratio = arr[j][i]/arr[i][i];
            

            for (let k = 0; k < size; k++) {
                arr[j][k] -= ratio * arr[i][k];
            }
            answer[j] -= ratio * answer[i];
        }
    }

    const newResult = JSON.parse(JSON.stringify(answer));

    for (let i = size-1; i >= 0; i--) {
        for (let j = i+1; j < size; j++) {
            newResult[i] -= arr[i][j]*newResult[j];
        }
        newResult[i] = newResult[i]/arr[i][i];
    }
    return {arr, answer, newResult};
}