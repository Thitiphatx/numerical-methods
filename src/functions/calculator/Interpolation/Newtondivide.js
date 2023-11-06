export const CalNewtondivide = (arrayPoints, targetX) => {
    let x = arrayPoints.map((e)=> (parseFloat(e.x)));
    let y = arrayPoints.map((e)=> (parseFloat(e.y)));
    
    const getF = (X)=> {
        const n = x.length;
        let result = y[0];
        let term = 1;
    
        for (let i = 1; i < n; i++) {
            term *= (X - x[i - 1]);
            result += getC(0, i) * term;
        }
    
        return result;
    }
    
    const getC = (start, end) => {
        if (start == end) {
          return y[start];
        }
      
        const term1 = getC(start + 1, end);
        const term2 = getC(start, end - 1);
      
        return (term1 - term2) / (x[end] - x[start]);
    }

    return getF(targetX);
}