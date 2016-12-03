var express = require('express');
var app = express();

app.get('*', function(req, res) {
    
    var input = decodeURI(req.path.slice(1));

    var unix = null;
    // if only digits provided, assume unix time stamp
    if (input.match(/^[0-9]+$/) !== null) {
        unix = Number(input);
    } else {
        unix = Date.parse(input) / 1000; // From microseconds to seconds
        if (isNaN(unix)) {
            unix = null;
        }
    }
    
    var natural = null;
    if (unix !== null) {
        var locale = 'en-US';
        var format = {day: 'numeric', month: 'long', year: 'numeric'};
        // Convert seconds to microseconds
        natural = new Date(unix * 1000).toLocaleDateString(locale, format);   
    }
    
    res.send({unix: unix, natural: natural});
});

app.listen(8080, function() {
    console.log("Timestamp microservice listening on port 8080!");
});
