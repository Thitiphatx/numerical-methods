import { evaluate } from "mathjs";

export function DifferentationOh(FX, level, type, hValue, xTarget) {
    const f = (x) => {
        return evaluate(FX, {x: x});
    }

    switch (type) {
        case "Forward":
            if (level == 1)         return Forward1(xTarget, hValue);
            else if (level == 2)    return Forward2(xTarget, hValue);
            else if (level == 3)    return Forward3(xTarget, hValue);
            else                    return Forward4(xTarget, hValue);
        case "Backward":
            if (level == 1)         return Backward1(xTarget, hValue);
            else if (level == 2)    return Backward2(xTarget, hValue);
            else if (level == 3)    return Backward3(xTarget, hValue);
            else                    return Backward4(xTarget, hValue);
        case "Central":
            if (level == 1)         return Central1(xTarget, hValue);
            else if (level == 2)    return Central2(xTarget, hValue);
            else if (level == 3)    return Central3(xTarget, hValue);
            else                    return Central4(xTarget, hValue);
        default :                   return "Not supported type"
    }

    // level 1
    function Forward1(x, h) {
        return (f(x+h) - f(x))/h;
    }
    function Backward1(x, h) {
        return (f(x) - f(x-h))/h;
    }
    function Central1(x, h) {
        return ( f(x+h) - f(x-h) ) / (2*h);
    }

    // level 2
    function Forward2(x, h) {
        return ( f(x+2*h) - 2*f(x+h) + f(x) ) / Math.pow(h,2);
    }
    function Backward2(x, h) {
        return ( f(x) - 2*f(x-h) + f(x-2*h) ) / Math.pow(h,2);
    }
    function Central2(x, h) {
        return ( f(x-h) - 2*f(x) + f(x+h) ) / Math.pow(h,2);
    }

    // level 3
    function Forward3(x, h) {
        return ( f(x+3*h) - 3*f(x+2*h) + 3*f(x+h) -f(x) ) / Math.pow(h,3);
    }
    function Backward3(x, h) {
        return ( f(x) - 3*f(x-h) + 3*f(x-2*h) - f(x-3*h) ) / Math.pow(h,3);
    }
    function Central3(x, h) {
        return ( f(x-2*h) - 2*f(x-h) + 2*f(x+h) - f(x+2*h) ) / (Math.pow(h,2)*2);
    }

    // level 4
    function Forward4(x, h) {
        return ( f(x+4*h) - 4*f(x+3*h) + 6*f(x+2*h) - 4*f(x+h) + f(x)) / Math.pow(h, 4);
    }
    function Backward4(x, h) {
        return ( f(x) - 4*f(x-h) + 6*f(x-2*h) - 4*f(x-3*h) + f(x-4*h) ) / Math.pow(h,4);
    }
    function Central4(x, h) {
        return ( f(x+2*h) - 4*f(x+h) + 6*f(x) -4*f(x-h) + f(x-2*h) ) / Math.pow(h,4);
    }

}