const R = 8.314e-5; // -> (bar*m^3) / (mol*K)
// const VV = 1.11e-3; // -> m^3/mol
const EPSILON = 0.0000000001;

function getMoles(molecularWeight, weight) {
    return weight / molecularWeight;
}

function evaluateARedlichKwongEquation(criticalTemperature, criticalPressure) {
    return (0.42748 * (R * R) * Math.pow(criticalTemperature, 2.5)) / criticalPressure;
}

function evaluateBRedlichKwongEquation(criticalTemperature, criticalPressure) {
    return (0.08664 * R * criticalTemperature) / criticalPressure;
}

function evaluateAmix(a1, a2, y1, y2, k12) {
    var a12 = calculateA12(a1, a2, k12);
    return a1*Math.pow(y1, 2) + 2*y1*y2*a12 + a2*Math.pow(y2 ,2);
}

function calculateA12(a1, a2, k12) {
    return Math.sqrt(a1 * a2) * (1 - k12);
}

function evaluateBmix(b1, y1, b2, y2) {
    return (b1*y1) + (b2*y2);
}

function calculatePressure(volumen, nSubstance1, nSubstance2, temperature, bmix, amix) {
    var molarVolumen = calculateMolarVolumen(volumen, nSubstance1, nSubstance2);
    var res = (R * temperature) / (molarVolumen - bmix);
    res -= amix / (Math.sqrt(temperature) * molarVolumen * (molarVolumen + bmix));
    res = res.toFixed(4);
    return res + " bar";
}

function calculateVolumen(nSubstance1, nSubstance2, pressure, temperature, bmix, amix) {
    var x = 1e-9;
    x = newtonRaphsonVolume(x, pressure, temperature, bmix, amix);
    var res = (nSubstance1 + nSubstance2) * x;
    //res = res.toFixed(4);
    return res; //+ " m^3";
}

function calculateTemperature(nSubstance1, nSubstance2, pressure, volumen, bmix, amix) {
    var x = 0.01;
    var molarVolumen = calculateMolarVolumen(volumen, nSubstance1, nSubstance2);
    var temperature = newtonRaphsonTemperature(x, pressure, molarVolumen, bmix, amix);
    temperature = temperature.toFixed(4);
    return temperature + " K";
}

function calculateMolarVolumen(volumen, nSubstance1, nSubstance2) {
    var res = volumen / (nSubstance1 + nSubstance2);
    return res;
}

// ### Newton-Raphson Method ###
/* Given a function f(x) on floating number x and an initial guess for root,
find root of function in interval. Here f(x) represents algebraic or
transcendental equation.

For simplicity, we have assumed that derivative of function is also provided as input.
*/

// ------------- Volume ------------------------------------------
function evaluateVolumeFunction(x, pressure, temperature, bmix, amix) {
    var res = ((R*temperature) / (x - bmix));
    res -= (amix / (Math.sqrt(temperature) * x * (x + bmix)));
    res -= pressure;
    //console.log("Evaluate function is: " + res);
    return res;
}

function evaluateDerivVolumeFunction(x, pressure, temperature, bmix, amix) {
    /*
    var res = amix * (2*x + bmix) * Math.pow(x-bmix, 2);
    res -= R * Math.pow(x, 2) * Math.pow(temperature, 3/2) * Math.pow(x + bmix, 2);
    res /=  Math.pow(x, 2)*Math.sqrt(temperature)*Math.pow(x+bmix, 2)*Math.pow(x-bmix, 2);
    console.log("Evaluate derivative function is: " + res);
    */
    var res = (amix*(bmix+2*x)) / (Math.sqrt(temperature) * x * x * Math.pow(bmix+x,2))
    res -= (R * temperature) / Math.pow(bmix-x, 2);
    //console.log("Evaluate derivative function is: " + res);
    return res;
}

function newtonRaphsonVolume(x, pressure, temperature, bmix, amix) {
    var h = evaluateVolumeFunction(x, pressure, temperature, bmix, amix);
    h /= evaluateDerivVolumeFunction(x, pressure, temperature, bmix, amix);

    while(Math.abs(h) >= EPSILON) {
        // console.log("h: " + h);
        h = evaluateVolumeFunction(x, pressure, temperature, bmix, amix);
        h /= evaluateDerivVolumeFunction(x, pressure, temperature, bmix, amix);
        // x(i+1) = x(i) - f(x)/f'(x)
        x = x - h;
    }
    console.log("The value of the root is: " + x);
    return x;
}

// ------------- Temperature ------------------------------------------
function evaluateTemperatureFunction(x, pressure, molarVolumen, bmix, amix) {
    console.log(x, pressure, molarVolumen, bmix, amix);
    var res = (R * x) / (molarVolumen - bmix);
    res -= amix / (Math.sqrt(x) * molarVolumen * (molarVolumen + bmix));
    res -= pressure;
    //console.log("Evaluate function is: " + res);
    return res;
}

function evaluateDerivTemperatureFunction(x, molarVolumen, bmix, amix) {
    console.log(x, molarVolumen, bmix, amix);
    var res = R / (molarVolumen - bmix);
    res += amix / (2 * molarVolumen * Math.pow(x, 3/2) * (molarVolumen + bmix));
    //console.log("Evaluate derivative function is: " + res);
    return res;
}

function newtonRaphsonTemperature(x, pressure, molarVolumen, bmix, amix) {
    var h = evaluateTemperatureFunction(x, pressure, molarVolumen, bmix, amix);
    h /= evaluateDerivTemperatureFunction(x, molarVolumen, bmix, amix);

    while(Math.abs(h) >= EPSILON) {
        //console.log("h: " + h);
        h = evaluateTemperatureFunction(x, pressure, molarVolumen, bmix, amix);
        h /= evaluateDerivTemperatureFunction(x, molarVolumen, bmix, amix);
        // x(i+1) = x(i) - f(x)/f'(x)
        x = x - h;
    }
    console.log("The value of the root is: " + x);
    return x;
}
