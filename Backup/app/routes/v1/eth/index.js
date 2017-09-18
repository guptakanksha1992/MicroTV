const router = require('express').Router(); 

// define landing page for the /v1/eth api endpoint
router.get('/', function(req, res) {
    req.app.locals.log.info("/v1/eth function"); 
    res.status(200).json( { "system": "Ethereum System" } ); 
});

// include appropiate router subsystems
router.use('/transactions', require('./transactions')); 
router.use('/accounts', require('./accounts')); 
router.use('/blocks', require('./blocks')); 

module.exports = router; 

