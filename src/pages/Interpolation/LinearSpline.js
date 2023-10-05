let x = [2, 4, 6, 8, 10];
let y = [9.5, 8, 10.5, 39.5, 72.5];

var x_target = 4.5;
let start, end;

for (let i = 1; i < x.length; i++) {
    if(x_target > x[i-1] && x_target < x[i]) {
        start = i-1;
        end = i;
        break;
    }
}
let y_interpolation = y[start] + (x_target-x[start])*(y[end] - y[start])/(x[end] - x[start]);

console.log(x[end]);