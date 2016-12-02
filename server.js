var express = require('express');
var app = express();

app.get('*', function(req, res) {
    
    var input = decodeURI(req.path.slice(1));

    var unix = null;
    // if only digits provided, assume unix time stamp
    if (input.match(/^[0-9]+$/) !== null) {
        unix = Number(input);   
    } else {
        unix = Date.parse(input); 
        if (isNaN(unix)) {
            unix = null;
        }
    }
    
    var natural = null;
    if (unix !== null) {
        var locale = 'en-US';
        var format = {day: 'numeric', month: 'long', year: 'numeric'};
        natural = new Date(Number(unix)).toLocaleDateString(locale, format);   
    }
    
    res.send({unix: unix, natural: natural});
});

app.listen(8080, function() {
    console.log("Timestamp microservice listening on port 8080!");
});
