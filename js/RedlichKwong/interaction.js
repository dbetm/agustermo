$(document).ready(function() {
    // Hiding the fields of the variables
    $("#volumen-group").hide();
    $("#pressure-group").hide();
    $("#temperature-group").hide();
    getSubstances();
    // Hidding result section
    $("#result").hide();
    // Hiding button: Start again.
    $("#btnStartAgain").hide();
});

function displayVariable(name) {
    if($("#btnStartAgain").is(":visible")) {
        return;
    }
    switch (name) {
        case "volume":
            $("#volumen-group").hide();
            $("#pressure-group").show(100);
            $("#temperature-group").show(100);
            break;
        case "pressure":
            $("#pressure-group").hide();
            $("#volumen-group").show(100);
            $("#temperature-group").show(100);
            break;
        case "temperature":
            $("#temperature-group").hide();
            $("#volumen-group").show(100);
            $("#pressure-group").show(100);
            break;
        default:
    }
}

function solve() {
    if(validate()) {
        // Hiding button: Calculate and clear
        $("#btnSolve").hide();
        $("#btnClear").hide();
        // Show button: Start
        $("#btnStartAgain").show();
        // Show result section
        $("#result").show();

        // References to selected options
            // Primary substance
        var sub1Id = $('#primarySubstance').val();
        var option1 = $('#pri-'+sub1Id);
        var textOption1 = $(option1).text();
            // Secondary substance
        var sub2Id = $('#secondarySubstance').val();
        var option2 = $('#sec-'+sub2Id);
        var textOption2 = $(option2).text();
        // Getting values of inputs
            // Mass of the primary substance
        var mass1 = $("#massPrimarySubstance").val();
            // Mass of the secondary substance
        var mass2 = $("#massSecondarySubstance").val();
            // Binary interaction coefficient
        var k12 = $("#k12").val();
            // Variable to calculate
        var variable = $('input[name=variable]:checked').val();
            // Depending of selected variable is read others 2 fields
        var temperature, volumen, pressure;
        if(variable == "volume") {
            temperature = $("#temperature").val();
            pressure = $("#pressure").val();
        }
        else if(variable == "pressure") {
            volumen = $("#volumen").val();
            temperature = $("#temperature").val();
        }
        else if(variable == "temperature") {
            volumen = $("#volumen").val();
            pressure = $("#pressure").val();
        }
        // Calculating outputs
            // Quantities
        var nSubstance1 = getMoles($(option1).data('molecularWeight'), mass1);
        var nSubstance2 = getMoles($(option2).data('molecularWeight'), mass2);
                // Total
        var nTotal = nSubstance1 + nSubstance2;
            // Y_proportion
        var y1 = nSubstance1 / nTotal;
        var y2 = nSubstance2 / nTotal;
        // Evaluating Redlich-Kwong equation
            // a1 and b1
        var a1 = evaluateARedlichKwongEquation(
            $(option1).data('criticalTemperature'),
            $(option1).data('criticalPressure')
        );
        var b1 = evaluateBRedlichKwongEquation(
            $(option1).data('criticalTemperature'),
            $(option1).data('criticalPressure')
        );
            // a2 and b2
        var a2 = evaluateARedlichKwongEquation(
            $(option2).data('criticalTemperature'),
            $(option2).data('criticalPressure')
        );
        var b2 = evaluateBRedlichKwongEquation(
            $(option2).data('criticalTemperature'),
            $(option2).data('criticalPressure')
        );
            // a_mix
        var amix = evaluateAmix(a1, a2, y1, y2, k12);
            // b_mix
        var bmix = evaluateBmix(b1, y1, b2, y2);
        var molarVolume;
        // Calculating final result
        var result;
        switch (variable) {
            case "volume":
                result = calculateVolumen(nSubstance1, nSubstance2, pressure, temperature, bmix, amix);
                molarVolume = calculateMolarVolumen(result, nSubstance1, nSubstance2);
                result = result.toFixed(4);
                result += " m^3";
                break;
            case "pressure":
                result = calculatePressure(volumen, nSubstance1, nSubstance2, temperature, bmix, amix);
                molarVolume = calculateMolarVolumen(volumen, nSubstance1, nSubstance2);
                break;
            case "temperature":
                result = calculateTemperature(nSubstance1, nSubstance2, pressure, volumen, bmix, amix);
                molarVolume = calculateMolarVolumen(volumen, nSubstance1, nSubstance2);
                break;
            default:
        }
        // Render
            // Display result section
            // Amount of moles
                // Defining significant ciphers
        var total = nSubstance1+nSubstance2;
        total = total.toFixed(4);
        nSubstance1 = nSubstance1.toFixed(4);
        nSubstance2 = nSubstance2.toFixed(4);
        $("#amount-option1").text(textOption1 + ": " + nSubstance1 + " mol.");
        $("#amount-option2").text(textOption2 + ": " + nSubstance2 + " mol.");
        $("#amount-total").text("Amount total (nT): " + (total) + " mol");
            // y1 and y2
                // Defining exponential notation
        y1 = y1.toExponential(4);
        y2 = y2.toExponential(4);
        $("#result-y1").text("Y_1: " + y1);
        $("#result-y2").text("Y_2: " + y2);
            // a1 and b1
                // Defining exponential notation
        a1 = a1.toExponential(4);
        b1 = b1.toExponential(4);
        $("#result-title-sub1").append(" " + textOption1 + ":");
        $("#result-a1").text("a1: " + a1 + " (bar*m^6*k^0.5)/mol^2");
        $("#result-b1").text("b1: " + b1 + " m^3/mol");
            // a2 and b2
                // Defining exponential notation
        a2 = a2.toExponential(4);
        b2 = b2.toExponential(4);
        $("#result-title-sub2").append(" " + textOption2 + ":");
        $("#result-a2").text("a2: " + a2 + " (bar*m^6*k^0.5)/mol^2");
        $("#result-b2").text("b2: " + b2 + " m^3/mol");
            // amix
                // Defining exponential notation
        amix = amix.toExponential(4);
        $("#result-amix").text("amix: " + amix + " (bar*m^6*k^0.5)/mol^2");
            // bmix
                // Defining significant ciphers
        bmix = bmix.toExponential(4);
        $("#result-bmix").text("bmix: " + bmix + " m^3/mol");
            // Molar volume
                // Defining significant ciphers
        molarVolume = molarVolume.toExponential(4);
        $("#result-molar-volume").text("mV: " + molarVolume + " m^3/mol");
            // Final output
        $("#variable-name").text("The " + variable + " is:");
        $("#result-final").text(result);
    }
    else {
        // Display errors
    }
}

