
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
        // folgendes zeigt die Daten an:
        //zeigeDaten(datenEmpfangen); 
        minData(datenEmpfangen);
        maxData(datenEmpfangen);
        //minAndMaxData(datenEmpfangen);      
        modify2(datenEmpfangen);
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
var chartObject = document.getElementById('balkenChart'); // oder einfache Anführungszeichen?

var chart = new Chart(chartObject, {
    type: 'bar', // Art des Diagramms z.B. 'line', 'bar', etc.
    // Labels definieren -> Abszisse
    data: {
        labels: ["Temperatur", "Akustik", "Vibration", "Qualitätsgrenze"],
        datasets: [{
            label: "Datensatz Nummer 1",
            backgroundColor: 'rgba(65,105,225,0.4)',
            borderColor: 'rgba(65,105,255,1)',
            // Beispiel Daten
            data: [3,7,5,2] // für die vier Labels vier Werte
        }]
    },
    // damit der Chart bei 0 beginnt:
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});





/*
// Variablen, in denen wir mittels minData die Minimums festhalten
let minDatumGlobal;
let minRpmGlobal;
let minTempGlobal;
let minLautGlobal;
let minVibrGlobal;

// bestimme das Minimum -> wichtig um später korrekt skalieren zu können
function minData(datenEmpfangen){
    let minDatum = d3.min(datenEmpfangen, function(datensatz){
        return datensatz.datum;      
    });
    let minRpm = d3.min(datenEmpfangen, function(datensatz){
        return datensatz.werte["Rpm"];
    });
    let minTemp = d3.min(datenEmpfangen, function(datensatz){
        return datensatz.werte["Tavg_temp"];
    });
    let minLaut = d3.min(datenEmpfangen, function(datensatz){
        return datensatz.werte["Tavg_laut"];
    });
    let minVibr = d3.min(datenEmpfangen, function(datensatz){
        return datensatz.werte["Tavg_vibr"];
    });
    // benötigen wir Qualitätsgrenze auch?
    // Überprüfung der Minima
    console.log("MinDatum = " + minDatum);
    console.log("MinRpm = " + minRpm);
    console.log("MinTemp = " + minTemp);
    console.log("MinLaut = " + minLaut);
    console.log("minVibr = " + minVibr);
    // globale Variablen deklarieren
    minDatumGlobal = minDatum;
    minRpmGlobal = minRpm;
    minTempGlobal = minTemp;
    minLautGlobal = minLaut;
    minVibrGlobal = minVibr;
}

// Variablen, in denen wir mittels minData die Minimums festhalten
let maxDatumGlobal;
let maxRpmGlobal;
let maxTempGlobal;
let maxLautGlobal;
let maxVibrGlobal;

// bestimme das Maximum
function maxData(datenEmpfangen){
    let maxDatum = d3.max(datenEmpfangen, function(datensatz){
        return datensatz.datum;
    });
    let maxRpm = d3.max(datenEmpfangen, function(datensatz){
        return datensatz.werte["Rpm"]; // stimmt noch nicht!
    });
    let maxTemp = d3.max(datenEmpfangen, function(datensatz){
        return datensatz.werte["Tavg_temp"]; 
    });
    let maxLaut = d3.max(datenEmpfangen, function(datensatz){
        return datensatz.werte["Tavg_laut"]; 
    });
    let maxVibr = d3.max(datenEmpfangen, function(datensatz){
        return datensatz.werte["Tavg_vibr"]; 
    });
    // benötigen wir auch Qualitätsgrenze?
    // Überprüfung der Maxima
    console.log("MaxDatum = " + maxDatum);
    console.log("MaxRpm = " + maxRpm);
    // Überprüfung von MaxRpm an Stelle 12: erwarteter Wert 1001 => ist korrekt; wieso ist dann das Ergebnis von maxRpm falsch?
    console.log("Überprüfung von MaxRpm Stelle 12 = " + datenEmpfangen[12].werte["Rpm"]);    
    console.log("MaxTemp = " + maxTemp);
    console.log("MaxLaut = " + maxLaut);
    console.log("MaxVibr = " + maxVibr);
    // globale Variablen deklarieren
    maxDatumGlobal = maxDatum;
    maxRpmGlobal = maxRpm;
    maxTempGlobal = maxTemp;
    maxLautGlobal = maxLaut;
    maxVibrGlobal = maxVibr;
}
/*     expend() --> FUNKTIONIERT NICHT!
function minAndMaxData(datenEmpfangen){
    let minMaxRpm = d3.extend(datenEmpfangen, function(datensatz){
        return datensatz.werte["Rpm"];
    });
    console.log("minAndMaxRpm = " + minMaxRpm[0]);
}*/
/*
function modify2(datenEmpfangen){
    for(var i = 0; i < 30; i++) {
        var rpm = datenEmpfangen[i].werte["Rpm"];
        var tmp = datenEmpfangen[i].werte["Tavg_temp"];
        var laut = datenEmpfangen[i].werte["Tavg_laut"];
        var vibr = datenEmpfangen[i].werte["Tavg_vibr"];
        // Qualitätsgrenze relevant?
        // Überprüfung
        console.log("rpm: " + datenEmpfangen[i].werte["Rpm"] + " tmp: " + datenEmpfangen[i].werte["Tavg_temp"] + 
            " laut: " + datenEmpfangen[i].werte["Tavg_laut"] + " vibr: " + datenEmpfangen[i].werte["Tavg_vibr"]);
        // Skalieren:
        let x = d3.scaleLinear()
            .domain([minRpmGlobal,maxRpmGlobal])
            .range([0, 500]);
        let y = d3.scaleLinear()
            .domain([minTempGlobal,maxTempGlobal])
            .range([0, 500]);    
        d3.selectAll("rect").data([rpm, tmp, laut, vibr]).transition().delay(1000).duration(2000).style("height", function(d) {
            // mit if else konnte ich nicht auf die scaleLinear richtig zugreifen
            return x(d) * 10 + "px";  
        }
        );
        
    }
}
*/

/*
// VL 2 - S.7: verstehe nicht, was der folgende Teil macht und wie wir diesen verwenden sollen:
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
