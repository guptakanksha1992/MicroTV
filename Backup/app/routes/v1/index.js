const router         = require('express').Router(); 
const path           = require('path'); 

// define our landing page for the /v1 api endpoint
router.get('/', function(req, res) {
    req.app.locals.log.info("/v1 function"); 
    res.sendFile(path.join(__dirname + "/v1_documentation.html"));
});

// tests if the /v1 endpoint is up and running, look at coinbase for an example
router.get('/status', require('./status')); 

router.use('/eth', require('./eth')); 

module.exports = router; 

