$(document).ready(function() {
    // Hiding the fields of the variables
    $("#volumen-group").hide();
    $("#pressure-group").hide();
    $("#temperature-group").hide();
    getSubstances();
});

function displayVariable(name) {
    switch (name) {
        case "volumen":
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

function clear() {

}

function solve() {
    if(validate()) {
        var sub1Id = $('#primarySubstance').val();
        var sub2Id = $('#secondarySubstance').val();
        RequestDataOfsubstances(sub1, sub2);
    }
    else {

    }
}

function validate() {
    var ans = true;

    return ans;
}
