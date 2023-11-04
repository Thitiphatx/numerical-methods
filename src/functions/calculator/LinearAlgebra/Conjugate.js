export const CalConjugate = (matrixA, matrixB, size)=> {
    let A = JSON.parse(JSON.stringify(matrixA));
    let B = [...matrixB];
    let x = new Array(parseInt(size)).fill(0);


    let R = subtract(multiply(A,x),B);
    let D = multiply(R, -1);
    const xArray = [];
    while (error(R)) {
        let lambda = -1*dotProduct(D, R)/dotProduct(D,multiply(A, D));
        for (let i = 0; i < x.length; i++) {
            x[i] = x[i]+(D[i]*lambda);
        }
        R = subtract(multiply(A,x),B);
        
        let alpha = dotProduct(R,multiply(A, D))/dotProduct(D,multiply(A, D));
        for (let i = 0; i < x.length; i++) {
            D[i] = -1*R[i]+alpha*D[i];
        }
        xArray.push(x);
    };

    function error(r) {
        return (Math.abs(dotProduct(r, r)) > 0)
    }
    function subtract(m1, m2) {
        let m3 = [];
        for (let i = 0; i < m1.length; i++) {
            m3[i] = m1[i]-m2[i];
        }
        return m3;
    }
    function dotProduct(p1, p2) {
        let temp = 0;
        for (let i = 0; i < p1.length; i++) {
            temp += p1[i]*p2[i];
        }
        return temp;
    }
    function multiply(m1, v) {
        let m3 = [];
        if (Array.isArray(v) && !Array.isArray(v[0])) {
            for (let i = 0; i < m1.length; i++) {
                let rowSum = 0;
                for (let j = 0; j < v.length; j++) {
                    rowSum += m1[i][j] * v[j];
                }
                m3[i] = rowSum;
            }
        }
        else if (Array.isArray(v) && Array.isArray(v[0])) {
            for (let i = 0; i < m1.length; i++) {
                m3[i] = new Array(v[i].length);
                for (let j = 0; j < m1[i].length; j++) {
                    m3[i][j] = 0;
                    for (let k = 0; k < v[i].length; k++) {
                        m3[i][j] += m1[i][k] * v[k][j];
                    }
                }
            }
        }
        else {
            for (let i = 0; i < m1.length; i++) {
                m3[i] = m1[i]*v;
                
            }
        }
        
        return m3;
    }

    return {xArray, x}

}