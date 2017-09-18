const utils = require('../../../../utils'); 
module.exports = function(req, res, next, value) {
    req.app.locals.log.info(" in indexblock.js "); 
    // do we have a valid index?
    if (req.params.index >= 0 && req.params.index <= req['block']['transactions'].length - 1) {
        req.app.locals.log.info("valid index"); 
        req['transaction'] = req['block']['transactions'][req.params.index]; 
        utils.custom.findObjectByFilter('transaction', 'hash', false)(req, res, next, req['transaction']); 
        
    } else {
         res.status(404).json( {"error" : "Invalid index. Try using the /blocks module to verify that the specified index is valid." } ); 
    }
}; 