function validate() {
    var ans = true;

    if($("#massPrimarySubstance").val() == "") {
        $("#massPrimarySubstance").focus();
        ans = false;
    }
    else if($("#massSecondarySubstance").val() == "") {
        $("#massSecondarySubstance").focus();
        ans = false;
    }
    else if($("#k12").val() == "") {
        $("#k12").focus();
        ans = false;
    }
    else if($("#volumen").val() == "" && $("#temperature").val() == "" && $("#pressure").val() == "") {
        ans  = false;
    }
    return ans;
}

function clear2() {
    // Hiding the fields of the variables
    $("#volumen-group").hide();
    $("#pressure-group").hide();
    $("#temperature-group").hide();
    // Reset values of fields
    $("#massPrimarySubstance").val("");
    $("#massSecondarySubstance").val("");
    $("#k12").val("");
    $("#volumen").val("");
    $("#pressure").val("");
    $("#temperature").val("");
    $('input[name=variable]').prop('checked', false);
}

function startAgain() {
    // Reset values in result section
    $("#amount-option1").text("");
    $("#amount-option2").text("");
    $("#amount-total").text("");
    $("#result-y1").text("");
    $("#result-y2").text("");
    $("#result-title-sub1").text("Parameters of the Redlich-Kwong equation for");
    $("#result-a1").text("");
    $("#result-b1").text("");
    $("#result-title-sub2").text("Parameters of the Redlich-Kwong equation for");
    $("#result-a2").text("");
    $("#result-b2").text("");
    $("#result-amix").text("");
    $("#result-bmix").text("");
    $("#variable-name").text("");
    $("#result-final").text("");
    // Hiding result section
    $("#result").hide();
    // Call to clear()
    clear2();
    // Showing buttons "Calculate" and "Clear"
    $("#btnSolve").show();
    $("#btnClear").show();
    // Hiding button "Start again"
    $("#btnStartAgain").hide();
}
