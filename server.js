var express = require('express');
var app = express();
var port = 3000;

// adding middleware to the app
var middleware = {
    requireAuthentication: function(req, res, next) {
        console.log('private route hit!');
        next();
    },
    logger: function(req, res, next) {
        console.log( 'Request: ' + new Date().toString() + ' ' + req.method + ' ' + req.originalUrl);
        next();
    }
};

app.use(middleware.logger);

// using app.use on middleware causes it to be app-wide
// middleware needs to go above routes
// app.use(middleware.requireAuthentication);


// injecting our middleware into a route - route-specific middleware
app.get('/about', middleware.requireAuthentication, function(req, res) {
    res.send('I am a junior fullstack web developer. I love to code!!');
});

// opens up the public folder to our server
app.use(express.static(__dirname + '/public'));

// tells server to listen
app.listen(port, function() {
    console.log('Express server started on port ' + port + '!');
});
