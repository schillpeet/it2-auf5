// 1. Daten anfragen

d3.json(http://it2w1.if-lab.de/rest/beispiel/Parameter/Person&20B/tag/1).then(function(data, error) {
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

// 2. Daten empfangen
// 3. Daten in Form bringen
// 4. Daten darstellen