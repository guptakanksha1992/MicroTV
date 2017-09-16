const mongoClient    = require('mongodb').MongoClient;
const config         = require('./config'); 

module.exports.setupDB = function(url, cb) {
    // initial connection to the database   
    // TODO: reduce latency
    mongoClient.connect(url, function(err, db) {
        if (err) {                          
            console.log("Unsuccessful connection to " + url + " !!!"); 
            cb(err, null); 
            return; 
        }                                   
        cb(null, db); 
    }); 
}; 
