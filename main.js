// 1. Daten anfragen
// Frage: sollen wir hier bei json
function aktualisiere() {
    //Daten empfangen
    d3.json("http://it2wi1.if-lab.de/rest/mpr_fall1").then(function (data, error) {
        empfangeDaten(data, error)
    });
}
function empfangeDaten(datenEmpfangen, error) {
    if (error) {
        console.log(error);
    } else {
        zeigeDaten(datenEmpfangen);
        // eigene Spielerei zum Verständnis:
        frageDaten(datenEmpfangen);
    }
}
function zeigeDaten(daten) {
    //Elemente mit id „content“ sammeln und in Variable p speichern
    let p = d3.select("#content").selectAll("p").data(daten);

    //Daten hinzufuegen falls es mehr Daten als Elemente im HTML gibt.
    p.enter().append("p")
    .text(function (daten) {
        return "Uhrzeit: " + daten.datum + " Rpm: " + daten.werte["Rpm"]   // gebe die Werte rpm zurück
        + " Temperatur: " + daten.werte["Tavg_temp"]
        + " Lautstärke: " + daten.werte["Tavg_laut"]
        + " Vibration: " + daten.werte["Tavg_vibr"]
        + " Qualitätsgrenze: " + daten.werte["Qualitaetsgrenze"];      
    });
    // Daten löschen, falls es mehr Elemente im HTML als Daten gibt.
    p.exit().remove();
}
// Spielereien:
function frageDaten(datenEmpfangen) {
    
}

/*
d3.json("http://it2w1.if-lab.de/rest/beispiel/Parameter/Person%20B/tag/1").then(function(data, error) {
    empfangen(data, error)
});
var urls = ["<link>", "<link>"]
var promises = [];
urls.forEach(function(url) {
    promises.push(d3.json(url))
    });
Promise.all(promises)
    .then((result)=>empfangeDaten(result), function(error){
        console.log(console.error);
    });
*/
// 2. Daten empfangen
// 3. Daten in Form bringen
// 4. Daten darstellen


