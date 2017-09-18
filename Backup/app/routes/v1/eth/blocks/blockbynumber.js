const utils = require('../../../../utils'); 

module.exports = function(req, res) {
    // TODO: AVOID SECURITY SQL INJECTION BY SANITIZING INPUT
    req.app.locals.log.info("/v1/eth/blocks/blockbynumber/XXX function"); 
    res.json(req['block']); 
}; 
