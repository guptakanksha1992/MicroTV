const app            = require('express')();
const routes         = require('./routes'); 
const bodyParser     = require('body-parser');
const log            = require('loglevel');  
const config         = require('./config'); 
const dbConnection   = require('./database'); 

if (config.mode.dev) {
    app.set('json spaces', 2); 
    log.enableAll();
    app.get("/kill", function(req, res) {
        res.send("Exiting!!"); 
        process.exit(); 
    }); 
} else {
    log.disableAll();
}

// cache the logging utility for access by everyone
app.locals.log = log; 

// use bodyParser, which allows use to get data from a HTTP POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// cache the database connection 
// object design allows for flexibility later when we change from many databases to a single one
app.locals.db = {}; 

dbConnection.setupDB(config.database.database_url, function(err, db) {
    if (err) {
        log.debug("failed on database variable"); 
        return; 
    }
    log.debug("setting db variable"); 
    app.locals.db = db; 
//    app.locals.db.blocks = db; 
//    app.locals.db.transactions = db; 
}); 

// setup up clean router interface
app.use('/', require('./routes')); 

var port = process.env.PORT || 8080;

// START THE SERVER
app.listen(port, '0.0.0.0', function() {
    log.debug("Magic happens on port " + port); 
});

