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
        $(primarySubstance).append(new Option(name, val));
        $(secondarySubstance).append(new Option(name, val));
    }
}

function RequestDataOfsubstances(id1, id2) {
    
}
