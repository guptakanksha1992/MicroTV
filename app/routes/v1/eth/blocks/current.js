const utils = require('../../../../utils'); 

// TODO: change this to use special database , ignore for now
module.exports = function(req, res) {
    req.app.locals.log.info("/v1/eth/blocks/current function"); 
    var collection = req.app.locals.db.blocks.collection('blocks'); 
    collection.findOne( {number: 1}, function(err, item) {
        res.json(item); 
    }); 
        
}; 
