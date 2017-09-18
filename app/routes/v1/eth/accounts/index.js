const router = require('express').Router(); 

router.get('/', function(req, res) {
    req.app.locals.log.debug("/v1/eth/accounts function"); 
    // TODO: de-hardcode v1
    res.status(200).json( { "system" : "Ethereum Accounts System" } ); 
});

module.exports = router; 

