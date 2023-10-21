export function generateMatrix(size) {
    const newMatrix = [];
    for (let i = 0; i < size; i++) {
        newMatrix[i] = [];
        for (let j = 0; j < size; j++) {
            newMatrix[i].push(0);
        }
    }
    return newMatrix;
}