const app            = require('express')();
const bodyParser     = require('body-parser');
const log            = require('loglevel');  

const config         = require('./config');
const routes         = require('./routes'); 

if (config.mode.dev) {
    app.set('json spaces', 2); 
    log.enableAll();
} else {
    log.disableAll();
}

// cache the logging utility for access by everyone
app.locals.log = log; 

// use bodyParser, which allows use to get data from a HTTP POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// setup up clean router interface
app.use('/person', require('./routes')); 

var port = process.env.PORT || 8080;

// START THE SERVER
app.listen(port, '0.0.0.0', function() {
    log.debug("Magic happens on port " + port); 
});

