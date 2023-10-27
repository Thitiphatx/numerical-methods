import { evaluate } from "mathjs";

export function DifferentationOh2(FX, level, type, hValue, xTarget) {
    const f = (x) => {
        return evaluate(`${FX}`, {x: x});
    }

    switch (type) {
        case 1:
            if (level == 1)         return Forward1(xTarget, hValue);
            else if (level == 2)    return Forward2(xTarget, hValue);
            else if (level == 3)    return Forward3(xTarget, hValue);
            else                    return Forward4(xTarget, hValue);
        case 2:
            if (level == 1)         return Backward1(xTarget, hValue);
            else if (level == 2)    return Backward2(xTarget, hValue);
            else if (level == 3)    return Backward3(xTarget, hValue);
            else                    return Backward4(xTarget, hValue);
        case 3:
            if (level == 1)         return Central1(xTarget, hValue);
            else if (level == 2)    return Central2(xTarget, hValue);
            else if (level == 3)    return Central3(xTarget, hValue);
            else                    return Central4(xTarget, hValue);
        default :                   return "Not supported type"
    }

    // level 1
    function Forward1(x, h) {
        return ( -f(x+2*h) + 4*f(x+h) - 3*f(x) ) / (2*h);
    }
    function Backward1(x, h) {
        return ( 3*f(x) -4*f(x-h) +f(x-2*h) ) / (2*h);
    }
    function Central1(x, h) {
        return ( -f(x+2*h) +8*f(x+h) -8*f(x-h) +f(x-2*h)) / (12*h);
    }

    // level 2
    function Forward2(x, h) {
        return ( -f(x+3*h) + 4*f(x+2*h) - 5*f(x+h) + 2*f(x) ) / (h*h);
    }
    function Backward2(x, h) {
        return ( 2*f(x) - 5*f(x-h) + 4*f(x-2*h) - f(x-3*h) ) / (h*h);
    }
    function Central2(x, h) {
        return ( -f(x+2*h) + 16*f(x+h) -30*f(x) + 16*f(x-h) - f(x-2*h) ) / (12*Math.pow(h, 2));
    }

    // level 3
    function Forward3(x, h) {
        return ( -3*f(x+4*h) + 14*f(x+3*h) - 24*f(x+2*h) +18*f(x+h) - 5*f(x) ) / (2*Math.pow(h,3));
    }
    function Backward3(x, h) {
        return ( 5*f(x) -18*f(x-h) +24*f(x-2*h) -14*f(x-3*h) -f(x-4*h) ) / (2*Math.pow(h,3));
    }
    function Central3(x, h) {
        return ( -f(x+3*h) +8*f(x+2*h) -13*f(x+h) +13*f(x-1*h) -8*f(x-2*h) +f(x-3*h) ) / (8*Math.pow(h,3));
    }

    // level 4
    function Forward4(x, h) {
        return ( -2*f(x+5*h) + 11*f(x+4*h) - 24*f(x+3*h) + 26*f(x+2*h) - 14*f(x+1*h) + 3*f(x) ) / Math.pow(h,4);
    }
    function Backward4(x, h) {
        return ( 3*f(x) -14*f(x-h) +26*f(x-2*h) -24*f(x-3*h) +11*f(x-4*h) -2*f(x-5*h) ) / Math.pow(h,4);
    }
    function Central4(x, h) {
        return ( -f(x+3*h) +12*f(x+2*h) -39*f(x+h) +56*f(x) -39*f(x-h) +12*f(x-2*h) -f(x-3*h) ) / (6*Math.pow(h,4));
    }

}