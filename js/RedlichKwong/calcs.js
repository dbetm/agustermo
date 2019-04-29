const R = 8.314e-5; // -> (bar*m^3) / (mol*K)
const VV = 1.11e-3; // -> m^3/mol

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

// #### It's wrong!
/*
function calculatePressure(temperature, a, volumen, b) {
    return (R*temperature / (volumen-b)) - (a / (Math.sqrt(temperature) * VV * (VV+b)));
}

function calculateTemperature(pressure, a, temperature, b, volumen) {
    return (1/R) * ((a / Math.sqrt(temperature) * VV * (VV+b)) * (volumen - b));
}

function calculateVolumen(temperature, pressure, a, b) {
    return (R*temperature) + (pressure * a * b) / pressure * (Math.sqrt(temperature) * VV * (VV+B) + a);
}
*/
function calculatePressure() {
    return "NaN";
}

function calculateVolumen() {
    return "NaN";
}

function calculateTemperature() {
    return "NaN";
}
