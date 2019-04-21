function getSubstances() {
    $.ajax({
        url: "php/ReadlichKwong/getSubstances.php",
        dataType: "json",
        error: function(p1, p2, err) {
            alert("Error: " + err);
        },
        success: function(data, status, jqXHR) {
            if(data.status == 1) {
                var substances = data.substances;
                loadNameSubstances(substances);
            }
            else {
                alert(data.message);
            }
        }
    });
}

function loadNameSubstances(substances) {
    var primarySubstance = $("#primarySubstance");
    var secondarySubstance = $("#secondarySubstance");
    $(primarySubstance).find('option').remove().end();
    $(secondarySubstance).find('option').remove().end();

    for (var i = 0; i < substances.length; i++) {
        let name = substances[i].name;
        let val = substances[i].id;
        let critPressure = substances[i].criticalPressure;
        let critTemperature = substances[i].criticalTemperature;
        let molecularWeight = substances[i].molecularWeight;
        // Create DOM option
        //var option = $('<option id="pri-'+val+'" value='+val+'>'+name+'</option>');
        var option = $("<option></option>").text(name);
        $(option).attr("id", "pri-"+val);
        $(option).attr("value", val);
        var option2 = $("<option></option>").text(name);
        $(option2).attr("id", "sec-"+val);
        $(option2).attr("value", val);
        // Store the data
        $(option).data('criticalPressure', critPressure);
        $(option2).data('criticalPressure', critPressure);
        $(option).data('criticalTemperature', critTemperature);
        $(option2).data('criticalTemperature', critTemperature);
        $(option).data('molecularWeight', molecularWeight);
        $(option2).data('molecularWeight', molecularWeight);
        // Appending in selects
        $(primarySubstance).append(option);
        $(secondarySubstance).append(option2);
    }
}
